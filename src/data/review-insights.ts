import { seedTrustpilot } from "@/data/trustpilot";

// Review insights for each provider, written by reading every Trustpilot review
// we quote in src/data/trustpilot.ts. Nothing here comes from outside that file:
// each pro and con lists the quoted reviews (by index) it was drawn from, and the
// counts shown on the page are computed from those lists, never typed by hand.
//
// `tags` holds one string per quoted review, in the same order as the reviews
// array. Each letter is a topic the review talks about: uppercase means the
// reviewer praised it, lowercase means they complained about it. A review can
// carry both (praised support that fixed a late shipment: "Sd").
//   S/s customer service   C/c clinician care   D/d delivery
//   P/p pricing & billing  R/r results          U/u sign-up
// If a provider's reviews array is edited and no longer matches `tags` in
// length, the tags are ignored rather than mis-assigned.

export const REVIEW_TOPICS = {
  S: "Customer service",
  C: "Clinician care",
  D: "Delivery",
  P: "Pricing & billing",
  R: "Results",
  U: "Sign-up",
} as const;

export type TopicKey = keyof typeof REVIEW_TOPICS;
export type ReviewTopic = (typeof REVIEW_TOPICS)[TopicKey];

export interface InsightPoint {
  text: string;
  refs: number[];
}

export interface ProviderReviewInsight {
  summary: string;
  pros: InsightPoint[];
  cons: InsightPoint[];
  featured: { i: number; topic: ReviewTopic }[];
  tags: string[];
}

export const REVIEW_INSIGHTS: Record<string, ProviderReviewInsight> = {
  embody: {
    summary:
      "embody reviewers talk most about the clinician visit: providers who listen, explain how the medication works and adjust the dose, and who switch to a phone call when video fails. Price is a common reason people joined, with several describing a monthly price that does not change. The complaints cluster around getting started: missed video appointments, unclear scheduling, and a few slow first shipments or billing mix-ups that took several contacts to sort out.",
    pros: [
      {
        text: "Clinicians who listen, answer every question and adjust the dose",
        refs: [0, 1, 3, 4, 5, 7, 11, 12, 15, 16, 18, 19, 22, 26, 35, 36, 37, 38, 40],
      },
      { text: "A monthly price reviewers describe as low and fixed", refs: [9, 19, 29, 38, 39] },
      { text: "Fast, cold deliveries, some within two or three days", refs: [23, 28, 39, 40] },
    ],
    cons: [
      { text: "Missed video visits and confusion about scheduling the first appointment", refs: [6, 24, 25] },
      { text: "Support that gave conflicting answers or was hard to reach at first", refs: [2, 13, 14] },
      { text: "A slow first or second shipment, and no follow-up after a 3-month supply", refs: [10, 27] },
    ],
    featured: [
      { i: 39, topic: "Results" },
      { i: 19, topic: "Clinician care" },
      { i: 28, topic: "Customer service" },
      { i: 10, topic: "Delivery" },
      { i: 13, topic: "Pricing & billing" },
    ],
    tags: [
      "C", "C", "sS", "C", "C", "C", "c", "C", "S", "cP",
      "UCd", "C", "C", "sp", "sS", "C", "C", "S", "C", "CP",
      "", "U", "C", "D", "s", "s", "C", "s", "SD", "P",
      "S", "S", "", "S", "S", "C", "SC", "C", "CP", "SDPR",
      "CD",
    ],
  },
  altrx: {
    summary:
      "altRx reviewers most often praise the price: several say their monthly tirzepatide price stayed the same as their dose went up, and one found it about a third of what they paid elsewhere. Most describe support that replies within a day or even an hour, and a few report steady weight loss in their first months. The weak spots are refills and shipping, with a stalled third refill and slower-than-expected deliveries, plus one advertised price that did not match checkout.",
    pros: [
      { text: "A price that stayed flat as the dose went up", refs: [1, 6, 8, 10, 13] },
      { text: "Support that answers within a day, sometimes within the hour", refs: [0, 1, 3, 5, 11, 12] },
      { text: "Quick start: a doctor's call the next morning and overnight delivery", refs: [0, 3, 7] },
    ],
    cons: [
      { text: "Refills and shipments that took longer than expected", refs: [9, 12, 15] },
      { text: "A support request that went unanswered", refs: [9, 15] },
      { text: "Billing slips: an ad price that differed at checkout, and an accidental charge (refunded)", refs: [5, 8] },
    ],
    featured: [
      { i: 1, topic: "Pricing & billing" },
      { i: 7, topic: "Sign-up" },
      { i: 11, topic: "Customer service" },
      { i: 5, topic: "Results" },
      { i: 9, topic: "Delivery" },
    ],
    tags: [
      "SU", "SDPR", "", "SD", "D", "SR", "SPR", "CDU", "PS", "d",
      "P", "S", "dS", "DP", "D", "Ss",
    ],
  },
  ro: {
    summary:
      "ro gets its best marks for the sign-up: reviewers call the application quick and easy, with approval and replies within hours, and several describe a thorough visit with a doctor or nurse practitioner. The criticism is about money and access. Several reviewers were unsure what the $39 initial fee covers or spotted an extra subscription charge, and others want a phone number or live chat instead of messages that take days. A few delivery problems, including a box that arrived warm, round out the complaints.",
    pros: [
      { text: "A quick, easy application with fast approval", refs: [5, 12, 14, 17, 18, 19, 22] },
      { text: "Thorough visits with a doctor or nurse practitioner", refs: [12, 13, 21] },
      { text: "Questions answered quickly once you are a member", refs: [12, 16, 17, 22] },
    ],
    cons: [
      { text: "Unclear fees: what the $39 covers, an extra subscription charge, a charge before any doctor contact", refs: [3, 5, 10, 11] },
      { text: "No phone number or live chat to reach a person", refs: [2, 4, 7] },
      { text: "Delivery delays, including a box with melted ice packs", refs: [7, 8, 9] },
    ],
    featured: [
      { i: 12, topic: "Sign-up" },
      { i: 21, topic: "Clinician care" },
      { i: 17, topic: "Pricing & billing" },
      { i: 11, topic: "Pricing & billing" },
      { i: 8, topic: "Delivery" },
    ],
    tags: [
      "", "", "s", "cp", "s", "Up", "", "scd", "ds", "d",
      "p", "p", "UC", "C", "U", "R", "S", "USp", "U", "U",
      "P", "C", "US",
    ],
  },
  trimrx: {
    summary:
      "TrimRx reviewers split into two groups. Most describe clear pricing, a straightforward intake, a provider who checked their health history, and steady status emails from order to doorstep, with boxes arriving cold and plainly labeled. The critical reviews describe what happens when something breaks: late or missing shipments, cold packs that arrived warm, chat, email and phone going unanswered, and billing disputes, including Affirm payments that continued after cancelling.",
    pros: [
      { text: "Steady communication and status updates from order to delivery", refs: [4, 7, 8, 9, 12, 21] },
      { text: "Clear pricing that reviewers call fair", refs: [6, 11, 14, 20] },
      { text: "Cold, complete, plainly labeled boxes", refs: [10, 15, 17, 20] },
    ],
    cons: [
      { text: "Late shipments, and cold packs that arrived warm", refs: [0, 3, 4] },
      { text: "Chat, email and phone unanswered when an order went wrong", refs: [3, 5] },
      { text: "Billing problems: a higher charge than quoted and Affirm payments after cancelling", refs: [1, 2, 5] },
    ],
    featured: [
      { i: 16, topic: "Results" },
      { i: 7, topic: "Clinician care" },
      { i: 15, topic: "Delivery" },
      { i: 14, topic: "Pricing & billing" },
      { i: 3, topic: "Delivery" },
    ],
    tags: [
      "d", "rp", "pD", "ds", "Sd", "sp", "PU", "CS", "S", "S",
      "D", "P", "S", "U", "P", "D", "R", "D", "S", "R",
      "PD", "S", "C",
    ],
  },
  medvi: {
    summary:
      "Medvi reviews center on the visit itself. Most quoted reviewers praise nurses and providers who take their time on video calls, answer every question and adjust the plan, and say appointments are easy to book and start on time. The critical reviews are about operations: subscriptions that renewed or were hard to cancel, prescriptions sent at the wrong dose level, refunds that took formal complaints to obtain, and delays that disrupted weekly doses. One reviewer also notes that Medvi's tirzepatide dosing tops out at 11.125 mg.",
    pros: [
      {
        text: "Nurses and providers who take their time and adjust the plan",
        refs: [0, 1, 3, 10, 16, 17, 20, 21, 23, 26, 27, 35, 36, 37, 39],
      },
      { text: "Friendly, helpful staff between visits", refs: [2, 4, 6, 8, 22, 25, 28, 33, 38] },
      { text: "Video visits that are easy to book, with reminders, and start on time", refs: [17, 27, 36, 39] },
    ],
    cons: [
      { text: "Subscriptions that renewed without notice or were hard to cancel", refs: [9, 14, 18, 24] },
      { text: "Prescriptions sent at the wrong dose level, taking weeks to correct", refs: [14, 15] },
      { text: "Delays and support gaps that disrupted weekly doses", refs: [11, 15, 24] },
    ],
    featured: [
      { i: 17, topic: "Clinician care" },
      { i: 38, topic: "Customer service" },
      { i: 12, topic: "Pricing & billing" },
      { i: 18, topic: "Pricing & billing" },
      { i: 24, topic: "Customer service" },
    ],
    tags: [
      "C", "C", "S", "C", "S", "S", "S", "U", "S", "p",
      "CRp", "dsp", "SP", "S", "cps", "cs", "CR", "C", "p", "",
      "C", "C", "S", "C", "s", "S", "C", "C", "S", "S",
      "S", "S", "S", "S", "S", "C", "C", "C", "S", "C",
    ],
  },
  wellmedr: {
    summary:
      "welludr's quoted reviews are dominated by its support team: reviewers name individual agents who answered quickly, paused or slowed refills, lowered a plan price, or escalated a problem to the operations manager. Shipping is the recurring weak point, with several reviewers describing late prescriptions or orders that sat at the pharmacy, and a smaller group says messages and calls went unanswered. One reviewer flags that plans bill every 21 days, so a year includes more charges than months.",
    pros: [
      { text: "Named support agents who answer fast and resolve issues", refs: [0, 1, 2, 5, 6, 17, 21, 26, 30, 32] },
      { text: "Problems escalated and fixed, sometimes by the operations manager", refs: [12, 13, 20] },
      { text: "Flexible plans: pausing, slowing refills, or a lower rate", refs: [1, 2, 26, 31] },
    ],
    cons: [
      { text: "Late prescriptions and orders that sat at the pharmacy", refs: [4, 7, 12, 13, 14, 15] },
      { text: "Messages and calls that went unanswered for days", refs: [8, 9, 11, 16, 18] },
      { text: "Billing every 21 days, and a cost that felt high for the results", refs: [8, 24] },
    ],
    featured: [
      { i: 20, topic: "Customer service" },
      { i: 29, topic: "Sign-up" },
      { i: 31, topic: "Pricing & billing" },
      { i: 13, topic: "Delivery" },
      { i: 8, topic: "Pricing & billing" },
    ],
    tags: [
      "S", "SR", "S", "S", "d", "S", "S", "ds", "sp", "s",
      "S", "s", "dS", "ds", "dS", "Rd", "s", "S", "s", "S",
      "dS", "S", "S", "S", "rp", "S", "S", "S", "S", "UD",
      "S", "SP", "S",
    ],
  },
  directmeds: {
    summary:
      "DirectMeds' quoted reviews are almost entirely about its phone and support staff, with several reviewers naming the same representatives for being patient, quick and organized. Sign-up is described as straightforward, though one reviewer found the texts and emails almost too frequent. The critical reviews describe an order that sat at \"Label Created\" until the reviewer called three times, an AI chat that reported a damaged order as delivered, and a supply shortfall on a non-GLP-1 product.",
    pros: [
      { text: "Courteous, quick representatives, often named by reviewers", refs: [1, 2, 3, 7, 10, 11, 12] },
      { text: "Patient step-by-step help for new patients", refs: [0, 4, 12] },
      { text: "Prices one reviewer calls reasonable", refs: [5] },
    ],
    cons: [
      { text: "An order that did not ship until the reviewer called three times", refs: [6] },
      { text: "Online account and AI chat harder to use than the phone line", refs: [6, 8] },
      { text: "A shipment short on quantity and missing syringes (NAD, not a GLP-1)", refs: [9] },
    ],
    featured: [
      { i: 0, topic: "Customer service" },
      { i: 4, topic: "Sign-up" },
      { i: 5, topic: "Pricing & billing" },
      { i: 6, topic: "Delivery" },
    ],
    tags: ["S", "S", "S", "S", "U", "PR", "ds", "S", "Sc", "d", "S", "S", "S"],
  },
  shed: {
    summary:
      "SHED reviewers keep naming the people who helped them: agents who fixed a duplicate account, moved a refill date so a dose was not missed, or called to set up a coaching session. The negatives are few but serious. One reviewer says SHED kept charging for months after they stopped the medication and refused a $1,200 refund, and two describe the app and AI chat as clunky until a person takes over.",
    pros: [
      { text: "Real people who resolve issues quickly", refs: [0, 2, 3, 5, 9] },
      { text: "Proactive calls from staff, including coaching set-up", refs: [4, 7, 8] },
      { text: "Refill dates adjusted so doses are not missed", refs: [6] },
    ],
    cons: [
      { text: "Charges that continued after stopping, with no refund", refs: [1] },
      { text: "AI-first chat and a clunky app before a person takes over", refs: [1, 3] },
    ],
    featured: [
      { i: 6, topic: "Customer service" },
      { i: 3, topic: "Customer service" },
      { i: 8, topic: "Sign-up" },
      { i: 1, topic: "Pricing & billing" },
    ],
    tags: ["S", "sp", "S", "S", "S", "S", "S", "S", "S", "S"],
  },
  sprout: {
    summary:
      "Sprout reviewers single out live, fast customer service, several by name, and describe plan changes, pauses and even a price reduction handled quickly. A few report meaningful weight loss, from 20 pounds to almost all of their goal. The complaints are about the details: shipments without tracking, an account suspended without notice, a month charged when the check-in was not finished, no injection instructions, and one reviewer who reports heavy hair shedding.",
    pros: [
      { text: "Live, fast customer service with no bots", refs: [2, 5, 8, 10, 15, 16, 17, 18] },
      { text: "Easy plan changes, pauses and a lower price on request", refs: [1, 4, 6, 7] },
      { text: "Reported weight loss, from 20 pounds to almost all of the goal", refs: [3, 6, 10, 13, 16] },
    ],
    cons: [
      { text: "Missing tracking notices and a late order", refs: [10, 12] },
      { text: "A suspended account and a charge with no shipment", refs: [12, 14] },
      { text: "No injection instructions, and one report of heavy hair shedding", refs: [11, 13] },
    ],
    featured: [
      { i: 3, topic: "Results" },
      { i: 2, topic: "Customer service" },
      { i: 1, topic: "Pricing & billing" },
      { i: 12, topic: "Delivery" },
      { i: 14, topic: "Pricing & billing" },
    ],
    tags: [
      "S", "SP", "S", "RS", "S", "SD", "SR", "S", "S", "S",
      "RSd", "r", "ds", "Rc", "SRp", "SU", "UPRS", "S", "S",
    ],
  },
  eden: {
    summary:
      "All of the Eden reviews we quote are five stars, and nearly all are about support: named agents who replied quickly, followed up by email or chat and resolved problems, including one a reviewer had been dealing with for a long time. A two-year customer describes pausing a shipment through chat with a real person and being told restarting is just as easy. The one longer review on price explains the switch: the reviewer's previous provider raised its prices, and Eden's ratings for fair pricing, customer service and doctor support were the deciding factor. None of the quoted reviews raises a complaint.",
    pros: [
      {
        text: "Fast, polite support agents, often named",
        refs: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      },
      { text: "Agents who follow up and resolve the issue", refs: [0, 3, 5, 10, 13, 17, 18, 20, 25, 26, 27] },
      { text: "Fair pricing and doctor support, cited as the reason to switch", refs: [6] },
    ],
    cons: [],
    featured: [
      { i: 6, topic: "Pricing & billing" },
      { i: 18, topic: "Customer service" },
      { i: 5, topic: "Customer service" },
      { i: 10, topic: "Customer service" },
      { i: 19, topic: "Sign-up" },
    ],
    tags: [
      "S", "S", "S", "S", "S", "S", "PSC", "S",
      "S", "S", "S", "S", "S", "S", "S", "S", "S", "S",
      "S", "SU", "S", "S", "S", "S", "S", "S", "S", "S",
    ],
  },
  bmimd: {
    summary:
      "The bmiMD reviews we quote are all five stars. Reviewers describe responsive support that solves problems, deliveries that arrive on time and packed with cold packs, and medication that works, with one reporting 25 pounds lost in three weeks. One quoted review is about supplements rather than weight loss medication. None raises a complaint.",
    pros: [
      { text: "Responsive support that solves problems", refs: [0, 2, 3] },
      { text: "On-time delivery, packed with cold packs", refs: [1, 2, 3] },
      { text: "Medication that works, with no side effects reported", refs: [1, 2, 3] },
    ],
    cons: [],
    featured: [
      { i: 1, topic: "Results" },
      { i: 2, topic: "Delivery" },
      { i: 0, topic: "Customer service" },
      { i: 3, topic: "Customer service" },
    ],
    tags: ["S", "RD", "RDS", "SDR", "S", "R"],
  },
};

export interface TopicTally {
  praised: number;
  criticized: number;
}

/** Praise and complaint counts per topic across a provider's quoted reviews. */
export function topicTallies(providerId: string): Record<TopicKey, TopicTally> | null {
  const insight = REVIEW_INSIGHTS[providerId];
  const reviews = seedTrustpilot[providerId]?.reviews ?? [];
  if (!insight || insight.tags.length !== reviews.length) return null;
  const out = Object.fromEntries(
    (Object.keys(REVIEW_TOPICS) as TopicKey[]).map((k) => [k, { praised: 0, criticized: 0 }]),
  ) as Record<TopicKey, TopicTally>;
  for (const t of insight.tags) {
    for (const ch of new Set(t)) {
      const key = ch.toUpperCase() as TopicKey;
      if (!(key in out)) continue;
      if (ch === key) out[key].praised += 1;
      else out[key].criticized += 1;
    }
  }
  return out;
}

/** The insight for a provider, or null when it no longer lines up with the quoted reviews. */
export function reviewInsight(providerId: string): ProviderReviewInsight | null {
  const insight = REVIEW_INSIGHTS[providerId];
  const reviews = seedTrustpilot[providerId]?.reviews ?? [];
  if (!insight || insight.tags.length !== reviews.length) return null;
  const valid = (i: number) => i >= 0 && i < reviews.length;
  if (![...insight.pros, ...insight.cons].every((p) => p.refs.every(valid))) return null;
  if (!insight.featured.every((f) => valid(f.i))) return null;
  return insight;
}
