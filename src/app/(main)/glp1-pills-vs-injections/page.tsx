import { withSeo } from "@/lib/seo";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MedicalSources } from "@/components/medical-sources";
import { enhanceArticleHtml } from "@/components/prose";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";

// ─────────────────────────────────────────────────────────────────────────────
// GLP-1 pills vs injections - the long-form comparison.
//
// Oct 22, 2026 rebuild (operator request): the page now uses the same masthead
// and 1100px layout as every weight-loss article (light-blue hero band, the
// vertical's hero image on the right on desktop, category + read time, the
// quick-answer box instead of a "winner" verdict), and the body went from a
// 700-word summary to a full guide. Every clinical figure is the published
// trial result with its source linked inline; every provider price is the
// verified price index (PRICE_INDEX_VERIFIED) or a provider's own published
// terms as captured on its review page; manufacturer prices are reported from
// the dated sources linked and are labelled as not verified by us. Nothing is
// estimated.
// ─────────────────────────────────────────────────────────────────────────────

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/glp1-pills-vs-injections";
const PAGE_PUBLISHED = "2026-08-09";
const PAGE_UPDATED = "2026-10-22";
const HERO_COLOR = "#EDF2F8";
const READ_TIME = "16 min read";

export const metadata: Metadata = withSeo("/glp1-pills-vs-injections", {
  title: "GLP-1 Pills vs Injections 2026: Weight Loss, Price, Routine",
  description:
    "GLP-1 pills vs injections: the Wegovy pill (13.6%) and Foundayo (11.2%) against Wegovy (14.9%) and Zepbound (20.9%) on results, price by route and daily routine.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "GLP-1 Pills vs Injections 2026: Weight Loss, Price, Routine",
    description:
      "How the FDA-approved Wegovy pill and Foundayo stack up against weekly Wegovy and Zepbound pens: trial results, verified prices, shared side effects and which to pick.",
    url: CANONICAL,
    type: "article",
  },
});

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ext = (href: string, label: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

const SRC = {
  step1: "https://doi.org/10.1056/NEJMoa2032183",
  surmount1: "https://doi.org/10.1056/NEJMoa2206038",
  oasis4: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4",
  attain1: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/48/attain-1",
  step1ext: "https://doi.org/10.1111/dom.14725",
  wegovyPillApproval: "https://www.healio.com/news/endocrinology/20260213/fda-approves-wegovy-pill-the-first-oral-glp1-to-treat-obesity",
  foundayoApproval: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program",
  wegovyApproval: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-drug-treatment-chronic-weight-management-first-2014",
  zepboundApproval: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management",
  fdaConcerns: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding",
  medlineSema: "https://medlineplus.gov/druginfo/meds/a618008.html",
  medlineTirz: "https://medlineplus.gov/druginfo/meds/a622044.html",
  lillyRelease: "https://www.biospace.com/press-releases/foundayo-orforglipron-lillys-new-oral-glp-1-pill-for-weight-loss-now-available-in-the-u-s",
  sciam: "https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/",
  noom: "https://www.noom.com/blog/weight-management/wegovy-pill-cost-with-and-without-insurance/",
  bridge: "https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know",
};

const QUICK_ANSWER =
  "GLP-1 injections still deliver the most weight loss on average, but the best pill is now close. Injectable tirzepatide (Zepbound) averaged 20.9% at its top dose in SURMOUNT-1 and injectable semaglutide (Wegovy) 14.9% in STEP 1. Of the two FDA-approved pills, the Wegovy pill averaged 13.6% in OASIS 4, which its authors call similar to the weekly injection, and Foundayo averaged 11.2% in ATTAIN-1. Pills are easier for people who avoid needles, and Foundayo has no food or water rules. Paying cash, both brand pills ($149-$349 a month) and brand pens ($1,149 and up) cost far more than compounded injections ($41-$299). With commercial coverage either pill can drop to $25 a month, and Medicare's pilot charges $50 for both.";

const KEY_TAKEAWAYS = [
  "The comparison involves four approved products. The weekly injections are Wegovy (semaglutide, approved 2021) and Zepbound (tirzepatide, approved 2023). The daily pills are the Wegovy pill (oral semaglutide 25 mg, approved December 2025) and Foundayo (orforglipron, approved April 1, 2026).",
  "In published trials, injectable tirzepatide ranks first (up to 20.9% average weight loss), injectable semaglutide and the Wegovy pill are close together (14.9% and 13.6%), and Foundayo comes last (11.2%). Each was tested in its own trial; none was compared head to head.",
  "Daily routine is the difference you notice. The Wegovy pill requires an empty stomach, a sip of water and a 30-minute wait; Foundayo can be taken whenever you like; the injections are once a week.",
  "How you buy matters more than the format. Verified: Ro sells the Wegovy pill at $149 for month one, then $299 plus membership, and compounded injections cost $41-$299 a month. Reported: Foundayo at $149-$349 self-pay, $25 for either pill with commercial coverage, and $50 on Medicare's GLP-1 Bridge.",
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Are GLP-1 pills as effective as injections?",
    answer:
      "The Wegovy pill comes close to the semaglutide injection, but no pill matches injectable tirzepatide. The Wegovy pill averaged 13.6% weight loss at 64 weeks in OASIS 4 (16.6% among people who stayed on treatment), which its authors describe as similar to the 14.9% the weekly semaglutide injection reached in STEP 1. Foundayo averaged 11.2% at its top dose in ATTAIN-1, while injectable tirzepatide (Zepbound) averaged 20.9% at 15 mg in SURMOUNT-1 (22.5% assuming everyone stayed on treatment). No trial has compared a pill directly against an injection.",
  },
  {
    question: "Which is cheaper, GLP-1 pills or injections?",
    answer:
      "Compounded injections are the cheapest cash option by far, at verified prices of $41-$199 a month for semaglutide and $71-$299 for tirzepatide. Brand pills fall in the middle: Ro charges $149 for the first Wegovy pill month, then $299 plus membership (verified), and Foundayo is listed at $149-$349 a month self-pay (reported). Brand injections paid in cash cost the most, starting at $1,149 a month at the providers we track. With commercial coverage either pill is reported at $25 a month, and Medicare's GLP-1 Bridge pilot covers both pills and both pens at $50 through December 2027.",
  },
  {
    question: "Do GLP-1 pills have fewer side effects than injections?",
    answer:
      "No. Pills and injections belong to the same drug class and cause the same kind of side effects, mainly digestive ones that appear early and during dose increases. In OASIS 4, 74% of people on the Wegovy pill reported a gastrointestinal adverse event compared with 42% on placebo, and gastrointestinal events were also the most common with Foundayo in ATTAIN-1. The injection labels list the same leading effects, so how slowly the dose is raised matters more than the format.",
  },
  {
    question: "Why does the Wegovy pill contain 25 mg when the injection is 2.4 mg?",
    answer:
      "Semaglutide is a peptide, and the gut absorbs peptides poorly, so the tablet needs a much larger dose for enough to reach the bloodstream. The Wegovy pill must be taken on an empty stomach with a small sip of water, then 30 minutes before any food, drink or other medicine, or less of it is absorbed. Foundayo is a small molecule rather than a peptide, so it can be taken at any time without food or water rules.",
  },
  {
    question: "Can you switch from injections to pills, or vice versa?",
    answer:
      "Usually yes, with your prescriber managing the change. People switch for tolerability, convenience, coverage or supply, but there is no self-calculated dose conversion between a weekly pen and a daily tablet; the clinician chooses the medicine, starting dose and titration. Both formats are long-term treatments: in the STEP 1 extension, people who stopped semaglutide regained about two-thirds of the weight they had lost within a year.",
  },
  {
    question: "Are the compounded 'pills' and 'drops' some telehealth programs sell the same as the Wegovy pill?",
    answer:
      "No. The Wegovy pill and Foundayo are FDA-approved finished medicines with their own trials. Compounded oral semaglutide or tirzepatide, sold as tablets, under-the-tongue drops or troches, is made by a licensed 503A pharmacy for an individual prescription; that is legal and regulated, but the product is not FDA-approved and has no trials of its own. An oral compounded peptide is also absorbed differently from the approved 25 mg tablet, which is part of why it costs less.",
  },
  {
    question: "Is there a GLP-1 pill approved specifically for weight loss?",
    answer:
      "Yes, there are two. The FDA approved the Wegovy pill (oral semaglutide 25 mg) in December 2025 as the first oral GLP-1 for chronic weight management, and approved Foundayo (orforglipron, Eli Lilly) on April 1, 2026 as the first one with no food or water restrictions. Rybelsus, a lower-dose oral semaglutide, is approved for type 2 diabetes, not weight management.",
  },
  {
    question: "Do I need a prescription for either one?",
    answer:
      "Yes. In the United States every GLP-1 on this page, whether brand or compounded, pill or injection, requires a prescription. A licensed clinician reviews your health history and decides whether it is appropriate, and any website selling a GLP-1 without that review is offering something you should not take.",
  },
];

type Section = { heading: string; body: string };

const PRICE_DATE = fmt(PRICE_INDEX_VERIFIED);

const SECTIONS: Section[] = [
  {
    heading: "Which GLP-1 pills and injections are FDA-approved?",
    body: `<p><strong>Four GLP-1 products are FDA-approved for chronic weight management: two weekly injections (Wegovy and Zepbound) and two daily pills (the Wegovy pill and Foundayo).</strong> Many products sold online are none of these four, so it helps to know exactly what each name refers to before comparing.</p>
<h3>Weekly injections: Wegovy and Zepbound</h3>
<ul>
<li><strong>Wegovy</strong> (semaglutide) received FDA approval for chronic weight management on ${ext(SRC.wegovyApproval, "June 4, 2021")}. It acts on the GLP-1 receptor.</li>
<li><strong>Zepbound</strong> (tirzepatide) was approved on ${ext(SRC.zepboundApproval, "November 8, 2023")}. It acts on two receptors, GLP-1 and GIP, which is the usual explanation for its bigger trial result.</li>
</ul>
<p>Both are injected under the skin once a week from a pre-filled pen, starting low and increasing over several months. Telehealth providers also sell the same two molecules as <strong>compounded injections</strong> made by state-licensed pharmacies, for a fraction of the brand price and without FDA approval of the product. Most providers on this site use that route, and most "injection" prices you see online refer to it.</p>
<h3>Daily pills: the Wegovy pill and Foundayo</h3>
<ul>
<li><strong>The Wegovy pill</strong> is a 25 mg once-daily semaglutide tablet, approved in ${ext(SRC.wegovyPillApproval, "December 2025")} as the first oral GLP-1 for chronic weight management.</li>
<li><strong>Foundayo</strong> is orforglipron, a small-molecule GLP-1 receptor agonist from Eli Lilly, approved on ${ext(SRC.foundayoApproval, "April 1, 2026")}.</li>
</ul>
<p>Both pills are brand-name, prescription-only and FDA-approved, and neither is compounded. A third tablet, <strong>Rybelsus</strong>, is lower-dose oral semaglutide approved for type 2 diabetes rather than weight management, and it produces less weight loss at diabetes doses.</p>
<h3>What about compounded GLP-1 tablets and drops?</h3>
<p>Some telehealth programs sell <strong>compounded oral semaglutide or tirzepatide</strong> as tablets, under-the-tongue drops or troches. These are not the Wegovy pill. They have no trial data of their own, and a peptide swallowed without the formulation work the approved tablet received is poorly absorbed. They appear here only as a caution: a compounded "pill" is an unstudied product, not a discount Wegovy pill. The rest of this guide compares the four approved products and the compounded injections, since those have evidence and published prices behind them.</p>`,
  },
  {
    heading: "How much weight do people lose on GLP-1 pills vs injections?",
    body: `<p><strong>In their main trials, Zepbound averaged 20.9% weight loss, Wegovy injections 14.9%, the Wegovy pill 13.6% and Foundayo 11.2%.</strong> Each figure comes from a separate randomized, placebo-controlled, manufacturer-run trial that added lifestyle advice, with different lengths and populations. No trial has tested a pill against an injection directly, so each result should be read against its own placebo group rather than as a head-to-head contest.</p>
<table><thead><tr><th>Product</th><th>Trial</th><th>Length</th><th>Mean weight change</th><th>Placebo</th></tr></thead><tbody>
<tr><td>Zepbound (tirzepatide 15 mg weekly injection)</td><td>${ext(SRC.surmount1, "SURMOUNT-1")}, NEJM, July 21, 2022</td><td>72 weeks</td><td><strong>-20.9%</strong></td><td>-3.1%</td></tr>
<tr><td>Zepbound (tirzepatide 5 mg weekly injection)</td><td>SURMOUNT-1</td><td>72 weeks</td><td>-15.0%</td><td>-3.1%</td></tr>
<tr><td>Wegovy (semaglutide 2.4 mg weekly injection)</td><td>${ext(SRC.step1, "STEP 1")}, NEJM, March 18, 2021</td><td>68 weeks</td><td><strong>-14.9%</strong></td><td>-2.4%</td></tr>
<tr><td>Wegovy pill (oral semaglutide 25 mg daily)</td><td>${ext(SRC.oasis4, "OASIS 4")}, NEJM, September 2025</td><td>64 weeks</td><td><strong>-13.6%</strong></td><td>-2.2%</td></tr>
<tr><td>Foundayo (orforglipron 36 mg daily)</td><td>${ext(SRC.attain1, "ATTAIN-1")}, NEJM, September 2025</td><td>72 weeks</td><td><strong>-11.2%</strong></td><td>-2.1%</td></tr>
</tbody></table>
<h3>Why you see two different numbers for each drug</h3>
<p>Every trial reports two valid figures. The table uses the treatment-policy (or treatment-regimen) result, which counts everyone randomized whether or not they stayed on the drug. Manufacturers also publish an on-treatment result for people who took the drug as directed until the end: 22.5% for tirzepatide 15 mg, 16.6% for the Wegovy pill and 12.4% for Foundayo. Marketing usually quotes the on-treatment figure. We use the treatment-policy figure because it better reflects what happens across a real group of patients. The two answer different questions and do not contradict each other.</p>
<h3>What the results mean for pills vs injections</h3>
<ul>
<li><strong>Injectable tirzepatide is still the strongest GLP-1 on average</strong>, pill or pen, about six percentage points ahead of semaglutide at the top dose, and a substantially larger share of SURMOUNT-1 participants lost 20% or more.</li>
<li><strong>The Wegovy pill and the Wegovy injection are close</strong>: 13.6% vs 14.9% in their own trials, and the OASIS 4 authors describe the pill's effect as similar to the weekly injection.</li>
<li><strong>Foundayo has the lowest published figure</strong> of the four, yet it still beat every non-GLP-1 pill ever approved. In ATTAIN-1, 19% of people on the top dose lost 20% or more of their body weight, compared with 3% on placebo.</li>
</ul>
<h3>What the averages do not tell you</h3>
<p>These are averages at the full maintenance dose after a long dose escalation, so they describe roughly month fifteen, not month two. In STEP 1, about a third of participants lost 20% or more while some lost very little, and nothing on an intake form predicts which group you will land in. Every trial also included lifestyle counseling that most telehealth programs do not offer. Read the trial results as the upper range a well-managed, fully dosed course can approach, not as a promise for either format.</p>`,
  },
  {
    heading: "Why does a GLP-1 pill need a higher dose than an injection?",
    body: `<p><strong>Because swallowed semaglutide is mostly broken down in the gut, the Wegovy pill needs 25 mg a day to match what a 2.4 mg weekly injection achieves.</strong> Semaglutide is a peptide, and only a small fraction of a swallowed peptide reaches the bloodstream. The tablet therefore carries far more drug and must be taken under conditions that protect the little that gets absorbed, which is where the empty-stomach rule in the next section comes from. It is also why compounded "oral semaglutide" made without that formulation work is a different, unstudied product.</p>
<p>Foundayo solves the problem differently. Orforglipron is a small molecule built to be absorbed through the gut like most everyday tablets, so it can be taken at any time, with or without food. On the published numbers, its trade-off is less average weight loss than semaglutide in either form. Injections avoid the absorption problem altogether: the drug goes under the skin and straight into circulation, which is why a weekly dose of a few milligrams is enough.</p>`,
  },
  {
    heading: "How do you take GLP-1 pills compared with weekly shots?",
    body: `<p><strong>The Wegovy pill is taken daily on an empty stomach with a 30-minute wait, Foundayo is taken daily at any time, and the pens are used once a week.</strong> For most people this is the difference they feel day to day, and it shows that "pills are easier" is not always true.</p>
<table><thead><tr><th>Product</th><th>How often</th><th>The rules</th></tr></thead><tbody>
<tr><td>Wegovy pill</td><td>Once a day</td><td>Taken on an empty stomach with a small sip of water, then 30 minutes before any food, drink or other medicine. The dose rises from 1.5 mg to 25 mg over the first months.</td></tr>
<tr><td>Foundayo</td><td>Once a day</td><td>Any time of day, with or without food or water. Increased through 6, 12 and 36 mg tablets.</td></tr>
<tr><td>Wegovy or Zepbound pen</td><td>Once a week</td><td>Injected under the skin from a pre-filled, factory-sealed pen. Nothing to do on other days; the dose rises every few weeks.</td></tr>
<tr><td>Compounded injection</td><td>Once a week</td><td>Drawn from a multi-dose vial into a syringe. You measure the dose in units yourself, which is where the FDA has recorded dosing errors.</td></tr>
</tbody></table>
<ul>
<li><strong>The Wegovy pill has the strictest routine.</strong> Waiting 30 minutes every morning before coffee, breakfast or other medicines is easy for some people and a deal-breaker for others. Absorption falls if you skip the wait, so the rule is not optional.</li>
<li><strong>Foundayo has the easiest routine.</strong> No timing, no food rule and no needle, which is its main appeal for people who take morning medicines or dislike timed routines.</li>
<li><strong>The weekly pen is easy in a different way.</strong> It means 52 small, sealed, pre-measured doses a year with nothing to remember in between. The needle is short and thin, and most people who were nervous about it say the first injection settled their worries.</li>
<li><strong>The compounded vial is the least convenient and the most prone to mistakes</strong>, because you measure the dose yourself. The FDA's ${ext(SRC.fdaConcerns, "statement on unapproved GLP-1 drugs")} records adverse-event reports caused by vial dosing errors, and our guide to <a href="/articles/503a-vs-503b-pharmacy-28-day-rule">reading a compounded prescription</a> explains how units work.</li>
</ul>`,
  },
  {
    heading: "How much do GLP-1 pills and injections cost?",
    body: `<p><strong>Compounded injections cost $41-$299 a month, brand pills $149-$349 self-pay, and brand pens paid in cash cost the most; coverage can bring a pill to $25 or $50.</strong> Where you buy matters far more than whether it is a pill or a pen. Two facts drive the whole table: brand products, pill or pen, carry brand prices for cash buyers, and compounded injections cost a fraction of that because the product is not FDA-approved. Every figure below is either a provider's own published price that we verified (compounded and Ro prices, checked on each provider's site on ${PRICE_DATE} for the price index and in August 2026 for Ro's brand products) or a manufacturer price as reported by the dated source linked, which we have not verified.</p>
<table><thead><tr><th>Route</th><th>Monthly price</th><th>The condition</th></tr></thead><tbody>
<tr><td>Compounded semaglutide injection (verified)</td><td><strong>$41-$199</strong></td><td>From $41 at <a href="/reviews/wellmedr">welludr</a> in its Pre-Black Friday sale (check plan terms at checkout); $69 month to month at <a href="/reviews/embody">embody</a>; $89 at every dose at <a href="/reviews/altrx">altRx</a>; $99 promotional, all-inclusive, at <a href="/reviews/medvi">Medvi</a></td></tr>
<tr><td>Compounded tirzepatide injection (verified)</td><td><strong>$71-$299</strong></td><td>From $71 at welludr in its Pre-Black Friday sale; $119 month to month at embody; $149 flat at altRx; $166 promotional at Medvi</td></tr>
<tr><td>Wegovy pill at <a href="/reviews/ro">Ro</a> (verified)</td><td><strong>$149</strong> for month one, then <strong>$299</strong></td><td>Plus Ro's membership: $39 for the first month, then $74-$149 a month. The pill is billed separately, so insurance can apply if your plan covers Wegovy</td></tr>
<tr><td>Wegovy pill, NovoCare direct self-pay (reported)</td><td><strong>$149-$299</strong> depending on dose</td><td>According to ${ext(SRC.noom, "third-party trackers")}: $149 at the starting dose up to $299 at the 25 mg maintenance dose. Not verified by us</td></tr>
<tr><td>Foundayo, LillyDirect self-pay (reported)</td><td><strong>$149-$349</strong> depending on dose</td><td>As reported by ${ext(SRC.sciam, "Scientific American")} from Lilly material. None of the telehealth providers we track has published a Foundayo price we could verify</td></tr>
<tr><td>Either pill with commercial insurance that covers it (reported)</td><td><strong>$25</strong></td><td>Lilly's savings card according to its ${ext(SRC.lillyRelease, "April 9, 2026 release")}; Novo Nordisk's offer reported at as low as $25, limited to $100 of savings per 30-day supply. Not available on government plans</td></tr>
<tr><td>Medicare GLP-1 Bridge: both pills, both pens</td><td><strong>$50</strong> flat copay</td><td>A CMS pilot running ${ext(SRC.bridge, "July 1, 2026 through December 31, 2027")}; eligibility and approval through your Part D plan. The $50 stays the same at every dose</td></tr>
<tr><td>Brand Zepbound pen, cash (verified)</td><td><strong>$1,249-$1,599</strong></td><td>$1,249 at altRx, $1,599 at welludr; Ro sells Zepbound KwikPens from $299 for the first month, then $399-$449, plus membership</td></tr>
<tr><td>Brand Wegovy pen at Ro (verified)</td><td>from <strong>$199</strong> introductory, then <strong>$299-$399</strong></td><td>Plus the same membership; billed separately so insurance can apply</td></tr>
</tbody></table>
<h3>What does a full first year cost?</h3>
<p>First-month prices can mislead in either direction, so add up twelve months. At Ro's cash prices, a year on the Wegovy pill totals roughly $4,300-$5,100: $3,438 for the medicine plus $853-$1,678 in membership, depending on tier. A year of compounded semaglutide ranges from $492 at welludr's Pre-Black Friday sale price to $828-$2,348 at month-to-month providers, and compounded tirzepatide adds about $360-$1,320. A year of brand Zepbound paid in cash reaches five figures. Only the $25 commercial savings cards and Medicare's $50 pilot come close to the lowest compounded prices, so check your coverage before you think about format. Our <a href="/articles/glp1-true-cost-month-1-vs-year-one">month 1 vs year one</a> guide runs these totals for every provider we track, and <a href="/articles/wegovy-pill-price-online">Wegovy pill price online</a> covers every route to the semaglutide pill.</p>`,
  },
  {
    heading: "Do GLP-1 pills cause fewer side effects than injections?",
    body: `<p><strong>No. GLP-1 pills and injections share the same side-effect profile: mostly digestive, mostly in the first weeks and mostly around dose increases.</strong> All four products act on the same receptor family. In OASIS 4, 74% of people taking the Wegovy pill had a gastrointestinal adverse event compared with 42% on placebo, led by nausea and diarrhea. In ATTAIN-1, gastrointestinal events were also the most common with Foundayo and were usually mild to moderate. The injection labels, summarized on MedlinePlus for ${ext(SRC.medlineSema, "semaglutide")} and ${ext(SRC.medlineTirz, "tirzepatide")}, list the same top effects: nausea, diarrhea, vomiting, constipation, stomach pain and reduced appetite.</p>
<p>The serious warnings are the same as well:</p>
<ul>
<li>Every product here carries the class boxed warning about thyroid C-cell tumors seen in rodents, and none should be used by people with a personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2.</li>
<li>The labels also warn about pancreatitis and gallbladder disease.</li>
<li>Tirzepatide's label adds that it can make oral contraceptives less effective for four weeks after starting and after each dose increase.</li>
</ul>
<p>Neither pill trial found a safety signal beyond the known class profile. What really changes how well you tolerate a GLP-1 is the titration: how low you start and how slowly you increase. A clinician who manages that carefully, and slows the schedule if side effects linger, matters more than whether you take a tablet or use a pen. Our <a href="/articles/semaglutide-side-effects-guide">semaglutide side-effects guide</a> explains what helps during the first weeks on either format.</p>`,
  },
  {
    heading: "Does insurance or Medicare cover GLP-1 pills and injections?",
    body: `<p><strong>Brand pills and pens can be covered by commercial insurance or Medicare's GLP-1 Bridge; compounded injections never qualify.</strong> This is where format does change the answer, because the brand pills launched inside programs compounded products cannot join.</p>
<p><strong>Commercial insurance.</strong> If your plan covers the drug for weight management, each manufacturer has a savings card. Lilly's brings Foundayo to $25 a month, and Novo Nordisk's is reported to bring the Wegovy pill as low as $25, limited to $100 of savings per 30-day supply. Neither card works with Medicare, Medicaid or other government plans. Coverage itself is the hurdle: many plans still exclude weight-management GLP-1s or require prior authorization, and <a href="/articles/glp1-with-insurance">our insurance guide</a> shows how to check your formulary. If your plan covers a brand injection instead, the same applies to Wegovy and Zepbound pens, and a telehealth prescriber such as Ro can handle the prior authorization and bill the medicine as a separate line item.</p>
<p><strong>Medicare.</strong> From July 1, 2026 through December 31, 2027, the Medicare GLP-1 Bridge pilot gives eligible beneficiaries a flat $50 monthly copay for the Wegovy pill and injection, the Zepbound KwikPen and Foundayo. The $50 is the same at every dose and for both formats, so Medicare patients can choose on routine and results alone. Medicare does not cover compounded GLP-1s. See <a href="/articles/glp1-after-65-medicare">GLP-1s after 65</a> for what to ask your Part D plan.</p>
<p><strong>Paying cash.</strong> Without coverage, compounded injections are the cheapest route by thousands of dollars a year, the brand pills are the cheapest FDA-approved route, and the brand pens cost the most of anything on this page.</p>`,
  },
  {
    heading: "Are compounded GLP-1 injections FDA-approved?",
    body: `<p><strong>No. Compounded GLP-1 injections are legal under specific conditions, but the products are not FDA-approved.</strong> Since most "injection" prices in this guide are compounded prices, it is worth being exact. Compounding means a licensed pharmacist prepares a medicine for an individual patient under a prescription. The FDA's ${ext(SRC.fdaCompounding, "human drug compounding")} page describes two federal frameworks:</p>
<ul>
<li><strong>Section 503A:</strong> state-licensed pharmacies compounding for a specific patient. Nearly every telehealth GLP-1 program uses this route.</li>
<li><strong>Section 503B:</strong> registered outsourcing facilities producing larger batches under stricter oversight.</li>
</ul>
<p>Compounded GLP-1s expanded while semaglutide and tirzepatide were on the FDA shortage list, which loosens compounding limits. That period has ended: the FDA declared the tirzepatide shortage resolved on December 19, 2024 and the semaglutide shortage on February 21, 2025. What remains legal is a patient-specific prescription in which the prescriber documents a clinical need the approved product does not meet.</p>
<p>Read the FDA's ${ext(SRC.fdaConcerns, "summary of its concerns")} before you buy. Compounded products are not reviewed for safety, effectiveness or quality before sale; the agency has received adverse-event reports that include vial dosing errors; some products contained salt forms of semaglutide that are not the approved active ingredient; and products sold without a prescription may be counterfeit.</p>
<p>None of this makes compounded injections a scam. It means quality depends on the pharmacy rather than a brand, and you are relying on the telehealth provider's choice of pharmacy. The providers on this site name their pharmacies, and that is the first thing we check. There is no compounded version of Foundayo, and no compounded oral product has evidence comparable to the Wegovy pill's, so if you want a pill, choose one of the two approved ones. Our <a href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name</a> guide and the <a href="/articles/503a-vs-503b-pharmacy-28-day-rule">503A vs 503B explainer</a> go into more detail.</p>`,
  },
  {
    heading: "Can you switch between GLP-1 pills and injections, and what happens if you stop?",
    body: `<p><strong>You can switch between formats with your prescriber's help, but stopping a GLP-1 usually means regaining much of the weight.</strong> Switching is more common than marketing suggests: from a pill to an injection after a plateau, from an injection to a pill when insurance changes, or from a brand pen to a compounded vial when a savings card ends. Every switch goes through the prescriber. There is no do-it-yourself conversion between a weekly 2.4 mg pen and a daily 25 mg tablet, or between semaglutide and orforglipron, and clinicians usually restart the dose escalation instead of jumping to an equivalent dose.</p>
<p>Whichever format you use, treat it as a long-term medicine, much like blood-pressure medication. In the STEP 1 extension, people who stopped semaglutide and the lifestyle program regained about two-thirds of the weight they had lost within a year (Wilding et al., ${ext(SRC.step1ext, "Diabetes, Obesity and Metabolism")}, April 19, 2022). Plan your budget around that finding: pick the route whose second-year price you can keep paying, not the one with the cheapest first month. Our guide to <a href="/articles/stopping-glp1-medication-what-happens">what happens when you stop</a> covers the tapering and maintenance approaches clinicians use.</p>`,
  },
  {
    heading: "Should you choose a GLP-1 pill or an injection?",
    body: `<p><strong>Choose based on coverage first, then on whether you prioritize results, price or avoiding needles.</strong> Most readers fit one of these five situations:</p>
<p><strong>1. Your insurance covers a GLP-1 for weight management.</strong> Use the covered product. At $25 a month, either pill or a covered pen beats every cash route here, and the price difference between the pills becomes negligible. Check your formulary first, because it outweighs every other factor on this page.</p>
<p><strong>2. You have Medicare.</strong> Ask your Part D plan about the GLP-1 Bridge before comparing prices. With all four brand products at a flat $50, decide on routine and results: an injection for the bigger trial result, or Foundayo for the simplest routine.</p>
<p><strong>3. You are paying cash and results matter most.</strong> The evidence favors tirzepatide, and a compounded injection is the only affordable way to get it: from $71 a month in a Pre-Black Friday sale (check the plan terms at checkout) or $119 with no commitment. See <a href="/articles/best-tirzepatide-online">best tirzepatide online</a> for every verified price, and remember it is not an FDA-approved product.</p>
<p><strong>4. You are paying cash and will not inject.</strong> Ro offers the only verified telehealth route to an approved pill today, the Wegovy pill at $149 and then $299 plus membership. Foundayo's reference price is LillyDirect's reported $149-$349. The Wegovy pill has the larger trial result and Foundayo has no timing rules; <a href="/articles/foundayo-vs-wegovy-pill">Foundayo vs the Wegovy pill</a> compares them in detail. Do not accept a compounded "pill" as a replacement.</p>
<p><strong>5. You are paying cash and price decides.</strong> Compounded semaglutide injections from $41-$99 a month are the lowest prices in the market, and the weekly shot takes about thirty seconds that most people stop noticing by month two. <a href="/articles/what-100-to-200-a-month-gets-you-glp1">What $100-$200 a month gets you</a> shows what each price range buys.</p>
<p>In every case a licensed clinician decides based on your history rather than a table, and may decline to prescribe any of them.</p>`,
  },
  {
    heading: "How do you get a GLP-1 pill or injection online?",
    body: `<p><strong>Through a licensed telehealth provider: an online intake, a clinician review and, if appropriate, a prescription shipped to you or sent to your pharmacy.</strong> The process is the same for pills and injections, and it is the only legal way to get either:</p>
<ol>
<li>Complete an online intake covering your weight, health history, medicines and goals.</li>
<li>A licensed clinician reviews it by questionnaire, message or video.</li>
<li>If appropriate, you get a prescription, filled by the provider's partner pharmacy and shipped to you, or sent to a pharmacy of your choice when insurance applies.</li>
<li>Follow-up continues as the dose increases.</li>
</ol>
<p>For the brand pill, <a href="/reviews/ro">Ro</a> is the provider we have verified. For compounded injections, every provider ranked in our <a href="/">weight-loss comparison</a> completes that review before prescribing. The <a href="/articles/glp1-weight-loss-online-complete-guide">complete guide to GLP-1 weight loss online</a> covers each step from intake to first dose, including how to check the pharmacy, refund terms if you are not approved, and what to ask before paying upfront.</p>
<p><em>This guide offers general information and is not medical advice. GLP-1 medicines require assessment and supervision by a licensed healthcare provider, who decides whether any of them suits you.</em></p>`,
  },
];

export default async function Glp1PillsVsInjectionsPage() {
  const config = await getConfig();
  const wordCount = SECTIONS.reduce((n, s) => n + s.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length, 0);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GLP-1 Pills vs Injections in 2026: Weight Loss Results, Price by Route and Daily Routine Compared",
    description: metadata.description,
    datePublished: PAGE_PUBLISHED,
    dateModified: PAGE_UPDATED,
    wordCount,
    ...pageReviewSchema("/glp1-pills-vs-injections"),
    author: { "@type": "Organization", name: "Top Weight Loss Research Team", url: "https://www.topweightloss.us" },
    publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.topweightloss.us" },
      { "@type": "ListItem", position: 2, name: "Articles", item: "https://www.topweightloss.us/articles" },
      { "@type": "ListItem", position: 3, name: "GLP-1 Pills vs Injections", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero band - the article masthead: light-blue band, the vertical's
            hero image on the right on desktop, category + read time, H1, dek,
            date and the medical review line. Same layout and widths as
            src/components/pages/article-page.tsx. */}
        <div className="relative w-full overflow-hidden" style={{ backgroundColor: HERO_COLOR }}>
          {config.hero?.backgroundImageUrl && (
            <div className="absolute right-[380px] top-1/2 hidden h-[270px] w-[50%] -translate-y-1/2 sm:block lg:h-[300px]">
              <Image
                src={config.hero.backgroundImageUrl}
                alt={config.hero.imageAlt || ""}
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 640px) 50vw, 1px"
                className="object-contain object-right"
              />
            </div>
          )}
          <div className="relative z-10 mx-auto max-w-[1100px] px-4 pt-4 pb-5 sm:px-6 sm:py-10">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Articles", href: "/articles" },
                { label: "GLP-1 Pills vs Injections" },
              ]}
            />
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">Guide</span>
              <span className="flex items-center gap-1 text-[12px] text-gray-400">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {READ_TIME}
              </span>
            </div>
            <h1 className="text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-[#191919] sm:max-w-[640px] sm:text-[32px] sm:leading-tight sm:tracking-normal">
              GLP-1 Pills vs Injections in 2026: Which Works Better for You?
            </h1>
            <p className="mt-2 max-w-[640px] text-[14px] leading-[1.45] text-gray-600 sm:text-[16px] sm:leading-[1.55]">
              The Wegovy pill and Foundayo measured against weekly Wegovy and Zepbound: trial results,
              verified prices for every route, the side effects all four share, and the daily routine
              that tips the decision for most people.
            </p>
            <p className="mt-2 text-[12px] text-gray-400">Updated {fmt(PAGE_UPDATED)}</p>
            <MedicalReviewBar path="/glp1-pills-vs-injections" className="mt-3 max-w-[760px]" />
          </div>
        </div>

        {/* Body - the article container */}
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          {/* Quick answer (featured-snippet target), in the article's neutral
              box rather than a "winner" verdict: this is a guide, not a battle. */}
          <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-800">
            <div className="qa">
              <strong>Short answer</strong>
              {QUICK_ANSWER}
              <span className="mt-2 block text-[13px] text-gray-500">
                Trial numbers are the published treatment-policy results linked in the guide. Compounded and
                Ro prices were verified on each provider&rsquo;s site ({PRICE_DATE}{" "}for the price index,
                August 2026 for Ro&rsquo;s brand products); manufacturer prices come from dated reports and have
                not been verified by us.
              </span>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 sm:p-6">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">What to know first</p>
            <ul className="space-y-2">
              {KEY_TAKEAWAYS.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-800">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Table of contents" className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-gray-400">On this page</p>
            <ol className="space-y-1.5">
              {SECTIONS.map((s, i) => (
                <li key={s.heading} className="flex gap-2 text-[14px] leading-snug">
                  <span className="shrink-0 font-semibold text-gray-400">{i + 1}.</span>
                  <a href={`#${slugify(s.heading)}`} className="text-[#0C4B75] hover:underline">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="space-y-8">
            {SECTIONS.map((section, i) => (
              <div key={section.heading}>
                <section id={slugify(section.heading)}>
                  <h2 className="mb-3 text-[20px] font-bold text-[#191919] scroll-mt-24">{section.heading}</h2>
                  <div
                    className="article-body text-[16px] leading-[1.75] text-gray-800 [&_a]:text-[#0C4B75] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#093d61]"
                    dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(section.body) }}
                  />
                </section>
                {/* The ranked provider picks follow the cost section, where the
                    reader has just seen the prices those cards carry. */}
                {i === 4 && (
                  <div className="mt-8">
                    <TopTwoPicks config={config} linkPrefix="" />
                  </div>
                )}
              </div>
            ))}
          </article>

          {/* FAQ */}
          <section className="mt-12 mb-12">
            <h2 className="mb-6 text-[24px] font-bold text-[#191919]">GLP-1 pills vs injections: common questions</h2>
            <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              {FAQS.map((f) => (
                <div key={f.question} className="p-6">
                  <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                  <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Compare GLP-1 providers</h2>
            <p className="mb-6 text-[16px] leading-[1.75] text-gray-800">
              Pill or injection, every licensed telehealth provider we track is ranked side by side on
              verified prices, clinical support and overall value.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-[46px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                See the provider rankings
              </Link>
              <Link
                href="/weight-loss-pills"
                className="inline-flex h-[46px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
              >
                Read the weight loss pills guide
              </Link>
            </div>
          </section>

          <GuideCluster currentSlug="glp1-pills-vs-injections" />

          <MedicalSources vertical="weight-loss" />

          {/* Sources + disclaimer */}
          <section className="mt-10">
            <p className="mb-3 text-[13px] leading-relaxed text-gray-400">
              Sources: New England Journal of Medicine trial publications for STEP 1 (March 18, 2021),
              SURMOUNT-1 (July 21, 2022), and OASIS 4 and ATTAIN-1 (September 2025, summarized by the American
              College of Cardiology on September 24, 2025), plus the STEP 1 extension in Diabetes, Obesity and
              Metabolism (April 19, 2022), each linked where cited. FDA approvals: Wegovy (June 4, 2021),
              Zepbound (November 8, 2023), the Wegovy pill (December 2025) and Foundayo (April 1, 2026).
              Prices: providers&rsquo; own published figures, verified {PRICE_DATE} for the price index and
              August 2026 for Ro&rsquo;s brand products; Foundayo and NovoCare prices and savings cards as
              reported by Scientific American, Lilly&rsquo;s April 9, 2026 release and third-party trackers,
              not verified by us. Weight-loss figures are trial averages and individual results differ. Brand
              names are trademarks of their owners.
            </p>
            <p className="text-[13px] leading-relaxed text-gray-400">
              Top Weight Loss (topweightloss.us) is not a medical provider and does not prescribe. This page
              compares options for educational purposes and is not medical advice. GLP-1 medicines require
              assessment and ongoing supervision by a licensed healthcare provider.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
