import { withSeo } from "@/lib/seo";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Stethoscope, Search, AlertTriangle, ClipboardList } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { TrustpilotRating } from "@/components/trustpilot-rating";
import { MixedTrustpilotCarousel, type MixedReviewItem } from "@/components/trustpilot-carousel";
import { ProviderCta } from "@/components/provider-cta";
import { rankedCardItems } from "@/components/top-providers-block";
import { MedicalSources, TrustDisclosure } from "@/components/medical-sources";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import type { TrustpilotReview } from "@/lib/config";

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/how-to-choose-a-glp1-provider";
const TITLE = "How to Choose a GLP-1 Provider: A 12-Point Checklist";
const DESCRIPTION =
  "How to choose a GLP-1 provider online: 12 checks to run before you pay, plus 10 providers compared on clinician access, pharmacy, price and Trustpilot.";
const PUBLISHED = "2026-09-24";
const UPDATED = "2026-09-24";

export const metadata: Metadata = withSeo("/how-to-choose-a-glp1-provider", {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
});

// ───── The 12-point checklist ─────
// Every "how to verify" is something a reader can do themselves in minutes.
// "Red flag" items are due-diligence prompts, not accusations: they name what
// to investigate or ask before paying.
const CHECKLIST: { title: string; check: string; verify: string; redFlag: string }[] = [
  {
    title: "Is there a licensed clinician with the power to decline you?",
    check: "The role of the person who reads your intake (physician, physician associate or nurse practitioner) and whether that person can refuse to prescribe.",
    verify: "On the provider's how-it-works page, look for phrases such as \"licensed provider reviews\" and \"if appropriate\". A published refund when you are not approved, which embody offers, shows that declines are part of the process.",
    redFlag: "Look closer if approval seems instant or if the payment screen appears before a single health question.",
  },
  {
    title: "Does the intake ask the questions a prescriber needs?",
    check: "Whether the health questionnaire covers personal or family history of medullary thyroid carcinoma or MEN 2, pancreatitis, current or planned pregnancy, and the medications you already take.",
    verify: "Begin the free assessment and stop at the payment step. If none of those topics come up, no one is screening you for the contraindications listed on the FDA label.",
    redFlag: "A form that wants only height, weight and a card number deserves questions before you pay.",
  },
  {
    title: "Are you paying for asynchronous care or live visits?",
    check: "Asynchronous care is the standard model for telehealth GLP-1 treatment: you send an intake, a clinician reviews it, and follow-up happens by message. It is lawful and common. A few providers also offer live video.",
    verify: "Medvi describes video visits and scheduled monitoring, and embody reviewers describe booked appointments and video calls. The other providers in our table describe an intake-plus-messaging model, sometimes with a follow-up call when the clinician needs more detail.",
    redFlag: "A page that promises a doctor \"consultation\" but never explains how to contact a clinician once you have the prescription. Ask how follow-up works.",
  },
  {
    title: "Which pharmacy fills the prescription?",
    check: "Compounded semaglutide and tirzepatide are made by a compounding pharmacy, not by the brand manufacturer. Find out whether it is a US state-licensed 503A pharmacy or a 503B outsourcing facility, and whether the provider tells you which one.",
    verify: "Check the site for the pharmacy type or ask support before you check out. LegitScript certification is an independent confirmation that the pharmacy relationships exist; embody and HealthRx both display theirs.",
    redFlag: "Look closer if a provider will not disclose where the medication is made or ships it from outside the US.",
  },
  {
    title: "Is the semaglutide the base form or a salt?",
    check: "The FDA has issued warnings about compounded products that use semaglutide sodium or semaglutide acetate. FDA-approved semaglutide uses the base form, and reputable compounders use the base form too.",
    verify: "Ask which form the pharmacy uses. A legitimate provider can answer in a sentence.",
    redFlag: "Look closer if the answer about the form is vague, or if the marketing never uses the word \"compounded\".",
  },
  {
    title: "What is the true monthly total?",
    check: "Add the medication, membership, consultation, shipping and supplies. Then compare the introductory price with the price you pay after that.",
    verify: "Our price index lists each provider's published rate alongside the condition that comes with it. For example, ro charges for medication and membership separately, while embody's $69 covers the whole bill.",
    redFlag: "A headline price tied to a condition you cannot pin down before checkout. Ask for the complete monthly figure.",
  },
  {
    title: "Does the price rise as your dose increases?",
    check: "GLP-1 doses are stepped up over several months. A provider that prices by dose can advertise the starter dose and charge more later, at the point where you are most invested in continuing.",
    verify: "Ask: \"What will I pay at my maintenance dose?\" altRx, welludr, TrimRx, DirectMeds, embody, HealthRx and Medvi each publish one price that holds at every dose.",
    redFlag: "A \"From $X\" price with no maintenance-dose figure published anywhere. Ask what the maintenance dose costs.",
  },
  {
    title: "How do dose changes and refills work?",
    check: "The process for requesting a dose change, how quickly refills go out, and how a transfer from another provider mid-treatment is handled.",
    verify: "Read the refill and shipping terms. TrimRx promotes unlimited check-ins, HealthRx and embody publish shipping windows, and Medvi folds dose adjustments into its monitoring.",
    redFlag: "No published refill schedule, or a contact form as the only route to support. Ask before you pay.",
  },
  {
    title: "Can you cancel, and what is refundable?",
    check: "Whether you can stop at any renewal date, whether a minimum term applies, and what is returned if the clinician does not approve you.",
    verify: "embody gives a full refund if you are not approved and requires no commitment. TrimRx has no long-term contract. welludr's $41 rate is a Pre-Black Friday sale price, so check its plan terms at checkout. HealthRx collects $1,188 upfront. Each model is legitimate; the point is to know which one you are agreeing to.",
    redFlag: "Auto-renewal terms that appear only in checkout fine print. Read them before paying.",
  },
  {
    title: "What does the Trustpilot record show, including the review count?",
    check: "A star average says little until you know how many reviews sit behind it. The repeated themes in low-star reviews tell you more than the headline score.",
    verify: "We list the rating and review count for each provider whose profile we have verified. Medvi at 4.3 from 14,987 reviews and embody at 3.8 from 9,604 are both substantial records, and they describe different experiences.",
    redFlag: "A perfect 5.0 from a handful of reviews, or no public review profile. Neither one proves a problem, but both give you less to go on.",
  },
  {
    title: "What themes repeat on Reddit?",
    check: "Skip the overall verdict and look for issues that show up across separate posts: shipping delays, access to higher doses, unexpected charges and results.",
    verify: "We quote only threads we have verified. Where they exist for a provider, they appear on that provider's review page and in the summary further down this page.",
    redFlag: "A provider mentioned only in its own promotional posts. That means there is no independent evidence yet, not that the provider is bad.",
  },
  {
    title: "Is the provider upfront that the medication is compounded?",
    check: "Compounded drugs are not FDA-approved. A trustworthy provider states this on the page, close to the price, and does not market its vials as \"generic Ozempic\".",
    verify: "Search the provider's site for the disclosure. Each provider in our table displayed one on the pages we reviewed.",
    redFlag: "The phrase \"FDA-approved\" applied to a compounded vial. That description is wrong; ask the provider to explain exactly what it sells.",
  },
];

// ───── The provider table ─────
// Every cell is a verified statement from our review research or the price
// index. Where we have not verified something, the cell says so rather than
// guessing. Ordered by the ranking. The review lines under each row separate
// their sources: the Trustpilot aggregate, individual Trustpilot reviews we
// captured, Reddit threads we verified, and the provider's own published claims.
type Row = {
  id: string;
  clinician: string;
  visit: string;
  pharmacy: string;
  dosePricing: string;
  /** Recurring positives in the reviews we captured, with the source named. */
  likes?: string;
  /** Recurring complaints in the reviews we captured, with the source named. */
  complaints?: string;
  /** Structural observations from our research where review evidence is thin. */
  note?: string;
};
const ROWS: Row[] = [
  {
    id: "ro",
    clinician: "A qualified doctor reviews the assessment",
    visit: "Online assessment, then doctor follow-up (reviewers mention an MD video call plus messaging support)",
    pharmacy: "ro's in-house pharmacy; brand-name medication (Wegovy pill, Zepbound)",
    dosePricing: "Membership and medication billed separately; insurance may apply",
    likes: "ro's 5-star Trustpilot reviews from the same week focus on enrollment (\"quick and easy\", \"exceptional in every respect\"), and one describes an NP appointment that started on time. In the Reddit threads we verified, users report losing 22 to 60 pounds, and one called the process seamless.",
    complaints: "ro's low-star Trustpilot reviews from the past week return to three issues. First, the $39 initial fee pays for the consultation rather than the medication, and a separate subscription charge sits on top of the monthly one. Second, support is message-only, with replies taking 2-3 business days and no phone line. Third, delivery, including a shipment 4 days late with melted ice packs. One 2-star reviewer was charged after choosing a medication but before speaking to a physician. On Reddit, price is the repeated sticking point: the most upvoted commenter quit over cost despite an otherwise good experience.",
  },
  {
    id: "altrx",
    clinician: "Licensed provider (physician, physician associate or NP) who can decline",
    visit: "Online assessment, clinician review and messaging; pause or cancel at any time",
    pharmacy: "Licensed pharmacies for both compounded plans and brand-name medication (Ozempic, Zepbound, Wegovy)",
    dosePricing: "One price at every dose; Buy Now, Pay Later offered",
    likes: "altRx has no public Trustpilot aggregate. The individual 4- and 5-star reviews we captured credit quick enrollment and support that answers. In the verified Reddit thread, the poster was approved in roughly four hours, received cold-shipped vials in two days and gave the experience 10/10.",
    complaints: "In that same Reddit thread, one user's compounded blend with an additive caused dehydration that eased as levels fell, and another user waited more than a day for a prescription. On structure: altRx is self-serve, with no coaching and no money-back promise.",
  },
  {
    id: "embody",
    clinician: "A licensed medical practitioner reviews the intake, usually within a day",
    visit: "Online intake; reviewers mention scheduled provider appointments, including video calls and appointments for dose increases",
    pharmacy: "US 503A compounding pharmacies; LegitScript-certified",
    dosePricing: "One flat monthly price, no commitment; full refund if not approved",
    likes: "embody's recent 5-star Trustpilot reviews mention providers who listen, doses that were adjusted, and an account manager who repaired a broken portal. On Reddit, users report same-day approval, a vial within a week, and a switcher whose first order matched the dose from their previous provider.",
    complaints: "embody's low-star Trustpilot reviews from the past week are detailed: a doctor missed three video appointments and called four days late; a first dose took 8 days despite a 3-5 day promise, and a refill then ran 3 days late; a billing dispute passed between several support agents. On Reddit, a common summary is \"great if you don't need to actually talk to anyone\": one user could not locate the refill flow, and another described support replies as AI-generated.",
  },
  {
    id: "trimrx",
    clinician: "Licensed clinician review that can result in a decline",
    visit: "Online assessment; follow-up call when needed; unlimited check-ins",
    pharmacy: "Compounded medication only; pharmacy not identified in our research",
    dosePricing: "One price at every dose; no long-term contract; optional discounts for multi-month plans",
    likes: "TrimRx's 5-star Trustpilot reviews from the same week praise careful screening, an easy intake, transparent pricing, quick support responses and clearly stated 2-3 day shipping.",
    complaints: "TrimRx's 2-star reviews from the same week concern fulfillment and billing rather than the clinical side: a box that arrived three days late with warm cold packs; a prepaid 6-month plan whose second shipment was 30 days overdue while chat and phone went unanswered; a cancelled prescription that Affirm continued trying to bill; and a first order that showed another person's prescription in the portal. At 3.8 from 5,392 reviews, TrimRx has the lowest aggregate in our table. Its $149 is above the budget tier for the same molecule and comes with no guarantee.",
  },
  {
    id: "shed",
    clinician: "A licensed clinician reviews the intake and can decline",
    visit: "Fully online visit and checkout; health coaching included on every plan",
    pharmacy: "Compounded semaglutide or tirzepatide; pharmacy not identified in our research",
    dosePricing: "Billed monthly, 20% off the first month; HSA/FSA accepted",
    likes: "The recent SHED Trustpilot reviews we captured mostly credit named support staff who resolved problems and a personal tone in communication. SHED's 4.6 from 1,134 reviews is among the highest aggregates in our table.",
    complaints: "A 1-star review from September describes months of charges after stopping treatment, chat support handled only by AI, and a $1,200 refund that was refused and is now a card dispute. At $199, SHED is the premium option in the compounded market: the higher price pays for coaching and a results guarantee, not a different drug.",
  },
  {
    id: "wellmedr",
    clinician: "A licensed provider reviews the intake and approval is not automatic; every plan includes a Medical Weight-Care Coach",
    visit: "Online intake, clinician review and coach support",
    pharmacy: "Regulated US pharmacy; Reddit commenters identify it as a Florida pharmacy",
    dosePricing: "One price at every dose; lowest rate on a 12-month plan billed monthly",
    likes: "welludr's 5-star Trustpilot reviews credit getting a person on the line within minutes, fast answers from named agents, and an easy switch from another provider. Several low-star reviewers raised their rating after an operations manager phoned them. Reddit verdicts are short: \"legit\", a named Florida pharmacy, and annual-plan prices that match what welludr publishes.",
    complaints: "welludr's low-star Trustpilot reviews from September nearly all concern reaching a person: an order stuck on \"delay in shipping\" for 8 days while support could not locate the account; a request still unanswered after 24 hours; chat and phone unanswered until a manager got involved; a shipment held at the pharmacy for more than a week. An August reviewer says they were billed every 21 days instead of monthly; we have not verified welludr's billing cycle. On Reddit, one detailed post reports losing only 1 pound in 8 weeks despite good service. The $41 rate is a Pre-Black Friday sale price; check the plan terms at checkout.",
  },
  {
    id: "medvi",
    clinician: "Licensed providers who can and do turn away patients for whom treatment is not appropriate",
    visit: "Video visits with providers, scheduled monitoring, a dietician and care coaching",
    pharmacy: "Compounded; pharmacy not identified in our research",
    dosePricing: "All-inclusive pricing with no increase by dose; HSA/FSA accepted",
    likes: "Medvi's 5-star Trustpilot reviews from the same week center on the video visits and nurse practitioners: thorough calls, complete answers, and a provider who \"took her time\". Two Reddit write-ups covering a full year report losses of 40 pounds and just under 15% of body weight, with dose adjustments when progress slowed. Medvi's 4.3 from 14,987 reviews is one of the two largest verified review bases in our table.",
    complaints: "Medvi's 1-star Trustpilot reviews from September are serious and detailed. A prepaid annual plan renewed after 11 shipments with no notice and was refunded only after complaints to the BBB, the FTC and a state attorney general. Another customer was charged before any clinician contact, then received the wrong dose and was refused a refund. A transferring patient kept receiving the starter dose, and another reviewer says communication stopped after five months. One reviewer claims tirzepatide is capped at 11.125 mg; we have not verified that. The 4-star reviews are gentler: cancelling took effort, and one reviewer wanted an every-other-month option because plans are monthly only. The $99 rate is a promotion against a regular $199, and Reddit users flag the ongoing monthly cost as the main caveat.",
  },
  {
    id: "sprout",
    clinician: "A licensed provider reviews you before any prescription is written",
    visit: "Online intake; ships within 2 days after approval",
    pharmacy: "Compounded plans plus brand-name Wegovy; pharmacy not identified in our research",
    dosePricing: "Billed monthly; $200 off the first month",
    likes: "Sprout's recent 5-star Trustpilot reviews praise live, named support staff (\"a LIVE CS rep. No bots\"), simple pausing and plan changes, and one 20-pound result. Sprout's 4.1 from 188 reviews is the smallest review base in this comparison.",
    complaints: "Sprout's 3- and 4-star reviews mention missing tracking notifications on most shipments, a charge with no shipment after a skipped monthly check-in, and sparse injection instructions. One 1-star reviewer reports significant hair loss on compounded tirzepatide. We have not verified any Reddit threads for Sprout yet.",
  },
  {
    id: "directmeds",
    clinician: "A licensed physician reviews the intake and can decline",
    visit: "Online intake and physician review; no membership; cancel at any time",
    pharmacy: "Compounded; pharmacy not identified in our research",
    dosePricing: "$147 flat for either medication at any dose, as injections or sublingual drops",
    likes: "DirectMeds holds a Trustpilot 4.6 from 16,390 reviews, the largest review base in our table. Its 4- and 5-star reviews from the past week focus almost entirely on named support agents: an easy sign-up, quick answers and a rep who solved a problem during the call. A 3-star reviewer says the company \"came through\" after some issues and describes the prices as reasonable.",
    complaints: "A 2-star review from September describes an order stuck at \"Label Created\" until three phone calls, which then arrived damaged while the AI chat said it had been delivered. A 4-star reviewer could not open the doctor's message and prefers speaking to reps over using the online account. A 3-star NAD customer received a two-week supply without syringes. On structure: DirectMeds has no coaching and no brand-name medication, and its needle-free drops are a format used at the clinician's discretion, since the major trials studied injections.",
  },
  {
    id: "healthrx",
    clinician: "An independent US-licensed clinician in your state reviews your full history before you are charged",
    visit: "Free two-minute assessment, clinician review and care-team check-ins",
    pharmacy: "Licensed 503A pharmacies; LegitScript certificate 50087439",
    dosePricing: "Plan price stays the same at every dose; $99/month is billed as $1,188 prepaid for the year",
    note: "We have not verified a Trustpilot aggregate for HealthRx and have captured no reviews; it is a newer brand with little public record. The main structural trade-off is paying for twelve months before you know how well you tolerate the medication.",
  },
];

// ───── Key patterns ─────
// Editorial synthesis drawn only from the rows above and the price index.
const PATTERNS: { title: string; body: string }[] = [
  {
    title: "All ten describe licensed review; clinician access after approval is what differs",
    body: "Each provider in the table says a licensed clinician reviews the intake before prescribing. The difference is the follow-up: Medvi describes live video visits and scheduled monitoring, TrimRx promotes unlimited check-ins, embody reviewers describe booked appointments, and the remaining providers use intake-and-messaging models. The complaints about ro, embody and welludr concern reaching someone, not the initial review.",
  },
  {
    title: "Most headline prices come with a condition",
    body: "welludr's $41 is a Pre-Black Friday sale price (from October 28, 2026) whose plan terms you see at checkout. HealthRx's $99 is collected as $1,188 upfront. Medvi's $99 and altRx's $89 are promotions against a regular $199. ro charges membership and medication separately. The condition matters as much as the number, so the price index records both.",
  },
  {
    title: "Seven of the ten providers charge one price at every dose",
    body: "altRx, welludr, TrimRx, DirectMeds, embody, HealthRx and Medvi publish a single price that does not change with dose. ro prices medication separately from membership, and SHED and Sprout list monthly rates without a stated every-dose price in the material we reviewed. Doses rise over time, so ask for the maintenance-dose price.",
  },
  {
    title: "Pharmacy disclosure varies more than clinician claims",
    body: "embody and HealthRx identify 503A pharmacies and show LegitScript certification. ro fills through its own pharmacy. altRx says it uses licensed pharmacies without naming them. welludr says a regulated US pharmacy, and only Reddit commenters name it. For TrimRx, SHED, Medvi, Sprout and DirectMeds, our research did not identify the pharmacy, so ask support before paying.",
  },
  {
    title: "A large review count steadies a score but does not make experiences uniform",
    body: "Medvi's 4.3 from 14,987 reviews coexists with serious 1-star accounts about renewals and refunds. DirectMeds, welludr and SHED all average 4.6, from 16,390, 2,188 and 1,134 reviews respectively. Sprout's 4.1 rests on 188 reviews, while TrimRx and embody (both 3.8) have large, mixed records. For every provider, the repeated complaints are operational (shipping, billing, reaching support) rather than about the clinical review.",
  },
];

// ───── Providers worth exploring further ─────
// Use-case labels, each supported by a row in the table above. Not a ranking:
// the full ranking lives on the comparison page this section links to.
const EXPLORE: Record<string, { useCase: string; reason: string }> = {
  embody: {
    useCase: "Clear flat pricing and disclosed pharmacies",
    reason: "embody charges one flat monthly price at every dose with no commitment, refunds in full if a clinician does not approve you, and names LegitScript-certified US 503A pharmacies on its site.",
  },
  altrx: {
    useCase: "Flat compounded pricing plus brand-name options",
    reason: "altRx prices compounded semaglutide and tirzepatide the same at every dose and also lists cash prices for Ozempic, Zepbound and Wegovy. There is no public Trustpilot aggregate, so rely on the individual reviews and the Reddit thread.",
  },
  medvi: {
    useCase: "Live clinician visits and a large review base",
    reason: "Medvi offers video visits with providers, scheduled monitoring and a dietician, and holds 4.3 from 14,987 Trustpilot reviews. The $99 rate is a promotion against a regular $199.",
  },
  wellmedr: {
    useCase: "Lowest verified semaglutide price, with a 12-month plan",
    reason: "welludr's semaglutide costs from $41 a month in its Pre-Black Friday sale (from October 28, 2026); check the plan terms at checkout. Every plan includes a weight-care coach, and welludr holds 4.6 from 2,188 Trustpilot reviews.",
  },
};

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How can I tell if an online GLP-1 provider uses real doctors?",
    answer:
      "Ask about clinician involvement rather than doctors specifically, because a legitimate prescriber can be a licensed physician, physician associate or nurse practitioner depending on the service and state law. Before paying, confirm three things: the intake asks the FDA-label contraindication questions (thyroid cancer history, MEN 2, pancreatitis, pregnancy), the provider says a licensed clinician reviews the intake and can decline you, and there is a stated way to contact a clinician after you are prescribed. A refund policy for patients who are not approved, such as embody's, signals that declines really happen.",
  },
  {
    question: "Is a GLP-1 prescription without a video call legitimate?",
    answer:
      "Yes. Most legitimate GLP-1 telehealth is asynchronous: you fill out a medical intake, a licensed clinician reviews it, and you message the care team afterward. Live video visits, which Medvi offers, add a real-time conversation but are not what makes a prescription valid. The essentials are a licensed reviewer who can decline you and a way to reach a clinician later.",
  },
  {
    question: "Is compounded semaglutide or tirzepatide safe?",
    answer:
      "Compounded semaglutide and tirzepatide are not FDA-approved, and the FDA has raised concerns about some compounded GLP-1 products, including dosing errors and unapproved salt forms. Much of the risk depends on the pharmacy: a US state-licensed 503A pharmacy or 503B facility that compounds the base form, working with a licensed prescriber. Ask the provider which pharmacy it uses and which form it compounds, and talk with a clinician about whether a GLP-1 medication suits you.",
  },
  {
    question: "How much does an online GLP-1 provider cost per month?",
    answer:
      "Based on the verified published prices in our index, compounded semaglutide costs $41 to $199 a month and compounded tirzepatide $71 to $299, usually including the consultation and shipping. Brand-name Wegovy, Zepbound and Ozempic cost four figures a month when paid in cash. Always ask for the maintenance-dose price rather than the starter price, and add any membership fee billed separately.",
  },
  {
    question: "Which GLP-1 providers are not in this comparison?",
    answer:
      "Mochi Health, Henry Meds and Hims are not part of our weight loss coverage, so we leave them out instead of guessing at their details. You can run the same 12 checks on any of them before signing up.",
  },
  {
    question: "What if a GLP-1 provider will not tell me its pharmacy?",
    answer:
      "Ask support directly before you pay, and if you get no clear answer, consider another provider. Every provider in our table either states its pharmacy type or is marked as not identified in our research. The FDA's BeSafeRx program applies the same rule to any online pharmacy: confirm the license instead of assuming.",
  },
];

// Parse the stored "Sep 21, 2026" review dates so the evidence tiles can say
// how recent the captured reviews are. Undated reviews are simply skipped.
function latestReviewDate(reviews: TrustpilotReview[]): string | null {
  let best: Date | null = null;
  let label: string | null = null;
  for (const r of reviews) {
    if (!r.date) continue;
    const d = new Date(r.date);
    if (isNaN(d.getTime())) continue;
    if (!best || d > best) {
      best = d;
      label = r.date;
    }
  }
  return label;
}

function reviewTime(r: TrustpilotReview): number {
  if (!r.date) return 0;
  const t = new Date(r.date).getTime();
  return isNaN(t) ? 0 : t;
}

// The cross-provider carousel's rule, applied identically to every provider:
// the most recent 4- or 5-star review we captured and the most recent 3-star
// or lower. If a provider has no low-star review on record, its second most
// recent review stands in, so every provider shows two cards.
function pickMix(reviews: TrustpilotReview[]): TrustpilotReview[] {
  const sorted = [...reviews].sort((a, b) => reviewTime(b) - reviewTime(a));
  const high = sorted.find((r) => r.rating >= 4);
  const low = sorted.find((r) => r.rating <= 3);
  const picks = [high, low].filter((r): r is TrustpilotReview => !!r);
  if (picks.length < 2) {
    const next = sorted.find((r) => !picks.includes(r));
    if (next) picks.push(next);
  }
  return picks;
}

function starMix(reviews: TrustpilotReview[]): string {
  const counts = [5, 4, 3, 2, 1].map((s) => [s, reviews.filter((r) => r.rating === s).length] as const).filter(([, n]) => n > 0);
  return counts.map(([s, n]) => `${n} ${s}-star`).join(", ");
}

export default async function HowToChooseGlp1ProviderPage() {
  const config = await getConfig();
  const priceById = new Map(PRICE_INDEX.map((r) => [r.providerId, r]));
  const rows = ROWS.map((r) => ({
    ...r,
    provider: config.providers.find((p) => p.id === r.id),
    price: priceById.get(r.id),
  })).filter((r) => r.provider);
  const rowById = new Map(rows.map((r) => [r.id, r]));
  const redditProviders = rows.map((r) => ({ id: r.provider!.id, name: r.provider!.name })).filter((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]);
  const explore = rankedCardItems(config, { providerIds: Object.keys(EXPLORE), order: "ranking" });
  const mixedReviews: MixedReviewItem[] = rows
    .flatMap((r) => {
      const reviews = r.provider!.trustpilotReviews ?? [];
      return pickMix(reviews).map((review) => ({
        review,
        provider: { name: r.provider!.name, href: `/reviews/${r.provider!.id}`, total: reviews.length },
      }));
    })
    .sort((a, b) => reviewTime(b.review) - reviewTime(a.review));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    ...pageReviewSchema("/how-to-choose-a-glp1-provider"),
    author: { "@type": "Organization", name: "Top Weight Loss Team", url: "https://www.topweightloss.us" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "How to Choose a GLP-1 Provider", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";
  // Table data cell: vertical rule on the right so columns read as columns.
  const cell = "border-r border-gray-200 px-3 py-3 align-top last:border-r-0";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How to Choose a GLP-1 Provider" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            How to Choose a GLP-1 Provider Online: 12 Checks to Run Before You Pay
          </h1>
          <p className="mt-3 max-w-[700px] text-[16px] leading-relaxed text-gray-500">
            To choose a GLP-1 provider, confirm who approves your prescription, which pharmacy makes the medication,
            and what you will pay at your maintenance dose. Most telehealth sites look alike, so this guide gives you
            12 checks you can run yourself, then applies them to ten online GLP-1 providers with verified prices,
            Trustpilot records, and the themes that come up in customer reviews and on Reddit.
          </p>
          <LastUpdated date={UPDATED} className="mt-4" />
          <MedicalReviewBar path="/how-to-choose-a-glp1-provider" className="mt-4 max-w-[760px]" />
          <TrustDisclosure disclaimerHref="/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* The short answer */}
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div>
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">What should you check first?</h2>
            <p className="mb-2 text-[15px] leading-[1.75] text-gray-600">
              Confirm these three points before paying any online GLP-1 provider:
            </p>
            <ol className="mb-2 list-decimal space-y-1 pl-5 text-[15px] leading-[1.7] text-gray-600">
              <li><strong className="text-[#191919]">The prescriber</strong>: a licensed clinician reviews your intake and has the authority to say no.</li>
              <li><strong className="text-[#191919]">The pharmacy</strong>: it is identified, licensed in the US, and willing to tell you which form of the drug it compounds.</li>
              <li><strong className="text-[#191919]">The real price</strong>: what you pay once the introductory rate ends and your dose increases.</li>
            </ol>
            <p className="text-[15px] leading-[1.75] text-gray-600">
              Every provider we reviewed describes licensed-clinician review in its published care model. The amount
              of contact you get with that clinician after approval differs a lot from one provider to the next, which
              makes it the fourth point to check.
            </p>
          </div>
        </div>

        {/* Clinician involvement */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">Who reviews your GLP-1 prescription, and can you reach them later?</h2>
          </div>
          <p className="mb-4">
            The question most people ask is &ldquo;which ones have real doctors?&rdquo;. A better question is{" "}
            <strong className="text-[#191919]">&ldquo;can the clinician stop the sale, and can I reach them afterward?&rdquo;</strong>{" "}
            Legitimate telehealth does not require a video appointment with an MD. Depending on the service and state
            law, your prescriber may be a licensed physician, physician associate, nurse practitioner or another
            qualified prescriber. Because{" "}
            <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener" className={ext}>semaglutide</a>{" "}
            is prescription-only, a licensed clinician must still review your medical intake and be able to decline
            you. What changes between providers is how much contact you have with that clinician.
          </p>
          <p className="mb-4">
            Two points are worth separating. First, most legitimate GLP-1 telehealth is{" "}
            <strong className="text-[#191919]">asynchronous</strong>: you send the intake, a clinician reviews it, and
            follow-up happens by message. That model is standard and lawful. Medvi describes live video visits and
            scheduled monitoring, and embody&rsquo;s reviewers describe booked provider appointments and video calls;
            the other providers in our table describe intake-and-messaging models, some adding a follow-up call when
            the clinician needs more information. Second, the prescriber and the pharmacy are different checks. The
            prescriber decides whether treatment is appropriate for you; the pharmacy determines what goes into the
            vial. Verify each one.
          </p>
          <p className="mb-3 text-[14px] font-bold text-[#191919]">Five questions to ask about clinician involvement:</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Who reads my medical intake?", "The how-it-works page should name the role (physician, physician associate or nurse practitioner), and the intake should ask about thyroid cancer or MEN 2 history, pancreatitis, pregnancy plans and current medications."],
              ["Is the clinician licensed where I live?", "The prescriber should be licensed in your state. HealthRx says an independent US-licensed clinician in your state reviews you; other providers describe licensed providers without mentioning the state, so ask."],
              ["Can the clinician refuse treatment?", "Look for \"if appropriate\" wording and a refund for patients who are not approved. embody refunds in full when a provider declines treatment, and Medvi says it turns away patients for whom treatment is not appropriate."],
              ["How do I contact a clinician after approval?", "Options include messaging, check-ins or video. TrimRx promotes unlimited check-ins, Medvi describes monitoring visits and HealthRx describes care-team check-ins. ro reviewers report message-only support with replies in 2-3 days."],
              ["Who handles dose changes and medical questions?", "Ask how you request a higher dose and who signs off on it. Medvi includes adjustments in its monitoring, embody reviewers describe appointments for dose increases, and one embody user on Reddit had the dose raised at a check-in three weeks in."],
            ].map(([h, b]) => (
              <div key={h} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-1 text-[14px] font-bold text-[#191919]">{h}</p>
                <p className="text-[13.5px] leading-relaxed text-gray-600">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The 12 checks */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">The GLP-1 provider checklist: 12 checks</h2>
          </div>
          <p className="mb-4 text-[14px] text-gray-500">
            For each check you get what to look at, a way to verify it yourself in a few minutes, and the warning
            sign that should prompt a question before you pay. A red flag means do more homework; it is not a
            judgment on the provider.
          </p>
          <ol className="space-y-4">
            {CHECKLIST.map((c, i) => (
              <li key={c.title} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0C4B75] text-[13px] font-bold text-white">{i + 1}</span>
                  <h3 className="text-[17px] font-bold leading-snug text-[#191919]">{c.title}</h3>
                </div>
                <div className="grid gap-3 pl-10 text-[14px] leading-relaxed sm:grid-cols-3">
                  <p className="text-gray-700"><span className="font-bold text-[#191919]">What to look at: </span>{c.check}</p>
                  <p className="text-gray-700"><span className="font-bold text-[#191919]">How to confirm it: </span>{c.verify}</p>
                  <p className="text-gray-700"><span className="mr-1.5 inline-flex items-center gap-1 font-bold text-red-700"><AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />Red flag:</span>{c.redFlag}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[14px] text-gray-500">
            Regulatory sources behind checks 4, 5 and 12:{" "}
            <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener" className={ext}>FDA guidance on 503A and 503B compounding</a>,{" "}
            <a href="https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss" target="_blank" rel="noopener" className={ext}>FDA warning on semaglutide salt forms</a>,{" "}
            <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener" className={ext}>FDA concerns about unapproved GLP-1 drugs</a>, and{" "}
            <a href="https://www.fda.gov/drugs/buying-using-medicine-safely/besaferx-your-source-online-pharmacy-information" target="_blank" rel="noopener" className={ext}>BeSafeRx</a>{" "}
            for checking any online pharmacy.
          </p>
        </section>

        {/* Provider table */}
        <section className="mb-12" id="provider-table">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">How do 10 GLP-1 providers score on the checklist?</h2>
          <p className="mb-4 text-[14px] text-gray-500">
            Each cell comes from our verified provider research or the{" "}
            <Link href="/glp1-weight-loss-statistics#price-index" className={ext}>price index</Link>{" "}
            (prices verified {PRICE_INDEX_VERIFIED}), and any cell we could not verify is labeled that way. The table
            applies the checklist to public provider information; it is not an independent audit of medical quality.
            Rows follow our ranking, not price order. Mochi Health and Henry Meds are outside our coverage, so we omit
            them rather than guess.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[900px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Provider", "Who approves", "Care model", "Pharmacy", "Semaglutide / mo", "Price by dose", "Trustpilot"].map((h) => (
                    <th key={h} className="border-r border-gray-200 px-3 py-3 align-bottom font-bold text-[#191919] last:border-r-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <Fragment key={r.id}>
                  <tr className={`border-t-2 border-gray-300 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                    <td className={`${cell} font-semibold text-[#191919]`}>
                      <Link href={`/reviews/${r.provider!.id}`} className="hover:underline">{r.provider!.name}</Link>
                    </td>
                    <td className={`${cell} text-gray-700`}>{r.clinician}</td>
                    <td className={`${cell} text-gray-700`}>{r.visit}</td>
                    <td className={`${cell} text-gray-700`}>{r.pharmacy}</td>
                    <td className={`${cell} text-gray-700`}>
                      {r.price?.semaglutide ? (
                        <>
                          <span className="font-semibold text-[#191919]">{r.price.semaglutide.price}</span>
                          <span className="block text-[12px] text-gray-500">{r.price.semaglutide.note}</span>
                        </>
                      ) : (
                        <span className="text-gray-400">Not in the price index</span>
                      )}
                    </td>
                    <td className={`${cell} text-gray-700`}>{r.dosePricing}</td>
                    <td className={`${cell} text-gray-700`}>
                      {r.provider!.trustpilotRating && r.provider!.trustpilotReviewCount ? (
                        <>
                          <span className="font-semibold text-[#191919]">{r.provider!.trustpilotRating}</span>
                          <span className="block text-[12px] text-gray-500">{r.provider!.trustpilotReviewCount} reviews</span>
                        </>
                      ) : (
                        <span className="text-gray-400">Unverified</span>
                      )}
                    </td>
                  </tr>
                  {/* Review themes - full width under the row. Sources are
                      named inside each line: aggregate, individual Trustpilot
                      reviews, Reddit threads, provider claims. */}
                  <tr className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
                    <td colSpan={7} className="border-t border-dashed border-gray-200 px-3 py-3 text-[12.5px] leading-relaxed text-gray-600">
                      {r.likes && (
                        <p className={r.complaints ? "mb-1.5" : ""}>
                          <span className="font-semibold text-emerald-700">Praised for: </span>
                          {r.likes}
                        </p>
                      )}
                      {r.complaints && (
                        <p>
                          <span className="font-semibold text-red-700">Recurring complaints: </span>
                          {r.complaints}
                        </p>
                      )}
                      {r.note && (
                        <p>
                          <span className="font-semibold text-[#191919]">Our note: </span>
                          {r.note}
                        </p>
                      )}
                    </td>
                  </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">
            A single review describes one customer&rsquo;s experience, not every patient&rsquo;s. When a line repeats
            a reviewer&rsquo;s claim that we have not confirmed, it says so.
          </p>
        </section>

        {/* Trustpilot evidence */}
        <section className="mb-12">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">What do Trustpilot reviews say about each GLP-1 provider?</h2>
          <p className="mb-4 text-[14px] text-gray-500">
            Below is each provider&rsquo;s Trustpilot average and review count where we verified the profile, plus the
            star mix of the individual reviews we captured, good and bad. Trustpilot measures customer experience, not
            the medical quality of care. Each provider&rsquo;s review page carries the full set of captured reviews.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map((r) => {
              const p = r.provider!;
              const reviews = p.trustpilotReviews ?? [];
              const latest = latestReviewDate(reviews);
              const hasAggregate = !!(p.trustpilotRating && p.trustpilotReviewCount);
              return (
                <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Link href={`/reviews/${p.id}`} className="text-[15px] font-bold text-[#191919] hover:underline">{p.name}</Link>
                    {hasAggregate ? (
                      <TrustpilotRating rating={p.trustpilotRating!} reviewCount={p.trustpilotReviewCount} starSize={15} />
                    ) : (
                      <span className="text-[12px] text-gray-400">No verified public aggregate</span>
                    )}
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-gray-600">
                    {reviews.length > 0 ? (
                      <>
                        <span className="font-semibold text-[#191919]">{reviews.length} reviews captured:</span> {starMix(reviews)}
                        {latest && <span className="text-gray-400">, latest dated {latest}</span>}.
                      </>
                    ) : (
                      <span className="text-gray-400">We have not captured individual reviews yet.</span>
                    )}
                  </p>
                  <p className="mt-2 flex flex-wrap gap-x-4 text-[12.5px] font-semibold">
                    <Link href={`/reviews/${p.id}`} className="text-[#0C4B75] hover:underline">
                      {reviews.length > 0 ? "See the captured reviews" : "Read our review"}
                    </Link>
                    <ProviderCta
                      href={p.affiliateUrl}
                      providerName={p.name}
                      providerSlug={p.id}
                      pageType="listing"
                      sourceFlow="main_comparison"
                      className="inline-flex items-center gap-1 text-[#0C4B75] hover:underline"
                    >
                      Visit site
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </ProviderCta>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <MixedTrustpilotCarousel
              items={mixedReviews}
              title="Recent Trustpilot reviews, good and bad, from every provider"
              subtitle="Two reviews per provider, picked the same way each time: the latest 4- or 5-star review we captured and the latest review of 3 stars or fewer. Sorted newest first, with reviewer names shortened."
            />
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">
            We re-checked the Trustpilot aggregates for ro, embody, TrimRx, SHED, welludr, Medvi, Sprout and DirectMeds
            against their public profiles in September 2026. When a provider has no published aggregate, we state that
            instead of estimating.
          </p>
        </section>

        {/* Key patterns */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">What the comparison reveals: 5 patterns</h2>
          </div>
          <p className="mb-4 text-[14px] text-gray-500">
            Five takeaways based only on the provider table and the price index.
          </p>
          <ol className="space-y-3">
            {PATTERNS.map((p, i) => (
              <li key={p.title} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[12px] font-bold text-[#0C4B75]">{i + 1}</span>
                <div>
                  <p className="mb-1 text-[15px] font-bold text-[#191919]">{p.title}</p>
                  <p className="text-[14px] leading-relaxed text-gray-600">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Reddit */}
        {redditProviders.length > 0 && (
          <section className="mb-4">
            <RedditThreadCarousel
              providers={redditProviders}
              reviewHrefFor={(id) => `/reviews/${id}`}
              title="What do GLP-1 patients say on Reddit?"
              intro={
                <>
                  <p className="mb-2">
                    We read public Reddit threads about the providers in this comparison. A single Reddit post is one
                    person&rsquo;s story, not proof that every patient will have the same experience, so we focused on
                    themes that repeat across threads.
                  </p>
                  <p className="text-[13px] text-gray-500">
                    Each card shows the provider, the thread&rsquo;s topic, a link to the original thread when we have
                    it, and the vote count at the time we captured it. Providers with no verified Reddit material are
                    left out of this section.
                  </p>
                </>
              }
            />
          </section>
        )}

        {/* Providers worth exploring further */}
        <section className="mb-12">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">Which GLP-1 providers fit specific needs?</h2>
          <p className="mb-5 text-[14px] text-gray-500">
            Four providers whose published model matches a particular need identified in the research above. This list
            is not a ranking; the full ranked comparison is linked below. We may earn a commission when you sign up
            through a provider link, and that does not affect what the table shows.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {explore.map(({ product, provider }) => {
              const meta = EXPLORE[provider.id];
              const row = rowById.get(provider.id);
              const price = priceById.get(provider.id)?.semaglutide;
              return (
                <article key={provider.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-[32px] w-[110px] items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain object-left" />
                    </div>
                  </div>
                  <p className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#0C4B75]">{meta.useCase}</p>
                  <p className="mb-4 text-[14px] leading-relaxed text-gray-700">{meta.reason}</p>
                  <dl className="mb-4 grid gap-x-4 gap-y-2 text-[13px] sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-gray-500">Verified semaglutide price</dt>
                      <dd className="text-[#191919]">
                        {price ? (
                          <>
                            <span className="font-bold">{price.price}/mo</span>
                            <span className="block text-[12px] text-gray-500">{price.note}</span>
                          </>
                        ) : (
                          "Not in the price index"
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-500">Trustpilot</dt>
                      <dd className="text-[#191919]">
                        {provider.trustpilotRating && provider.trustpilotReviewCount
                          ? `${provider.trustpilotRating} from ${provider.trustpilotReviewCount} reviews`
                          : "No verified public aggregate"}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-semibold text-gray-500">Who approves treatment</dt>
                      <dd className="text-[#191919]">{row?.clinician}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <Link href={`/reviews/${provider.id}`} className="inline-flex h-[40px] items-center rounded-lg border border-gray-200 bg-white px-4 text-[13.5px] font-semibold text-[#191919] transition-colors hover:bg-gray-50">
                      Read the full review
                    </Link>
                    <ProviderCta
                      href={provider.affiliateUrl}
                      providerName={provider.name}
                      providerSlug={provider.id}
                      position={product.rank}
                      pageType="listing"
                      sourceFlow="main_comparison"
                      className="inline-flex h-[40px] items-center gap-1.5 rounded-lg bg-[#0C4B75] px-4 text-[13.5px] font-bold text-white transition-colors hover:bg-[#093d61]"
                    >
                      Visit provider
                    </ProviderCta>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-gray-500">
              See all ten providers from the table ranked and scored, each linked to its full review.
            </p>
            <Link href="/" className="inline-flex h-[44px] items-center gap-2 rounded-lg border border-[#0C4B75] bg-white px-5 text-[14px] font-bold text-[#0C4B75] transition-colors hover:bg-[#F5F9FC]">
              See the full GLP-1 provider ranking
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-[24px] font-bold text-[#191919]">Frequently asked questions about choosing a GLP-1 provider</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {FAQS.map((f) => (
              <div key={f.question} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mb-10 text-[14px] leading-relaxed text-gray-500">
          Keep reading: the{" "}
          <Link href="/glp1-weight-loss-statistics#price-index" className={ext}>GLP-1 price index</Link>,{" "}
          <Link href="/cheapest-glp1" className={ext}>the lowest-cost GLP-1 options online</Link>,{" "}
          <Link href="/semaglutide" className={ext}>where to get semaglutide</Link>,{" "}
          <Link href="/tirzepatide" className={ext}>where to get tirzepatide</Link>,{" "}
          <Link href="/articles/compounded-semaglutide-vs-brand-name" className={ext}>compounded vs brand-name semaglutide</Link>,{" "}
          <Link href="/switch-from-ozempic" className={ext}>how to switch providers</Link>,{" "}
          our wider guide to{" "}
          <Link href="/articles/choosing-telehealth-weight-loss-provider" className={ext}>picking a telehealth weight loss provider</Link>,{" "}
          and <Link href="/how-we-rank" className={ext}>our ranking method</Link>.
        </p>

        <GuideCluster currentSlug="how-to-choose-a-glp1-provider" />

        <MedicalSources vertical="weight-loss" />

        {/* Methodology notes */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 text-[13px] leading-relaxed text-gray-500">
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-[0.05em] text-[#191919]">Our research method for this guide</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-semibold text-gray-700">Prices</span> are the cash-pay rate each provider publishes,
              together with any condition attached, taken from our verified registry (last verified {PRICE_INDEX_VERIFIED}).
              Prices change, so confirm them on the provider&rsquo;s site.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Approval, care model and pharmacy details</span> come from each
              provider&rsquo;s published care model and, where available, from what its reviewers describe. This is public
              information, not an independent audit of medical quality.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Trustpilot</span> numbers are the public average and review count
              on the date we captured each profile. The individual reviews we quote come from the same profile and include
              positive and negative ones. A Trustpilot score measures customer experience, not medical safety.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Reddit</span> content is limited to public threads we verified,
              read for themes that repeat; a single post is an anecdote.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Top Weight Loss Scores</span> do not appear on this page. On our
              ranking and review pages, they are editorial scores built from six weighted factors (medical credibility,
              medication access, pricing and value, patient experience, clinical support and flexibility) and are separate
              from Trustpilot ratings, which come from customers. Read{" "}
              <Link href="/how-we-rank" className={ext}>how we score providers</Link>.
            </li>
            <li>
              Compounded semaglutide and tirzepatide are not FDA-approved. Top Weight Loss (topweightloss.us) does not
              provide medical care; this guide is for general information and is not medical advice or a treatment
              recommendation for any individual.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
