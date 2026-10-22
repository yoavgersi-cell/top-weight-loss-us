import { NextResponse } from "next/server";
import { getConfig } from "@/lib/config-store";
import { AFFILIATE_PROVIDER_IDS, type SiteConfig } from "@/lib/config";
import { WEIGHT_LOSS_GUIDES } from "@/components/guide-cluster";
import { getReviewer, reviewerDisplayName, reviewerPath } from "@/data/reviewers";

// llms.txt (llmstxt.org): a curated, human-readable index of the site's most
// useful pages, written for AI answer engines (ChatGPT Search, Perplexity,
// Copilot, Gemini) that look for it. Unlike sitemap.xml this is deliberately
// SHORT and hand-picked - the highest-intent pages per vertical, with one-line
// descriptions - so a model can grasp what we cover and cite the right page.
// Generated from the site config so every link and price framing stays real.
export const revalidate = 3600;

const HUB = "https://www.topweightloss.us";
const PARTNERS = new Set<string>(AFFILIATE_PROVIDER_IDS);

// One tidy markdown bullet: [Title](absolute url): short description.
function line(title: string, path: string, desc?: string): string {
  const clean = (desc ?? "").replace(/\s+/g, " ").trim();
  const tail = clean ? `: ${clean.length > 110 ? clean.slice(0, 107).trimEnd() + "…" : clean}` : "";
  return `- [${title}](${HUB}${path})${tail}`;
}

function weightLossSection(config: SiteConfig): string {
  const base = "";
  const providerName = (id: string) => config.providers?.find((p) => p.id === id)?.name ?? id;
  const order = config.ranking?.providerOrder ?? [];
  const rank = (id: string) => {
    const i = order.indexOf(id);
    return i < 0 ? Number.MAX_SAFE_INTEGER : i;
  };

  const out: string[] = ["## GLP-1 weight loss", ""];
  out.push(line(`Best GLP-1 weight loss providers (${new Date().getFullYear()})`, "/", config.hero?.description));
  out.push("");

  out.push("### Guides and data");
  for (const g of WEIGHT_LOSS_GUIDES) {
    out.push(line(g.title, `${base}/${g.slug}`, g.blurb));
  }
  out.push("");

  // Partner reviews in ranking order - the pages with verified pricing,
  // Trustpilot excerpts and refund terms.
  out.push("### Provider reviews");
  const reviews = (config.reviews ?? [])
    .filter((r) => PARTNERS.has(r.providerId) && order.includes(r.providerId))
    .sort((a, b) => rank(a.providerId) - rank(b.providerId));
  for (const r of reviews) {
    out.push(line(`${providerName(r.providerId)} review`, `${base}/reviews/${r.slug}`, r.shortSummary));
  }
  out.push("");

  // Head-to-heads between partner providers, ordered by the higher-ranked side.
  out.push("### Head-to-head comparisons");
  const battles = (config.battles ?? [])
    .filter((b) => PARTNERS.has(b.provider1Id) && PARTNERS.has(b.provider2Id))
    .sort(
      (a, b) =>
        Math.min(rank(a.provider1Id), rank(a.provider2Id)) - Math.min(rank(b.provider1Id), rank(b.provider2Id)) ||
        Math.max(rank(a.provider1Id), rank(a.provider2Id)) - Math.max(rank(b.provider1Id), rank(b.provider2Id)),
    )
    .slice(0, 20);
  for (const b of battles) {
    out.push(line(b.matchupLabel ?? b.title.split(":")[0], `${base}/${b.slug}`, b.description));
  }
  out.push("");
  return out.join("\n");
}

export async function GET() {
  const parts: string[] = [
    "# Top Weight Loss",
    "",
    "> Independent, side-by-side comparisons of licensed US online GLP-1 weight loss providers (compounded and brand-name semaglutide and tirzepatide) - with source-checked pricing, real Trustpilot review data, and clear editorial verdicts.",
    "",
    "Top Weight Loss compares telehealth weight loss providers on source-checked prices and plans. Every price, rating and comparison is verified against the provider or a named public source; where a figure is unavailable we say so rather than estimate. We do not fabricate statistics, reviews, or medical claims, and we do not give medical advice - each page links to the provider for current terms. Medical and scientific statements are checked by a named reviewer (see the medical review policy below); prices, rankings and verdicts are editorial.",
    "",
  ];

  parts.push(weightLossSection(await getConfig()));

  const reviewer = getReviewer();
  parts.push("## About");
  parts.push("");
  parts.push(line("How we rank", "/how-we-rank", "Our comparison methodology, the six weighted factors, and how we stay objective"));
  parts.push(line("About Top Weight Loss", "/about", "Who we are, how prices are verified, and how our editorial process works"));
  parts.push(line("Medical review policy", "/medical-review-policy", "What our named reviewer checks in health content, and what stays editorial"));
  if (reviewer) {
    parts.push(line(reviewerDisplayName(reviewer), reviewerPath(reviewer), `${reviewer.jobTitle} - credentials, background and the pages reviewed`));
  }
  parts.push("");

  return new NextResponse(parts.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      // Cache at the edge - the content only changes when config does.
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
