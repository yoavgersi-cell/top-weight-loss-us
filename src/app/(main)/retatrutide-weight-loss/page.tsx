import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Link from "next/link";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { FlaskConical, TriangleAlert, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { CONTENT_LAST_UPDATED } from "@/lib/config";
import { getConfig } from "@/lib/config-store";

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/retatrutide-weight-loss";

export const metadata: Metadata = {
  title: "Retatrutide Weight Loss 2026: Trial Results & FDA Status",
  description:
    "Retatrutide, a triple GLP-1, GIP and glucagon agonist, produced about 24% weight loss in a Phase 2 trial. See how it compares and whether you can get it yet.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Retatrutide Weight Loss 2026: Trial Results & FDA Status",
    description:
      "About 24% weight loss in a Phase 2 trial, but not FDA-approved. What retatrutide is, how it compares and when it may be available.",
    url: CANONICAL,
    type: "article",
  },
};

const compareRows: [string, string, string][] = [
  ["How it works", "Triple agonist: GLP-1, GIP and glucagon receptors", "See below"],
  ["Average weight loss in trials", "Up to ~24% at 48 weeks (Phase 2)", "Tirzepatide ~20%+ · Semaglutide ~15%"],
  ["How it is taken", "Injection once a week", "Injection once a week (both drugs)"],
  ["FDA approval", "Investigational, not approved yet", "Tirzepatide and semaglutide are both FDA-approved"],
  ["Can you get it?", "Cannot be prescribed yet", "Prescribed today by licensed providers"],
];

const faqs: { question: string; answer: string }[] = [
  { question: "What is retatrutide?", answer: "Retatrutide is an investigational weight loss injection from Eli Lilly that is taken once a week. It is often shortened to “reta” or described as a “triple agonist” because it acts on three receptors: GLP-1, GIP and glucagon. Semaglutide acts on GLP-1 only and tirzepatide acts on GLP-1 and GIP, and retatrutide has produced the largest trial weight loss of any drug so far." },
  { question: "How much weight can you lose on retatrutide?", answer: "In a Phase 2 trial, people on the highest retatrutide dose lost about 24% of their body weight in 48 weeks. That is more than tirzepatide (~20%) or semaglutide (~15%) achieved in their own trials. These are early figures, and larger Phase 3 trials are underway to confirm them." },
  { question: "Is retatrutide FDA-approved?", answer: "No. As of 2026, retatrutide is still investigational and the FDA has not approved it for weight loss or any other use. Eli Lilly is testing it in late-stage Phase 3 clinical trials." },
  { question: "When will retatrutide be available?", answer: "Retatrutide's availability depends on its Phase 3 results and on FDA review. Industry expectations put a possible approval somewhere in 2026-2027, although that timeline could move. Until the FDA approves it, retatrutide cannot be legitimately prescribed for weight loss." },
  { question: "Is retatrutide more effective than tirzepatide?", answer: "In trials, retatrutide produced more weight loss (~24%) than tirzepatide (~20%+). The difference is that tirzepatide is FDA-approved and can be prescribed now, while retatrutide is still investigational. For anyone starting treatment today, the real choice is between approved drugs, with retatrutide a possible option later." },
  { question: "Can I buy retatrutide online?", answer: "No. Retatrutide is not FDA-approved, so it cannot be legitimately bought or prescribed for weight loss. Treat any website offering “retatrutide” with caution, because an unapproved drug from an unknown source carries real safety and legal risks. Use an approved medication prescribed by a licensed clinician instead." },
];

export default async function RetatrutidePage() {
  const config = await getConfig();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Retatrutide Weight Loss 2026: Trial Results & FDA Status",
    description: metadata.description,
    datePublished: "2026-08-09",
    dateModified: "2026-08-09",
    ...pageReviewSchema("/retatrutide-weight-loss"),
    author: { "@type": "Organization", name: "Top Weight Loss Team", url: "https://www.topweightloss.us" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "Retatrutide", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Retatrutide" }]} />
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">
            Retatrutide for Weight Loss: Trial Results, FDA Status and What to Use Now
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            Retatrutide (&ldquo;reta&rdquo;) produced about 24% weight loss in a Phase 2 trial, the
            highest result of any weight loss drug to date. This guide covers how retatrutide works, how it
            compares with tirzepatide and semaglutide, and whether you can get it yet.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
          <MedicalReviewBar path="/retatrutide-weight-loss" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Status callout - set expectations up front */}
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
          <TriangleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" strokeWidth={2} />
          <div>
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">Can you get retatrutide today?</h2>
            <p className="text-[15px] leading-[1.75] text-gray-600">
              No. Retatrutide is <strong className="text-[#191919]">not FDA-approved yet</strong>, so
              no one can legitimately prescribe or sell it for weight loss. It is in late-stage trials,
              and approval may come in 2026-2027. Below you will find how the drug works, how it
              measures up against approved options, and which approved treatments you can start
              now.
            </p>
          </div>
        </div>

        <TopTwoPicks config={config} linkPrefix="/" />

        {/* What it is */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">What is retatrutide?</h2>
          </div>
          <p className="mb-4">
            Retatrutide is a once-weekly investigational injection developed by Eli Lilly. It is a{" "}
            <strong className="text-[#191919]">triple agonist</strong>, meaning it switches on three
            receptors together: GLP-1 and GIP, the same pair tirzepatide targets, plus glucagon. The
            glucagon action is thought to raise metabolism and fat burning in addition to reducing
            appetite. That combination is the likely reason retatrutide has shown the biggest weight loss
            of any drug tested so far.
          </p>
        </section>

        {/* Comparison */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">How does retatrutide compare with tirzepatide and semaglutide?</h2>
          <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 font-bold text-[#191919]">Comparison point</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Retatrutide</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Tirzepatide / Semaglutide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {compareRows.map(([k, a, b], i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
                    <td className="px-4 py-3 align-top font-medium text-[#191919]">{k}</td>
                    <td className="px-4 py-3 align-top text-gray-600">{a}</td>
                    <td className="px-4 py-3 align-top text-gray-600">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[14px] text-gray-500">
            Read more about the approved drugs in our{" "}
            <Link href="/tirzepatide" className="font-semibold text-[#0C4B75] hover:underline">tirzepatide</Link>{" "}
            and{" "}
            <Link href="/semaglutide" className="font-semibold text-[#0C4B75] hover:underline">semaglutide</Link>{" "}
            guides.
          </p>
        </section>

        {/* Trial results */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">What did the retatrutide trials find?</h2>
          <p className="mb-4">
            The highest retatrutide dose led to a loss of about{" "}
            <strong className="text-[#191919]">24% of body weight over 48 weeks</strong> in a Phase 2
            study published in 2023. That beats the figures tirzepatide (~20%) and semaglutide (~15%)
            reached in their own trials.{" "}
            <strong className="text-[#191919]">Phase 3 trials are now in progress</strong> to confirm the
            result and check long-term safety. The early data look strong, but only the Phase 3 results
            and the FDA&rsquo;s review will decide if and when patients can use it.
          </p>
        </section>

        {/* What to use now */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">What should you take while you wait for retatrutide?</h2>
          <p className="mb-6">
            The strongest approved alternatives are tirzepatide (~20% weight loss in trials) and
            semaglutide (~15%). Licensed telehealth providers prescribe both online, frequently as
            lower-cost compounded versions. Weigh providers on price, medical support and overall value
            before you choose.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]">
              See the Top Providers
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link href="/glp1-pills-vs-injections" className="inline-flex h-[46px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50">
              GLP-1 Pills or Injections?
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-[24px] font-bold text-[#191919]">Retatrutide questions, answered</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faqs.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <GuideCluster currentSlug="retatrutide-weight-loss" />

        {/* Sources + disclaimer */}
        <section>
          <p className="mb-3 text-[13px] leading-relaxed text-gray-400">
            Sources: retatrutide Phase 2 trial results (New England Journal of Medicine, 2023) and the
            manufacturer&rsquo;s trial program details; published tirzepatide (SURMOUNT) and semaglutide
            (STEP) trial data. All trial figures are averages, and individual results differ. Drug and
            brand names belong to their respective manufacturers.
          </p>
          <p className="text-[13px] leading-relaxed text-gray-400">
            topweightloss.us does not provide medical care or prescribe medication. This page is
            educational and is not medical advice. Retatrutide is an investigational drug without FDA
            approval. Talk to a licensed healthcare provider about the approved treatments that suit
            you.
          </p>
        </section>
      </div>
    </div>
  );
}
