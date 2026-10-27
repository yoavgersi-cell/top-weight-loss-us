import { withSeo } from "@/lib/seo";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, ArrowRight, TriangleAlert } from "lucide-react";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProviderCta } from "@/components/provider-cta";
import { MedicalSources } from "@/components/medical-sources";
import { enhanceArticleHtml } from "@/components/prose";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";

// ─────────────────────────────────────────────────────────────────────────────
// Weight loss pills - the long-form guide to every oral option.
//
// Oct 22, 2026 rebuild (operator request): the page now uses the article
// masthead and 1100px layout (light-blue band, the vertical's hero image on
// desktop, category + read time, quick answer, key takeaways, contents) and
// the body grows from a summary into a full guide. Facts: the GLP-1 pill
// figures are the published NEJM treatment-policy results and FDA approval
// dates, linked inline; the older prescription pills are described from their
// labels as summarised on MedlinePlus and the NIDDK's prescription-medication
// page, linked inline, with their typical results kept as the hedged ranges
// this page already carried; provider prices are the verified price index or
// Ro's published figures; manufacturer prices are reported from dated sources
// and labelled as not verified. Nothing is estimated.
// ─────────────────────────────────────────────────────────────────────────────

// Providers confirmed to offer compounded oral options (site owner confirmed).
// Featured accurately using verified provider data - no invented pill claims.
const PILL_PROVIDER_IDS = ["embody", "trimrx", "medvi", "shed"];

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/weight-loss-pills";
const PAGE_PUBLISHED = "2026-08-01";
const PAGE_UPDATED = "2026-10-22";
const HERO_COLOR = "#EEF4F1";
const READ_TIME = "17 min read";

export const metadata: Metadata = withSeo("/weight-loss-pills", {
  title: "Weight Loss Pills 2026: Wegovy Pill, Foundayo & Others Compared",
  description:
    "Weight loss pills compared: the Wegovy pill (13.6% average loss), Foundayo (11.2%), Rybelsus, Qsymia, Contrave, phentermine and orlistat, with prices from $149.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Weight Loss Pills 2026: Wegovy Pill, Foundayo & Others Compared",
    description:
      "Trial results, prices and safety rules for the FDA-approved GLP-1 tablets, the older prescription pills, compounded oral products and over-the-counter diet pills.",
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
  oasis4: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4",
  attain1: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/48/attain-1",
  step1: "https://doi.org/10.1056/NEJMoa2032183",
  surmount1: "https://doi.org/10.1056/NEJMoa2206038",
  wegovyPillApproval: "https://www.healio.com/news/endocrinology/20260213/fda-approves-wegovy-pill-the-first-oral-glp1-to-treat-obesity",
  foundayoApproval: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program",
  niddk: "https://www.niddk.nih.gov/health-information/weight-management/prescription-medications-treat-overweight-obesity",
  qsymia: "https://medlineplus.gov/druginfo/meds/a612037.html",
  contrave: "https://medlineplus.gov/druginfo/meds/a619020.html",
  fdaConcerns: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding",
  fdaAlfia: "https://www.fda.gov/drugs/medication-health-fraud/public-notification-alfia-weight-loss-capsules-contain-hidden-drug-ingredient",
  lillyRelease: "https://www.biospace.com/press-releases/foundayo-orforglipron-lillys-new-oral-glp-1-pill-for-weight-loss-now-available-in-the-u-s",
  sciam: "https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/",
  noom: "https://www.noom.com/blog/weight-management/wegovy-pill-cost-with-and-without-insurance/",
  bridge: "https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know",
};

const PRICE_DATE = fmt(PRICE_INDEX_VERIFIED);

const QUICK_ANSWER =
  "The most effective weight loss pills in 2026 are the two GLP-1 tablets the FDA has approved for weight management. The Wegovy pill (oral semaglutide 25 mg, approved December 2025) averaged 13.6% weight loss in its trial, and Foundayo (orforglipron, approved April 1, 2026) averaged 11.2%. The older prescription pills, Qsymia, Contrave, phentermine and orlistat, typically land around 3-10%, and over-the-counter products have little evidence at all. On cost: Ro charges $149 for the first Wegovy pill month, then $299 plus membership (verified); self-pay prices of $149-$349 a month are reported for the two pills, with $25 on commercial coverage and $50 through Medicare's pilot. Compounded oral semaglutide from telehealth programs is a separate product and is not FDA-approved.";

const KEY_TAKEAWAYS = [
  "The FDA has approved two GLP-1 pills for chronic weight management. The Wegovy pill averaged 13.6% weight loss over 64 weeks (OASIS 4) and Foundayo averaged 11.2% over 72 weeks (ATTAIN-1). Rybelsus is oral semaglutide at diabetes doses and carries no weight-loss approval.",
  "The pre-GLP-1 prescription pills remain useful for the right patient: Qsymia (phentermine/topiramate) and Contrave (naltrexone/bupropion) for long-term treatment, phentermine for a short course, and orlistat, which stops part of dietary fat from being absorbed. Each one has clear exclusions.",
  "What you pay depends on how you buy. Verified: Ro sells the Wegovy pill at $149 for month one, then $299 plus membership. Reported: Foundayo at $149-$349 self-pay, $25 a month for either pill with commercial coverage, and $50 a month on Medicare's GLP-1 Bridge through December 2027.",
  "A compounded oral semaglutide or tirzepatide product is not the Wegovy pill. It is a legal pharmacy-made preparation with no trials of its own and no FDA approval. Over-the-counter diet pills are a bigger risk: the FDA has found hidden, banned drugs in them.",
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do weight loss pills actually work?",
    answer:
      "Prescription weight loss pills do work, and the newest ones come close to injections. The Wegovy pill averaged 13.6% weight loss in OASIS 4 and Foundayo averaged 11.2% in ATTAIN-1, while older FDA-approved pills such as Qsymia and Contrave average roughly 5-10%. Over-the-counter 'natural' or 'fat burner' products are mostly unproven and do not replace prescription treatment.",
  },
  {
    question: "Is there a weight loss pill as effective as Ozempic or Wegovy?",
    answer:
      "For semaglutide, yes. The Wegovy pill (oral semaglutide 25 mg), approved by the FDA in December 2025, averaged 13.6% weight loss at 64 weeks in OASIS 4, which the trial authors describe as similar to the weekly Wegovy injection in its own trial. Foundayo (orforglipron), approved April 1, 2026, reached 11.2% at its highest dose. Injectable tirzepatide (Zepbound) still has the highest average result, 20.9% at the top dose in SURMOUNT-1.",
  },
  {
    question: "What is the strongest prescription weight loss pill?",
    answer:
      "By published trial results, the Wegovy pill (oral semaglutide 25 mg) is the strongest at 13.6% average weight loss, with Foundayo next at 11.2%. Those numbers come from separate trials, not a head-to-head study. Outside the GLP-1 class, Qsymia (phentermine/topiramate) usually produces the most weight loss, around 8-10% on average.",
  },
  {
    question: "How much do the FDA-approved GLP-1 pills cost?",
    answer:
      "Ro, the telehealth route we have verified, charges $149 for the first month of the Wegovy pill and $299 a month after that, plus a membership of $39 the first month and then $74-149. Novo Nordisk's direct self-pay prices are reported at $149-$299 by dose, and Foundayo is listed at $149-$349 a month through LillyDirect. Each manufacturer offers a $25-a-month savings card for people with commercial coverage, and Medicare's GLP-1 Bridge pilot covers both pills at $50 a month through December 2027.",
  },
  {
    question: "Can you get weight loss pills online?",
    answer:
      "Yes. A licensed telehealth clinician can assess you online and prescribe an oral weight loss medication if it is appropriate. Ro offers the FDA-approved Wegovy pill, and several providers we review sell compounded oral semaglutide or tirzepatide, which are not FDA-approved. The clinician decides whether a pill or an injection suits your health profile.",
  },
  {
    question: "Are compounded weight loss pills the same as the Wegovy pill or Foundayo?",
    answer:
      "No. The Wegovy pill and Foundayo are FDA-approved finished medicines backed by their own trials. Compounded oral semaglutide or tirzepatide is made by a licensed 503A pharmacy for one patient's prescription, which is legal and regulated, but the product is not FDA-approved, has not been tested in its own trials and is absorbed differently from the approved tablets. That is also why it costs less.",
  },
  {
    question: "Who should not take weight loss pills?",
    answer:
      "Each pill has its own exclusions. GLP-1 pills are contraindicated with a personal or family history of medullary thyroid carcinoma or MEN 2; Qsymia is ruled out in pregnancy, glaucoma and hyperthyroidism; and Contrave has a boxed warning for suicidal thoughts and cannot be combined with opioids, seizure disorders, uncontrolled high blood pressure or MAO inhibitors. Phentermine is a controlled stimulant with heart-related cautions, and none of these medicines is used in pregnancy. A licensed clinician screens for all of this before prescribing.",
  },
  {
    question: "Are weight loss pills or injections better?",
    answer:
      "It comes down to what matters most to you. Injections still give the highest average weight loss (tirzepatide 20.9% at the top dose), yet the Wegovy pill matched semaglutide injections in its own trial and Foundayo has no needle and no timing rules. Choose an injection for maximum average results, or a GLP-1 pill if avoiding needles comes first, and let a clinician weigh your history.",
  },
  {
    question: "Are over-the-counter diet pills safe?",
    answer:
      "Be skeptical of them. Most have little evidence for their claims, and FDA testing has repeatedly found weight-loss supplements sold online that contain hidden sibutramine, a prescription drug pulled from the US market in 2010 over cardiovascular risk. The only over-the-counter weight-loss medicine with FDA approval is orlistat 60 mg (Alli).",
  },
];

type Section = { heading: string; body: string };

const SECTIONS: Section[] = [
  {
    heading: "Do weight loss pills work in 2026?",
    body: `<p><strong>Yes, the prescription ones do, and the best of them now rival injections.</strong> Two GLP-1 medicines, from the same drug class as Ozempic, Wegovy and Zepbound, are FDA-approved as once-daily tablets for chronic weight management:</p>
<ul>
<li>The <strong>Wegovy pill</strong> (oral semaglutide 25 mg, Novo Nordisk), approved in ${ext(SRC.wegovyPillApproval, "December 2025")}, averaged 13.6% weight loss in its trial. Its trial authors describe that result as similar to the weekly semaglutide injection.</li>
<li><strong>Foundayo</strong> (orforglipron, Eli Lilly), approved on ${ext(SRC.foundayoApproval, "April 1, 2026")}, averaged 11.2%.</li>
</ul>
<p>The older prescription pills are still prescribed. They make sense for people who cannot take a GLP-1, cannot afford one, or need less weight loss than a GLP-1 delivers.</p>
<p>Ranked by the strength of their evidence, the options fall into four groups, and this guide covers them in this order:</p>
<ol>
<li><strong>FDA-approved GLP-1 pills:</strong> the Wegovy pill and Foundayo. Rybelsus belongs to the same family but is semaglutide at diabetes doses with no weight-loss approval.</li>
<li><strong>Older FDA-approved prescription pills:</strong> Qsymia, Contrave, phentermine and orlistat, averaging roughly 3-10% weight loss, each with people who must avoid it.</li>
<li><strong>Compounded oral semaglutide and tirzepatide:</strong> offered by some telehealth programs, legal under certain conditions, not FDA-approved and never tested in their own trials.</li>
<li><strong>Over-the-counter "diet pills":</strong> the group in which the FDA keeps finding hidden, banned drugs.</li>
</ol>
<p>Leaning toward a shot instead? See our <a href="/semaglutide">semaglutide</a> and <a href="/tirzepatide">tirzepatide</a> provider guides, or the side-by-side breakdown in <a href="/glp1-pills-vs-injections">GLP-1 pills vs injections</a>.</p>`,
  },
  {
    heading: "Wegovy pill vs Foundayo vs Rybelsus: the GLP-1 tablets",
    body: `<p><strong>The GLP-1 tablets contain the same class of medicine as the weekly injections, taken by mouth instead.</strong> Trial figures in the table are the published New England Journal of Medicine results, which count every randomized participant. The manufacturers also cite higher on-treatment figures (16.6% for the Wegovy pill, 12.4% for Foundayo) that only include people who kept taking the pill as directed. Ro's prices are its own published figures, verified by us; manufacturer prices are as reported by the sources linked in the cost section.</p>
<table><thead><tr><th>Pill</th><th>Approval and dosing routine</th><th>Trial result</th><th>Published price</th></tr></thead><tbody>
<tr><td><strong>Wegovy pill</strong> (oral semaglutide 25 mg), Novo Nordisk</td><td>Approved December 2025 for chronic weight management. One tablet a day on an empty stomach with a sip of water, then 30 minutes before any food</td><td>${ext(SRC.oasis4, "OASIS 4")} (64 weeks): 13.6% average weight loss vs 2.2% with placebo; 30% of participants lost 20% or more</td><td>Ro: $149 for month one, then $299, plus membership (verified). NovoCare self-pay reported at $149-$299 depending on dose; $25 with commercial coverage (reported)</td></tr>
<tr><td><strong>Foundayo</strong> (orforglipron), Eli Lilly</td><td>Approved April 1, 2026. A small-molecule GLP-1 taken once a day at any time, with no food or water rules; 6, 12 and 36 mg tablets</td><td>${ext(SRC.attain1, "ATTAIN-1")} (72 weeks): 11.2% average weight loss at 36 mg vs 2.1% with placebo; 19% of participants lost 20% or more</td><td>LillyDirect self-pay $149-$349 a month depending on dose; $25 a month with commercial coverage (Lilly, as reported)</td></tr>
<tr><td><strong>Rybelsus</strong> (oral semaglutide 7-14 mg), Novo Nordisk</td><td>Approved for type 2 diabetes only, not weight management. Follows the same empty-stomach rule as the Wegovy pill</td><td>Some weight loss at diabetes doses, clearly less than the 25 mg Wegovy pill</td><td>Prescribed on its diabetes label; using it for weight loss is off-label and not covered for that purpose</td></tr>
</tbody></table>
<h3>How the Wegovy pill works and how you take it</h3>
<p>The Wegovy pill delivers semaglutide, a peptide, and the gut absorbs peptides poorly. That explains two things: the tablet holds 25 mg of semaglutide compared with 2.4 mg a week in the injection, and it comes with a strict routine. You swallow it on an empty stomach with a small sip of water and then wait about 30 minutes before eating, drinking or taking other medicines; skipping the wait reduces how much drug gets absorbed. Treatment starts at a 1.5 mg tablet and steps up over several months to the 25 mg maintenance dose tested in the trial. The approval covers reducing and keeping off excess weight in adults with obesity, or with overweight plus a weight-related condition, and lowering cardiovascular risk in the same group. For every way to buy it, see <a href="/articles/wegovy-pill-price-online">Wegovy pill price online</a>.</p>
<h3>Why Foundayo has no timing rules</h3>
<p>Foundayo's active ingredient, orforglipron, is a small molecule rather than a peptide, so it is absorbed like most everyday tablets. As a result you can take it at any hour, with or without food or water, moving up through 6 mg, 12 mg and 36 mg tablets. Its average result is lower than the Wegovy pill's, but the two drugs were studied in separate trials of different lengths and have never been compared directly. Foundayo's strongest selling point is convenience for people who take other morning medicines, want coffee as soon as they wake, or will not stick to a timed routine. Our <a href="/articles/foundayo-vs-wegovy-pill">Foundayo vs Wegovy pill</a> comparison goes through the differences in detail.</p>
<h3>Why Rybelsus is not a weight loss pill</h3>
<p>Rybelsus contains the same semaglutide as the Wegovy pill, but at 7 mg and 14 mg, and it is approved for type 2 diabetes. Weight does come down on it, yet the doses are far lower than the 25 mg weight-management tablet, the empty-stomach rule still applies, and insurers will not cover it for weight loss because that use is not on its label. Being offered Rybelsus "for weight loss" means being offered an off-label diabetes medicine when an approved weight-loss version of the same molecule is available.</p>`,
  },
  {
    heading: "Are GLP-1 pills as effective as GLP-1 injections?",
    body: `<p><strong>Almost, but not quite.</strong> Injections still produce the highest average weight loss. The Wegovy pill matched semaglutide injections in its own trial, and Foundayo trades a few points of effect for no needle and no timing rules.</p>
<table><thead><tr><th>Factor</th><th>GLP-1 pills</th><th>GLP-1 injections</th></tr></thead><tbody>
<tr><td>Average trial weight loss</td><td>13.6% (Wegovy pill, OASIS 4) and 11.2% (Foundayo, ATTAIN-1) at the highest doses</td><td>14.9% (semaglutide, ${ext(SRC.step1, "STEP 1")}) up to 20.9% (tirzepatide 15 mg, ${ext(SRC.surmount1, "SURMOUNT-1")})</td></tr>
<tr><td>How it is taken</td><td>One tablet a day, no needles</td><td>One injection a week, from a pen or a compounded vial</td></tr>
<tr><td>Published price</td><td>From $149 a month at the starting dose; $299 (Wegovy pill) to $349 (Foundayo) at the top dose, as reported; $25 with commercial coverage</td><td>Brand pens $1,149-$1,799 a month cash at the providers we track; compounded from $49 (semaglutide) and $89 (tirzepatide)</td></tr>
<tr><td>Daily routine</td><td>Wegovy pill and Rybelsus require empty-stomach timing; Foundayo has no rules</td><td>A single weekly dose and nothing in between</td></tr>
<tr><td>Best suited to</td><td>People who avoid needles, prefer a daily habit or, with Foundayo, want no rules at all</td><td>People who want the highest average weight loss, or the lowest cash price through compounding</td></tr>
</tbody></table>
<p>The format does not change the side effects. Pills and injections share the same digestive side effects, which mostly show up early and after dose increases, and carry the same class warnings. For year-one costs and a closer look at each routine, read <a href="/glp1-pills-vs-injections">GLP-1 pills vs injections</a>.</p>`,
  },
  {
    heading: "Qsymia, Contrave, phentermine and orlistat: how the older pills compare",
    body: `<p><strong>The older prescription pills produce less weight loss than the GLP-1 tablets but usually cost far less, since most are available as generics.</strong> They were the main prescription options before GLP-1s arrived and are still written every day. Each works differently: some curb appetite, one targets cravings, and one blocks fat absorption. The ${ext(SRC.niddk, "NIDDK overview of prescription medicines for overweight and obesity")} lists each with its approval. The typical results below are approximate ranges, and individual responses vary a lot.</p>
<table><thead><tr><th>Pill</th><th>Mechanism and key exclusions</th><th>Typical results</th></tr></thead><tbody>
<tr><td><strong>Qsymia</strong> (phentermine/topiramate ER)</td><td>Reduces appetite and cravings; one capsule a day, increased over the first weeks, with a weight review at 12 weeks. Not for pregnancy (topiramate causes birth defects); contraindicated with glaucoma and hyperthyroidism</td><td>The most effective of the non-GLP-1 pills, about 8-10% average weight loss</td></tr>
<tr><td><strong>Contrave</strong> (naltrexone/bupropion)</td><td>Acts on appetite and reward-driven eating; one daily tablet. Boxed warning for suicidal thoughts and behavior; not with opioids, seizure disorders, uncontrolled high blood pressure or MAO inhibitors</td><td>About 5-9% average weight loss</td></tr>
<tr><td><strong>Phentermine</strong> (Adipex-P and generics)</td><td>Short-term appetite suppressant; a controlled stimulant with heart-related cautions, approved for a few weeks at a time</td><td>About 3-5% over a short course</td></tr>
<tr><td><strong>Orlistat</strong> (Xenical on prescription, Alli over the counter)</td><td>Stops part of the fat you eat from being absorbed; taken with meals. Digestive side effects are common and rise with the fat content of the meal</td><td>About 3-5%</td></tr>
<tr><td><strong>Metformin</strong></td><td>A diabetes medicine used off-label for weight; improves insulin sensitivity. Not FDA-approved for weight loss</td><td>Small, around 2-3%; often chosen as a low-cost option</td></tr>
</tbody></table>
<h3>Qsymia (phentermine/topiramate)</h3>
<p>Qsymia pairs phentermine with extended-release topiramate, a medicine for seizures and migraine that also lowers appetite. It is prescribed together with a reduced-calorie diet and exercise for adults, and for children 12 and older, who have obesity or overweight with a weight-related condition. According to the ${ext(SRC.qsymia, "MedlinePlus drug information")}, it starts at a low dose, increases after 14 days, and is reassessed at 12 weeks, when the clinician decides to continue, raise the dose or stop. Topiramate sets the strict rules: because it can cause birth defects, a negative pregnancy test is needed before starting and reliable contraception throughout, and glaucoma and an overactive thyroid rule it out. By the published figures, Qsymia is the strongest of the older pills.</p>
<h3>Contrave (naltrexone/bupropion)</h3>
<p>Contrave combines naltrexone, which blocks opioids, with bupropion, an antidepressant also used to help people quit smoking. The ${ext(SRC.contrave, "MedlinePlus drug information")} leads with its boxed warning: in studies, bupropion was associated with suicidal thoughts in a small number of young people, so anyone taking it should be monitored for mood changes. It cannot be used with opioids, because naltrexone blocks them and can set off withdrawal, by people with seizure disorders or uncontrolled high blood pressure, or within 14 days of an MAO inhibitor. For a suitable patient, often someone who eats in response to cravings more than hunger, Contrave is a sensible option.</p>
<h3>Phentermine</h3>
<p>Phentermine is the oldest medicine here and remains the most prescribed. It is a stimulant-like appetite suppressant and a controlled substance, approved for short-term use lasting weeks, with cautions for heart disease, high blood pressure, overactive thyroid, glaucoma and MAO inhibitors. The generic is cheap and it works while you are taking it, but weight usually comes back once the course ends. That is why clinicians now tend to use phentermine as a short kick-start rather than a long-term plan.</p>
<h3>Orlistat (Xenical and Alli)</h3>
<p>Orlistat acts in the digestive tract instead of the brain. It blocks the enzyme that breaks down fat, so some of the fat in each meal passes through without being absorbed. Xenical is the 120 mg prescription strength, and Alli, at 60 mg, is the only over-the-counter weight-loss medicine with FDA approval. Its side effects come straight from how it works: oily stools, urgency and gas, all worse after high-fat meals, which tends to push people toward eating less fat. Because it also reduces absorption of fat-soluble vitamins, a daily multivitamin taken at a different time from the dose is the usual advice.</p>
<h3>Metformin</h3>
<p>Metformin is a type 2 diabetes medicine that some clinicians prescribe off-label for weight, especially when insulin resistance or prediabetes is present. Its effect on weight is small and it has no FDA approval for weight loss. It appears here because it is inexpensive, well known and often the first option a primary-care doctor tries, not because it can replace any of the medicines above when the aim is substantial weight loss.</p>`,
  },
  {
    heading: "How much do weight loss pills cost?",
    body: `<p><strong>GLP-1 pills cost $149-$349 a month self-pay as reported, $25 with commercial coverage and $50 on Medicare's pilot; the older pills are mostly cheap generics.</strong> The GLP-1 tablets are new brand-name drugs with brand-name pricing, and savings cards or Medicare's pilot can change what you pay completely. We do not list prices for the older generic pills because they vary by pharmacy and plan; a pharmacist can quote you the cash price quickly. Ro's figures below are its own published prices, verified by us in August 2026. Manufacturer prices come from the dated sources linked and have not been verified by us.</p>
<table><thead><tr><th>Route</th><th>Wegovy pill</th><th>Foundayo</th></tr></thead><tbody>
<tr><td>Telehealth (verified)</td><td><a href="/reviews/ro">Ro</a>: <strong>$149</strong> for month one, then <strong>$299</strong>, plus membership ($39 first month, then $74-$149)</td><td>Sold through LillyDirect and telehealth providers according to Lilly; no provider we track has published a price we could verify</td></tr>
<tr><td>Direct from the manufacturer, self-pay (reported)</td><td><strong>$149-$299</strong> a month depending on dose through NovoCare Pharmacy, according to ${ext(SRC.noom, "third-party trackers")}; not verified by us</td><td><strong>$149-$349</strong> a month depending on dose through LillyDirect, as reported by ${ext(SRC.sciam, "Scientific American")} from Lilly material</td></tr>
<tr><td>Commercial insurance that covers the drug (reported)</td><td><strong>as low as $25</strong> with Novo Nordisk's savings offer, limited to $100 of savings per 30-day supply</td><td><strong>$25</strong> with Lilly's savings card, according to its ${ext(SRC.lillyRelease, "April 9, 2026 release")}</td></tr>
<tr><td>Medicare GLP-1 Bridge</td><td><strong>$50</strong> flat copay</td><td><strong>$50</strong> flat copay</td></tr>
</tbody></table>
<p>The Medicare GLP-1 Bridge is a CMS pilot that runs from ${ext(SRC.bridge, "July 1, 2026 through December 31, 2027")}. It covers the Wegovy pill and injection, the Zepbound KwikPen and Foundayo at $50 a month at any dose, with eligibility and approval handled by your Part D plan. Neither manufacturer savings card can be used with Medicare or Medicaid.</p>
<p>For comparison, at the providers we track, compounded semaglutide injections cost $49-$199 a month and compounded tirzepatide $89-$299, verified on each provider's site on ${PRICE_DATE}. If you are paying cash and dislike needles, read <a href="/articles/what-100-to-200-a-month-gets-you-glp1">what $100-$200 a month gets you</a> before deciding a pill is worth the extra cost. To check your formulary first, use <a href="/articles/glp1-with-insurance">our insurance guide</a>, and for Medicare questions see <a href="/articles/glp1-after-65-medicare">GLP-1s after 65</a>.</p>`,
  },
  {
    heading: "Is compounded oral semaglutide the same as the Wegovy pill?",
    body: `<p><strong>No. Compounded oral semaglutide and tirzepatide are not FDA-approved and have never been tested in their own trials.</strong> Several telehealth providers sell them as tablets, under-the-tongue drops or dissolving films next to their injections, and some simply call them "the pill". Licensed 503A compounding pharmacies make them for individual prescriptions under the rules the FDA describes on its ${ext(SRC.fdaCompounding, "human drug compounding")} page. That channel is legal and regulated, but the products differ from the approved tablets in three ways:</p>
<ul>
<li><strong>No FDA approval.</strong> Compounded products do not go through pre-market review.</li>
<li><strong>No trials of their own.</strong> There is no published evidence of how much weight they produce.</li>
<li><strong>Different absorption.</strong> An oral compounded peptide is absorbed differently from the approved 25 mg tablet, which needed specific formulation work to survive the stomach.</li>
</ul>
<p>The FDA's ${ext(SRC.fdaConcerns, "statement on unapproved GLP-1 drugs")} lists its concerns: no pre-market check of safety, effectiveness or quality; adverse-event reports that include dosing mistakes; and products containing salt forms of semaglutide that are not the approved active ingredient.</p>
<p>Their appeal is a lower price and an existing relationship with a provider. Put plainly, choosing a compounded oral product means trusting that the pharmacy's formulation delivers enough medicine, without published evidence that it does. If you want a pill backed by data, choose one of the two approved pills. If price is the deciding factor and an injection is acceptable, compounded injections use the same molecules and have far more real-world use. We cover the trade-offs in <a href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name</a> and the <a href="/articles/503a-vs-503b-pharmacy-28-day-rule">503A vs 503B explainer</a>. A licensed clinician reviews your health profile and decides between oral and injectable options, with no in-person visit required.</p>`,
  },
  {
    heading: "Are over-the-counter diet pills safe?",
    body: `<p><strong>Mostly no: over-the-counter diet pills are largely unproven, and some contain hidden prescription drugs.</strong> Fat burners, appetite "blockers", herbal blends and detox teas rarely have solid evidence behind them, and they are not regulated like prescription medicines. Doing nothing is not the only risk. FDA testing of weight-loss supplements sold online and in stores has repeatedly turned up undeclared prescription drugs, most often <strong>sibutramine</strong>, a weight-loss medicine withdrawn from the US market in 2010 because it raised blood pressure and heart rate and increased cardiovascular risk. The ${ext(SRC.fdaAlfia, "February 2023 FDA notice on Alfia Weight Loss Capsules")} is one entry in a long list, and the FDA has said it cannot test every product sold, so a product missing from that list is not proof it is safe.</p>
<p>Orlistat 60 mg (Alli), covered above, is the only over-the-counter weight-loss product with FDA approval. Treat everything else sold for weight loss without a prescription as unproven at best. For real results, the evidence points to a licensed clinician and an FDA-approved medicine, and every option on this page apart from Alli needs a prescription.</p>`,
  },
  {
    heading: "Who should avoid each weight loss pill?",
    body: `<p><strong>Every weight loss pill has people who must not take it, and a legitimate provider's intake form is designed to identify them.</strong> The firm exclusions from the labels:</p>
<ul>
<li><strong>Pregnancy and breastfeeding.</strong> None of these medicines is used during pregnancy. Qsymia is the strictest, because topiramate causes birth defects: it requires a pregnancy test before starting and reliable contraception for the whole course.</li>
<li><strong>GLP-1 pills (Wegovy pill, Foundayo, Rybelsus).</strong> Contraindicated with a personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2; carry warnings on pancreatitis and gallbladder disease. The Wegovy pill's absorption rule means other morning medicines may need to move.</li>
<li><strong>Qsymia.</strong> Not with glaucoma, an overactive thyroid, or within 14 days of an MAO inhibitor; topiramate can also affect mood and memory and raise the risk of kidney stones.</li>
<li><strong>Contrave.</strong> Not with any opioid use, seizure disorders, uncontrolled high blood pressure, a history of eating disorders, sudden withdrawal from alcohol or sedatives, or MAO inhibitors; its boxed warning on suicidal thoughts applies to everyone who starts it.</li>
<li><strong>Phentermine.</strong> Not with heart disease, uncontrolled high blood pressure, an overactive thyroid, glaucoma, a history of drug misuse, or MAO inhibitors.</li>
<li><strong>Orlistat.</strong> Not with chronic malabsorption or gallbladder problems; it also alters absorption of some other medicines, including thyroid hormone and certain anticoagulants, which need to be spaced apart.</li>
</ul>
<p>Two broader points apply to all of them. First, each is a prescription medicine within a treatment plan, not a simple purchase, and the prescribing clinician also handles side effects and decides when to stop. Second, weight tends to come back after stopping: in the GLP-1 extension studies, about two-thirds of the weight lost was regained within a year of stopping semaglutide, and the older pills follow the same pattern in practice. The practical question is which option you can keep up.</p>`,
  },
  {
    heading: "Which weight loss pill is right for you?",
    body: `<p><strong>The right pill depends on your coverage, budget and health history.</strong> Most readers match one of these situations:</p>
<p><strong>Your insurance covers a GLP-1 and you want the strongest pill.</strong> Pick the Wegovy pill or Foundayo, whichever your plan covers, at a reported $25 a month with the savings card. The Wegovy pill has the bigger trial result; Foundayo has no timing rules.</p>
<p><strong>You have Medicare.</strong> Ask your Part D plan about the GLP-1 Bridge, which covers both pills at a flat $50 that does not rise with the dose. Decide on routine and results rather than price.</p>
<p><strong>You want a GLP-1 pill and will pay cash.</strong> Ro is the telehealth route for the Wegovy pill we have verified, at $149 and then $299 plus membership. For Foundayo, the reference is LillyDirect's reported $149-$349. Plan around the maintenance-dose price rather than month one, and do not accept a compounded "pill" in place of an approved one.</p>
<p><strong>You cannot take a GLP-1, or you need less weight loss.</strong> Qsymia is the strongest older pill and Contrave suits eating driven by cravings. Both are long-term options with specific exclusions, and a clinician who knows your history picks between them.</p>
<p><strong>You want the lowest cost with evidence behind it.</strong> Consider generic phentermine for a short start, or orlistat; both are inexpensive at a pharmacy. If a weekly injection is acceptable, compounded semaglutide starts at $49 a month and produces much more weight loss than any older pill. <a href="/">Our provider comparison</a> lists every verified compounded price.</p>
<p><strong>You were about to buy an over-the-counter product.</strong> Read the FDA section above first. Alli is the only one with an approval; with the rest you are gambling on what is inside as well as on results.</p>
<p>In every case, the prescriber decides based on your history rather than a table, and may decline to prescribe any of these.</p>`,
  },
  {
    heading: "How do you get prescription weight loss pills online?",
    body: `<p><strong>You complete an online intake, a licensed clinician reviews it, and if a prescription is appropriate the medicine is shipped to you or sent to your pharmacy.</strong> The steps are the same for every prescription option:</p>
<ol>
<li>Fill in an online intake covering your weight, health history, current medicines and goals.</li>
<li>A licensed clinician reviews it.</li>
<li>If appropriate, you receive a prescription, filled by the provider's partner pharmacy and shipped to you, or sent to a pharmacy you choose when insurance applies.</li>
<li>Follow-up continues as the dose increases, or at the 12-week check the older pills' labels require.</li>
</ol>
<p>For the FDA-approved Wegovy pill, <a href="/reviews/ro">Ro</a> is the provider we have verified. For compounded oral or injectable semaglutide and tirzepatide, every provider below and on our <a href="/">comparison</a> requires a clinician review before prescribing. Our <a href="/articles/glp1-weight-loss-online-complete-guide">complete guide to GLP-1 weight loss online</a> covers each step, including how to check the pharmacy and the refund terms if you are not approved.</p>
<p><em>This guide offers general information and is not medical advice. Prescription weight loss medicines need assessment and supervision by a licensed healthcare provider, who decides whether any of them suits you.</em></p>`,
  },
];

export default async function WeightLossPillsPage() {
  const config = await getConfig();
  const pillProviders = PILL_PROVIDER_IDS
    .map((id) => config.providers.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const wordCount = SECTIONS.reduce((n, s) => n + s.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length, 0);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Weight Loss Pills in 2026: The Wegovy Pill, Foundayo, Rybelsus and the Older Prescription Options Compared",
    description: metadata.description,
    datePublished: PAGE_PUBLISHED,
    dateModified: PAGE_UPDATED,
    wordCount,
    ...pageReviewSchema("/weight-loss-pills"),
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
      { "@type": "ListItem", position: 3, name: "Weight Loss Pills", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const providerCards = pillProviders.length > 0 && (
    <div className="mt-8">
      <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-gray-400">Providers offering compounded oral options</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {pillProviders.map((p) => (
          <div key={p.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex h-[34px] w-[120px] items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
            </div>
            {p.highlights?.length > 0 && (
              <ul className="mb-5 space-y-2">
                {p.highlights.slice(0, 3).map((h, hi) => (
                  <li key={hi} className="flex items-start gap-2 text-[13px] leading-snug text-gray-600">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
              <ProviderCta
                href={p.affiliateUrl}
                providerName={p.name}
                providerSlug={p.id}
                pageType="listing"
                sourceFlow="main_comparison"
                className="inline-flex h-[42px] items-center justify-center gap-1.5 rounded-lg bg-[#0C4B75] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                Visit {p.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </ProviderCta>
              <Link href={`/reviews/${p.id}`} className="text-[13px] font-bold text-[#0C4B75] hover:underline">
                Read our review
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero band - the article masthead, same layout and widths as
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
                { label: "Weight Loss Pills" },
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
              Weight Loss Pills in 2026: Which Ones Work and What They Cost
            </h1>
            <p className="mt-2 max-w-[640px] text-[14px] leading-[1.45] text-gray-600 sm:text-[16px] sm:leading-[1.55]">
              A plain-English guide to the two FDA-approved GLP-1 tablets, the older prescription
              pills, compounded oral products and over-the-counter diet pills: how each works, its
              trial evidence, its price and who should avoid it.
            </p>
            <p className="mt-2 max-w-[640px] text-[13.5px] leading-[1.5] text-gray-500">
              Comparing pills with injections on price, or paying through Medicare? See our{" "}
              <Link href="/articles/glp1-cost-2026-how-to-pay-less" className="font-semibold text-[#0C4B75] underline underline-offset-2">2026 GLP-1 cost guide</Link>.
            </p>
            <p className="mt-2 text-[12px] text-gray-400">Updated {fmt(PAGE_UPDATED)}</p>
            <MedicalReviewBar path="/weight-loss-pills" className="mt-3 max-w-[760px]" />
          </div>
        </div>

        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-800">
            <div className="qa">
              <strong>Short answer</strong>
              {QUICK_ANSWER}
              <span className="mt-2 block text-[13px] text-gray-500">
                Trial numbers are the published treatment-policy results linked in the guide. Ro&rsquo;s price
                is its own published figure, which we verified in August 2026; manufacturer prices come from
                dated reports and have not been verified by us.
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
                {/* The ranked picks follow the GLP-1 pills section; the
                    compounded-oral provider cards follow their own section. */}
                {i === 1 && (
                  <div className="mt-8">
                    <TopTwoPicks config={config} linkPrefix="" />
                  </div>
                )}
                {i === 5 && providerCards}
                {i === 6 && (
                  <div className="mt-6 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
                    <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" strokeWidth={2} />
                    <p className="text-[14px] leading-[1.7] text-gray-600">
                      Feeling unwell after an over-the-counter weight-loss product? A racing heart, chest pain, a
                      severe headache or a sudden rise in blood pressure all warrant medical care, and you should
                      tell the clinician exactly what you took. Suspect products can be reported to the FDA through
                      its MedWatch program.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </article>

          <section className="mt-12 mb-12">
            <h2 className="mb-6 text-[24px] font-bold text-[#191919]">Weight loss pills: common questions</h2>
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
            <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Compare weight loss providers</h2>
            <p className="mb-6 text-[16px] leading-[1.75] text-gray-800">
              Pill or injection, every licensed telehealth provider we track is ranked side by side on
              verified prices, clinical support and overall value.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-[46px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                Compare all providers
              </Link>
              <Link
                href="/find-your-match"
                className="inline-flex h-[46px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
              >
                Find your match
              </Link>
            </div>
          </section>

          <GuideCluster currentSlug="weight-loss-pills" />

          <MedicalSources vertical="weight-loss" />

          <section className="mt-10">
            <p className="mb-3 text-[13px] leading-relaxed text-gray-400">
              Sources: FDA approvals: the Wegovy pill (oral semaglutide 25 mg), approval announced December 22,
              2025 (Healio), and Foundayo (orforglipron), approved April 1, 2026 (FDA). Trials: OASIS 4 and
              ATTAIN-1, published in the New England Journal of Medicine in September 2025 and summarized by the
              American College of Cardiology, plus STEP 1 and SURMOUNT-1 for the injections. Older pills: label
              information as summarized by MedlinePlus (phentermine/topiramate, naltrexone/bupropion) and the
              NIDDK&rsquo;s overview of prescription medicines for overweight and obesity; typical results are
              approximate ranges from their registration trials. Prices: Ro&rsquo;s published pricing, verified
              August 2026; compounded prices verified {PRICE_DATE}; Foundayo and NovoCare prices and savings
              cards as reported by Scientific American, Lilly&rsquo;s April 9, 2026 release and third-party
              trackers, not verified by us. Weight-loss figures are trial averages and individual results
              differ. All trademarks belong to their owners.
            </p>
            <p className="text-[13px] leading-relaxed text-gray-400">
              Top Weight Loss (topweightloss.us) is not a medical provider and does not prescribe. This page
              compares options for educational purposes and is not medical advice. Prescription weight loss
              medicines require assessment and ongoing supervision by a licensed healthcare provider, so talk to
              a qualified physician before you start any treatment.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
