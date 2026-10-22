import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Link from "next/link";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { Pill, ShieldCheck, ArrowRight, DollarSign } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { CONTENT_LAST_UPDATED } from "@/lib/config";
import { getConfig } from "@/lib/config-store";

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/ozempic-alternatives";
const TITLE = "Ozempic Alternatives 2026: Wegovy & Mounjaro Options";
const DESCRIPTION =
  "Ozempic, Wegovy and Mounjaro alternatives with the same active ingredients: compounded semaglutide and tirzepatide from $49/month through licensed online providers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Ozempic Alternatives 2026: Same Ingredients, Lower Prices",
    description:
      "The best alternative to a brand-name GLP-1 is usually the same molecule, compounded and prescribed online for far less. See how each option compares.",
    url: CANONICAL,
    type: "article",
  },
};

// Brand drug → active ingredient → the telehealth alternative that uses it.
const brandRows: [string, string, string][] = [
  ["Ozempic", "Semaglutide, FDA-approved for type 2 diabetes", "Compounded semaglutide prescribed online"],
  ["Wegovy", "Semaglutide, FDA-approved for weight loss", "Compounded semaglutide prescribed online"],
  ["Mounjaro", "Tirzepatide, FDA-approved for type 2 diabetes", "Compounded tirzepatide prescribed online"],
  ["Zepbound", "Tirzepatide, FDA-approved for weight loss", "Compounded tirzepatide prescribed online"],
  ["Rybelsus", "Semaglutide in pill form", "Oral GLP-1 options prescribed online"],
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is the best alternative to Ozempic?",
    answer:
      "The best Ozempic alternative for most people is the same active ingredient, semaglutide, prescribed as a lower-cost compounded medication by a licensed telehealth provider. Ozempic and Wegovy both contain semaglutide, but the brand versions are costly and can be hard to find, while compounded semaglutide uses the same molecule for a fraction of the list price. If you want a stronger effect, tirzepatide (the ingredient in Mounjaro and Zepbound) produced more average weight loss in trials and is also offered in compounded form online.",
  },
  {
    question: "Is compounded semaglutide the same as Ozempic?",
    answer:
      "Compounded semaglutide and Ozempic contain the same active ingredient, semaglutide. Ozempic is the FDA-approved brand made by Novo Nordisk, while compounded semaglutide is prepared by a licensed compounding pharmacy and prescribed after a medical review. The drug acts the same way in the body, but compounded versions are not FDA-approved and can differ between pharmacies, so choose a provider that uses reputable, state-licensed compounding pharmacies.",
  },
  {
    question: "What is a cheaper alternative to Mounjaro?",
    answer:
      "The most common cheaper alternative to Mounjaro is compounded tirzepatide prescribed online by a telehealth provider. It is the same dual GLP-1/GIP molecule that Mounjaro contains, usually priced well under the brand list price. Without insurance, brand Mounjaro and Zepbound can cost more than $1,000 a month, while telehealth providers often advertise compounded tirzepatide from around $150-$300 a month, depending on provider and dose.",
  },
  {
    question: "Can I get an Ozempic alternative without insurance?",
    answer:
      "Yes. Online GLP-1 providers prescribe compounded semaglutide or tirzepatide on a cash-pay basis, so insurance coverage for a brand drug is not required. Most charge a flat monthly price that bundles the medication, the clinician consultation and ongoing support.",
  },
  {
    question: "Can you buy Ozempic over the counter?",
    answer:
      "No. Ozempic and every other GLP-1 medication require a prescription, and no legitimate over-the-counter version exists. Products sold as 'OTC Ozempic,' 'Ozempic in a bottle' or supplements promising the same results are not the real drug. The legitimate way to pay less is a prescription for compounded semaglutide or tirzepatide from a licensed provider.",
  },
  {
    question: "Which works better as an Ozempic alternative: semaglutide or tirzepatide?",
    answer:
      "Tirzepatide (Mounjaro, Zepbound) produced more average weight loss in clinical trials, roughly 20%+, than semaglutide (Ozempic, Wegovy) at roughly 15%. Both drugs are very effective and both can be prescribed online in compounded form. Tirzepatide usually costs a bit more, and the right choice depends on your health history and your clinician's advice.",
  },
  {
    question: "Are compounded GLP-1 alternatives safe and legal?",
    answer:
      "Compounded GLP-1s are legal when a licensed clinician prescribes them appropriately and a state-licensed compounding pharmacy prepares them under federal compounding standards. They are not FDA-approved brand products, and their quality depends on the pharmacy. Pick a provider that names its pharmacies, requires a genuine medical intake and offers ongoing clinical support, which are the factors our provider rankings weigh.",
  },
];

export default async function OzempicAlternativesPage() {
  const config = await getConfig();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: "2026-08-11",
    dateModified: CONTENT_LAST_UPDATED,
    ...pageReviewSchema("/ozempic-alternatives"),
    author: { "@type": "Organization", name: "Top Weight Loss Team", url: "https://www.topweightloss.us" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "Ozempic Alternatives", item: CANONICAL },
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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ozempic Alternatives" }]} />
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">
            Ozempic Alternatives: Lower-Cost Options for Ozempic, Wegovy &amp; Mounjaro
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            The best alternative to a brand-name GLP-1 is usually the same active ingredient,
            compounded and prescribed online by a licensed telehealth provider at a lower price. This
            guide maps each brand to its alternative, explains the cost gap and shows how to pick a
            provider safely.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
          <MedicalReviewBar path="/ozempic-alternatives" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Key insight callout */}
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
          <Pill className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div>
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">Why is the best Ozempic alternative often the same drug?</h2>
            <p className="text-[15px] leading-[1.75] text-gray-600">
              Because the brands share ingredients. Ozempic and Wegovy both contain{" "}
              <strong className="text-[#191919]">semaglutide</strong>, and Mounjaro and Zepbound both
              contain <strong className="text-[#191919]">tirzepatide</strong>. That means the most
              effective, lowest-cost option is normally the same molecule, prescribed online as a{" "}
              <strong className="text-[#191919]">compounded medication</strong> for a fraction of what
              the brand costs.
            </p>
          </div>
        </div>

        <TopTwoPicks config={config} linkPrefix="/" />

        {/* Brand → alternative table */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Which alternative matches each brand-name GLP-1?</h2>
          <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 font-bold text-[#191919]">Brand drug</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Active ingredient</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Cheaper option</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {brandRows.map(([brand, active, alt], i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
                    <td className="px-4 py-3 align-top font-medium text-[#191919]">{brand}</td>
                    <td className="px-4 py-3 align-top text-gray-600">{active}</td>
                    <td className="px-4 py-3 align-top text-gray-600">{alt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[14px] text-gray-500">
            Prefer a tablet to an injection? Read our{" "}
            <Link href="/glp1-pills-vs-injections" className="font-semibold text-[#0C4B75] hover:underline">
              GLP-1 pills vs injections
            </Link>{" "}
            guide.
          </p>
        </section>

        {/* Why compounded */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">How much cheaper is compounded semaglutide or tirzepatide?</h2>
          </div>
          <p className="mb-4">
            Compounded versions typically cost{" "}
            <strong className="text-[#191919]">around $99-$300 a month</strong>, compared with{" "}
            <strong className="text-[#191919]">more than $1,000 a month at list price</strong> for
            brand-name Ozempic, Wegovy, Mounjaro or Zepbound without insurance. Insurance coverage for
            weight loss is patchy. Licensed telehealth providers partner with compounding pharmacies to
            prescribe semaglutide or tirzepatide at a flat cash price, and the exact figure depends on
            the drug, the dose and the provider. The consultation and ongoing support are included.
          </p>
          <p className="mb-4">
            The catch is that compounded medications are not FDA-approved brand drugs, and their quality
            rests on the pharmacy that makes them. For that reason, the provider you pick matters more
            than the label. Look for a provider that is open about its pharmacies, runs a proper medical
            intake and follows up with real clinical care.
          </p>
          <p>
            Our{" "}
            <Link href="/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
              cheapest GLP-1 price index
            </Link>{" "}
            ranks each provider by its actual published price. Already taking a brand injection? Our{" "}
            <Link href="/switch-from-ozempic" className="font-semibold text-[#0C4B75] hover:underline">
              guide to switching from Ozempic
            </Link>{" "}
            explains how to move to the compounded version without a break in treatment.
          </p>
        </section>

        {/* How to choose / route to partners */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">Which online provider should you use for an Ozempic alternative?</h2>
          </div>
          <p className="mb-6">
            We score the main telehealth providers of compounded semaglutide and tirzepatide on
            clear pricing, the medications they offer, how fast they ship and how good their medical
            support is. Providers we rate highly for affordable, legitimate access include{" "}
            <Link href="/reviews/embody" className="font-semibold text-[#0C4B75] hover:underline">embody</Link>,{" "}
            <Link href="/reviews/altrx" className="font-semibold text-[#0C4B75] hover:underline">altRx</Link>, and{" "}
            <Link href="/reviews/trimrx" className="font-semibold text-[#0C4B75] hover:underline">TrimRx</Link>.
            The best match for you depends on your goals and your budget.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]">
              See the Top Providers
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link href="/weight-loss-pills" className="inline-flex h-[46px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50">
              Explore Weight Loss Pills
            </Link>
          </div>
        </section>

        {/* What's coming */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Are newer GLP-1 drugs on the way?</h2>
          <p>
            Yes, and they are already in clinical trials. Eli Lilly&rsquo;s triple agonist{" "}
            <strong className="text-[#191919]">retatrutide</strong> produced about 24% average weight
            loss in a Phase 2 study, more than tirzepatide or semaglutide, but it does not have FDA
            approval yet. Our{" "}
            <Link href="/retatrutide-weight-loss" className="font-semibold text-[#0C4B75] hover:underline">
              retatrutide weight loss guide
            </Link>{" "}
            covers its current status and possible timing.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-[24px] font-bold text-[#191919]">Common questions about Ozempic alternatives</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faqs.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <GuideCluster currentSlug="ozempic-alternatives" />

        {/* Sources + disclaimer */}
        <section>
          <p className="mb-3 text-[13px] leading-relaxed text-gray-400">
            Average weight loss figures come from published semaglutide (STEP) and tirzepatide
            (SURMOUNT) trial data and from Phase 2 retatrutide results. Individual results differ. Price
            ranges reflect typical advertised telehealth cash prices and change with provider,
            medication and dose. Ozempic, Wegovy, Mounjaro, Zepbound and Rybelsus are trademarks of
            their manufacturers, none of which is affiliated with topweightloss.us.
          </p>
          <p className="text-[13px] leading-relaxed text-gray-400">
            topweightloss.us does not provide medical care or prescribe medication. This page is
            educational and is not medical advice. Compounded medications are not FDA-approved. Ask a
            licensed healthcare provider which treatment is right for you.
          </p>
        </section>
      </div>
    </div>
  );
}
