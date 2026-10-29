import { withSeo } from "@/lib/seo";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import type { ReactNode } from "react";
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

// Oct 29, 2026 update: Phase 3 (TRIUMPH) status, the FDA filing timeline,
// cost / "without insurance" answers, telehealth (ro) and clinical-trial
// questions, legal alternatives and the risks of gray-market "research use
// only" retatrutide. Every figure below is from a linked primary source, the
// verified cost fact sheet or src/lib/price-index.ts. Nothing is estimated.
const SRC = {
  phase2: "https://www.nejm.org/doi/full/10.1056/NEJMoa2301972",
  triumph4: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-weight-loss-average",
  triumph1: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss",
  triumph1Cnbc: "https://www.cnbc.com/2026/05/21/eli-lilly-weight-loss-drug-retatrutide-clears-obesity-trial.html",
  triumph1Nejm: "https://www.nejm.org/doi/full/10.1056/NEJMoa2604169",
  triumph23: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-successful-two-additional",
  filingBiopharma: "https://www.biopharmadive.com/news/lilly-retatrutide-fda-application-obesity-drug-results/825987/",
  trials: "https://clinicaltrials.gov/search?intr=retatrutide",
  fdaUnapproved: "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  senateRuo: "https://www.banks.senate.gov/news/press-releases/banks-urges-fda-to-crack-down-on-illicit-research-use-only-drugs/",
  pennReddit: "https://www.engineering.upenn.edu/stories/penn-engineers-use-ai-reddit-to-identify-potential-side-effects-of-unapproved-new-glp-1/",
  surmount1: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038",
  step1: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
  attain1: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/48/attain-1",
  oasis4: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4",
  zepboundCnbc: "https://www.cnbc.com/2025/12/01/eli-lilly-prices-zepbound-weight-loss-drug-vials.html",
  lillyDirectZepbound: "https://www.lilly.com/lillydirect/zepbound",
  lillyDirectFoundayo: "https://www.lilly.com/lillydirect/foundayo",
  wegovyPriceGuide: "https://www.novocare.com/content/dam/novonordisk/novocare/redesign/pdf/Wegovy_Price_Guide.pdf",
  wegovyOffer: "https://www.novocare.com/patient/medicines/wegovy/savings-offer.html",
  wegovyPillCnn: "https://www.cnn.com/2026/01/06/health/wegovy-pill-weight-loss-explained",
  foundayoApproval: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
};

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">
      {children}
    </a>
  );
}

export const metadata: Metadata = withSeo("/retatrutide-weight-loss", {
  title: "Retatrutide 2026: Phase 3 Results, FDA Status and Cost",
  description:
    "Retatrutide is not FDA-approved, so it has no legal price. Lilly plans to file with the FDA in Q1 2027. See Phase 3 results, real costs of approved alternatives and the risks of buying it online.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Retatrutide 2026: Phase 3 Results, FDA Status and Cost",
    description:
      "Up to 28.7% weight loss in Phase 3, but not FDA-approved. Lilly plans an FDA filing in Q1 2027. What it costs, who can prescribe it and the legal alternatives.",
    url: CANONICAL,
    type: "article",
  },
});

const compareRows: [string, string, string][] = [
  ["How it works", "Triple agonist: GLP-1, GIP and glucagon receptors", "Tirzepatide: GLP-1 and GIP · Semaglutide: GLP-1"],
  ["Average weight loss in trials", "Up to 28.7% at 68 weeks and 28.3% at 80 weeks (Phase 3 topline, highest dose)", "Tirzepatide 20.9% (SURMOUNT-1) · Semaglutide 14.9% (STEP 1)"],
  ["How it is taken", "Injection once a week", "Injection once a week; semaglutide also as the daily Wegovy pill"],
  ["FDA approval", "Investigational. Lilly plans to file with the FDA in Q1 2027", "Zepbound (tirzepatide) and Wegovy (semaglutide) are FDA-approved"],
  ["Legal price", "None: it cannot be legally sold or prescribed outside a clinical trial", "Self-pay from $149 a month (pills) and $299-$449 (Zepbound)"],
  ["Can you get it?", "Only by enrolling in a clinical trial", "Prescribed today by licensed clinicians, including online"],
];

const costRows: [string, string, string][] = [
  ["Retatrutide", "No legal price. Not FDA-approved, not covered by insurance, not sold by Lilly", "Anything sold as retatrutide today is unapproved"],
  ["Zepbound (tirzepatide), LillyDirect", "$299 (2.5 mg), $399 (5 mg), $449 (7.5-15 mg, refilled within 45 days; higher if late)", "Vials or KwikPen; list price about $1,060-$1,090"],
  ["Wegovy pen (semaglutide), NovoCare", "$349 a month at every dose; $199 for each of the first two fills of 0.25 mg and 0.5 mg for new self-pay patients through December 31, 2026", "Wegovy HD (7.2 mg) is $399"],
  ["Wegovy pill (oral semaglutide)", "$149 (1.5 mg), $199 (4 mg), $299 (9 mg and 25 mg)", "Daily tablet"],
  ["Foundayo (orforglipron)", "$149 (0.8 mg); through December 31, 2026, $149 (2.5 mg) and $199 (5.5 mg); $299 (9 mg); $299 (14.5 mg and 17.2 mg) if refilled on time, otherwise $349", "Daily tablet, no food or water rules"],
  ["Compounded semaglutide (telehealth)", "From $41 a month (welludr Pre-Black Friday sale from October 28, 2026, 12-month plan); $41-$199 across the providers we track", "Not FDA-approved"],
  ["Compounded tirzepatide (telehealth)", "From $71 a month (welludr Pre-Black Friday sale from October 28, 2026, 12-month plan); $71-$299 across the providers we track", "Not FDA-approved"],
];

const faqs: { question: string; answer: string }[] = [
  { question: "What is retatrutide?", answer: "Retatrutide is an investigational weight loss injection from Eli Lilly that is taken once a week. It is often shortened to “reta” or described as a “triple agonist” because it acts on three receptors: GLP-1, GIP and glucagon. Semaglutide acts on GLP-1 only and tirzepatide acts on GLP-1 and GIP. Retatrutide has produced the largest average trial weight loss reported for any obesity drug so far, but it is not FDA-approved." },
  { question: "How much weight can you lose on retatrutide?", answer: "In Phase 3, Lilly reported that the 12 mg dose produced an average 28.7% weight loss at 68 weeks in TRIUMPH-4 (people with obesity and knee osteoarthritis, announced December 11, 2025) and 28.3% at 80 weeks in TRIUMPH-1 (people with obesity, announced May 21, 2026, counting people who stayed on treatment), versus 2.2% with placebo. In people with type 2 diabetes (TRIUMPH-2) the top dose averaged 20.8%. The earlier Phase 2 trial reported 24.2% at 48 weeks." },
  { question: "Is retatrutide FDA-approved?", answer: "No. As of October 29, 2026, retatrutide is investigational and the FDA has not approved it for weight loss or any other use. Lilly has reported positive results from several Phase 3 TRIUMPH trials and says it plans to submit its application to the FDA in the first quarter of 2027." },
  { question: "When will retatrutide be available?", answer: "Not before the FDA approves it, and Lilly has not yet applied. In its July 23, 2026 release, Lilly said it plans to submit a Biologics License Application for retatrutide in the first quarter of 2027, after completing the manufacturing and quality data package the FDA requires. Lilly has not announced an expected approval or launch date, and FDA review takes months after a filing, so any approval date you see online is a guess." },
  { question: "How much does retatrutide cost per month?", answer: "Retatrutide has no legal price per month. It is not FDA-approved, so Lilly does not sell it, no pharmacy can legally dispense it for weight loss, and there is no manufacturer list price or savings program. Anything sold online as “retatrutide” today is an unapproved gray-market product, often labeled “research use only.” For comparison, approved Zepbound costs $299-$449 a month self-pay through LillyDirect, the Wegovy pen $349 a month through NovoCare, and the Wegovy pill and Foundayo start at $149 a month." },
  { question: "What does retatrutide cost without insurance?", answer: "There is no legitimate “without insurance” price for retatrutide, because it cannot be legally prescribed or sold outside a clinical trial, and no insurer covers an unapproved drug. People in Lilly's clinical trials receive the study drug as part of the trial. If you are paying cash for an approved alternative today: Zepbound is $299 (2.5 mg), $399 (5 mg) and $449 (7.5-15 mg, refilled within 45 days) a month through LillyDirect; the Wegovy pen is $349 a month; the Wegovy pill is $149-$299 by dose; and Foundayo is $149-$349 by dose. Compounded tirzepatide from licensed telehealth providers starts at $71 a month and compounded semaglutide at $41 at the providers we track, but compounded drugs are not FDA-approved." },
  { question: "Does ro prescribe retatrutide?", answer: "No. ro, like every legitimate telehealth provider, cannot prescribe retatrutide, because it is not FDA-approved and is only available inside clinical trials. A clinic or website that offers to prescribe or ship retatrutide is selling an unapproved drug. ro and other licensed providers prescribe FDA-approved options such as the Wegovy pill and Zepbound, and many providers also offer compounded semaglutide or tirzepatide, which are not FDA-approved." },
  { question: "How can I get retatrutide legally?", answer: "The only legal way to take retatrutide today is to enroll in a clinical trial. Search ClinicalTrials.gov for “retatrutide” and filter for studies that are recruiting near you; each listing shows the eligibility rules and a contact for the study site. Lilly's main Phase 3 obesity trials have already reported results, so openings vary, and you may be assigned to placebo." },
  { question: "What are the legal alternatives to retatrutide?", answer: "The FDA-approved alternatives are tirzepatide (Zepbound), which averaged 20.9% weight loss at the 15 mg dose in SURMOUNT-1; semaglutide (Wegovy), which averaged 14.9% in STEP 1, with the higher Wegovy HD 7.2 mg dose reaching 20.7% in STEP UP; the Wegovy pill (oral semaglutide 25 mg), 13.6% in OASIS 4; and Foundayo (orforglipron), a daily pill approved April 1, 2026, 11.2% in ATTAIN-1. Tirzepatide is the closest available relative of retatrutide, since it acts on two of the same three receptors." },
  { question: "Is retatrutide more effective than tirzepatide?", answer: "In separate trials, yes: retatrutide's top dose averaged 28.3% weight loss at 80 weeks in TRIUMPH-1, versus 20.9% at 72 weeks for tirzepatide 15 mg in SURMOUNT-1. No head-to-head trial has been reported, and the trials differ in length and population. The practical difference is that tirzepatide (Zepbound) is FDA-approved and can be prescribed now, while retatrutide is not." },
  { question: "Can I buy retatrutide online?", answer: "Not legally. The FDA has warned companies that sold unapproved retatrutide, and other GLP-1 ingredients, falsely labeled “for research purposes” or “not for human consumption” while selling directly to consumers with dosing instructions. The FDA has also said retatrutide cannot legally be used in compounding. These products have no FDA check on identity, purity, strength or sterility, so you cannot know what is in the vial." },
  { question: "What are the risks of buying retatrutide online?", answer: "You cannot verify what you are injecting: gray-market “research” vials have no FDA review of identity, dose, purity or sterility, and there is no prescriber monitoring you. A University of Pennsylvania study published in October 2026 analyzed about 150,000 Reddit posts and comments from about 40,000 users discussing unapproved retatrutide; 7,823 users described at least one symptom, most often increased appetite, along with fatigue, nausea, food cravings, insomnia and a raised heart rate. The researchers note they could not confirm what people actually took. Buying an unapproved drug also carries legal risk." },
];

export default async function RetatrutidePage() {
  const config = await getConfig();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Retatrutide 2026: Phase 3 Results, FDA Status and Cost",
    description: metadata.description,
    datePublished: "2026-08-09",
    dateModified: "2026-10-29",
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
            Retatrutide for Weight Loss: Phase 3 Results, FDA Status, Cost and What to Use Now
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            Retatrutide (&ldquo;reta&rdquo;) produced up to 28.7% average weight loss in Phase 3 trials,
            the highest reported for any obesity drug, but it is not FDA-approved and Lilly has not yet
            applied for approval. This guide covers the trial results, the filing timeline, what it
            &ldquo;costs&rdquo;, who can prescribe it, and the approved alternatives you can start now.
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
              Only in a clinical trial. Retatrutide is <strong className="text-[#191919]">not FDA-approved</strong>,
              so no doctor, pharmacy or telehealth provider can legitimately prescribe or sell it for weight
              loss, and it has no legal retail price. As of October 29, 2026, Lilly says it plans to submit
              retatrutide to the FDA in the first quarter of 2027 (
              <Ext href={SRC.triumph23}>Lilly, July 23, 2026</Ext>). Below you will find the trial results,
              the real costs of the approved alternatives and the risks of gray-market &ldquo;research
              use only&rdquo; retatrutide.
            </p>
          </div>
        </div>

        <TopTwoPicks config={config} linkPrefix="" />

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
            glucagon action is thought to raise energy use and fat burning in addition to reducing
            appetite. That combination is the likely reason retatrutide has shown the biggest average
            weight loss of any obesity drug tested so far.
          </p>
        </section>

        {/* Trial results + status */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">What did the retatrutide trials find, and where is it in FDA review?</h2>
          <p className="mb-4">
            The highest retatrutide dose (12 mg) led to an average loss of 24.2% of body weight over 48
            weeks in the <Ext href={SRC.phase2}>Phase 2 trial published in the New England Journal of Medicine in 2023</Ext>.
            Lilly&rsquo;s Phase 3 program, called TRIUMPH, has since reported these topline results:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-[#191919]">TRIUMPH-4</strong> (obesity with knee osteoarthritis), announced
              December 11, 2025: 28.7% average weight loss at 68 weeks on 12 mg, plus less knee pain (
              <Ext href={SRC.triumph4}>Lilly</Ext>).
            </li>
            <li>
              <strong className="text-[#191919]">TRIUMPH-1</strong> (obesity or overweight), announced May 21,
              2026: all three doses (4, 9 and 12 mg) met their goals at 80 weeks, and 12 mg averaged 28.3%
              weight loss versus 2.2% with placebo among people who stayed on treatment (
              <Ext href={SRC.triumph1}>Lilly</Ext>; <Ext href={SRC.triumph1Cnbc}>CNBC</Ext>). The full results
              were published in the <Ext href={SRC.triumph1Nejm}>New England Journal of Medicine on September 29, 2026</Ext>.
            </li>
            <li>
              <strong className="text-[#191919]">TRIUMPH-2</strong> (obesity with type 2 diabetes) and{" "}
              <strong className="text-[#191919]">TRIUMPH-3</strong> (severe obesity with heart disease), announced
              July 23, 2026: the 12 mg dose averaged 20.8% and up to 22.6% weight loss at 80 weeks respectively (
              <Ext href={SRC.triumph23}>Lilly</Ext>).
            </li>
          </ul>
          <p className="mb-4">
            <strong className="text-[#191919]">FDA status:</strong> retatrutide has not been submitted to the
            FDA yet. Lilly had earlier listed it among medicines that might be submitted by the end of 2026,
            but in July 2026 it said it plans to file a Biologics License Application in the{" "}
            <strong className="text-[#191919]">first quarter of 2027</strong>, once it completes the
            manufacturing and quality data package the agency requires (
            <Ext href={SRC.triumph23}>Lilly</Ext>; <Ext href={SRC.filingBiopharma}>BioPharma Dive</Ext>). We
            found no later change to that plan as of October 29, 2026. Lilly has not given an expected
            approval or launch date, and the FDA&rsquo;s review only starts after the filing, so treat any
            specific approval date you see online as speculation.
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
            Figures come from separate trials of different lengths and populations; no head-to-head
            trial has been reported. Read more about the approved drugs in our{" "}
            <Link href="/tirzepatide" className="font-semibold text-[#0C4B75] hover:underline">tirzepatide</Link>{" "}
            and{" "}
            <Link href="/semaglutide" className="font-semibold text-[#0C4B75] hover:underline">semaglutide</Link>{" "}
            guides.
          </p>
        </section>

        {/* Cost */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">How much does retatrutide cost per month, with or without insurance?</h2>
          <p className="mb-4">
            <strong className="text-[#191919]">Retatrutide has no legal price.</strong> Because it is not
            FDA-approved, Lilly does not sell it, no pharmacy can legally dispense it for weight loss, no
            insurer covers it and there is no manufacturer savings card. Any monthly price you see for
            &ldquo;retatrutide&rdquo; comes from a gray-market seller of an unapproved product, usually
            labeled &ldquo;research use only.&rdquo; Lilly has not announced what retatrutide will cost if
            it is approved.
          </p>
          <p className="mb-4">
            What you can actually pay today is the price of an approved alternative. Self-pay prices as of
            fall 2026 (<Ext href={SRC.lillyDirectZepbound}>LillyDirect Zepbound</Ext>,{" "}
            <Ext href={SRC.zepboundCnbc}>CNBC</Ext>, <Ext href={SRC.wegovyPriceGuide}>NovoCare price guide</Ext>,{" "}
            <Ext href={SRC.wegovyOffer}>NovoCare offer</Ext>, <Ext href={SRC.wegovyPillCnn}>CNN</Ext>,{" "}
            <Ext href={SRC.lillyDirectFoundayo}>LillyDirect Foundayo</Ext>), with compounded prices from our
            verified provider price index:
          </p>
          <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 font-bold text-[#191919]">Medication</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Self-pay price per month</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {costRows.map(([k, a, b], i) => (
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
            Manufacturer prices change often; check LillyDirect and NovoCare before you buy. With commercial
            insurance that covers the drug, Zepbound, Wegovy and Foundayo savings cards can bring the cost
            down to as little as $25 a month. Compounded semaglutide and tirzepatide are made by licensed
            pharmacies but are not FDA-approved and have no trials of their own. See our{" "}
            <Link href="/articles/glp1-cost-2026-how-to-pay-less" className="font-semibold text-[#0C4B75] hover:underline">2026 GLP-1 cost guide</Link>{" "}
            for every way to pay less.
          </p>
        </section>

        {/* Who can prescribe / clinical trials */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Does ro or any telehealth provider prescribe retatrutide?</h2>
          <p className="mb-4">
            No. ro and every other legitimate telehealth provider can only prescribe FDA-approved drugs or
            legally compounded ones, and retatrutide is neither. The FDA has said retatrutide cannot legally
            be used in compounding (<Ext href={SRC.fdaUnapproved}>FDA</Ext>). A website, clinic or
            &ldquo;peptide&rdquo; shop that offers to prescribe or ship retatrutide is selling an unapproved
            drug. What licensed providers, including ro, do prescribe are the approved options below, and
            many also offer compounded semaglutide or tirzepatide.
          </p>
          <p className="mb-4">
            <strong className="text-[#191919]">The one legal route is a clinical trial.</strong>{" "}
            <Ext href={SRC.trials}>Search ClinicalTrials.gov for retatrutide</Ext>, filter for studies that
            are &ldquo;recruiting,&rdquo; and check each listing&rsquo;s eligibility criteria and study
            locations. The study team decides whether you qualify, the drug is provided as part of the
            study, and you may be randomly assigned to placebo. Lilly&rsquo;s main Phase 3 obesity trials have
            already reported results, so openings vary by study and location.
          </p>
        </section>

        {/* Alternatives */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">What are the legal alternatives to retatrutide?</h2>
          <p className="mb-4">
            Four FDA-approved GLP-1 medicines are available by prescription now:
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-[#191919]">Zepbound (tirzepatide)</strong>, a weekly injection acting on
              GLP-1 and GIP, two of retatrutide&rsquo;s three targets: 20.9% average weight loss at 72 weeks
              on 15 mg in <Ext href={SRC.surmount1}>SURMOUNT-1</Ext>.
            </li>
            <li>
              <strong className="text-[#191919]">Wegovy (semaglutide)</strong>, a weekly injection: 14.9% at 68
              weeks in <Ext href={SRC.step1}>STEP 1</Ext>, versus 2.4% with placebo. The higher-dose Wegovy HD
              (7.2 mg), approved March 19, 2026, reached 20.7% in the STEP UP trial.
            </li>
            <li>
              <strong className="text-[#191919]">The Wegovy pill (oral semaglutide 25 mg)</strong>, a daily
              tablet approved December 22, 2025: 13.6% at 64 weeks in <Ext href={SRC.oasis4}>OASIS 4</Ext>.
            </li>
            <li>
              <strong className="text-[#191919]">Foundayo (orforglipron)</strong>, a daily pill with no food or
              water rules, <Ext href={SRC.foundayoApproval}>approved April 1, 2026</Ext>: 11.2% at 72 weeks at
              the highest dose in <Ext href={SRC.attain1}>ATTAIN-1</Ext>.
            </li>
          </ul>
          <p className="mb-6">
            Licensed telehealth providers prescribe these online, and many also offer lower-cost compounded
            semaglutide or tirzepatide, which are not FDA-approved. Weigh providers on price, medical
            support and overall value before you choose.
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

        {/* Risks */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">What are the risks of buying retatrutide online?</h2>
          <p className="mb-4">
            The FDA says it has warned companies that illegally sold unapproved semaglutide, tirzepatide,
            retatrutide and other GLP-1 ingredients falsely labeled &ldquo;for research purposes&rdquo; or
            &ldquo;not for human consumption,&rdquo; while selling them directly to consumers with dosing
            instructions (<Ext href={SRC.fdaUnapproved}>FDA</Ext>). These products have no FDA review of
            identity, strength, purity or sterility, so there is no way to know what a vial contains, and no
            prescriber is screening you or managing side effects. A group of U.S. senators has also urged
            the FDA to work with Customs and Border Protection to stop vendors misusing &ldquo;research
            only&rdquo; labels (<Ext href={SRC.senateRuo}>Sen. Jim Banks</Ext>).
          </p>
          <p className="mb-4">
            People are using it anyway. A University of Pennsylvania study published in JAMA Network Open in
            October 2026 used AI to analyze about 150,000 Reddit posts and comments from about 40,000 users
            discussing unapproved retatrutide. Of those, 7,823 users described at least one symptom. The most
            common was, unexpectedly, increased appetite, followed by reports of fatigue, increased energy,
            nausea, food cravings, insomnia and a raised heart rate (
            <Ext href={SRC.pennReddit}>Penn Engineering</Ext>). The researchers stress that they could not
            confirm what people actually injected, so the findings only point to questions for future
            research.
          </p>
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
            Sources: retatrutide Phase 2 trial (New England Journal of Medicine, 2023); Eli Lilly releases
            on TRIUMPH-4 (December 11, 2025), TRIUMPH-1 (May 21, 2026) and TRIUMPH-2 and TRIUMPH-3 (July 23,
            2026, including the Q1 2027 filing plan); TRIUMPH-1 in the New England Journal of Medicine
            (September 29, 2026); CNBC and BioPharma Dive coverage; published SURMOUNT-1, STEP 1, OASIS 4
            and ATTAIN-1 results; FDA&rsquo;s statement on unapproved GLP-1 drugs; University of
            Pennsylvania (October 2026); LillyDirect and NovoCare self-pay pricing; compounded prices from
            our verified provider price index. Phase 3 figures are company-reported topline results unless
            noted. All trial figures are averages, and individual results differ. Drug and brand names
            belong to their respective manufacturers.
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
