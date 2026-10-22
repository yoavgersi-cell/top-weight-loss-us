import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Link from "next/link";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { ShieldCheck, ArrowDownRight } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, AFFILIATE_PROVIDER_IDS } from "@/lib/config";
import { BRAND_SHELF } from "@/lib/price-index";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { PriceIndex } from "@/components/price-index";
import { MedicalSources, TrustDisclosure } from "@/components/medical-sources";

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/switch-from-ozempic";
const TITLE = "Switch From Ozempic to Compounded Semaglutide";
const DESCRIPTION =
  "Spending $1,000+/month on Ozempic or Wegovy? Compounded semaglutide, the same GLP-1 molecule, costs $49-$299/month online. Here is how the switch works in 2026.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Top Weight Loss` },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

const steps: { title: string; detail: string }[] = [
  {
    title: "Choose your new provider while you still have doses left",
    detail:
      "Getting approved and receiving a first shipment takes anywhere from one day to roughly a week, depending on the provider. embody completes its chart review in about 24 hours and ships in 1-2 days, while altRx ships in 5-7 days. Begin the switch with one or two doses still on hand so your treatment does not pause.",
  },
  {
    title: "Fill out the intake and list your current medication and dose",
    detail:
      "Every legitimate provider begins with a medical questionnaire. State that you take Ozempic, Wegovy or Zepbound and give your exact current dose. Nothing in the switch matters more, because this is how the reviewing clinician knows to plan a continuation instead of starting you from scratch.",
  },
  {
    title: "A licensed clinician sets your starting dose",
    detail:
      "The new provider's clinician makes the call on whether you stay close to your current dose or change it. You do not decide this, and neither does a marketing page. A one-to-one continuation is never guaranteed; it is a medical judgment based on your history, and reputable providers never approve automatically (HealthRx says so explicitly).",
  },
  {
    title: "A licensed pharmacy ships your medication",
    detail:
      "Compounded semaglutide and tirzepatide usually arrive as vials with syringes. Some providers also offer needle-free versions, such as DirectMeds' sublingual drops and Medvi's dissolving tablets. Injectables need cold-chain shipping, and embody and HealthRx both ship temperature-controlled.",
  },
  {
    title: "Stay on your weekly schedule and track how you feel",
    detail:
      "Injectable dosing remains once a week, and because the molecule is the same, the expected side effects are the same too. If anything feels off during the transition, raise it at the provider's check-ins, which every program we rank includes.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Can I switch from Ozempic to compounded semaglutide?",
    answer:
      "Yes, and it is one of the most common ways people join an online GLP-1 program. Ozempic contains semaglutide, and compounded semaglutide is the same molecule made by a state-licensed compounding pharmacy. You fill out the new provider's medical intake, list your current medication and dose, and a licensed clinician chooses your starting dose. Compounded products are not FDA-approved, so the quality of the provider and pharmacy matters; the checklist on this page shows what to confirm.",
  },
  {
    question: "How much cheaper is compounded semaglutide than Ozempic?",
    answer:
      "A lot cheaper. Our providers list brand Ozempic at $1,149-$1,399/month and Wegovy at $1,579/month, while compounded semaglutide costs $49-$199/month depending on provider and plan. Even comparing against the priciest compounded option, you save about $950 a month, or more than $11,000 a year.",
  },
  {
    question: "Will I stay on the same dose after switching from Ozempic?",
    answer:
      "The reviewing clinician decides, based on your intake, which is why you need to report your exact medication and dose. welludr, altRx, DirectMeds and embody all charge one price at every dose, so continuing at a higher dose costs nothing extra with those providers. Do not change your own dose during a switch without a clinician's guidance.",
  },
  {
    question: "Can I switch from Zepbound or Mounjaro to compounded tirzepatide?",
    answer:
      "Yes. The process is the same, but the molecule is tirzepatide, the active ingredient in Zepbound and Mounjaro. Compounded tirzepatide costs from $89/month (welludr) to $299/month (SHED), compared with $1,249-$1,599/month for brand Zepbound. Report your current dose in the intake just as you would for semaglutide.",
  },
  {
    question: "Is it safe to switch to compounded semaglutide?",
    answer:
      "The active molecule is identical, but compounded products are not FDA-approved and their quality depends on the pharmacy. Lower the risk using the same standards we use to rank providers: a real clinician review with no automatic approval, state-licensed 503A pharmacies, LegitScript certification where offered (embody, HealthRx) and cold-chain shipping for injectables. Also keep your current prescriber informed rather than switching quietly.",
  },
  {
    question: "Should I tell my doctor I am switching from Ozempic?",
    answer:
      "Yes. The telehealth clinician becomes your GLP-1 prescriber, but your regular doctor should still know every medication you take, particularly if you have other conditions or prescriptions. Switching carries no penalty; a brand prescription simply lapses once you stop filling it.",
  },
];

export default async function SwitchFromOzempicPage() {
  const config = await getConfig();
  const providers = config.providers.filter((p) => AFFILIATE_PROVIDER_IDS.includes(p.id));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: "2026-08-23",
    dateModified: CONTENT_LAST_UPDATED,
    ...pageReviewSchema("/switch-from-ozempic"),
    author: { "@type": "Organization", name: "Top Weight Loss Team", url: "https://www.topweightloss.us" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "Switch From Ozempic", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Switch From Ozempic" }]} />
          <h1 className="max-w-[780px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            How to Switch From Ozempic to Compounded Semaglutide
          </h1>
          <p className="mt-3 max-w-[680px] text-[15.5px] leading-relaxed text-gray-500">
            Already on a brand-name GLP-1 injection? You can move to the same active ingredient for
            $49-$299/month. This guide walks through each step of the switch, what the new clinician
            decides and what to check before you commit.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
          <MedicalReviewBar path="/switch-from-ozempic" className="mt-4 max-w-[760px]" />
          <TrustDisclosure disclaimerHref="/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
        {/* Direct answer */}
        <div className="mb-10 rounded-2xl border border-[#0C4B75]/20 bg-white p-6 shadow-sm sm:p-7">
          <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
            Can you switch from Ozempic to a cheaper GLP-1?
          </p>
          <p className="text-[15.5px] leading-[1.85] text-gray-800">
            Yes. Licensed telehealth providers prescribe compounded versions of the same molecules for{" "}
            <strong className="text-[#191919]">$49-$299/month</strong>, compared with
            $1,149-$1,599/month for the brands at list price. Ozempic and Wegovy contain{" "}
            <strong className="text-[#191919]">semaglutide</strong>, and Zepbound and Mounjaro contain{" "}
            <strong className="text-[#191919]">tirzepatide</strong>. To switch, you complete the new
            provider&rsquo;s medical intake, report your current medication and dose, and its licensed
            clinician sets your continuation dose. Begin before your supply runs out, since approval and
            delivery take one day to one week depending on the provider.
          </p>
        </div>

        {/* Brand vs compounded price math */}
        <section className="mb-12">
          <div className="mb-3 flex items-center gap-2">
            <ArrowDownRight className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">How much do brand GLP-1s cost compared with compounded?</h2>
          </div>
          <p className="mb-5 max-w-[680px] text-[14px] text-gray-500">
            The brand prices in this table come straight from the brand-name menus of the providers we
            track, not from estimates. Full compounded pricing appears in the index lower on the page.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Brand drug</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Active ingredient</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Brand list price</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Compounded starting price</th>
                </tr>
              </thead>
              <tbody>
                {BRAND_SHELF.map((row) => (
                  <tr key={row.drug} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-4 text-[14.5px] font-bold text-[#191919]">{row.drug}</td>
                    <td className="px-4 py-4 text-[13.5px] text-gray-600">{row.ingredient}</td>
                    <td className="px-4 py-4">
                      <span className="text-[14.5px] font-semibold text-gray-500 [font-variant-numeric:tabular-nums]">{row.price}</span>
                      <p className="mt-0.5 text-[11.5px] text-gray-400">{row.soldAt}</p>
                    </td>
                    <td className="px-4 py-4 text-[14.5px] font-extrabold text-emerald-700 [font-variant-numeric:tabular-nums]">
                      {row.ingredient === "Tirzepatide" ? "$89/mo" : "$49/mo"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-gray-400">
            The biggest gap, Wegovy at $1,579 versus welludr&rsquo;s $49 semaglutide plan, adds up to
            more than $18,000 a year. Compounded products are not FDA-approved, so quality depends on
            the pharmacy; use the checklist below to vet it.
          </p>
        </section>

        <TopTwoPicks config={config} linkPrefix="" />

        {/* How the switch works */}
        <section className="mb-12">
          <h2 className="mb-5 text-[22px] font-bold text-[#191919]">What are the steps to switch from Ozempic?</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 p-5 sm:gap-5 sm:p-6">
                <span className="text-[22px] font-extrabold leading-none text-gray-200 [font-variant-numeric:tabular-nums]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="mb-1 text-[15.5px] font-bold text-[#191919]">{s.title}</p>
                  <p className="text-[14px] leading-[1.75] text-gray-600">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where you are in the titration - the clinical context for the intake */}
        <section className="mb-12">
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">
            What dose are you on? Brand GLP-1 titration schedules
          </h2>
          <p className="mb-5 max-w-[720px] text-[14px] text-gray-500">
            Your intake asks for your current drug and dose, so read it off your pen or pharmacy label
            instead of relying on memory. Below are the FDA-label dose schedules for the brand drugs
            people most often switch away from:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Brand drug</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Starting dose</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">How the dose increases</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Target / maintenance dose</th>
                </tr>
              </thead>
              <tbody className="text-[13.5px]">
                {[
                  [
                    "Wegovy (semaglutide)",
                    "0.25 mg weekly for weeks 1-4",
                    "0.5 mg → 1 mg → 1.7 mg, one step every 4 weeks",
                    "2.4 mg weekly",
                  ],
                  [
                    "Ozempic (semaglutide)",
                    "0.25 mg weekly for the first 4 weeks",
                    "0.5 mg, then 1 mg when needed",
                    "up to 2 mg weekly",
                  ],
                  [
                    "Zepbound / Mounjaro (tirzepatide)",
                    "2.5 mg weekly for weeks 1-4",
                    "2.5 mg increases, spaced at least 4 weeks apart",
                    "5, 10 or 15 mg weekly",
                  ],
                ].map(([drug, start, steps2, full], i) => (
                  <tr key={i} className="border-b border-gray-100 align-top last:border-0">
                    <td className="px-4 py-3.5 font-bold text-[#191919]">{drug}</td>
                    <td className="px-4 py-3.5 text-gray-600 [font-variant-numeric:tabular-nums]">{start}</td>
                    <td className="px-4 py-3.5 text-gray-600 [font-variant-numeric:tabular-nums]">{steps2}</td>
                    <td className="px-4 py-3.5 font-semibold text-[#191919] [font-variant-numeric:tabular-nums]">{full}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">
            Schedules are taken from each drug&rsquo;s FDA prescribing information, and your
            prescriber may not have followed them exactly. Compounded programs use the same molecule,
            but their clinician sets your continuation dose case by case, so your current brand dose
            does not guarantee the same dose on the new program. welludr, altRx, DirectMeds and embody
            charge one price at every dose, so continuing at a higher dose need not cost more.
          </p>
        </section>

        {/* Side-effect expectations - same molecule, same profile */}
        <section className="mb-12">
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">
            Will side effects change after switching? What the trials show
          </h2>
          <p className="mb-5 max-w-[720px] text-[14px] text-gray-500">
            They should not, because compounded semaglutide and tirzepatide are the same active
            molecules. The published trial data is the best guide: side effects are mainly digestive,
            tend to appear when the dose goes up and usually ease as your body adapts.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Side effect</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Semaglutide 2.4 mg (STEP 1, 68 wks)</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Tirzepatide 5-15 mg (SURMOUNT-1, 72 wks)</th>
                </tr>
              </thead>
              <tbody className="text-[13.5px]">
                {[
                  ["Nausea", "~44%", "~25-33% across doses"],
                  ["Diarrhea", "~32%", "~19-23% across doses"],
                  ["Vomiting", "~25%", "~8-13% across doses"],
                  ["Constipation", "~23%", "~12-17% across doses"],
                ].map(([event, sema, tirz], i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3.5 font-semibold text-[#191919]">{event}</td>
                    <td className="px-4 py-3.5 text-gray-600 [font-variant-numeric:tabular-nums]">{sema}</td>
                    <td className="px-4 py-3.5 text-gray-600 [font-variant-numeric:tabular-nums]">{tirz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">
            Rates are approximate and cover the full length of the STEP 1 and SURMOUNT-1 trials listed
            in the sources below. Most events were mild to moderate and clustered around dose increases.
            Continuing at your established dose instead of starting the schedule over may let you avoid
            the hardest titration weeks, which is one more reason to report your dose accurately. Get
            medical care quickly for severe or lasting symptoms.
          </p>
        </section>

        {/* What to verify - a checklist with names, not platitudes */}
        <section className="mb-12">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">What should you check before switching providers?</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">What to check</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Why it matters</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Providers that meet it</th>
                </tr>
              </thead>
              <tbody className="text-[13.5px]">
                {[
                  [
                    "A real clinician review with no automatic approval",
                    "Your safeguard is a licensed clinician who is able to say no or change the plan. Any site that guarantees approval is a warning sign.",
                    "All 8 ranked providers; HealthRx says so explicitly",
                  ],
                  [
                    "State-licensed 503A compounding pharmacies",
                    "A compounded drug can only be as good as the pharmacy that makes it, and state licensure is the minimum standard.",
                    "embody and HealthRx name 503A fulfillment",
                  ],
                  [
                    "LegitScript certification",
                    "An independent certification of the telehealth business that can be withdrawn if standards slip.",
                    "embody; HealthRx (cert. 50087439)",
                  ],
                  [
                    "Tracked, temperature-controlled shipping",
                    "Semaglutide and tirzepatide are sensitive to heat, so injectables should arrive quickly, cold and packed with ice packs.",
                    "embody (1-2 days); HealthRx (overnight)",
                  ],
                  [
                    "The price at your actual dose, not the advertised one",
                    "People switching are often partway up the dose schedule, and dose-based pricing can push the real cost above the headline rate.",
                    "One price at every dose: welludr, altRx, DirectMeds, embody",
                  ],
                ].map(([check, why, who], i) => (
                  <tr key={i} className="border-b border-gray-100 align-top last:border-0">
                    <td className="px-4 py-3.5 font-bold text-[#191919]">{check}</td>
                    <td className="px-4 py-3.5 text-gray-600">{why}</td>
                    <td className="px-4 py-3.5 text-gray-600">{who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The index */}
        <section className="mb-12">
          <h2 className="mb-1.5 text-[22px] font-bold text-[#191919]">Which compounded GLP-1 provider is cheapest for switchers?</h2>
          <p className="mb-5 max-w-[680px] text-[14px] text-gray-500">
            This is the verified price index behind our{" "}
            <Link href="/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
              cheapest GLP-1
            </Link>{" "}
            ranking, showing each provider&rsquo;s published price from lowest to highest with every
            condition listed.
          </p>
          <PriceIndex providers={providers} />
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="mb-5 text-[22px] font-bold text-[#191919]">Questions about switching from Ozempic</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faqs.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[15.5px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.75] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <GuideCluster currentSlug="switch-from-ozempic" />

        <MedicalSources vertical="weight-loss" />

        <p className="mt-6 text-[13px] leading-relaxed text-gray-400">
          Ozempic, Wegovy, Mounjaro, Zepbound and Rybelsus are trademarks of their manufacturers, none
          of which is affiliated with topweightloss.us. Compounded medications are not FDA-approved.
          This page is informational and is not medical advice. Speak with a licensed clinician before
          switching or starting any medication.
        </p>
      </div>
    </div>
  );
}
