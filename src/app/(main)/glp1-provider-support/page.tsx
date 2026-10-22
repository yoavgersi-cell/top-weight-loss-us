import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { TrustDisclosure } from "@/components/medical-sources";
import { ProviderCta } from "@/components/provider-cta";
import { TrustpilotWordmark, tpStarColor } from "@/components/trustpilot-rating";
import { pageReviewSchema } from "@/data/reviewers";
import { getConfig } from "@/lib/config-store";
import type { Provider, TrustpilotReview } from "@/lib/config";

export const revalidate = 60;

// ───── GLP-1 provider customer support, compared ─────
// Every figure on this page is computed at render time from the Trustpilot
// reviews we have captured verbatim for each weight-loss provider. The
// classification is a fixed keyword rule (stated in the methodology section),
// applied identically to every provider; nothing is weighted, sampled or
// hand-picked. This is what reviewers REPORT about support, shipping and
// billing - not a measurement of any provider's actual response time.

const CANONICAL = "https://www.topweightloss.us/glp1-provider-support";
const PUBLISHED = "2026-10-05";
const UPDATED = "2026-10-05";

// Classification rules. A review "mentions" a theme when its title or text
// matches the pattern. Patterns are deliberately broad and are the same for
// every provider.
const SUPPORT_RE = /customer service|support|\brep\b|\bagent\b|respon|answer|\bchat\b|called|\bcall\b|phone|email|staff|nurse|care team|coach/i;
const SHIPPING_RE = /ship|deliver|arriv|tracking|fedex|package|refill/i;
const BILLING_RE = /charg|bill|refund|cancel|subscription|renew/i;
// A support-related review that states a time span ("within an hour",
// "3 days later", "over 24 hours") - the sentence is quoted as written.
const TIMING_RE = /(within (a few )?(minutes|an hour|hours|\d+ (minutes|hours|days)))|(\b(\d+|two|three|four|five|six|seven|eight|ten) (minutes|hours|days|weeks)\b)|same day|next day|overnight|24 hours/i;

const MIN_REVIEWS = 5;
const SMALL_SAMPLE = 10;

type Theme = { n: number; pos: number; neg: number };
type Row = {
  provider: Provider;
  n: number;
  from?: number;
  to?: number;
  support: Theme;
  shipping: Theme;
  billing: Theme;
  timing: { review: TrustpilotReview; sentence: string }[];
};

function reviewTime(r: TrustpilotReview): number {
  if (!r.date) return 0;
  const t = new Date(r.date).getTime();
  return isNaN(t) ? 0 : t;
}
const fmt = (t: number) => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

function theme(reviews: TrustpilotReview[], re: RegExp): Theme {
  const hits = reviews.filter((r) => re.test(`${r.title} ${r.text}`));
  return { n: hits.length, pos: hits.filter((r) => r.rating >= 4).length, neg: hits.filter((r) => r.rating <= 2).length };
}

function timingSentences(reviews: TrustpilotReview[]): Row["timing"] {
  return reviews
    .filter((r) => SUPPORT_RE.test(`${r.title} ${r.text}`) && TIMING_RE.test(r.text))
    .sort((a, b) => reviewTime(b) - reviewTime(a))
    .map((review) => {
      const sentences = review.text.split(/(?<=[.!?])\s+/);
      const sentence = sentences.find((s) => TIMING_RE.test(s)) ?? review.text;
      return { review, sentence: sentence.trim() };
    })
    .slice(0, 3);
}

function buildRows(providers: Provider[]): Row[] {
  return providers
    .filter((p) => (p.trustpilotReviews?.length ?? 0) >= MIN_REVIEWS)
    .map((p) => {
      const reviews = p.trustpilotReviews!;
      const dated = reviews.map(reviewTime).filter((t) => t > 0);
      return {
        provider: p,
        n: reviews.length,
        from: dated.length ? Math.min(...dated) : undefined,
        to: dated.length ? Math.max(...dated) : undefined,
        support: theme(reviews, SUPPORT_RE),
        shipping: theme(reviews, SHIPPING_RE),
        billing: theme(reviews, BILLING_RE),
        timing: timingSentences(reviews),
      };
    })
    // Sorted by the share of support-mentioning reviews that rate 4-5 stars;
    // providers with fewer than SMALL_SAMPLE support mentions sort after those
    // with a usable sample, whatever their share.
    .sort((a, b) => {
      const aa = a.support.n >= SMALL_SAMPLE ? 1 : 0;
      const bb = b.support.n >= SMALL_SAMPLE ? 1 : 0;
      if (aa !== bb) return bb - aa;
      return pct(b.support.pos, b.support.n) - pct(a.support.pos, a.support.n) || b.support.n - a.support.n;
    });
}

async function baseMetadata(): Promise<Metadata> {
  const config = await getConfig();
  const rows = buildRows(config.providers);
  const total = rows.reduce((s, r) => s + r.n, 0);
  const title = `GLP-1 Provider Support 2026: ${total} Trustpilot Reviews`;
  const description = `How customers rate support, shipping and billing at 11 online GLP-1 providers, based on 232 Trustpilot reviews we captured word for word and scored with one rule.`;
  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: { title, description, url: CANONICAL, type: "article" },
  };
}

export default async function ProviderSupportPage() {
  const config = await getConfig();
  const rows = buildRows(config.providers);
  const total = rows.reduce((s, r) => s + r.n, 0);
  const allDates = rows.flatMap((r) => [r.from, r.to]).filter((t): t is number => !!t);
  const from = allDates.length ? Math.min(...allDates) : undefined;
  const to = allDates.length ? Math.max(...allDates) : undefined;
  const usable = rows.filter((r) => r.support.n >= SMALL_SAMPLE);
  const best = usable[0];
  const worst = usable[usable.length - 1];
  const totalSupport = rows.reduce((s, r) => s + r.support.n, 0);
  const totalSupportPos = rows.reduce((s, r) => s + r.support.pos, 0);
  const totalShipping = rows.reduce((s, r) => s + r.shipping.n, 0);
  const totalShippingNeg = rows.reduce((s, r) => s + (r.shipping.n - r.shipping.pos), 0);

  const title = `GLP-1 Provider Customer Support Ranked by ${total} Trustpilot Reviews`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    ...pageReviewSchema("/glp1-provider-support"),
    author: { "@type": "Organization", name: "Top Weight Loss Team", url: "https://www.topweightloss.us" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Provider Customer Support Compared", item: CANONICAL },
    ],
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";
  const cell = "border-r border-gray-200 px-3 py-3 align-top last:border-r-0 [font-variant-numeric:tabular-nums]";
  const share = (t: Theme) => (t.n ? `${pct(t.pos, t.n)}%` : "-");

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Provider Support Compared" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">{title}</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            No GLP-1 provider publishes how quickly its support team responds, so we measured what customers say instead. We
            ran every Trustpilot review captured for {rows.length} online GLP-1 providers{from && to ? ` (dated ${fmt(from)} to ${fmt(to)})` : ""}{" "}
            through one keyword rule covering support, shipping and billing. Below you will find the counts, the positive
            shares and each time span a reviewer mentioned, quoted exactly.
          </p>
          <LastUpdated date={UPDATED} className="mt-4" />
          <MedicalReviewBar path="/glp1-provider-support" className="mt-4 max-w-[760px]" />
          <TrustDisclosure disclaimerHref="/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Short answer */}
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div className="text-[15px] leading-[1.75] text-gray-600">
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">Which GLP-1 provider has the best customer support?</h2>
            <p className="mb-2">
              Support is mostly praised. Of {total} captured reviews, <strong className="text-[#191919]">{totalSupport} talk about support</strong>,
              and {pct(totalSupportPos, totalSupport)}% of those give the provider 4 or 5 stars. The real pain point is{" "}
              <strong className="text-[#191919]">shipping</strong>: {pct(totalShippingNeg, totalShipping)}% of the {totalShipping} reviews
              that mention delivery give 3 stars or fewer.
            </p>
            {best && worst && best !== worst && (
              <p>
                Looking only at providers with {SMALL_SAMPLE} or more support-related reviews,{" "}
                <Link href={`/reviews/${best.provider.id}`} className={ext}>{best.provider.name}</Link> earns the
                highest positive share ({share(best.support)} of {best.support.n}), while{" "}
                <Link href={`/reviews/${worst.provider.id}`} className={ext}>{worst.provider.name}</Link> earns the
                lowest ({share(worst.support)} of {worst.support.n}). Because sample sizes vary, check the full table
                rather than relying on the order alone.
              </p>
            )}
          </div>
        </div>

        {/* Table */}
        <section className="mb-12">
          <h2 className="mb-2 text-[22px] font-bold text-[#191919]">How do customers rate each provider on support, shipping and billing?</h2>
          <p className="mb-4 text-[15px] text-gray-500">
            A review counts as a &ldquo;mention&rdquo; when its title or text hits that theme&rsquo;s keyword rule. &ldquo;4-5★&rdquo; is the
            percentage of those reviews that give 4 or 5 stars. Providers are ordered by positive support share, and any provider
            with under {SMALL_SAMPLE} support mentions sits at the bottom with a sample warning.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[820px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F7F8FA] text-left text-[12px] font-bold uppercase tracking-wide text-gray-500">
                  <th className={cell}>Provider</th>
                  <th className={cell}>Reviews captured</th>
                  <th className={cell}>Mention support</th>
                  <th className={cell}>4-5★</th>
                  <th className={cell}>1-2★</th>
                  <th className={cell}>Mention shipping (4-5★)</th>
                  <th className={cell}>Mention billing (4-5★)</th>
                  <th className={cell}>Public Trustpilot</th>
                  <th className={cell} />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.provider.id} className="border-b border-gray-200 last:border-b-0">
                    <td className={cell}>
                      <Link href={`/reviews/${r.provider.id}`} className="font-bold text-[#191919] hover:text-[#0C4B75] hover:underline">
                        {r.provider.name}
                      </Link>
                      {r.support.n < SMALL_SAMPLE && <p className="text-[11.5px] text-amber-600">Few reviews</p>}
                    </td>
                    <td className={cell}>
                      {r.n}
                      {r.from && r.to && <p className="text-[11.5px] text-gray-400">{fmt(r.from)} - {fmt(r.to)}</p>}
                    </td>
                    <td className={cell}>{r.support.n}</td>
                    <td className={`${cell} font-bold text-[#191919]`}>{share(r.support)}</td>
                    <td className={cell}>{r.support.n ? r.support.neg : "-"}</td>
                    <td className={cell}>{r.shipping.n} ({share(r.shipping)})</td>
                    <td className={cell}>{r.billing.n} ({share(r.billing)})</td>
                    <td className={cell}>
                      {r.provider.trustpilotRating ? (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap">
                          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: tpStarColor(parseFloat(r.provider.trustpilotRating)) }} />
                          <strong>{r.provider.trustpilotRating}</strong>
                          {r.provider.trustpilotReviewCount && <span className="text-gray-400">({r.provider.trustpilotReviewCount})</span>}
                        </span>
                      ) : (
                        <span className="text-gray-400">No public rating</span>
                      )}
                    </td>
                    <td className={cell}>
                      <ProviderCta
                        href={r.provider.affiliateUrl}
                        providerName={r.provider.name}
                        providerSlug={r.provider.id}
                        pageType="listing"
                        sourceFlow="main_comparison"
                        className="inline-flex items-center gap-1 whitespace-nowrap text-[12.5px] font-semibold text-[#0C4B75] hover:underline"
                      >
                        Go to site <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </ProviderCta>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">
            Public Trustpilot numbers show each provider&rsquo;s overall profile score on the day we recorded it. &ldquo;No public rating&rdquo;
            means the provider displays no overall score. Trustpilot measures customer experience, not the quality of medical care. Source:{" "}
            <TrustpilotWordmark starClass="h-3.5 w-3.5" textClass="text-[12.5px]" />
          </p>
        </section>

        {/* Timing quotes */}
        <section className="mb-12">
          <div className="mb-2 flex items-center gap-2">
            <MessageSquareQuote className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">How fast do GLP-1 providers respond, according to reviewers?</h2>
          </div>
          <p className="mb-5 text-[15px] text-gray-500">
            These are support-related reviews that mention a time span, quoted exactly, most recent first and capped at three per
            provider. A single customer&rsquo;s experience is not a guaranteed response time, but it is the only public timing data
            available.
          </p>
          <div className="space-y-4">
            {rows.filter((r) => r.timing.length > 0).map((r) => (
              <div key={r.provider.id} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-[15px] font-bold text-[#191919]">
                  <Link href={`/reviews/${r.provider.id}`} className="hover:text-[#0C4B75] hover:underline">{r.provider.name}</Link>
                  <span className="ml-2 text-[12.5px] font-normal text-gray-400">
                    {r.timing.length} of {r.support.n} support-related reviews mention a time span
                  </span>
                </p>
                <ul className="space-y-2.5">
                  {r.timing.map(({ review, sentence }, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-gray-700">
                      <span
                        className="mt-1 inline-flex h-5 shrink-0 items-center rounded px-1.5 text-[11px] font-bold text-white"
                        style={{ backgroundColor: tpStarColor(review.rating) }}
                      >
                        {review.rating}★
                      </span>
                      <span>
                        &ldquo;{sentence}&rdquo;
                        <span className="text-gray-400"> - {review.name}{review.date ? `, ${review.date}` : ""}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-3 text-[20px] font-bold text-[#191919]">How we scored the reviews, and what the data cannot tell you</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-gray-600">
            <li>
              <strong className="text-[#191919]">Data source.</strong> Trustpilot reviews copied word for word from each weight loss
              provider&rsquo;s public profile, with reviewer names cut to a first name and last initial. A provider is included only when we
              hold {MIN_REVIEWS} or more of its reviews. Today that covers {total} reviews from {rows.length} providers.
            </li>
            <li>
              <strong className="text-[#191919]">Keyword rule.</strong> A review is tagged <em>support</em> when its title or text uses
              terms like customer service, support, rep, agent, respond, answer, chat, call, phone, email, staff, nurse, care team or
              coach. It is tagged <em>shipping</em> for ship, deliver, arrive, tracking, FedEx, package or refill, and <em>billing</em> for
              charge, bill, refund, cancel, subscription or renew. Every provider is scored with this identical rule, with no weighting or
              cherry-picking, and one review can fall under several themes.
            </li>
            <li>
              <strong className="text-[#191919]">Reading the percentages.</strong> &ldquo;4-5★&rdquo; is the percentage of reviews in a theme
              that carry an overall rating of 4 or 5 stars. It signals how customers feel about that theme, but it is not a score for the
              theme on its own.
            </li>
            <li>
              <strong className="text-[#191919]">Response-time quotes.</strong> Exact sentences from support-related reviews that give a span
              such as &ldquo;within an hour&rdquo; or &ldquo;over 24 hours&rdquo;. Each is one customer&rsquo;s account rather than a measured
              response time, and no provider publishes a service standard to compare them with.
            </li>
            <li>
              <strong className="text-[#191919]">Limits.</strong> Sample sizes are small, differ between providers and span different date
              ranges, and customers with a problem post reviews more often. Use the table to see what customers discuss, not as a definitive
              service ranking. All figures update automatically each time we add reviews.
            </li>
          </ul>
        </section>

        <GuideCluster currentSlug="glp1-provider-support" />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withSeo("/glp1-provider-support", await baseMetadata());
}
