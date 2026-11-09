// Shared prose presentation helpers for long editorial copy - used by review
// and battle pages. Pure text transforms: nothing here changes the words, only
// how they're broken up and emphasized.

// Sentence boundary: terminal punctuation (optionally followed by a closing
// quote/bracket), then whitespace, then a capital/number/dollar start. The
// whitespace requirement keeps decimals like "3.8" and "4.4/5" intact - a
// period inside a number is never followed by a space.
const SENTENCE_BOUNDARY = /(?<=[.!?]["')\]]*)\s+(?=[A-Z0-9$("'])/;

export function toSentences(text: string): string[] {
  return text
    .split(SENTENCE_BOUNDARY)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Splits copy at sentence boundaries: the first `n` sentences and the rest.
// Used for read-more treatments where all content must stay in the DOM.
export function splitSentences(text: string, n: number): [string, string] {
  const parts = toSentences(text);
  if (parts.length <= n) return [text, ""];
  return [parts.slice(0, n).join(" "), parts.slice(n).join(" ")];
}

// Bolds the decision-critical facts inside prose - prices, percentages,
// day/hour counts, review-count style numbers and short decimals (ratings,
// doses) - so a scanning reader catches the numbers first. One capture group
// only: the split below relies on alternating plain/matched parts.
// Longer unit spellings first (month before mo) so "$69/month" bolds whole,
// never as "$69/mo" + a stranded "nth". Single source for both the JSX and
// the HTML-string bolding paths.
const FACT_RE =
  /(\$[\d,]+(?:\.\d+)?(?:\/(?:month|mo|year|yr))?|\d+(?:\.\d+)?%|\b\d+(?:-\d+)?\s?(?:days?|hours?|weeks?|months?|tablets?)\b|\b\d{1,3}(?:,\d{3})+\b|\b\d{1,2}\.\d\b)/gi;

export function BoldKeyFacts({ text }: { text: string }) {
  const parts = text.split(FACT_RE);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-[#191919]">
            {p}
          </strong>
        ) : (
          p
        )
      )}
    </>
  );
}

// Renders a long single-paragraph string as readable prose: sentences are
// grouped two per paragraph with breathing room between them, and key facts
// are bolded. The words themselves are untouched - a text wall becomes
// scannable without editing a single claim.
export function ReadableProse({
  text,
  paragraphClassName,
  className = "",
}: {
  text: string;
  paragraphClassName: string;
  className?: string;
}) {
  const sentences = toSentences(text);
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(" "));
  }
  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {chunks.map((c, i) => (
        <p key={i} className={paragraphClassName}>
          <BoldKeyFacts text={c} />
        </p>
      ))}
    </div>
  );
}

// ── Article-body HTML enhancement ────────────────────────────────────────────
// Article sections are author-written HTML strings. Two readability passes,
// both pure string transforms that never change the words:
// 1. A body with no block-level markup (one flowing text wall, inline links
//    allowed) is split into two-sentence <p> paragraphs - .article-body CSS
//    already spaces sibling paragraphs.
// 2. Key facts in text nodes get <strong> tags. Text inside existing <a>,
//    <strong>/<b> or headings is left alone so links and author emphasis
//    never get nested markup.

function maybeSplitPlainBody(html: string): string {
  if (/<(p|ul|ol|table|h[1-6]|div|blockquote)\b/i.test(html)) return html;
  const sentences = toSentences(html);
  if (sentences.length <= 3) return html;
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(" "));
  }
  // Bail out entirely if a split point landed inside an inline link - a rare
  // sentence boundary inside anchor text would produce broken markup.
  for (const c of chunks) {
    if ((c.match(/<a\b/gi)?.length ?? 0) !== (c.match(/<\/a>/gi)?.length ?? 0)) return html;
  }
  return chunks.map((c) => `<p>${c}</p>`).join("");
}

// Tables with 4+ columns cannot fit a phone screen. Tag them "stack-sm" and
// give every data cell a data-label with its column header, so CSS can show
// each row as a small card ("Header: value") below 640px. Desktop and the
// HTML crawlers read are unchanged: it is still a normal table.
function stackWideTables(html: string): string {
  return html.replace(/<table([^>]*)>([\s\S]*?)<\/table>/gi, (whole, attrs: string, inner: string) => {
    const headerRow = inner.match(/<tr[^>]*>((?:(?!<\/tr>)[\s\S])*?<th[\s\S]*?)<\/tr>/i);
    if (!headerRow) return whole;
    const headers = [...headerRow[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").replace(/"/g, "&quot;").trim(),
    );
    if (headers.length < 4) return whole;
    const body = inner.replace(/<tr([^>]*)>([\s\S]*?)<\/tr>/gi, (row: string, rowAttrs: string, cells: string) => {
      if (/<th\b/i.test(cells)) return row;
      let i = 0;
      const labelled = cells.replace(/<td(\s[^>]*)?>/gi, (_m: string, tdAttrs?: string) => {
        const label = headers[i++] ?? "";
        return `<td${tdAttrs ?? ""} data-label="${label}">`;
      });
      return `<tr${rowAttrs}>${labelled}</tr>`;
    });
    const cls = /class="/.test(attrs) ? attrs.replace(/class="/, 'class="stack-sm ') : `${attrs} class="stack-sm"`;
    return `<table${cls}>${body}</table>`;
  });
}

export function enhanceArticleHtml(html: string): string {
  const parts = stackWideTables(maybeSplitPlainBody(html)).split(/(<[^>]+>)/g);
  const SKIP_OPEN = /^<(a|strong|b|h[1-6])\b/i;
  const SKIP_CLOSE = /^<\/(a|strong|b|h[1-6])>/i;
  let skipDepth = 0;
  return parts
    .map((part) => {
      if (part.startsWith("<")) {
        if (SKIP_OPEN.test(part)) skipDepth++;
        else if (SKIP_CLOSE.test(part)) skipDepth = Math.max(0, skipDepth - 1);
        return part;
      }
      if (skipDepth > 0 || !part.trim()) return part;
      return part.replace(FACT_RE, "<strong>$1</strong>");
    })
    .join("");
}
