import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, History, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { TrustDisclosure } from "@/components/medical-sources";
import { ProviderCta } from "@/components/provider-cta";
import { reviewedPageNode } from "@/data/reviewers";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED, PRICE_CHANGELOG } from "@/lib/price-index";

export const revalidate = 60;

// ───── GLP-1 price changes feed ─────
// Every entry in the public price change log, newest first, each with the
// provider's current listing from the index. An entry exists only when a
// verified row actually changed, so this page is a dated record of real price
// movements - not a render timestamp and not a prediction.

const CANONICAL = "https://www.topweightloss.us/glp1-price-changes";
const PUBLISHED = "2026-10-06";

const longDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const monthLabel = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

const entries = [...PRICE_CHANGELOG].sort((a, b) => b.date.localeCompare(a.date));
const latest = entries[0]?.date ?? PRICE_INDEX_VERIFIED;
const earliest = entries[entries.length - 1]?.date ?? PRICE_INDEX_VERIFIED;

export const metadata: Metadata = withSeo("/glp1-price-changes", {
  title: `GLP-1 Price Changes 2026: ${entries.length} Verified Price Updates`,
  description: `${entries.length} verified changes to online semaglutide and tirzepatide prices since ${monthLabel(earliest)}, each dated with the old and new listing. Index checked ${longDate(PRICE_INDEX_VERIFIED)}.`,
  alternates: { canonical: CANONICAL },
  openGraph: { title: `GLP-1 Price Changes 2026: ${entries.length} Verified Updates`, description: "A dated record of each confirmed change to online GLP-1 provider pricing, showing the previous and the new listing.", url: CANONICAL, type: "article" },
});

export default async function PriceChangesPage() {
  const config = await getConfig();
  const byId = new Map(config.providers.map((p) => [p.id, p]));
  const title = `GLP-1 Price Changes: ${entries.length} Verified Updates to Online Provider Pricing`;
  const thisMonth = entries.filter((e) => e.date.slice(0, 7) === PRICE_INDEX_VERIFIED.slice(0, 7)).length;
  const providersChanged = new Set(entries.map((e) => e.providerId)).size;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: PUBLISHED,
    dateModified: latest > PRICE_INDEX_VERIFIED ? latest : PRICE_INDEX_VERIFIED,
    author: { "@type": "Organization", name: "Top Weight Loss Team", url: "https://www.topweightloss.us" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: reviewedPageNode("/glp1-price-changes", CANONICAL, "WebPage"),
    hasPart: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: entries.length,
      itemListElement: entries.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${byId.get(e.providerId)?.name ?? e.providerId}: ${longDate(e.date)}`,
        description: e.change,
      })),
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Price Changes", item: CANONICAL },
    ],
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "GLP-1 Price Changes" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">{title}</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            Online semaglutide and tirzepatide prices do not stand still. Promotions launch and expire, plan terms get
            rewritten, and providers lower their 12-month rates. This page records each price change we have confirmed on
            the provider&rsquo;s own website, with the date, our previous listing and our current listing. Nothing is added
            until it has been checked.
          </p>
          <p className="mt-2 max-w-[720px] text-[14px] leading-relaxed text-gray-500">
            For brand-name prices, the Medicare GLP-1 Bridge and insurance, see our <Link href="/articles/glp1-cost-2026-how-to-pay-less" className="font-semibold text-[#0C4B75] underline underline-offset-2">2026 GLP-1 cost guide</Link>.
          </p>
          <LastUpdated date={latest} className="mt-4" />
          <MedicalReviewBar path="/glp1-price-changes" className="mt-4 max-w-[760px]" />
          <TrustDisclosure disclaimerHref="/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div className="text-[15px] leading-[1.75] text-gray-600">
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">Are online GLP-1 prices going up or down?</h2>
            <p>
              Mostly down. We have logged <strong className="text-[#191919]">{entries.length} verified changes</strong> from{" "}
              {providersChanged} providers since {monthLabel(earliest)}, including {thisMonth} in {monthLabel(PRICE_INDEX_VERIFIED)}.
              Prices have either dropped or promotions have been extended: welludr lowered its 12-month rates to $49 for semaglutide
              and $89 for tirzepatide and then to from $41 and $71 in its October 28 Pre-Black Friday sale, TrimRx switched semaglutide to a flat $149 at every dose, and altRx extended its $89 / $149
              promotion twice. See today&rsquo;s full price ranking, with every condition, in the{" "}
              <Link href="/cheapest-glp1" className={ext}>cheapest GLP-1 comparison</Link>. The index was last checked on{" "}
              {longDate(PRICE_INDEX_VERIFIED)}.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <History className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">GLP-1 price change log (most recent first)</h2>
          </div>
          <ol className="relative space-y-4 border-l-2 border-gray-200 pl-6">
            {entries.map((e, i) => {
              const p = byId.get(e.providerId);
              const row = PRICE_INDEX.find((r) => r.providerId === e.providerId);
              return (
                <li key={`${e.date}-${e.providerId}-${i}`} className="relative rounded-xl border border-gray-200 bg-white p-5">
                  <span className="absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 border-white bg-[#0C4B75]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[15px] font-bold text-[#191919]">
                      {p ? (
                        <Link href={`/reviews/${p.id}`} className="hover:text-[#0C4B75] hover:underline">{p.name}</Link>
                      ) : (
                        e.providerId
                      )}
                    </p>
                    <time dateTime={e.date} className="text-[13px] font-semibold text-gray-500">{longDate(e.date)}</time>
                  </div>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-gray-700">{e.change}</p>
                  {row && (
                    <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-gray-100 pt-3 text-[13px] text-gray-600">
                      <span>
                        <span className="text-gray-400">Current listing:</span>{" "}
                        {row.semaglutide && <>semaglutide <strong className="text-[#191919]">{row.semaglutide.price}</strong></>}
                        {row.semaglutide && row.tirzepatide && " · "}
                        {row.tirzepatide && <>tirzepatide <strong className="text-[#191919]">{row.tirzepatide.price}</strong></>}
                      </span>
                      {p && (
                        <ProviderCta href={p.affiliateUrl} providerName={p.name} providerSlug={p.id} pageType="listing" sourceFlow="main_comparison" className="inline-flex items-center gap-1 font-semibold text-[#0C4B75] hover:underline">
                          See today&rsquo;s price <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </ProviderCta>
                      )}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-3 text-[20px] font-bold text-[#191919]">How do we verify a GLP-1 price change?</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-gray-600">
            <li><strong className="text-[#191919]">Each entry is a confirmed change.</strong> We record a change only once we have seen the new number on the provider&rsquo;s website. Every entry shows our old listing and our new one, and the price index plus every page that draws on it is updated at the same moment.</li>
            <li><strong className="text-[#191919]">What a &ldquo;listed&rdquo; price includes.</strong> The headline monthly rate plus the condition attached to it: a 12-month plan, a promotion with an expiry date, or a flat month-to-month price. When a promotion is extended we log it even if the dollar figure stays the same, because the terms changed.</li>
            <li><strong className="text-[#191919]">What we leave out.</strong> Unverified prices, rumors about providers, and figures taken from other comparison sites. If a provider&rsquo;s website shows a price that does not match ours, write to{" "}<a href="mailto:contact@topweightloss.us" className={ext}>contact@topweightloss.us</a>{" "}and we will check it and add it to the log.</li>
            <li><strong className="text-[#191919]">Where to go next.</strong> For the dated index alongside clinical statistics, see the{" "}<Link href="/glp1-weight-loss-statistics" className={ext}>GLP-1 price index</Link>. For brand-name options, read{" "}<Link href="/articles/zepbound-price-online" className={ext}>how to buy Zepbound online</Link>.</li>
          </ul>
        </section>

        <GuideCluster currentSlug="glp1-price-changes" />
      </div>
    </div>
  );
}
