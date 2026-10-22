import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, X, ExternalLink } from "lucide-react";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import { GuideCluster } from "@/components/guide-cluster";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { ProviderCta } from "@/components/provider-cta";
import { MedicalSources } from "@/components/medical-sources";
import { RedditMark, RedditThreadCarousel } from "@/components/reddit-community";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";

// ───── GLP-1 Telehealth Providers Compared ─────
// Evidence-led comparison of the eight weight-loss partners: verified pricing
// (price index, PRICE_INDEX_VERIFIED; Ro from its published pricing, Aug
// 2026), Trustpilot records (operator screenshots, Oct 12, 2026; MEDVi Sep
// 25), captured Reddit excerpts (the site's Reddit registry) and the
// providers' cancellation terms (operator review, Oct 12, 2026). No scores,
// no ranking: the page triangulates sources and says where evidence is thin.
// Every figure below is dated; change a figure only with a new verification.

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/glp1-provider-comparison";
const TITLE = "GLP-1 Provider Comparison 2026: Real Prices and Reviews";
const DESCRIPTION =
  "GLP-1 provider comparison: 8 telehealth services side by side on verified prices from $49/mo, month-two costs, Trustpilot, Reddit and cancellation terms.";
const PUBLISHED = "2026-10-12";
const UPDATED = "2026-10-17";
const TRUSTPILOT_CHECKED = "October 12, 2026";
const TERMS_REVIEWED = "October 12, 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

type Pid = "wellmedr" | "embody" | "eden" | "directmeds" | "medvi" | "trimrx" | "altrx" | "ro";

type Row = {
  id: Pid;
  name: string;
  medications: string;
  entry: string;
  entryNote: string;
  after: string;
  membership: string;
  shipping: string;
  support: string;
  trustpilot: { rating: string; count: string; checked: string; url: string } | null;
  advantage: string;
  limitation: string;
  cta: string;
};

const ROWS: Row[] = [
  {
    id: "wellmedr",
    name: "welludr",
    medications: "Compounded semaglutide and tirzepatide, plus brand-name Ozempic and Zepbound",
    entry: "$49 sema / $89 tirz",
    entryNote: "on the 12-month plan; one price at every dose",
    after: "Unchanged while on the plan; higher if you pay month to month",
    membership: "None",
    shipping: "3-5 business days",
    support: "Board-certified specialists and a weight-care coach",
    trustpilot: { rating: "4.6", count: "2,188", checked: TRUSTPILOT_CHECKED, url: "https://www.trustpilot.com/review/wellmedr.com" },
    advantage: "Lowest ongoing price we track; weight-loss warranty",
    limitation: "Best rate requires a 12-month plan; shipping is slower",
    cta: "See welludr's 12-month pricing",
  },
  {
    id: "embody",
    name: "embody",
    medications: "Compounded semaglutide and tirzepatide",
    entry: "$69 sema / $119 tirz",
    entryNote: "regularly $79 / $129; no contract",
    after: "Unchanged, month to month",
    membership: "None",
    shipping: "Free cold-chain, 1-2 days",
    support: "Nursing team, 1:1 messaging and video appointments",
    trustpilot: { rating: "3.8", count: "9,604", checked: TRUSTPILOT_CHECKED, url: "https://www.trustpilot.com/review/joinem.co" },
    advantage: "Lowest no-commitment price; quickest shipping",
    limitation: "Mostly self-serve; support reviews are mixed",
    cta: "View embody's month-to-month prices",
  },
  {
    id: "eden",
    name: "Eden",
    medications: "Compounded semaglutide and tirzepatide",
    entry: "$99 sema / $129 tirz",
    entryNote: "same every month and at every dose; not a promotion",
    after: "Unchanged every month",
    membership: "None",
    shipping: "Ships to your home; delivery time not listed on the pricing page",
    support: "Doctor-guided care; 24/7 human support",
    trustpilot: { rating: "4.5", count: "4,917", checked: "October 13, 2026", url: "https://www.trustpilot.com/review/tryeden.com" },
    advantage: "Flat price with no promotion to expire; best recent support reviews",
    limitation: "No Reddit record; shipping time unpublished; FDA warning letter on marketing (June 2026)",
    cta: "See Eden's flat monthly price",
  },
  {
    id: "directmeds",
    name: "DirectMeds",
    medications: "Compounded semaglutide and tirzepatide, as injections or sublingual drops",
    entry: "$147",
    entryNote: "same for either drug, either format, any dose",
    after: "Unchanged at every dose",
    membership: "None",
    shipping: "Free, 1-2 days",
    support: "Telemedicine visit included; no coaching",
    trustpilot: { rating: "4.6", count: "16,390", checked: TRUSTPILOT_CHECKED, url: "https://www.trustpilot.com/review/directmeds.com" },
    advantage: "Single flat price; needle-free drops cost no more",
    limitation: "No coaching; complaints about fulfillment delays",
    cta: "See DirectMeds' flat price",
  },
  {
    id: "medvi",
    name: "Medvi",
    medications: "Compounded semaglutide and tirzepatide, plus oral dissolving tablets",
    entry: "$99 sema / $166 tirz",
    entryNote: "promotional; regularly $199 / $299; tablets $249",
    after: "Reverts to the regular price when the promotion ends",
    membership: "None",
    shipping: "Free",
    support: "Video visits with a provider or NP, a dietician and care coaching",
    trustpilot: { rating: "4.3", count: "14,987", checked: TRUSTPILOT_CHECKED, url: "https://www.trustpilot.com/review/medvi.org" },
    advantage: "Care bundled into one price; second-largest review base",
    limitation: "Promotional pricing; repeated cancellation and billing complaints",
    cta: "View Medvi's current prices",
  },
  {
    id: "trimrx",
    name: "TrimRx",
    medications: "Compounded semaglutide and tirzepatide",
    entry: "$149 sema / $259 tirz",
    entryNote: "one price at every dose; includes a $140 discount (regularly $289)",
    after: "Unchanged, per the published rate",
    membership: "None",
    shipping: "Free and tracked; often next-day (TrimRx's claim)",
    support: "Custom dosing and unlimited provider check-ins",
    trustpilot: { rating: "3.8", count: "5,392", checked: TRUSTPILOT_CHECKED, url: "https://www.trustpilot.com/review/trimrx.com" },
    advantage: "No long-term contract; custom dosing; results guarantee (conditions apply)",
    limitation: "Complaints about payment practices recur",
    cta: "See TrimRx's current plans",
  },
  {
    id: "altrx",
    name: "altRx",
    medications: "Compounded semaglutide and tirzepatide, plus brand-name Ozempic, Zepbound and Wegovy",
    entry: "$89 sema / $149 tirz",
    entryNote: "promotional; regularly $199 / $299; one price at every dose",
    after: "The promotion's end date has been pushed back more than once",
    membership: "None",
    shipping: "Free, 5-7 days",
    support: "Clinician-guided care; pause or cancel anytime; Buy Now, Pay Later",
    trustpilot: null,
    advantage: "One price at every dose; brand-name options; BNPL",
    limitation: "FDA warning letter on marketing (June 2026); reports of promo-tier billing problems",
    cta: "See altRx's prices and brand-name options",
  },
  {
    id: "ro",
    name: "ro",
    medications: "Brand-name Wegovy (pill and pen) and Zepbound, with medication billed separately",
    entry: "$39 membership",
    entryNote: "first month only; the one provider here with a membership; medication is a separate charge",
    after: "Membership $74-$149/mo plus medication at $149-$449 depending on product and dose",
    membership: "Yes",
    shipping: "Filled by ro's in-house pharmacy",
    support: "Licensed providers; follow-up by message",
    trustpilot: { rating: "3.9", count: "7,105", checked: TRUSTPILOT_CHECKED, url: "https://www.trustpilot.com/review/ro.co" },
    advantage: "The only route here built on FDA-approved products; insurance may cover the medication",
    limitation: "Two monthly bills; users on both platforms find the cost confusing",
    cta: "See ro's membership and medication prices",
  },
];

type Section = {
  id: Pid;
  overview: ReactNode;
  pricing: ReactNode;
  support: string;
  trustpilotHeading: string;
  trustpilot: ReactNode;
  reddit: ReactNode;
  cancellation: string;
  pros: string[];
  cons: string[];
  suits: string;
  assessment: ReactNode;
};

const L = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="font-semibold text-[#0C4B75] hover:underline">{children}</Link>
);
const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener" className="font-semibold text-[#0C4B75] hover:underline">{children}</a>
);

const SECTIONS: Section[] = [
  {
    id: "wellmedr",
    overview: (
      <>
        welludr offers <strong className="text-[#191919]">the lowest ongoing price we track</strong> for compounded semaglutide and tirzepatide, on a twelve-month plan that charges the same at every dose. Every plan includes a coach, and brand-name Ozempic and Zepbound are available for patients who want them. welludr fits people who already plan to stay on treatment and want the cheapest rate they can sustain.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">On the twelve-month plan, welludr charges $49 a month for semaglutide and $89 a month for tirzepatide</strong>, shipped every four weeks (verified October 16, 2026). Both prices dropped on September 14, from $59 and $99. Brand-name Ozempic costs $1,399 a month and Zepbound $1,599. Standard shipping takes three to five business days, and there is no membership fee. The catch is the plan itself: the $49 rate depends on the twelve-month commitment, and reviewers paying month to month report $129. A full year of semaglutide on the plan comes to $588, the lowest year-one total on this page.
      </>
    ),
    support:
      "welludr's intake is reviewed by board-certified specialists, and every plan includes a Medical Weight-Care Coach. Reviewers mention support agents by name again and again, which is rare in this market and points to a staffed, human support team. On Reddit, users say welludr uses a Florida compounding pharmacy, and one names Logos, a 503A pharmacy. welludr has not confirmed its pharmacy to us.",
    trustpilotHeading: "welludr on Trustpilot: 4.6 from 2,188 reviews",
    trustpilot: (
      <>
        Checked {TRUSTPILOT_CHECKED} (<Ext href="https://www.trustpilot.com/review/wellmedr.com">welludr Trustpilot profile</Ext>; claimed, on a paid Trustpilot subscription). The recent good reviews are about staff: &ldquo;Malcom was great&rdquo;, &ldquo;Zara responded quickly&rdquo;, &ldquo;I talked to a person within minutes&rdquo;, plus a switcher who said the move went smoothly. The bad reviews are about timing: one customer waited a week for an order, another reported &ldquo;over 24 hours no contact&rdquo;, a third said prescriptions arrive late even when questions get answered, and a three-star reviewer says the company &ldquo;charges you every 21 days&rdquo;. <strong className="text-[#191919]">welludr earns its 4.6 mainly through service; the complaints concern speed.</strong>
      </>
    ),
    reddit: (
      <>
        On Reddit, welludr shows up mostly in comments: brief, recent verdicts from annual-plan customers. &ldquo;They are legit with their pharmacy in Florida. I did a ton of research and ended up <strong className="text-[#191919]">paying for a whole year at 88 a month</strong>,&rdquo; one user posted two months before we captured it. A second user pays $129 month to month and says that is the only charge. A third was thinking about switching because &ldquo;I can get a whole year for $99/month, that&rsquo;s the lowest I&rsquo;ve seen.&rdquo; On the other side is one detailed post from a user who moved over from another provider, stayed on the 15 mg tirzepatide dose, got the order promptly, and was still only one pound down after eight weeks on a prepaid six-month supply. That speaks to how the medication works for an individual, not to welludr&rsquo;s service. Excerpts come from GLP-1 subreddits, captured July to September 2026.
      </>
    ),
    cancellation:
      "Cancel before your next billing date. welludr refunds qualifying unfulfilled orders and services that were objectively not earned, the most refund-friendly language of the eight providers.",
    pros: ["Lowest ongoing price on this page, the same at every dose", "Weight-care coach included", "Weight-loss warranty", "Recent reviews name reachable support staff"],
    cons: ["The advertised rate requires a twelve-month plan", "Ships more slowly than the one-to-two-day providers", "One reviewer reports billing more often than once a calendar month", "Pharmacy not named on the website"],
    suits: "People who know they will stay on treatment for a year, want the lowest total cost, and care more about a coach and a support team that answers than about next-day delivery.",
    assessment: (
      <>
        Based on the evidence, welludr makes <strong className="text-[#191919]">the strongest value case on this page for long-term patients</strong>: the lowest verified ongoing price, service that Trustpilot and Reddit both describe as responsive, and refund terms more generous than most. In exchange you accept a commitment and slower shipping. If you are not yet sure you will stay on a GLP-1, start with a month-to-month provider and return to welludr later.
      </>
    ),
  },
  {
    id: "embody",
    overview: (
      <>
        embody is <strong className="text-[#191919]">the lowest-cost way on this page to try a compounded GLP-1 with no commitment</strong>. It bills month to month, charges the same at every dose, and ships faster than any other provider here. Reddit users call the experience &ldquo;autopilot&rdquo;, which explains both why people like it and where it falls short.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">embody charges $69 a month for semaglutide (regularly $79) and $119 for tirzepatide (regularly $129), billed month to month</strong>, verified October 16, 2026. Shipping is free, cold-chain and takes one to two days. There is no membership fee, and <strong className="text-[#191919]">embody refunds you in full if a provider does not approve treatment.</strong> embody holds LegitScript certification and names US-based 503A compounding pharmacies, the clearest pharmacy disclosure among the compounded providers on this page.
      </>
    ),
    support:
      "At embody, a licensed provider writes the prescription, usually within a day. A nursing team handles check-ins by message, and reviewers also mention video appointments. The model is intentionally self-serve. Reddit users say dose increases were approved without resistance at the monthly check-in, and one user describes a nurse phoning after the first dose to ask about side effects.",
    trustpilotHeading: "embody on Trustpilot: 3.8 from 9,604 reviews",
    trustpilot: (
      <>
        Checked {TRUSTPILOT_CHECKED} (<Ext href="https://www.trustpilot.com/review/joinem.co">embody Trustpilot profile</Ext>; claimed, on a paid Trustpilot subscription). Good reviews center on clinicians: &ldquo;The doctor listened to me today&rdquo;, &ldquo;provider above and beyond&rdquo;, &ldquo;My appointment went great&rdquo;. Bad reviews center on shipping and support: a three-star review headed &ldquo;Shipping delays kill score&rdquo;, a two-star &ldquo;Dismal customer support with errors&rdquo;, and a three-star account of a doctor missing three video appointments. A 3.8 average across nearly ten thousand reviews is a truly mixed record, and the theme is consistent: <strong className="text-[#191919]">smooth when everything works, thin when something breaks</strong>.
      </>
    ),
    reddit: (
      <>
        A{" "}
        <Ext href="https://www.reddit.com/r/compoundedtirzepatide/comments/1utd6g7/has_anyone_tried_em_ie_embody_the_price_is_good/">r/compoundedtirzepatide thread about embody</Ext>{" "}
        asked whether anyone had used embody, since &ldquo;the price is good&rdquo;. One user who left a provider after progress stalled replied: &ldquo;The med check was quick and I was <strong className="text-[#191919]">approved same day, got my vial in just one week</strong>. Now 3 weeks in they bumped my dose... Everything is on autopilot, that&rsquo;s how they keep costs low.&rdquo; Another user in the thread switched from a different provider, got approval the next day, had the order ship two days after that, and kept the same dose as before. In other captured comments, users mention $129 tirzepatide &ldquo;for all levels&rdquo; with no contract, a refill option one person could not locate in the dashboard (others pointed to the text line and the monthly check-in form), support replies one user suspected were AI-written, and one case of two weeks between approval and shipping.
      </>
    ),
    cancellation:
      "Give 72 hours' notice before your renewal date. Payments are generally final, with a narrow exception if a provider finds you medically ineligible.",
    pros: ["Lowest price on this page without a commitment", "Ships in one to two days", "Dose increases are approved without friction", "Names its 503A pharmacies and holds LegitScript certification"],
    cons: ["Limited human contact by design", "Repeated shipping and support complaints on Trustpilot", "72-hour notice rule, and payments are otherwise final", "No coach or dietician"],
    suits: "People who want to try a GLP-1 without signing up for a plan, are comfortable using a patient portal, and prefer fast delivery over coaching.",
    assessment: (
      <>
        embody is <strong className="text-[#191919]">a sensible starting point if you are unsure a GLP-1 is right for you</strong>: low price, no commitment, quick delivery and a refund if you are not approved. Both review platforms agree on the trade-off, which is the lack of a person to talk to when something goes wrong. Reorder well before your supply runs out, because the wait between approval and shipping is the complaint that keeps coming up.
      </>
    ),
  },
  {
    id: "eden",
    overview: (
      <>
        Eden charges <strong className="text-[#191919]">a single all-inclusive monthly price for compounded semaglutide or tirzepatide that stays the same in month two, month three and at every dose</strong>, with no membership and no annual or long-term plan. Eden&rsquo;s Trustpilot average is among the highest on this page, and almost all of its recent reviews praise support staff by name.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">Eden charges $99 a month for semaglutide and $129 a month for tirzepatide, every month and at every dose</strong>. We captured these prices from Eden&rsquo;s pricing page on October 13, 2026; the page&rsquo;s own table lists the same figure for month one, month two, month three and &ldquo;every month&rdquo;. There is no membership, no annual or long-term plan and no insurance requirement, and Eden says its free assessment takes about three minutes. That matches Medvi&rsquo;s $99 promotional semaglutide price without a promotion that can lapse, and puts Eden&rsquo;s $129 tirzepatide among the lowest flat, no-commitment tirzepatide prices we track. The pricing page we captured does not state shipping time or cost.
      </>
    ),
    support:
      "Eden includes doctor-guided clinical care and 24/7 human support in the price. Eden says its medication is made in the US under strict quality oversight; the pages we captured do not name the compounding pharmacy. Recent Trustpilot reviews back up the support claim: nearly every one names the agent who helped, and one says the messaging process \"worked much better than trying to get someone on the phone.\"",
    trustpilotHeading: "Eden on Trustpilot: 4.5 from 4,917 reviews",
    trustpilot: (
      <>
        Checked October 13, 2026 (<Ext href="https://www.trustpilot.com/review/tryeden.com">Eden Trustpilot profile</Ext>; claimed since June 2024, on a paid Trustpilot subscription). Every one of the newest reviews we captured, dated October 1 to 12, is five stars and about a person: &ldquo;Ann was a great help&rdquo;, &ldquo;MELANIE was fantastic!!&rdquo;, &ldquo;Sandra was super helpful!&rdquo;, &ldquo;Joanne with customer support was great&rdquo;, &ldquo;Prompt and helpful&rdquo;. A customer who switched after another provider raised prices wrote that Eden&rsquo;s &ldquo;high ratings for fair pricing, customer service, and support of the doctors was the deciding factor for me, and they were spot on.&rdquo; A named support lead replies to reviews on Eden&rsquo;s behalf. <strong className="text-[#191919]">This is the strongest support record on this page, though we read only the newest page of reviews, not all 4,917.</strong>
      </>
    ),
    reddit: (
      <>
        <strong className="text-[#191919]">We did not find any substantive, verifiable Reddit discussion of Eden</strong> in the communities we searched when writing this page. Some third-party review sites refer to Reddit opinion without linking any threads, so we leave that out. For now, Trustpilot is Eden&rsquo;s available independent record.
      </>
    ),
    cancellation:
      "Eden's published terms were outside our October 12 review, so we do not summarize them here. Eden's pricing page says no annual or long-term plan is required. We will add Eden's cancellation and refund terms after reviewing them.",
    pros: ["Flat $99 / $129 with no first-month gimmick and no promotion to run out", "No membership and no annual or long-term plan", "4.5 from 4,917 Trustpilot reviews, with staff praised by name in nearly every recent review", "Doctor-guided care and 24/7 human support included"],
    cons: ["No Reddit record to cross-check", "Shipping time and cost missing from the pricing page", "Compounded medication only, with no brand-name options and no named pharmacy", "FDA warning letter on marketing, June 2026 (details below)"],
    suits: "People who want one fixed monthly cost they can plan around for a year without signing a plan, who value reachable human support, and tirzepatide patients who want a flat price without paying a premium.",
    assessment: (
      <>
        In June 2026 the FDA sent Eden Health International, Inc. a{" "}
        <Ext href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/eden-health-international-inc-dba-eden-728279-06082026">warning letter about its compounded GLP-1 marketing</Ext>{" "}
        concerning claims on its website. It was one of 25 such letters sent to telehealth companies that month, and the same type of letter altRx received. The letter addresses marketing wording, not the medication or patient safety. We mention it because readers should know, and because no compounded GLP-1 from any provider is FDA-approved. Looking at the rest of the evidence, <strong className="text-[#191919]">Eden ranks among the strongest no-commitment choices on this page</strong>: a price that stays put, a large Trustpilot record that is consistently positive about support, and $129 tirzepatide with no contract. What is missing is information rather than a pattern of complaints, so confirm the shipping time at checkout and ask which pharmacy fills your prescription.
      </>
    ),
  },
  {
    id: "directmeds",
    overview: (
      <>
        DirectMeds is a pharmacy-direct telehealth service with <strong className="text-[#191919]">the simplest pricing of the eight</strong>: a single flat price for compounded semaglutide or tirzepatide, as a weekly injection or sublingual drops, with the telemedicine visit included and no membership. DirectMeds also has <strong className="text-[#191919]">the largest Trustpilot record on this page</strong>.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">DirectMeds charges $147 a month for either medication in either format, at every dose</strong>, verified October 16, 2026. Shipping is free and takes one to two days. There is no membership, DirectMeds advertises no hidden fees, and you can cancel at any time. The needle-free drops cost the same $147, which no other provider here matches (Medvi&rsquo;s tablets cost $249).
      </>
    ),
    support:
      "DirectMeds includes the telemedicine visit and the prescription. It offers no coaching or dietician; it is a medication-plus-visit service. Reviewers name support representatives often, much as welludr's reviewers do. The website does not name the dispensing pharmacy; \"pharmacy-direct\" is how the company describes its own model.",
    trustpilotHeading: "DirectMeds on Trustpilot: 4.6 from 16,390 reviews",
    trustpilot: (
      <>
        Checked {TRUSTPILOT_CHECKED} (<Ext href="https://www.trustpilot.com/review/directmeds.com">DirectMeds Trustpilot profile</Ext>; claimed, on a paid Trustpilot subscription). Recent pages are full of praise for named agents: &ldquo;Chelsea King and Matthew Jakins... patient and kind&rdquo;, &ldquo;Belinda was very good&rdquo;, &ldquo;Signup process was straight forward&rdquo;. The negative reviews concern fulfillment: a two-star review about an order placed September 4 that was still open on September 23, and a three-star &ldquo;I have had a few issues with this company&rdquo;. DirectMeds sells products beyond GLP-1s, and a complaint about a NAD order appears in the same feed. In short: <strong className="text-[#191919]">support is DirectMeds&rsquo; strength and delivery timing its weakness</strong>.
      </>
    ),
    reddit: (
      <>
        We found <strong className="text-[#191919]">no substantive, verifiable Reddit discussion of DirectMeds</strong> in the communities we searched. A third-party review site summarizes Reddit complaints about shipments sent to the wrong address and semaglutide sent in place of tirzepatide, but it links no threads, so we do not treat those reports as confirmed. For now, the Trustpilot profile is the more complete independent record.
      </>
    ),
    cancellation:
      "You can cancel a subscription, and there is a short window to cancel a prescription order before processing moves forward. Refund requests made before shipment are reviewed case by case.",
    pros: ["One price for both drugs, both formats, every dose", "Needle-free drops at no extra cost", "Largest review base on this page, at 4.6", "One-to-two-day shipping and no membership"],
    cons: ["No coaching", "Trustpilot complaints about fulfillment delays", "No Reddit record to cross-check", "Pharmacy not named"],
    suits: "People who want predictable billing with no math to do, or a needle-free option at the same price, and who do not need coaching.",
    assessment: (
      <>
        DirectMeds has <strong className="text-[#191919]">the easiest monthly budget to understand on this page</strong>, and its support reputation matches the best here. Without a Reddit record we have one independent source for DirectMeds instead of two, and the delivery complaints are specific enough to take seriously: get the shipping timeline in writing before you pay.
      </>
    ),
  },
  {
    id: "medvi",
    overview: (
      <>
        Medvi delivers compounded semaglutide or tirzepatide inside <strong className="text-[#191919]">the most hands-on clinical program on this page</strong>: video visits with a provider or nurse practitioner, a dietician and care coaching, with medication and shipping in one price, HSA/FSA eligibility and a needle-free tablet option. On both review platforms, people write more about Medvi&rsquo;s care than its price.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">Medvi&rsquo;s current promotion is $99 a month for semaglutide and $166 a month for tirzepatide</strong>, against regular prices of $199 and $299. Oral dissolving tablets cost $249. Verified October 16, 2026. Shipping is free, there is no membership, and billing is monthly. Medvi publishes no end date for the promotion, so plan your budget around the regular price.
      </>
    ),
    support:
      "Medvi routes clinical evaluations and prescriptions through a network of licensed providers. Patients interact through video visits and secure messaging, with a dietician and coaching included. This care is the most consistent source of praise in Medvi's reviews. The website does not name the pharmacy.",
    trustpilotHeading: "Medvi on Trustpilot: 4.3 from 14,987 reviews",
    trustpilot: (
      <>
        Checked {TRUSTPILOT_CHECKED} (<Ext href="https://www.trustpilot.com/review/medvi.org">Medvi Trustpilot profile</Ext>; claimed, on a paid Trustpilot subscription). The good reviews are about clinicians: &ldquo;Nurse was very informative and pleasant&rdquo;, &ldquo;Great check-in appointment&rdquo;, &ldquo;The RN was very helpful with my medical history&rdquo;, &ldquo;that you meet with a real provider... via video call&rdquo;. The bad reviews concentrate on billing and cancelling: &ldquo;At first had a hard time canceling my monthly subscription&rdquo; (four stars, later resolved), followed by a series of one-star reviews titled &ldquo;Caution is advised&rdquo;, &ldquo;Lots of confusion and delays&rdquo;, &ldquo;Started great, ended poorly&rdquo; and &ldquo;Medvi shady practices&rdquo;. Medvi responds to almost every negative review. In short: <strong className="text-[#191919]">reviewers rate Medvi&rsquo;s clinical care highly, and the subscription mechanics cause the complaints</strong>.
      </>
    ),
    reddit: (
      <>
        Medvi&rsquo;s top recent Reddit threads cover a full year of treatment rather than first impressions. In r/telehealth, the post &ldquo;Medvi GLP-1 telehealth experience breakdown&rdquo; (55 upvotes, 8 comments, posted about six months before our capture) describes contact from a licensed provider within days, mild nausea with each dose increase, a mid-year plateau solved by a dose adjustment over messaging, and <strong className="text-[#191919]">just under 15 percent of starting body weight lost in twelve months</strong>; &ldquo;the main factor to consider is cost since it is an ongoing monthly expense.&rdquo; In r/productreview, &ldquo;My 2026 MEDVI review after using it for a full year&rdquo; (55 upvotes, 31 comments) reports <strong className="text-[#191919]">just over 40 pounds lost</strong> and a calmer relationship with hunger, and one reply calls Medvi &ldquo;the best triz provider I ever had&rdquo; after trying three providers. Both posts are firsthand accounts that cannot be verified beyond what the authors say.
      </>
    ),
    cancellation:
      "Give 72 hours' notice before renewal. You can get an early refund if you cancel within the first 72 hours of a subscription term and have not received any services.",
    pros: ["The most complete clinical package here, included in the price", "Video visits that reviewers praise consistently", "HSA/FSA accepted; needle-free tablets available", "Second-largest review base on this page"],
    cons: ["Promotional prices with no published end date", "Repeated cancellation and billing complaints", "Tablets cost much more than injections", "Pharmacy not named"],
    suits: "People whose earlier weight loss attempts lacked structure and who want scheduled clinical contact, or who plan to pay with HSA/FSA funds.",
    assessment: (
      <>
        Medvi is <strong className="text-[#191919]">the pick when care matters more than price</strong>, and the evidence backs up the care: two platforms, hundreds of recent reviews and two year-long Reddit accounts agree. The warning is just as consistent. Know your renewal date, the 72-hour rule and the regular price before you start, because that is where Medvi&rsquo;s unhappy customers got caught.
      </>
    ),
  },
  {
    id: "trimrx",
    overview: (
      <>
        TrimRx offers compounded semaglutide and tirzepatide with <strong className="text-[#191919]">custom dosing, unlimited provider check-ins and no long-term contract</strong>, plus a results guarantee for new patients. TrimRx has the most divided Trustpilot record on this page, with praise and complaints aimed at different parts of the company.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">TrimRx charges $149 a month for semaglutide at every dose</strong>, which includes a $140 discount off a regular $289; tirzepatide costs $259. Verified October 16, 2026, and in line with the &ldquo;Save $140, plans from $149&rdquo; offer on TrimRx&rsquo;s homepage on October 11, 2026. Tracked delivery is free, the consultation is included, and insurance is not needed. TrimRx acts as the platform: its terms say it is not itself a healthcare provider, and the company behind it is MetaFit Pharma Solutions LLC.
      </>
    ),
    support:
      "TrimRx starts with a free two-minute assessment and review by a licensed clinician, followed by custom dosing with unlimited check-ins included. Reviewers call the screening thorough and the intake clear. The website does not name the compounding pharmacy. TrimRx's advertised three-month results guarantee requires you to follow the plan and complete monthly check-ins.",
    trustpilotHeading: "TrimRx on Trustpilot: 3.8 from 5,392 reviews",
    trustpilot: (
      <>
        Checked {TRUSTPILOT_CHECKED} (<Ext href="https://www.trustpilot.com/review/trimrx.com">TrimRx Trustpilot profile</Ext>; claimed, on a paid Trustpilot subscription). The five-star reviews focus on clarity and cost: &ldquo;Clear pricing&rdquo;, &ldquo;Priced fairly and easy to use&rdquo;, &ldquo;Screening was more thorough than I expected&rdquo;, &ldquo;My old provider was charging me close to double&rdquo;, &ldquo;Shipping runs two or three days&rdquo;. The low-star reviews focus on money and delivery: a first order charged at twice the quoted price with no response, &ldquo;Unreliable! Potentially crooks!&rdquo;, a tracking date that changed twice, and a refund still not issued a month after the customer cancelled within an hour of ordering. Trustpilot&rsquo;s own profile summary flags significant dissatisfaction with payment practices. Both things hold: <strong className="text-[#191919]">many TrimRx customers find the pricing clear, and a persistent minority report charges they did not expect</strong>.
      </>
    ),
    reddit: (
      <>
        We found <strong className="text-[#191919]">no substantive Reddit discussion of TrimRx</strong> in the communities we searched. The only Reddit mention we came across was a Trustpilot reviewer saying they discovered TrimRx &ldquo;through a reddit thread&rdquo;. We will not fill that gap with guesses. If you are considering TrimRx, Trustpilot is the independent record to read, and both the high and low reviews are worth your time.
      </>
    ),
    cancellation:
      "You can cancel future subscriptions. Refunds are limited for prepaid packages, and the results guarantee has conditions.",
    pros: ["No long-term contract", "Custom dosing and unlimited check-ins included in the price", "Clear semaglutide pricing that does not change by dose in the captured offer", "A results guarantee, subject to conditions"],
    cons: ["Recurring payment and refund complaints", "Priced in the middle, above the sub-$100 providers here", "No Reddit record and no named pharmacy", "Prepaid packages are non-refundable"],
    suits: "People who want a clinician to tailor the dose to them instead of following a fixed schedule, who like frequent check-ins, and who will pay monthly rather than prepay.",
    assessment: (
      <>
        TrimRx&rsquo;s care model is its main selling point, and recent reviewers who experienced it are plainly happy. The billing record is why you should proceed with care: <strong className="text-[#191919]">pay month to month, keep the quoted price in writing, and treat the guarantee as conditional</strong>. Based on this evidence, TrimRx is a reasonable option for people who value check-ins, but not the first place we would point someone shopping on price.
      </>
    ),
  },
  {
    id: "altrx",
    overview: (
      <>
        altRx pairs <strong className="text-[#191919]">compounded pricing that stays flat at every dose with brand-name Ozempic, Zepbound and Wegovy</strong>, plus Buy Now, Pay Later. That makes altRx the only provider here that serves both cash-pay compounded patients and people who want an FDA-approved product without insurance.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">altRx&rsquo;s promotional prices are $89 a month for compounded semaglutide and $149 a month for tirzepatide</strong>, against regular prices of $199 and $299, with the same price at every dose. Brand-name Ozempic costs $1,149, Zepbound $1,249 and Wegovy $1,579. Verified October 16, 2026. Shipping is free and takes five to seven days. There is no membership, you can pause or cancel at any time, and BNPL is offered. altRx has pushed back the promotion&rsquo;s published end date at least twice (to September 20, then September 25, as logged in our <L href="/glp1-price-changes">GLP-1 price change log</L>), so the price has held so far, but that does not make it permanent. A Reddit user posting three months before our capture mentioned a $129 first-month tirzepatide offer, which shows promotions shift.
      </>
    ),
    support:
      "altRx provides clinician-guided care with all supplies in the box (vials, syringes and prep pads). The Reddit account below describes being matched with a provider within hours of submitting the form and cold-chain delivery the next day, and a Trustpilot reviewer praises a representative by name. altRx's website does not name its pharmacy; the Reddit account names Strive Pharmacy.",
    trustpilotHeading: "altRx on Trustpilot: no profile",
    trustpilot: (
      <>
        <strong className="text-[#191919]">altRx does not have a Trustpilot profile.</strong> The individual reviews collected on <L href="/reviews/altrx">our altRx review</L> are four- and five-star accounts of helpful, named support staff and easy sign-up, including one from a customer four months into treatment. Reviews found through search describe promo-tier mix-ups: a charge $40 higher than the advertised $89, an order filled with semaglutide after the customer paid for tirzepatide, and a customer approved for a different tier than the one selected. With no aggregate to compare against, read these as individual reports.
      </>
    ),
    reddit: (
      <>
        The most detailed firsthand account we have is a thread titled &ldquo;MY ALTRX EXPERIENCE!!&rdquo;, captured about three months before our research. The user signed up for the first-month tirzepatide offer at 8am, was assigned a provider at 12:30pm, had a prescription at the pharmacy by 1:30pm, and received two vials in a cooler by UPS Next Day Air the next morning, with beyond-use dates printed on them; &ldquo;I wish their monthly price was cheaper! <strong className="text-[#191919]">I give them a 10/10</strong>.&rdquo; The replies offer balance: one user&rsquo;s compounded blend containing glycine and B12 caused dehydration and joint pain that faded as the dose cleared, and another new patient was still waiting on a prescription after 24 hours.
      </>
    ),
    cancellation:
      "Give 72 hours' notice before renewal. Paid subscriptions are generally non-refundable, including unused months of multi-month plans, which matters if you choose a multi-month plan or BNPL.",
    pros: ["One price at every dose", "Widest choice of medications here, including brand-name", "Buy Now, Pay Later", "Quick approval and cold-chain delivery in the firsthand account"],
    cons: ["Standard shipping is slower than the one-to-two-day providers", "No Trustpilot profile to check", "Reports of promo-tier billing issues; multi-month plans are non-refundable", "The FDA letter described below"],
    suits: "People who want brand-name medication at a cash price or with financing, or compounded pricing that does not rise with the dose, and who are comfortable without a Trustpilot record to consult.",
    assessment: (
      <>
        In June 2026 the FDA sent altRx&rsquo;s parent company, Trinity HealthCare Supply, LLC, a{" "}
        <Ext href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/trinity-healthcare-supply-llc-dba-altrx-728236-06082026">warning letter about its website marketing</Ext>{" "}
        covering two issues: product images bearing the altRx name, which the agency said could imply altRx compounds the medication itself, and the phrase &ldquo;clinically proven,&rdquo; which the agency said could suggest the FDA had evaluated a compounded product. <strong className="text-[#191919]">The letter is about marketing wording, not a finding about the medication or patient safety</strong>, and it is part of a wider FDA effort that has sent well over a hundred similar letters to telehealth companies since 2025. We include it because readers should know, and because it underlines that no compounded GLP-1 from any provider is FDA-approved. Otherwise, altRx&rsquo;s offer is distinctive and its one detailed firsthand account is very positive. The lack of an aggregate review record and the promo-tier reports are reasons to read the checkout page carefully and save your confirmation.
      </>
    ),
  },
  {
    id: "ro",
    overview: (
      <>
        ro is <strong className="text-[#191919]">the only provider on this page built mainly around FDA-approved medication</strong>: the Wegovy pill and pen and the Zepbound KwikPen, filled through ro&rsquo;s own pharmacy, with a membership charged separately from the drug. That split is why insurance can cover the medication, and also why ro customers on both platforms find the cost hard to follow.
      </>
    ),
    pricing: (
      <>
        ro&rsquo;s Body membership costs <strong className="text-[#191919]">$39 for the first month, then $74 to $149 a month</strong> depending on the plan ($74 on a twelve-month prepaid plan, $149 month to month). <strong className="text-[#191919]">The medication is a separate charge</strong>: the Wegovy pill is $149 the first month, then $299; the Wegovy pen starts at $199 at introductory rates, then $299 to $399; the Zepbound KwikPen starts at $299 the first month, then $399 to $449, rising with the dose. These are ro&rsquo;s published prices, captured August 2026. If a commercial insurance plan covers the medication, you pay the membership plus your copay. Paying cash for the Wegovy pill month to month, the first year costs roughly $4,300 to $5,100 including membership, depending on the membership tier; the <L href="/articles/wegovy-pill-price-online">Wegovy pill price guide</L> walks through the math.
      </>
    ),
    support:
      "Licensed providers review every ro case, and follow-up happens by message. A phone line is the most common request in recent reviews. ro dispenses through its in-house pharmacy, the clearest pharmacy answer on this page. ro was reported as not among the thirty telehealth companies that received FDA marketing warning letters in March 2026.",
    trustpilotHeading: "ro on Trustpilot: 3.9 from 7,105 reviews",
    trustpilot: (
      <>
        Checked {TRUSTPILOT_CHECKED} (<Ext href="https://www.trustpilot.com/review/ro.co">ro Trustpilot profile</Ext>; claimed, on a paid Trustpilot subscription). Good reviews describe a simple application, nurse-practitioner appointments that ran on time and questions that got answered. The negative themes are specific and repeated: &ldquo;I wish you had a phone # for better service&rdquo;, &ldquo;Needed to contact Ro by phone&rdquo;, &ldquo;My delivery was delayed for 4 days&rdquo;, &ldquo;I didn&rsquo;t understand that $39 initial&rdquo; was not the ongoing price, &ldquo;Would be nice to know the possible fee&rdquo; before signing up, and one reviewer who was given the lowest dose without a conversation. Both platforms tell the same story: <strong className="text-[#191919]">people praise ro&rsquo;s results and easy start, and struggle with its price structure and reachability</strong>.
      </>
    ),
    reddit: (
      <>
        ro&rsquo;s Reddit threads include more hard numbers than most. &ldquo;I used Ro for 3 months and <strong className="text-[#191919]">dropped 25 lbs</strong>... I personally had a great experience with Ro and they were seamless throughout the whole process. <strong className="text-[#191919]">The pricing ended up being the deciding factor</strong> for me after those few months,&rdquo; wrote the most-upvoted commenter we captured, who later switched to a cheaper provider. A member since January 2024 reports losing 50 to 60 pounds on Wegovy covered by insurance and filled at a retail pharmacy. Another user reports 22 pounds in three months. On the other side, a Zepbound user two months into 2.5 mg vials had lost one pound and described it as &ldquo;expensive and frustrating&rdquo;, and a prospective customer asked, &ldquo;Could someone explain the cost breakdown to me? It&rsquo;s somewhat confusing.&rdquo; Excerpts were captured four to five months before our research.
      </>
    ),
    cancellation: "Cancel at least 48 hours before the membership renews. Membership fees are generally non-refundable.",
    pros: ["FDA-approved medication is the main offer", "Insurance may cover the drug", "In-house pharmacy", "Substantial results reported on Reddit"],
    cons: ["Two bills a month and a pricing structure customers on both platforms find confusing", "No phone support", "Non-refundable membership fees and a 48-hour cancellation rule", "The highest cash cost on this page by a wide margin"],
    suits: "People whose insurance covers Wegovy or Zepbound, or who want the brand-name product and have worked out the membership-plus-medication math before starting.",
    assessment: (
      <>
        <strong className="text-[#191919]">With insurance coverage, ro may be the cheapest FDA-approved route on this page</strong> and the easiest to justify clinically. Paying cash, ro is the most expensive by far, and the customers who left mostly cited price, not service. Before paying the $39 first month, add up the membership and the medication at the dose you expect to stay on, and save that figure.
      </>
    ),
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the main difference between GLP-1 telehealth providers?",
    answer:
      "GLP-1 telehealth providers differ in four main ways: what they sell (compounded semaglutide and tirzepatide, brand-name drugs, or both), how they price it (one flat monthly price, a promotional rate that later rises, a twelve-month plan, or a membership plus medication), how much clinical contact comes with it (from a portal and nurse messaging to video visits with a dietician), and how cancellation works (notice periods and refund rules). The comparison table on this page lines up all eight providers on each of these.",
  },
  {
    question: "What does a GLP-1 subscription usually include?",
    answer:
      "At the compounded providers on this page, the monthly price covers the clinician review, the medication, supplies, shipping and some kind of follow-up. The depth of that follow-up and whether the price holds at every dose vary by provider. ro's membership covers only the clinical service; the medication is billed separately, which is also why insurance can apply to it.",
  },
  {
    question: "Are low introductory GLP-1 prices misleading?",
    answer:
      "Introductory GLP-1 prices are usually incomplete rather than false. Each provider on this page publishes its ongoing price somewhere, but the headline figure tends to be the lowest one. Reviews that complain about being misled nearly always involve a first-month price mistaken for the ongoing rate or a promotional tier billed differently, so find the month-two price before paying and ask for it if it is not shown.",
  },
  {
    question: "How do I check that a GLP-1 telehealth provider is legitimate?",
    answer:
      "Confirm that a licensed clinician reviews your intake before anything is prescribed, that the provider names a state-licensed pharmacy, that the price and its conditions are in writing, and that the terms explain how to cancel. If the medication is compounded, keep in mind that no compounded GLP-1 is FDA-approved, no matter who sells it.",
  },
  {
    question: "What should I ask before switching GLP-1 providers?",
    answer:
      "Ask whether the new provider will continue your current dose (several Reddit accounts on this page describe this going smoothly) and how long it takes from approval to shipment, so you can switch before your supply runs out. Ask for the price at your current dose, not the starting dose. Also check your current provider's notice period so you are not billed by both.",
  },
  {
    question: "How are FDA-approved GLP-1 drugs different from compounded ones?",
    answer:
      "FDA-approved products such as Wegovy, Zepbound, Ozempic, the Wegovy pill and Foundayo are manufactured, inspected and labeled as finished drugs, each backed by its own clinical trials. Compounded semaglutide or tirzepatide is prepared by a licensed compounding pharmacy for an individual prescription. Compounding is a lawful, regulated channel, but the FDA does not review each pharmacy's product, and the clinical trial evidence applies to the approved products.",
  },
];

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const short = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-4 scroll-mt-24 text-[23px] font-bold text-[#191919] sm:text-[26px]">
      {children}
    </h2>
  );
}
function H3({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 mt-6 text-[15px] font-bold uppercase tracking-[0.05em] text-[#0C4B75]">{children}</h3>;
}

export default async function Glp1ProviderComparisonPage() {
  const config = await getConfig();
  const byId = (id: Pid) => config.providers.find((p) => p.id === id);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GLP-1 Telehealth Providers Compared for 2026: Prices, Month-Two Costs and Customer Reviews",
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    ...pageReviewSchema("/glp1-provider-comparison"),
    author: { "@type": "Organization", name: "Top Weight Loss Team", url: "https://www.topweightloss.us" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Provider Comparison", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const ctaClass =
    "inline-flex h-[40px] items-center justify-center gap-1.5 rounded-lg bg-[#0C4B75] px-4 text-[13.5px] font-bold text-white transition-colors hover:bg-[#093d61]";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "GLP-1 Provider Comparison" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            GLP-1 Telehealth Providers Compared for 2026: Prices, Month-Two Costs and Customer Reviews
          </h1>
          <p className="mt-3 max-w-[720px] text-[15.5px] leading-relaxed text-gray-500">
            The lowest ongoing GLP-1 price we track is welludr&rsquo;s $49 a month for semaglutide on a twelve-month
            plan, and the lowest no-commitment price is embody&rsquo;s $69. But the advertised price is only part of the
            answer. This page compares eight online providers (welludr, embody, Eden, DirectMeds, Medvi, TrimRx, altRx
            and ro) across four pricing models and two kinds of medication, on what you will pay by month three and
            whether anyone responds when something goes wrong. Each provider is checked against its published prices,
            its Trustpilot record, firsthand Reddit discussion and its cancellation terms. Every figure is dated and
            sourced, and anything we could not verify is labeled.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] font-bold text-gray-500">
            <LastUpdated date={UPDATED} />
            <span>Prices verified {short(PRICE_INDEX_VERIFIED)} (ro: Aug 2026)</span>
            <span>Trustpilot checked {short(UPDATED)}</span>
          </div>
          <MedicalReviewBar path="/glp1-provider-comparison" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Affiliate disclosure - prominent, before the table */}
        <div className="mb-10 rounded-2xl border border-[#0C4B75]/20 bg-white p-5 shadow-sm sm:p-6">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">How Top Weight Loss earns money</p>
          <p className="text-[14.5px] leading-[1.75] text-gray-700">
            Top Weight Loss may receive a commission if you visit or buy through links on this page, at no extra cost
            to you. This comparison draws on public provider information, independent customer review sources and
            documented research. We disclose our affiliate relationships, and they do not decide our editorial
            conclusions. All eight providers below are commercial partners, and we would publish the same pricing,
            review and policy facts if they were not.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <H2 id="why-it-is-hard">Why are GLP-1 provider prices so hard to compare?</H2>
          <p className="mb-4">
            GLP-1 provider prices are hard to compare because the advertised number is rarely what you pay in month
            two. Across eight provider homepages you will find eight headline prices measuring different things: some
            are first-month promotions, some are the monthly rate on a twelve-month plan, and one is a membership fee
            that excludes the medication entirely. Lining them up as printed compares eight unlike quantities.
          </p>
          <p className="mb-3">These six factors change what you actually pay and experience:</p>
          <ul className="mb-4 space-y-2 pl-5">
            <li className="list-disc"><strong className="text-[#191919]">Advertised versus ongoing price.</strong> Promotions, prepaid plans and first-month deals all create a low headline figure. What matters is the price you keep paying.</li>
            <li className="list-disc"><strong className="text-[#191919]">Membership versus medication.</strong> Most providers charge one all-in price. ro charges a membership and the medication separately, which changes the math and allows insurance to cover the drug.</li>
            <li className="list-disc"><strong className="text-[#191919]">Clinical contact.</strong> Options range from video visits with a nurse practitioner and a dietician to a mostly self-serve portal with a nurse reachable by text.</li>
            <li className="list-disc"><strong className="text-[#191919]">Pharmacy.</strong> Compounded semaglutide and tirzepatide are made by a compounding pharmacy, and providers do not always say which.</li>
            <li className="list-disc"><strong className="text-[#191919]">Billing cycle.</strong> According to reviewers, &ldquo;monthly&rdquo; can mean every 28 days, every four weeks or every 21 days.</li>
            <li className="list-disc"><strong className="text-[#191919]">Refund rules.</strong> Most providers let you stop future charges, far fewer refund money already collected, and 48- to 72-hour notice periods are common.</li>
          </ul>
          <p>
            To get past this, we checked four sources for every provider: its published pricing, captured and dated;
            its Trustpilot profile, checked on {TRUSTPILOT_CHECKED}; firsthand Reddit discussions; and its published
            cancellation and refund terms, reviewed on {TERMS_REVIEWED}. The{" "}
            <a href="#methodology" className="font-semibold text-[#0C4B75] hover:underline">research methodology</a> below explains the full process.
          </p>
        </section>

        {/* Section 2: table */}
        <section className="mb-12">
          <H2 id="comparison-table">GLP-1 provider comparison table: prices, shipping and reviews</H2>
          <p className="mb-5 text-[14px] text-gray-500">
            Prices come from our verified index ({fmt(PRICE_INDEX_VERIFIED)}); ro&rsquo;s come from its published pricing,
            August 2026. Trustpilot figures are as shown on the date listed. This table has no scores and no ranking.
          </p>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white sm:block">
            <table className="w-full min-w-[900px] text-left text-[13px] leading-snug">
              <caption className="sr-only">Comparison of eight GLP-1 telehealth providers by medications, price, membership, shipping, clinical support and Trustpilot rating</caption>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Provider", "Medications", "Advertised price", "From month 2", "Shipping", "Clinical support", "Trustpilot", "Strength and drawback"].map((h, i) => (
                    <th key={i} scope="col" className={`px-3 py-3 font-bold text-[#191919] ${i === 0 ? "sticky left-0 z-10 bg-gray-50" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ROWS.map((r) => {
                  const p = byId(r.id);
                  return (
                    <tr key={r.id} className="align-top">
                      <th scope="row" className="sticky left-0 z-10 bg-white px-3 py-3">
                        <Link href={`/reviews/${r.id}`} className="flex h-[30px] w-[96px] items-center" title={`${r.name} review`}>
                          {p ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.logo} alt={r.name} width={96} height={30} className="max-h-full max-w-full object-contain object-left" loading="lazy" decoding="async" />
                          ) : (
                            <span className="font-semibold text-[#191919]">{r.name}</span>
                          )}
                        </Link>
                        {p && (
                          <ProviderCta href={p.affiliateUrl} providerName={r.name} providerSlug={r.id} pageType="comparison" sourceFlow="provider_comparison" className={`${ctaClass} mt-3 h-[34px] whitespace-nowrap px-3 text-[12.5px]`}>
                            See prices <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                          </ProviderCta>
                        )}
                      </th>
                      <td className="px-3 py-3 text-gray-600">{r.medications}</td>
                      <td className="px-3 py-3 text-gray-800"><strong className="text-[#191919]">{r.entry}</strong><br /><span className="text-[12px] text-gray-500">{r.entryNote}</span></td>
                      <td className="px-3 py-3 text-gray-600">{r.after}</td>
                      <td className="px-3 py-3 text-gray-600">{r.shipping}</td>
                      <td className="px-3 py-3 text-gray-600">{r.support}</td>
                      <td className="px-3 py-3 text-gray-600">
                        {r.trustpilot ? (
                          <>
                            <strong className="text-[#191919]">{r.trustpilot.rating}</strong> from {r.trustpilot.count}
                            <br />
                            <a href={r.trustpilot.url} target="_blank" rel="noopener" className="text-[12px] text-[#0C4B75] hover:underline">profile checked {r.trustpilot.checked.replace("October", "Oct").replace("September", "Sep")}</a>
                          </>
                        ) : (
                          "No Trustpilot profile"
                        )}
                      </td>
                      <td className="px-3 py-3 text-gray-600">
                        <span className="block text-emerald-700"><span aria-hidden="true">+ </span>{r.advantage}</span>
                        <span className="mt-1 block text-gray-500"><span aria-hidden="true">&minus; </span>{r.limitation}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 sm:hidden">
            {ROWS.map((r) => {
              const p = byId(r.id);
              const cell = (label: string, value: ReactNode) => (
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-gray-400">{label}</p>
                  <p className="text-[13.5px] text-gray-700">{value}</p>
                </div>
              );
              return (
                <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <Link href={`/reviews/${r.id}`} className="mb-3 flex h-[30px] w-[110px] items-center" title={`${r.name} review`}>
                    {p ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt={r.name} width={110} height={30} className="max-h-full max-w-full object-contain object-left" loading="lazy" decoding="async" />
                    ) : (
                      <span className="text-[15px] font-bold text-[#191919]">{r.name}</span>
                    )}
                  </Link>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {cell("Advertised price", <><strong className="text-[#191919]">{r.entry}</strong> <span className="text-[12px] text-gray-500">{r.entryNote}</span></>)}
                    {cell("From month 2", r.after)}
                    {cell("Medications", r.medications)}
                    {cell("Clinical support", r.support)}
                    {cell("Shipping", r.shipping)}
                    {cell("Trustpilot", r.trustpilot ? <><strong className="text-[#191919]">{r.trustpilot.rating}</strong> from {r.trustpilot.count} <a href={r.trustpilot.url} target="_blank" rel="noopener" className="text-[12px] text-[#0C4B75] underline">checked {r.trustpilot.checked}</a></> : "No Trustpilot profile")}
                    {cell("Strength", r.advantage)}
                    {cell("Drawback", r.limitation)}
                  </div>
                  {p && (
                    <ProviderCta href={p.affiliateUrl} providerName={r.name} providerSlug={r.id} pageType="comparison" sourceFlow="provider_comparison" className={`${ctaClass} mt-4 w-full`}>
                      See prices <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </ProviderCta>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-[15px]">
            Use the table to orient yourself, not as a final verdict. The advertised price column shows what each
            provider promotes, along with its condition; the month-two column is the figure to confirm before paying.
            &ldquo;Compounded&rdquo; means the molecule was prepared for your prescription by a licensed compounding
            pharmacy. A compounded drug is not an FDA-approved product, and that applies equally to seven of these eight
            providers and to every compounded GLP-1 sold online. Our <L href="/glp1-weight-loss-statistics">GLP-1 price index</L> stores
            the verified figures along with a public log of every price change we have recorded.
          </p>
        </section>

        {/* Section 3: in-depth */}
        <section className="mb-12">
          <H2 id="in-depth">Each GLP-1 provider in detail</H2>
          <p className="mb-2 text-[14px] text-gray-500">
            Grouped by business model so that similar providers sit next to each other: flat-price compounded providers
            first (welludr, embody, Eden, DirectMeds), then the care-focused providers, then brand-name options, then
            membership plus medication. This order is not a ranking.
          </p>
          <div className="space-y-8">
            {SECTIONS.map((s) => {
              const r = ROWS.find((x) => x.id === s.id)!;
              const p = byId(s.id);
              return (
                <article key={s.id} id={s.id} className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                  <div className="mb-4 flex h-[36px] w-[140px] items-center">
                    {p ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt={`${r.name} logo`} width={140} height={36} className="max-h-full max-w-full object-contain object-left" loading="lazy" decoding="async" />
                    ) : null}
                    <h3 className="sr-only">{r.name}</h3>
                  </div>

                  <p className="mb-2 text-[15.5px] leading-[1.75]">{s.overview}</p>

                  <H3>How much does {r.name} cost?</H3>
                  <p className="text-[15px] leading-[1.75]">{s.pricing}</p>

                  <H3>Clinical care and medical support</H3>
                  <p className="text-[15px] leading-[1.75]">{s.support}</p>

                  <H3>Trustpilot review themes</H3>
                  <p className="mb-1 text-[15px] font-semibold text-[#191919]">{s.trustpilotHeading}</p>
                  <p className="text-[15px] leading-[1.75]">{s.trustpilot}</p>
                  {p && (p.trustpilotReviews?.length ?? 0) > 0 && (
                    <div className="mt-4">
                      <TrustpilotCarousel
                        providerName={r.name}
                        providerLogo={p.logo}
                        reviews={p.trustpilotReviews!}
                        rating={r.trustpilot?.rating}
                        reviewCount={r.trustpilot?.count}
                      />
                    </div>
                  )}

                  <H3><span className="inline-flex items-center gap-1.5"><RedditMark className="h-4 w-4" /> What Reddit users report</span></H3>
                  <p className="text-[15px] leading-[1.75]">{s.reddit}</p>
                  <div className="mt-4">
                    <RedditThreadCarousel
                      providers={[{ id: s.id, name: r.name }]}
                      reviewHrefFor={(id) => `/reviews/${id}`}
                      title={`${r.name} on Reddit`}
                      intro="Verbatim excerpts from public threads we captured, with usernames exactly as posted."
                    />
                  </div>

                  <H3>Cancellation and refund terms</H3>
                  <p className="text-[15px] leading-[1.75]">
                    {s.cancellation} <span className="text-[13px] text-gray-500">Terms reviewed {TERMS_REVIEWED}.</span>
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.05em] text-emerald-700">Pros</p>
                      <ul className="space-y-1.5">
                        {s.pros.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-[14px] text-gray-800"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.05em] text-red-600">Cons</p>
                      <ul className="space-y-1.5">
                        {s.cons.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-[14px] text-gray-800"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={2} />{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <H3>Who is {r.name} a good fit for?</H3>
                  <p className="text-[15px] leading-[1.75]">{s.suits}</p>

                  <H3>Our take on {r.name}</H3>
                  <p className="text-[15px] leading-[1.75]">{s.assessment}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {p && (
                      <ProviderCta href={p.affiliateUrl} providerName={r.name} providerSlug={s.id} pageType="comparison" sourceFlow="provider_comparison" className={`${ctaClass} h-[44px] px-5 text-[14px]`}>
                        {r.cta} <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </ProviderCta>
                    )}
                    <Link href={`/reviews/${s.id}`} className="text-[13.5px] font-bold text-[#0C4B75] hover:underline">Read our full {r.name} review</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <H2 id="what-reviews-reveal">What do Trustpilot and Reddit reviews show across all eight providers?</H2>
          <p className="mb-4">Across the eight providers, Trustpilot and Reddit agree more than they disagree, and the points of agreement are the most useful findings.</p>
          <p className="mb-4"><strong className="text-[#191919]">Price surprises, not high prices.</strong> The most common complaint is an unexpected charge rather than a high price: a first month taken for the ongoing rate (ro), a promotional tier billed differently from the advertised one (altRx), a charge that came sooner than a month (welludr), a first order billed at twice the quote (TrimRx), and a renewal that was hard to stop (Medvi). Providers with flat, dose-independent pricing and a single bill (DirectMeds, Eden, embody, and welludr on its plan) draw fewer of these complaints, and the ones they do draw concern timing rather than amount.</p>
          <p className="mb-4"><strong className="text-[#191919]">Shipping reliability.</strong> Every provider has delivery complaints, and they cluster where the advertised speed is fastest. embody&rsquo;s one-to-two-day shipping earns praise when it happens and criticism when an order waits at the pharmacy; DirectMeds&rsquo; recent two-star review describes an order open for nineteen days; ro&rsquo;s describes a four-day delay; TrimRx&rsquo;s describes a tracking date that moved. welludr promises three to five days and is criticized for being slow, not for missing its promise. The fair conclusion is that transit is quick at every provider, and the delays happen before the order ships. Our <L href="/glp1-shipping-times">GLP-1 shipping times comparison</L> sets each provider&rsquo;s promise beside what reviewers report.</p>
          <p className="mb-4"><strong className="text-[#191919]">Customer service.</strong> Praise for named agents is the strongest positive signal on Trustpilot, and it concentrates at Eden, welludr, DirectMeds, Medvi and altRx. embody and ro attract the opposite: requests for a human, a phone number, or a reply that does not sound automated. Reddit makes the same point about embody in its own words (&ldquo;if you don&rsquo;t need to actually talk to anyone&rdquo;). Our <L href="/glp1-provider-support">GLP-1 provider support comparison</L> digs further into this using the captured reviews.</p>
          <p className="mb-4"><strong className="text-[#191919]">Medical support.</strong> Medvi stands apart on clinical contact: its reviewers write about video visits, a dietician and coaching. TrimRx&rsquo;s check-ins and welludr&rsquo;s coach form the next tier. embody and DirectMeds offer a visit plus a portal. ro is clinician-reviewed but message-only. None of this predicts results: the Reddit threads with the largest losses (ro, Medvi) and the one with the smallest (welludr, one pound in eight weeks) reflect the medication and the individual, not the provider.</p>
          <p className="mb-4"><strong className="text-[#191919]">Cancellation.</strong> The reviews match the terms. Providers with 72-hour notice rules and payments-final wording (embody, altRx, Medvi) are the ones whose negative reviews mention cancelling, while welludr, with the most refund-friendly terms, has the fewest. TrimRx&rsquo;s non-refundable prepaid packages and its refund complaints are one fact seen from two angles.</p>
          <p className="mb-4"><strong className="text-[#191919]">Pharmacy disclosure.</strong> Only embody (US 503A, LegitScript-certified) and ro (in-house) clearly state their pharmacy arrangement. For the rest, the pharmacy names that circulate (Logos for welludr, Strive for altRx, Casa for TrimRx) come from customers rather than the providers, and we have not confirmed them. Asking any provider about its pharmacy before paying is reasonable, and the <L href="/articles/503a-vs-503b-pharmacy-28-day-rule">guide to 503A and 503B pharmacies</L> explains why it matters.</p>
          <p><strong className="text-[#191919]">The limits of these sources.</strong> Trustpilot reviewers choose to post, and the Trustpilot profiles here are claimed profiles on paid subscriptions, which lets a business invite reviews and respond to them. Reddit posters are anonymous and cannot be verified, and a few threads do not represent a whole customer base. Three providers (DirectMeds, Eden and TrimRx) have no Reddit record we could find, and one (altRx) has no Trustpilot profile, so for those four we have a single source where the others have two. We describe a pattern only when more than one source shows it.</p>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <H2 id="hidden-costs">What hidden costs do GLP-1 providers charge?</H2>
          <ul className="mb-6 space-y-2 pl-5">
            <li className="list-disc"><strong className="text-[#191919]">Introductory prices.</strong> ro&rsquo;s $39, the promotional rates at altRx and Medvi, and TrimRx&rsquo;s discount are first-period or promotional figures. What you need is the month-two price, which every provider on this page publishes somewhere. Find it before paying.</li>
            <li className="list-disc"><strong className="text-[#191919]">Membership fees.</strong> Only ro charges one, but at $74 to $149 a month before any medication, it is the largest single line item on this page.</li>
            <li className="list-disc"><strong className="text-[#191919]">Consultation fees.</strong> All eight providers include the first consultation in the price. Follow-up visits are included wherever we could check, and Medvi and TrimRx offer the most of them.</li>
            <li className="list-disc"><strong className="text-[#191919]">Dose-based medication pricing.</strong> ro&rsquo;s brand-name medication costs more as the dose rises ($299 to $449 for Zepbound). Every compounded provider here states one price at every dose, a genuine advantage of that model that is worth getting in writing.</li>
            <li className="list-disc"><strong className="text-[#191919]">Shipping.</strong> Free at the seven providers that state their shipping terms; Eden does not publish them. Speed varies from one to two days (embody, DirectMeds) to five to seven (altRx).</li>
            <li className="list-disc"><strong className="text-[#191919]">Billing frequency.</strong> Billing &ldquo;every four weeks&rdquo; (welludr&rsquo;s stated cycle) means thirteen charges a year, not twelve, and one reviewer reports a 21-day cycle. Ask before you sign up.</li>
            <li className="list-disc"><strong className="text-[#191919]">Switching medications.</strong> Moving from semaglutide to tirzepatide raises the price at most providers here; DirectMeds charges $147 for either. Among the others, the difference runs from $30 (Eden) to $110 (TrimRx).</li>
            <li className="list-disc"><strong className="text-[#191919]">Cancellation rules.</strong> ro requires 48 hours&rsquo; notice; embody, altRx and Medvi require 72 hours; and prepaid plans at altRx and TrimRx are non-refundable.</li>
          </ul>
          <p className="mb-3 text-[15px] font-semibold text-[#191919]">What do three months of GLP-1 treatment cost? An example with verified prices</p>
          <p className="mb-3 text-[14px] text-gray-500">Based on the September 2026 index and ro&rsquo;s August 2026 pricing; cash pay, semaglutide, no insurance, for a hypothetical patient who continues treatment.</p>
          <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <caption className="sr-only">Example three-month cost for three GLP-1 routes using verified prices</caption>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Provider and option", "Month 1", "Month 2", "Month 3", "Total for 3 months"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-bold text-[#191919]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><th scope="row" className="px-4 py-3 font-medium text-[#191919]">welludr semaglutide, 12-month plan</th><td className="px-4 py-3 text-gray-600">$49</td><td className="px-4 py-3 text-gray-600">$49</td><td className="px-4 py-3 text-gray-600">$49</td><td className="px-4 py-3 text-gray-800"><strong>$147</strong> (plus nine more months committed)</td></tr>
                <tr className="bg-gray-50/50"><th scope="row" className="px-4 py-3 font-medium text-[#191919]">embody semaglutide, month to month</th><td className="px-4 py-3 text-gray-600">$69</td><td className="px-4 py-3 text-gray-600">$69</td><td className="px-4 py-3 text-gray-600">$69</td><td className="px-4 py-3 text-gray-800"><strong>$207</strong> (nothing further committed)</td></tr>
                <tr><th scope="row" className="px-4 py-3 font-medium text-[#191919]">ro Wegovy pill plus membership, month to month</th><td className="px-4 py-3 text-gray-600">$39 + $149 = $188</td><td className="px-4 py-3 text-gray-600">$149 + $299 = $448</td><td className="px-4 py-3 text-gray-600">$149 + $299 = $448</td><td className="px-4 py-3 text-gray-800"><strong>$1,084</strong> (FDA-approved product; insurance could change this completely)</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            This example is simple arithmetic, not a recommendation: the products are different, and choosing between
            them is a clinical decision. For the year-one cost at every provider we track, see{" "}
            <L href="/articles/glp1-true-cost-month-1-vs-year-one">the true cost of GLP-1 treatment, month 1 versus year one</L>. For questions to ask before committing to a prepaid plan, read{" "}
            <L href="/articles/before-you-prepay-glp1">what to know before you prepay for a GLP-1</L>.
          </p>
        </section>

        {/* Neutral mid-page block */}
        <div className="mb-12 rounded-xl border border-[#0C4B75]/10 bg-[#0C4B75]/[0.03] p-5 text-center sm:p-6">
          <p className="mb-3 text-[16px] font-bold text-[#191919]">See all eight GLP-1 providers in one table</p>
          <a href="#comparison-table" className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]">Return to the comparison table</a>
        </div>

        {/* Section 6 */}
        <section className="mb-12">
          <H2 id="how-to-choose">How should you choose a GLP-1 telehealth provider?</H2>
          <p className="mb-3">Choose a GLP-1 provider by answering six questions, each of which the table above or a single email to the provider can settle:</p>
          <ol className="mb-4 space-y-2 pl-5">
            <li className="list-decimal"><strong className="text-[#191919]">What will I pay in month two, at the dose I will stay on?</strong> If the website does not show it, ask and save the answer.</li>
            <li className="list-decimal"><strong className="text-[#191919]">Who prescribes, and who can I contact afterward?</strong> Review by a licensed clinician is the legal minimum; the real question is whether a person is available once you are approved.</li>
            <li className="list-decimal"><strong className="text-[#191919]">Which pharmacy fills my prescription?</strong> For compounded medication, the pharmacy&rsquo;s license and the beyond-use date on the vial are the quality markers you can check yourself.</li>
            <li className="list-decimal"><strong className="text-[#191919]">How do refills start, and how long does it take from approval to delivery?</strong> Reorder before you run out, since most delays happen before shipping.</li>
            <li className="list-decimal"><strong className="text-[#191919]">How do I cancel, how much notice is needed, and what is refundable?</strong> Each provider section above summarizes its own terms.</li>
            <li className="list-decimal"><strong className="text-[#191919]">Does the provider serve my state?</strong> Some providers exclude certain states. Checkout will tell you, but ask before the intake if it matters to you.</li>
          </ol>
          <p>
            For the complete checklist, including how to judge whether a telehealth provider is legitimate, read{" "}
            <L href="/how-to-choose-a-glp1-provider">how to choose a GLP-1 provider</L>. If you would rather see scores, our{" "}
            <L href="/">ranked list of GLP-1 providers</L> rates them using the same verified data.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <H2 id="methodology">How we researched this GLP-1 provider comparison</H2>
          <p className="mb-4"><strong className="text-[#191919]">Which providers are included.</strong> The eight providers are the GLP-1 telehealth companies Top Weight Loss currently partners with commercially; Eden joined on October 14, 2026, when it became a partner. That is the full pool, stated openly. Within it, we did not rank anyone, and each provider was checked against the same four sources. For the brand-name cash prices that buyers compare against, see our <L href="/articles/zepbound-price-online">Zepbound price guide</L> and <L href="/articles/wegovy-pill-price-online">Wegovy pill price guide</L>, which cite the manufacturers&rsquo; published and reported self-pay prices with dates.</p>
          <p className="mb-4"><strong className="text-[#191919]">Pricing verification from provider websites.</strong> We captured prices from each provider&rsquo;s own pricing pages and logged them in our <L href="/glp1-weight-loss-statistics">GLP-1 price index</L>, last verified {fmt(PRICE_INDEX_VERIFIED)}, with a <L href="/glp1-price-changes">public price change log</L> of every change we have recorded (altRx September 14 and 21; TrimRx September 15; welludr September 14). ro&rsquo;s membership and medication prices were captured from its published pricing in August 2026. Every figure is shown with its promotional, prepaid or first-month condition.</p>
          <p className="mb-4"><strong className="text-[#191919]">How we analyzed Trustpilot.</strong> For each provider, we recorded the profile, TrustScore and review count shown on {TRUSTPILOT_CHECKED} (Eden: October 13, 2026), then read the most recent review pages to find recurring themes rather than one-off complaints. We note when a profile is on a paid Trustpilot subscription. Summaries are in our own words, and we quote only short review titles.</p>
          <p className="mb-4"><strong className="text-[#191919]">How we researched Reddit.</strong> We searched GLP-1 communities (r/glp1, r/Semaglutide, r/tirzepatidecompound, r/compoundedtirzepatide, r/WegovyWeightLoss, r/telehealth and others) for posts from the past twelve months, favored firsthand accounts over secondhand ones, and logged the subreddit and date of each excerpt, linking threads where we have the permalink. When we found no substantive discussion, we say so instead of filling the gap. Reddit excerpts are anonymous accounts and are presented that way.</p>
          <p className="mb-4"><strong className="text-[#191919]">Medical and regulatory sources.</strong> We used FDA pages on compounding and compounded GLP-1 drugs; the FDA approval announcements for Zepbound and Foundayo and coverage of the Wegovy pill approval; the published OASIS 4 and ATTAIN-1 trials through the American College of Cardiology&rsquo;s summaries; the FDA&rsquo;s June 8, 2026 warning letter about altRx; and coverage of the FDA&rsquo;s March 2026 warning letters. Each is linked in the sources list below.</p>
          <p className="mb-4"><strong className="text-[#191919]">Limitations.</strong> We could not find a Reddit record for three providers, and one provider has no Trustpilot profile. Reviews on both platforms are self-selected. Several of the pharmacy names on this page come from customers, not from the providers. Prices change, so the dates on this page matter. We did not buy from or test any of these services.</p>
          <p className="mb-4"><strong className="text-[#191919]">Editorial independence.</strong> Top Weight Loss earns commissions from the providers on this page. Those affiliate relationships did not decide which facts appear, how they are worded, or our assessments. If a partner has a negative record, you will find it here.</p>
          <p><strong className="text-[#191919]">Research last updated:</strong> {fmt(UPDATED)}.</p>
        </section>

        {/* Section 8: FAQ */}
        <section className="mb-12">
          <H2 id="faq">GLP-1 provider comparison FAQ</H2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {FAQS.map((f) => (
              <div key={f.question} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-gray-600">
            For help deciding between compounded and brand-name medication, read{" "}
            <L href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name GLP-1s</L>. If your coverage changes, see{" "}
            <L href="/articles/lost-insurance-coverage-zepbound-wegovy">what to do after losing insurance coverage for Zepbound or Wegovy</L>.
          </p>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <H2 id="sources">Sources</H2>
          <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-gray-600">
            <li><strong className="text-[#191919]">Provider pricing:</strong> Top Weight Loss <L href="/glp1-weight-loss-statistics">GLP-1 price index and change log</L>, verified {fmt(PRICE_INDEX_VERIFIED)}; ro published pricing, August 2026; TrimRx homepage, October 11, 2026.</li>
            <li><strong className="text-[#191919]">Provider terms</strong> (reviewed {TERMS_REVIEWED}): the published terms of service and refund policy of each provider.</li>
            <li><strong className="text-[#191919]">Trustpilot profiles</strong> (checked {TRUSTPILOT_CHECKED}): {ROWS.filter((r) => r.trustpilot).map((r, i, a) => (<span key={r.id}><a href={r.trustpilot!.url} target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">{r.name}</a>{i < a.length - 1 ? ", " : ""}</span>))}.</li>
            <li><strong className="text-[#191919]">Reddit:</strong> <a href="https://www.reddit.com/r/compoundedtirzepatide/comments/1utd6g7/has_anyone_tried_em_ie_embody_the_price_is_good/" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">r/compoundedtirzepatide discussion of embody</a>; additional excerpts captured from r/telehealth, r/productreview and other GLP-1 subreddits between May and September 2026.</li>
            <li><strong className="text-[#191919]">Regulatory and clinical:</strong> FDA, <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">Compounding and the FDA: questions and answers</a>; FDA, <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">concerns about unapproved GLP-1 drugs used for weight loss</a>; FDA, <a href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/trinity-healthcare-supply-llc-dba-altrx-728236-06082026" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">warning letter to Trinity HealthCare Supply, LLC dba altRx, June 8, 2026</a>; <a href="https://www.benefitspro.com/amp/2026/03/05/fda-issues-warning-letters-to-30-telehealth-firms-over-glp-1-marketing/" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">BenefitsPRO coverage of the FDA&rsquo;s March 3, 2026 warning letters</a>; FDA, <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">Zepbound approval announcement</a>; FDA, <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">Foundayo approval announcement, April 1, 2026</a>; <a href="https://www.healio.com/news/endocrinology/20260213/fda-approves-wegovy-pill-the-first-oral-glp1-to-treat-obesity" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">Healio coverage of the Wegovy pill approval</a>; ACC summaries of <a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">OASIS 4</a> and <a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/48/attain-1" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">ATTAIN-1</a>.</li>
          </ul>
          <p className="mt-4 text-[13px] leading-relaxed text-gray-400">
            Top Weight Loss (topweightloss.us) is not a medical provider and does not prescribe medication. This page
            offers general information for comparing services and is not medical advice. GLP-1 medications require
            evaluation and supervision by a licensed healthcare provider. Brand names belong to their respective
            trademark owners.
          </p>
        </section>

        <GuideCluster currentSlug="glp1-provider-comparison" />
        <MedicalSources vertical="weight-loss" />
      </div>
    </div>
  );
}
