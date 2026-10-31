import { withSeo } from "@/lib/seo";
import { reviewedPageNode } from "@/data/reviewers";
import type { Metadata } from "next";
import Link from "next/link";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, BRAND_SHELF, PRICE_INDEX_VERIFIED, PRICE_CHANGELOG } from "@/lib/price-index";

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/glp1-weight-loss-statistics";
const TITLE = "GLP-1 Prices & Weight Loss Statistics: October 2026 Index";
const DESCRIPTION =
  "Compounded semaglutide and tirzepatide prices at 9 US telehealth providers, verified and dated with a public change log, plus STEP, SURMOUNT and SCALE trial results.";

export const metadata: Metadata = withSeo("/glp1-weight-loss-statistics", {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
    modifiedTime: PRICE_INDEX_VERIFIED,
  },
});

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// The compounded-price figures below are computed at render from our verified
// GLP-1 price index (src/lib/price-index.ts) - every row is a provider-published
// price we checked, never an estimate. Deriving them here keeps the headline
// findings in lockstep with the underlying data instead of a hand-typed number
// that could drift.
const priceNum = (cell: { price: string } | null): number | null =>
  cell ? Number((cell.price.match(/\d[\d,]*/)?.[0] ?? "").replace(/,/g, "")) || null : null;

const semaPrices = PRICE_INDEX.map((r) => priceNum(r.semaglutide)).filter((n): n is number => n != null);
const tirzPrices = PRICE_INDEX.map((r) => priceNum(r.tirzepatide)).filter((n): n is number => n != null);
const PROVIDER_COUNT = PRICE_INDEX.length;
const SEMA_MIN = Math.min(...semaPrices);
const SEMA_MAX = Math.max(...semaPrices);
const TIRZ_MIN = Math.min(...tirzPrices);
const TIRZ_MAX = Math.max(...tirzPrices);
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default async function StatisticsPage() {
  const config = await getConfig();
  const providerName = (id: string) => config.providers.find((p) => p.id === id)?.name ?? id;

  // Dataset schema - this page is the citable record of the index, so it is
  // described as a dataset (with the verification date as dateModified) in
  // addition to the Article the rest of the site emits.
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Top Weight Loss GLP-1 Price Index",
    description:
      `Monthly compounded semaglutide and tirzepatide prices published by ${PROVIDER_COUNT} US telehealth providers, each checked by Top Weight Loss against the provider's own site, with every change dated in a public log.`,
    url: CANONICAL,
    dateModified: PRICE_INDEX_VERIFIED,
    temporalCoverage: PRICE_INDEX_VERIFIED.slice(0, 7),
    // Google's Dataset type accepts a Place (not a Country) for coverage.
    spatialCoverage: { "@type": "Place", name: "United States" },
    // Reuse terms: the data is published under the site's Terms of Use.
    license: "https://www.topweightloss.us/terms",
    creator: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    variableMeasured: [
      "Compounded semaglutide monthly price (USD)",
      "Compounded tirzepatide monthly price (USD)",
      "Pricing condition (promo, plan length, prepaid term)",
    ],
    keywords: ["GLP-1 prices", "semaglutide cost", "tirzepatide cost", "compounded GLP-1", "telehealth weight loss"],
    isAccessibleForFree: true,
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: "2026-08-01",
    dateModified: PRICE_INDEX_VERIFIED,
    author: { "@type": "Organization", name: "Top Weight Loss Research Team", url: "https://www.topweightloss.us/about" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: reviewedPageNode("/glp1-weight-loss-statistics", CANONICAL, "MedicalWebPage"),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Prices & Statistics", item: CANONICAL },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-[26px] font-extrabold text-[#191919] sm:text-[34px]">
            GLP-1 Prices &amp; Weight Loss Statistics: October 2026 Index
          </h1>
          <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-gray-500">
            How much compounded semaglutide and tirzepatide cost at {PROVIDER_COUNT} US telehealth
            providers, with each price checked on the provider&rsquo;s own site and every change dated,
            alongside the published trial results for GLP-1 weight-loss medicines (STEP, SURMOUNT,
            SCALE). Free to cite.
          </p>
          <p className="mt-2 max-w-[640px] text-[14px] leading-relaxed text-gray-500">
            For brand-name self-pay prices, Medicare and insurance coverage, see our{" "}
            <Link href="/articles/glp1-cost-2026-how-to-pay-less" className="font-semibold text-[#0C4B75] underline underline-offset-2">2026 GLP-1 cost
            guide</Link>.
          </p>
          <p className="mt-2 text-[12px] text-gray-400">
            Last price check {longDate(PRICE_INDEX_VERIFIED)} · {PRICE_CHANGELOG.length} changes recorded since{" "}
            {longDate(PRICE_CHANGELOG[PRICE_CHANGELOG.length - 1]?.date ?? PRICE_INDEX_VERIFIED)}
          </p>
          <MedicalReviewBar path="/glp1-weight-loss-statistics" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">

        {/* ───── Flagship: original price survey (the citable, proprietary data) ───── */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-[#0C4B75] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Original Top Weight Loss research
            </span>
          </div>
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">
            How much does compounded GLP-1 cost per month? {PROVIDER_COUNT} providers surveyed
          </h2>
          <p className="mb-5 max-w-[680px] text-[15px] leading-[1.7] text-gray-600">
            As of October 2026, <strong className="text-[#191919]">compounded semaglutide costs
            {" "}{usd(SEMA_MIN)} to {usd(SEMA_MAX)} a month</strong> and{" "}
            <strong className="text-[#191919]">compounded tirzepatide costs {usd(TIRZ_MIN)} to{" "}
            {usd(TIRZ_MAX)} a month</strong> across the {PROVIDER_COUNT} US telehealth providers we
            track. Brand-name versions of the same active ingredients carry four-figure list prices
            (table below). Each number is a price the provider itself publishes, checked by our team,
            never an estimate.
          </p>

          {/* Brand vs compounded - verified list prices from the price index */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-bold text-[#191919]">Brand medication</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Active ingredient</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Brand list price</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Compounded from</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {BRAND_SHELF.map((b, i) => {
                  const isSema = b.ingredient.toLowerCase().includes("semaglutide");
                  const from = isSema ? SEMA_MIN : TIRZ_MIN;
                  return (
                    <tr key={b.drug} className={i % 2 ? "bg-gray-50/50" : ""}>
                      <td className="px-5 py-3 font-medium">{b.drug}</td>
                      <td className="px-5 py-3">{b.ingredient}</td>
                      <td className="px-5 py-3">{b.price}</td>
                      <td className="px-5 py-3 font-semibold text-emerald-600">{usd(from)}/mo</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">
            Source: Top Weight Loss GLP-1 price index covering {PROVIDER_COUNT} providers, published
            prices verified as of October 2026. Brand prices are manufacturer or pharmacy list
            prices, which insurance and manufacturer coupons can reduce. For a provider-by-provider
            breakdown, see our{" "}
            <Link href="/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
              cheapest GLP-1 comparison
            </Link>.
          </p>
        </section>

        {/* ───── The index itself: every provider, both medications, the condition on each price ───── */}
        <section className="mb-10" id="price-index">
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">
            Compounded semaglutide and tirzepatide prices by provider ({PROVIDER_COUNT} providers, checked {longDate(PRICE_INDEX_VERIFIED)})
          </h2>
          <p className="mb-5 max-w-[680px] text-[15px] leading-[1.7] text-gray-600">
            Every row shows a provider&rsquo;s headline monthly price together with the condition that
            applies to it, such as a promotional rate, a required plan length or a prepaid term. We
            never show a price without its condition. Rows run from the cheapest semaglutide price
            to the most expensive.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[720px] text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 font-bold text-[#191919]">Provider</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Semaglutide /mo</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Condition</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Tirzepatide /mo</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Condition</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Commitment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 align-top">
                {PRICE_INDEX.map((row, i) => (
                  <tr key={row.providerId} className={i % 2 ? "bg-gray-50/50" : ""}>
                    <td className="px-4 py-3 font-semibold text-[#191919]">
                      <Link href={`/reviews/${row.providerId}`} className="hover:text-[#0C4B75] hover:underline">
                        {providerName(row.providerId)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-bold text-[#191919] [font-variant-numeric:tabular-nums]">{row.semaglutide?.price ?? "-"}</td>
                    <td className="px-4 py-3 text-gray-500">{row.semaglutide?.note ?? "not offered"}</td>
                    <td className="px-4 py-3 font-bold text-[#191919] [font-variant-numeric:tabular-nums]">{row.tirzepatide?.price ?? "-"}</td>
                    <td className="px-4 py-3 text-gray-500">{row.tirzepatide?.note ?? "not offered"}</td>
                    <td className="px-4 py-3 text-gray-500">{row.commitment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">
            Compounded medicines are made by state-licensed pharmacies and are not FDA-approved. Each
            provider in the index requires a review by a licensed clinician before prescribing. All
            prices are cash prices, so check current terms on the provider&rsquo;s own site.
          </p>
        </section>

        {/* ───── Change log: the public record of what moved, and when ───── */}
        <section className="mb-10" id="change-log">
          <h2 className="mb-1 text-[22px] font-bold text-[#191919]">How have GLP-1 prices changed? The change log</h2>
          <p className="mb-3 text-[14px] text-gray-500">For the complete dated feed alongside each provider&rsquo;s current listing, see <Link href="/glp1-price-changes" className="font-semibold text-[#0C4B75] hover:underline">GLP-1 price changes</Link>.</p>
          <p className="mb-5 max-w-[680px] text-[15px] leading-[1.7] text-gray-600">
            Whenever a price check alters a listing, we log the date, the previous listing and the
            new one. The most recent changes appear first.
          </p>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <ol className="divide-y divide-gray-100">
              {PRICE_CHANGELOG.map((entry, i) => (
                <li key={i} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-5">
                  <div className="shrink-0 sm:w-[150px]">
                    <p className="text-[12.5px] font-semibold text-gray-400 [font-variant-numeric:tabular-nums]">{longDate(entry.date)}</p>
                    <p className="text-[14px] font-bold text-[#191919]">{providerName(entry.providerId)}</p>
                  </div>
                  <p className="text-[14px] leading-[1.7] text-gray-600">{entry.change}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <TopTwoPicks config={config} linkPrefix="" />

        {/* Weight Loss Results */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How much weight do people lose on each GLP-1?</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-bold text-[#191919]">Medication</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Active Ingredient</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Avg. Weight Loss</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Trial</th>
                  <th className="hidden sm:table-cell px-5 py-3 font-bold text-[#191919]">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-5 py-3 font-medium">Wegovy</td>
                  <td className="px-5 py-3">Semaglutide 2.4mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">~15% of body weight</td>
                  <td className="px-5 py-3">STEP 1</td>
                  <td className="hidden sm:table-cell px-5 py-3">68 weeks</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-5 py-3 font-medium">Zepbound</td>
                  <td className="px-5 py-3">Tirzepatide 15mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">Up to 22.5% of body weight</td>
                  <td className="px-5 py-3">SURMOUNT-1</td>
                  <td className="hidden sm:table-cell px-5 py-3">72 weeks</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium">Ozempic</td>
                  <td className="px-5 py-3">Semaglutide 2mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">~6-8% of body weight</td>
                  <td className="px-5 py-3">SUSTAIN (type 2 diabetes)</td>
                  <td className="hidden sm:table-cell px-5 py-3">40 weeks</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-5 py-3 font-medium">Mounjaro</td>
                  <td className="px-5 py-3">Tirzepatide 15mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">~12-15% of body weight</td>
                  <td className="px-5 py-3">SURPASS (type 2 diabetes)</td>
                  <td className="hidden sm:table-cell px-5 py-3">40 weeks</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium">Saxenda</td>
                  <td className="px-5 py-3">Liraglutide 3mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">~5-8% of body weight</td>
                  <td className="px-5 py-3">SCALE</td>
                  <td className="hidden sm:table-cell px-5 py-3">56 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">
            Source: the pivotal published trials, namely STEP 1 (Wilding et al., <em>New England Journal
            of Medicine</em>, 2021) for semaglutide 2.4mg, SURMOUNT-1 (Jastreboff et al., <em>NEJM</em>,
            2022) for tirzepatide 15mg, SCALE (Pi-Sunyer et al., <em>NEJM</em>, 2015) for liraglutide
            3mg, and the SUSTAIN program for semaglutide 2mg. These are trial averages, and individual
            results differ.
          </p>
        </section>

        {/* Side Effects */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">What are the most common GLP-1 side effects?</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-bold text-[#191919]">Side Effect</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Semaglutide</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Tirzepatide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="px-5 py-3 font-medium">Nausea</td><td className="px-5 py-3">~40-44%</td><td className="px-5 py-3">~25-33%</td></tr>
                <tr className="bg-gray-50/50"><td className="px-5 py-3 font-medium">Diarrhea</td><td className="px-5 py-3">~30%</td><td className="px-5 py-3">~19-23%</td></tr>
                <tr><td className="px-5 py-3 font-medium">Vomiting</td><td className="px-5 py-3">~24%</td><td className="px-5 py-3">~8-13%</td></tr>
                <tr className="bg-gray-50/50"><td className="px-5 py-3 font-medium">Constipation</td><td className="px-5 py-3">~23%</td><td className="px-5 py-3">~12-17%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">Source: FDA prescribing information and safety data from the pivotal STEP and SURMOUNT programs. Rates are approximate, and side effects usually ease over time and once the dose is stable.</p>
        </section>

        {/* Timeline */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How fast do you lose weight on a GLP-1?</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-bold text-[#191919]">Timeframe</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Typical progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="px-5 py-3 font-medium">Week 1-2</td><td className="px-5 py-3">Smaller appetite, feeling full sooner, possibly mild nausea</td></tr>
                <tr className="bg-gray-50/50"><td className="px-5 py-3 font-medium">Month 1</td><td className="px-5 py-3">3-5 lbs lost on the starting dose</td></tr>
                <tr><td className="px-5 py-3 font-medium">Month 2-3</td><td className="px-5 py-3">~3-6% of body weight lost as the dose rises</td></tr>
                <tr className="bg-gray-50/50"><td className="px-5 py-3 font-medium">Month 6</td><td className="px-5 py-3">10-15% of body weight lost (semaglutide) or 15-20% (tirzepatide)</td></tr>
                <tr><td className="px-5 py-3 font-medium">Month 12-16</td><td className="px-5 py-3">Peak results: 15% (semaglutide) to 22.5% (tirzepatide)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">Source: averages from clinical trials. Your results depend on the medication, dose, diet and exercise.</p>
        </section>

        {/* Eligibility */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Who qualifies for GLP-1 weight loss medication?</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="mb-4 text-[15px] leading-[1.7] text-gray-600">
              Under FDA-approved prescribing criteria, GLP-1 weight loss medicines are indicated for
              adults who have:
            </p>
            <ul className="mb-4 space-y-2 text-[15px] text-gray-800">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />A BMI of 30 or higher (obesity)</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />A BMI of 27 or higher plus at least one weight-related condition (type 2 diabetes, hypertension, high cholesterol, sleep apnea)</li>
            </ul>
            <p className="mb-1 text-[13px] font-semibold text-[#191919]">Who should avoid them</p>
            <p className="text-[14px] leading-relaxed text-gray-500">
              Semaglutide and tirzepatide both carry an FDA boxed warning for thyroid C-cell tumors, and
              neither should be used by anyone with a personal or family history of medullary thyroid
              carcinoma or MEN 2 syndrome. Clinicians use them cautiously after pancreatitis or
              gallbladder disease, and they are not used during pregnancy. Go over your full health
              history with a licensed clinician first.
            </p>
            <p className="text-[14px] text-gray-500">
              See our full{" "}
              <Link href="/articles/who-qualifies-for-glp1-weight-loss" className="font-semibold text-[#0C4B75] hover:underline">GLP-1 eligibility guide</Link> or{" "}
              <Link href="/find-your-match" className="font-semibold text-[#0C4B75] hover:underline">find your match</Link> to see whether you qualify.
            </p>
          </div>
        </section>

        {/* Key Facts */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">GLP-1 weight loss: six facts worth knowing</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <ul className="space-y-3 text-[15px] leading-[1.7] text-gray-600">
              <li><strong className="text-[#191919]">Semaglutide outperforms older weight-loss drugs:</strong> in STEP 1, semaglutide 2.4 mg produced about 15% average weight loss compared with roughly 2.4% in the lifestyle-only (placebo) group, a much larger effect than earlier weight-loss medicines.</li>
              <li><strong className="text-[#191919]">One injection a week:</strong> semaglutide and tirzepatide are both given as a once-weekly injection under the skin.</li>
              <li><strong className="text-[#191919]">The dose rises slowly:</strong> treatment begins at a low dose that steps up each month over 16-20 weeks to keep side effects down.</li>
              <li><strong className="text-[#191919]">Prescribed online:</strong> licensed telehealth providers can prescribe GLP-1 medicines after a fully online medical evaluation and deliver to your home in most US states.</li>
              <li><strong className="text-[#191919]">Stopping brings weight back:</strong> in the STEP 1 extension, people regained about two-thirds of the weight they had lost within a year of stopping semaglutide, which supports long-term treatment.</li>
              <li><strong className="text-[#191919]">Tirzepatide works on two receptors:</strong> it acts on both GLP-1 and GIP receptors, which may explain why it outperforms semaglutide on weight loss.</li>
            </ul>
          </div>
        </section>

        {/* Methodology & citation - makes the page safe and easy for writers to cite */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How we collect this data, and how to cite it</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="mb-3 text-[14px] leading-[1.7] text-gray-600">
              <strong className="text-[#191919]">Pricing:</strong> we follow the compounded semaglutide
              and tirzepatide prices that {PROVIDER_COUNT} US telehealth providers publish. Our team checks
              each figure against the provider&rsquo;s own site, and we never estimate, model or
              extrapolate a price. The most recent check was on {longDate(PRICE_INDEX_VERIFIED)}, and any
              change to a listing goes into the dated change log above.
            </p>
            <p className="mb-3 text-[14px] leading-[1.7] text-gray-600">
              <strong className="text-[#191919]">Clinical data:</strong> the weight-loss and side-effect
              numbers come from each medicine&rsquo;s pivotal published trials (STEP, SURMOUNT, SCALE,
              SUSTAIN) and FDA prescribing information. They are trial averages, not a promise of what
              any one person will achieve.
            </p>
            <p className="text-[13px] leading-[1.7] text-gray-500">
              <strong className="text-gray-700">Want to cite this data?</strong> Credit
              &ldquo;Top Weight Loss GLP-1 Price Index (2026)&rdquo; and link back to this page. For a
              provider-by-provider pricing comparison, see our{" "}
              <Link href="/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
                cheapest GLP-1 comparison
              </Link>. This page offers general information and is not medical advice.
            </p>
          </div>
        </section>

        <GuideCluster currentSlug="glp1-weight-loss-statistics" />

        {/* CTA */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <p className="mb-2 text-[16px] font-bold text-[#191919]">Find the right GLP-1 provider</p>
          <p className="mb-4 text-[14px] text-gray-500">Compare leading telehealth weight loss providers on price, medication options and clinical support.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]">
              See the Rankings
            </Link>
            <Link href="/find-your-match" className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50">
              Find Your Match
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
