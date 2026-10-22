// robots.txt as a route handler rather than Next's `robots.ts` metadata
// convention: the convention only knows User-Agent / Allow / Disallow /
// Crawl-delay / Sitemap, and we also publish a Content-Signal line
// (contentsignals.org). The output below is otherwise identical to what the
// convention produced.
//
// Content-Signal declares preferences for how crawled content may be used.
// It is a preference, not an access rule: the Allow line still admits every
// bot. Search yes, use as AI-answer input yes
// (citations in AI answers are a primary channel), AI training no.
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";

export async function GET() {
  const sitemap = "https://www.topweightloss.us/sitemap.xml";

  const body = [
    "# Content-Signal expresses how this site's content may be used after it is",
    "# crawled: search = indexing and linking; ai-input = quoting or summarising",
    "# in AI answers; ai-train = training or fine-tuning models. See",
    "# https://contentsignals.org",
    "User-Agent: *",
    `Content-Signal: ${CONTENT_SIGNAL}`,
    "Allow: /",
    "Disallow: /api/",
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
