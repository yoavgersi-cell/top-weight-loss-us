import { withSeo } from "@/lib/seo";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Database, ShieldCheck, Scale, Trophy, RefreshCw, BadgeDollarSign, Check, X } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX } from "@/lib/price-index";
import { ExpertTeam } from "@/components/expert-team";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { CONTENT_LAST_UPDATED } from "@/lib/config";

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/how-we-rank";

export const metadata: Metadata = withSeo("/how-we-rank", {
  title: "How We Rank GLP-1 Weight Loss Providers: Methodology",
  description:
    "How Top Weight Loss scores GLP-1 weight loss providers: 6 weighted factors, prices verified on each provider's site, and how head-to-head winners are picked.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "How We Rank GLP-1 Weight Loss Providers: Methodology",
    description:
      "The six weighted factors behind every Top Weight Loss score, where the data comes from, how prices are verified, and how comparison winners are chosen.",
    url: CANONICAL,
    type: "article",
  },
});

const FACTORS = [
  { category: "Medical Credibility", weight: "25%", desc: "Oversight by licensed prescribers, how thorough the medical evaluation is, ongoing monitoring, pharmacy standards, and third-party certifications such as LegitScript." },
  { category: "Medication Access", weight: "20%", desc: "Which GLP-1 options are available (semaglutide, tirzepatide, brand-name), the formulations offered, and how flexible dosing is." },
  { category: "Pricing & Value", weight: "20%", desc: "The full monthly cost of medication, consultations and delivery, how openly that price is published, and whether any hidden fees apply." },
  { category: "Patient Experience", weight: "15%", desc: "How fast enrollment is, how well the platform works, how quickly support responds, how reliable delivery is, and what recent verified customer feedback says." },
  { category: "Clinical Support", weight: "10%", desc: "Follow-up visits, dose changes, help managing side effects, and guidance for the length of treatment." },
  { category: "Flexibility", weight: "10%", desc: "Contract length, cancellation and pause rules, the option to switch medications, and available payment methods." },
];

const METHOD_FAQS = [
  {
    question: "How often does Top Weight Loss update GLP-1 prices?",
    answer:
      "Prices are updated whenever a provider changes its published rates. Every price on the site comes from one verified registry, so a single update flows through to every affected review, comparison, cost table and product card. Each page shows the date it was last updated.",
  },
  {
    question: "Do affiliate partnerships change provider scores or rankings?",
    answer:
      "No. A partnership can affect how a provider is displayed, but it does not change scores, review content or head-to-head winners. Matchup verdicts regularly go to the cheaper or better-documented provider, and reviews cite the real Trustpilot record, mixed ones included, whether or not the provider is a partner.",
  },
  {
    question: "Why do some GLP-1 providers have no Trustpilot rating on Top Weight Loss?",
    answer:
      "Those providers do not have a published Trustpilot aggregate, and Top Weight Loss never estimates or invents a score. When no aggregate exists, the page says so directly. The review then relies on individual reviews we can verify and on the provider's published terms.",
  },
  {
    question: "How are the 12-month GLP-1 cost tables calculated?",
    answer:
      "Each 12-month total starts from the provider's published rates and applies promotional conditions exactly as the provider states them. A first-month rate switches to the regular price from month two, a plan-locked rate is labeled with its commitment, and a prepaid plan shows the amount charged at checkout. The assumptions are printed under every table.",
  },
];

const SOURCES = [
  { icon: Database, title: "Each provider's own website", desc: "Prices, medications, shipping terms and the medical model are taken straight from each provider's official site and landing pages, so the details here match what you see when you enroll." },
  { icon: ClipboardCheck, title: "Recent verified customer reviews", desc: "Current Trustpilot reviews show how communication, delivery and support work for real customers, beyond what the marketing says." },
  { icon: Scale, title: "Our own research", desc: "Our editors go through enrollment flows themselves, line up prices side by side, and follow how each provider's offer changes over time." },
  { icon: ShieldCheck, title: "Clinical literature", desc: "Medical claims are based on published trial data, such as the STEP and SURMOUNT trials, and on FDA information rather than opinion." },
];

export default async function HowWeRankPage() {
  const config = await getConfig();
  const experts = (config.experts ?? []).map((e) => ({ ...e, name: e.name.replace(/TopWeightLoss/gi, "Top Weight Loss") }));

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How We Rank GLP-1 Weight Loss Providers: Methodology",
    description:
      "How Top Weight Loss scores GLP-1 weight loss providers: 6 weighted factors, prices verified on each provider's site, and how head-to-head winners are picked.",
    url: CANONICAL,
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "How We Rank", item: CANONICAL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: METHOD_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How We Rank" }]} />
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">
            How We Rank GLP-1 Weight Loss Providers
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            Top Weight Loss scores every GLP-1 provider on six weighted factors, using prices
            verified on the provider&rsquo;s own site. Every review and head-to-head comparison
            follows this same process. Below: what we score, where the data comes from, and
            how it stays accurate.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
          <MedicalReviewBar path="/how-we-rank" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        {/* Factors */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">What six factors decide a provider&rsquo;s score?</h2>
          <p className="mb-6 text-[16px] leading-[1.75] text-gray-600">
            Each provider is rated across six categories, and each category carries a fixed
            weight. Medical credibility counts most, at 25%. The weights are set by what matters
            most in a GLP-1 program that is safe, affordable and effective.
          </p>
          <div className="space-y-4">
            {FACTORS.map(({ category, weight, desc }) => (
              <div key={category} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                <span className="shrink-0 rounded bg-[#0C4B75] px-2.5 py-1 text-[12px] font-bold text-white">{weight}</span>
                <div>
                  <p className="text-[14px] font-bold text-[#191919]">{category}</p>
                  <p className="mt-0.5 text-[13px] text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Price verification protocol - the published rulebook, shown with
            LIVE data from the same registry every page on the site renders
            from, so the methodology is self-proving rather than asserted. */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <BadgeDollarSign className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">How are GLP-1 prices verified?</h2>
          </div>
          <p className="mb-4 text-[16px] leading-[1.75] text-gray-600">
            All prices on Top Weight Loss come from a single verified registry. Each entry holds four
            fields: the headline rate, the regular rate that sits behind any promotion, the condition
            tied to the price (plan length, first-month rate or prepaid term), and the shipping terms.
            No price is shown without its condition. The rows below load live from that registry,
            which is the same source our reviews, comparisons and cost tables use:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Provider</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Semaglutide, as recorded</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Condition on record</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Customer record</th>
                </tr>
              </thead>
              <tbody className="text-[13.5px]">
                {PRICE_INDEX.slice(0, 4).map((row) => {
                  const provider = config.providers.find((p) => p.id === row.providerId);
                  return (
                    <tr key={row.providerId} className="border-b border-gray-100 align-top last:border-0">
                      <td className="px-4 py-3.5 font-bold text-[#191919]">{provider?.name ?? row.providerId}</td>
                      <td className="px-4 py-3.5 font-semibold text-[#191919] [font-variant-numeric:tabular-nums]">
                        {row.semaglutide ? `${row.semaglutide.price}/mo` : "-"}
                      </td>
                      <td className="px-4 py-3.5 text-gray-600">{row.semaglutide?.note ?? "-"}</td>
                      <td className="px-4 py-3.5 text-gray-600">
                        {row.trustpilot
                          ? `Trustpilot ${row.trustpilot.rating} across ${row.trustpilot.count} reviews`
                          : "No published aggregate, so we state that instead of inventing one"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">
            A change to a provider&rsquo;s published pricing is entered in the registry once, and
            every page that uses it (reviews, head-to-heads, cost tables and product cards) re-renders.
            See the full price ranking in our{" "}
            <Link href="/cheapest-glp1" className="font-medium text-[#0C4B75] hover:underline">
              cheapest GLP-1 index
            </Link>.
          </p>
        </section>

        {/* What moves a score - the published rubric */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">What raises or lowers a provider&rsquo;s score?</h2>
          <p className="mb-4 text-[16px] leading-[1.75] text-gray-600">
            Inside the six weighted factors, these specific signals reliably push a provider&rsquo;s
            score up or down:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-emerald-700">
                <Check className="h-4 w-4" strokeWidth={2.5} /> Adds points
              </p>
              <ul className="space-y-2 text-[14px] leading-relaxed text-gray-800">
                <li>One flat price at every dose, with no increase as the dose is titrated up</li>
                <li>A large public customer record, measured by Trustpilot review volume and score</li>
                <li>LegitScript certification and named, state-licensed 503A pharmacies</li>
                <li>Written guarantees, such as refunds, warranties or results promises</li>
                <li>Quick, temperature-controlled shipping for injectable medication</li>
                <li>Easy exit terms: month-to-month billing, with pause or cancel at any time</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-amber-700">
                <X className="h-4 w-4" strokeWidth={2.5} /> Loses points
              </p>
              <ul className="space-y-2 text-[14px] leading-relaxed text-gray-800">
                <li>Introductory rates that rise after the first month (the regular rate is always shown next to the promo)</li>
                <li>No published review aggregate, which the review states plainly</li>
                <li>Prepaid commitments that are easy to miss at checkout</li>
                <li>Membership fees added on top of medication costs without clear disclosure</li>
                <li>Little public detail on plan terms, cancellation or pharmacy standards</li>
                <li>A weak or mixed public review record, cited at its real number even for partners</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integrity rules - the house rules the content actually runs on */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Which integrity rules does every review follow?</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="divide-y divide-gray-100 text-[14.5px] leading-[1.75] text-gray-600">
              <p className="p-5"><strong className="text-[#191919]">Ratings are never invented.</strong> When a provider has no published Trustpilot aggregate, the page says so, and no score is estimated or made up. Being a partner makes no difference: the review of our top-rated partner discusses its 3.7 average openly.</p>
              <p className="p-5"><strong className="text-[#191919]">A promo price always comes with its regular rate.</strong> Each promotional price is shown next to the regular rate and its condition (&ldquo;first month only&rdquo;, &ldquo;12-month plan&rdquo;, &ldquo;prepaid at checkout&rdquo;), and the 12-month cost tables apply those conditions exactly as the provider publishes them.</p>
              <p className="p-5"><strong className="text-[#191919]">Reddit feedback is verified by hand, not scraped.</strong> Each &ldquo;What Reddit says&rdquo; section uses only real public threads that we have checked ourselves. Quotes are lightly trimmed, vote counts appear only as captured, and complaints are included next to praise.</p>
              <p className="p-5"><strong className="text-[#191919]">Medical claims point to primary sources.</strong> Clinical figures come from the published STEP and SURMOUNT trials (NEJM) and FDA prescribing information, listed at the bottom of every medical page, not from blogs or hearsay.</p>
              <p className="p-5"><strong className="text-[#191919]">Unverified claims stay off the site.</strong> Claims that circulate about providers, such as regulatory actions or corporate relationships, are published only after we verify them independently, regardless of which provider they help or hurt.</p>
            </div>
          </div>
        </section>

        {/* Data sources */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Where does the ranking data come from?</h2>
          <p className="mb-6 text-[16px] leading-[1.75] text-gray-600">
            Every provider evaluation draws on the same four sources. A score is only as good
            as the information behind it:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {SOURCES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0C4B75]/5">
                  <Icon className="h-5 w-5 text-[#0C4B75]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-[15px] font-bold text-[#191919]">{title}</h3>
                <p className="text-[13px] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accuracy commitment */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How does Top Weight Loss keep provider data accurate?</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-4 text-[15px] leading-[1.75] text-gray-600">
              <p>
                <strong className="text-[#191919]">Everything traces to a source.</strong> Prices,
                medications, shipping times and medical details come from each provider&rsquo;s own
                official materials. We do not invent figures, list medications a provider does not
                offer, or add clinical claims without support.
              </p>
              <p>
                <strong className="text-[#191919]">Pages change when providers do.</strong> GLP-1
                pricing and plans shift often. When a provider changes its plans, the affected reviews
                and comparisons are revised and their &ldquo;last updated&rdquo; date is refreshed.
              </p>
              <p>
                <strong className="text-[#191919]">Facts, experiences and opinions are kept apart.</strong>{" "}
                Objective details such as price, delivery and medications are reported as fact; customer
                sentiment is attributed to the reviews it comes from; and our own view is labeled as
                editorial analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How is the 10-point score calculated?</h2>
          <p className="text-[16px] leading-[1.75] text-gray-600">
            Every provider receives an overall score out of 10, which is the weighted result of the six
            factors above. The score is shown with a plain-English label: <strong className="text-[#191919]">Exceptional</strong>{" "}
            at the top, followed by <strong className="text-[#191919]">Excellent</strong> and{" "}
            <strong className="text-[#191919]">Very Good</strong>. Clear pricing, credible medical
            oversight and steady positive recent feedback raise a score; hidden fees, limited medical
            support or repeated complaints lower it.
          </p>
        </section>

        {/* Head-to-head winners */}
        <section className="mb-12">
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6">
            <Trophy className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" strokeWidth={2} />
            <div>
              <h2 className="mb-2 text-[22px] font-bold text-[#191919]">How is a head-to-head winner chosen?</h2>
              <p className="text-[15px] leading-[1.75] text-gray-600">
                The provider that wins more categories wins the matchup. Each head-to-head compares two
                providers one category at a time: pricing, medical support, medication options, speed
                and customer experience. The advantage meter shows how wide the margin is, and the
                runner-up&rsquo;s real strengths are always listed, since the &ldquo;better&rdquo;
                choice still depends on what matters most to you.
              </p>
            </div>
          </div>
        </section>

        {/* Freshness */}
        <section className="mb-12">
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6">
            <RefreshCw className="mt-0.5 h-6 w-6 shrink-0 text-[#0C4B75]" strokeWidth={2} />
            <div>
              <h2 className="mb-2 text-[22px] font-bold text-[#191919]">How are reviews kept up to date?</h2>
              <p className="text-[15px] leading-[1.75] text-gray-600">
                Rankings, reviews and comparisons are revised as provider prices and offers, clinical
                data and recent customer reviews change. Every review and comparison displays its
                last-updated date.
              </p>
            </div>
          </div>
        </section>

        {/* Independence */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Are the rankings independent of affiliate deals?</h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              <strong className="text-[#191919]">Rankings follow the criteria.</strong> The criteria
              on this page decide our rankings and reviews; commercial relationships do not.
            </p>
            <p>
              <strong className="text-[#191919]">Affiliate links are disclosed.</strong> Some providers
              pay us through affiliate partnerships when a visitor clicks through and signs up. That can
              affect how providers are displayed, but it has no influence on scores or on what our
              reviews say. Read the{" "}
              <Link href="/disclaimer" className="font-semibold text-[#0C4B75] hover:underline">full disclaimer</Link>.
            </p>
          </div>
        </section>

        {/* Who's behind the reviews */}
        <ExpertTeam experts={experts} />

        {/* Medical disclaimer */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Is this ranking medical advice?</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[15px] leading-[1.75] text-gray-600">
              No. topweightloss.us is not a medical provider and does not prescribe medication. Content on
              this site is for education and comparison only and is not a substitute for professional
              medical advice. GLP-1 medications are prescription drugs that need evaluation and
              supervision by a licensed healthcare provider. Talk to a qualified physician before you
              start any weight loss medication. Individual results vary.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Questions about our ranking method</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {METHOD_FAQS.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[15.5px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.75] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="mb-4 text-[16px] font-bold text-[#191919]">See the method applied to real providers</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
            >
              View the Rankings
            </Link>
            <Link
              href="/reviews"
              className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
            >
              Browse Provider Reviews
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
