// ───── Remy, the guided match helper ─────
// A button-driven helper (no free text, no AI): a few questions, then a
// matched partner with verified facts. Shared by the server mount (which
// builds partner cards from verified site data) and the client panel.
// Flows are keyed by vertical so other categories can be added later; only
// weight loss exists today.

/** The helper's display name. Change it here and it changes everywhere. */
export const HELPER_NAME = "Remy";

export type Experience = "first" | "returning" | "switching";
export type Med = "sema" | "tirz" | "unsure";
export type Priority = "price" | "support" | "fast" | "brand";

export interface HelperAnswers {
  experience?: Experience;
  med?: Med;
  priority?: Priority;
}

/** One partner as the helper shows it. Every field comes from verified data. */
export interface HelperPartner {
  id: string;
  name: string;
  logo: string;
  affiliateUrl: string;
  reviewHref: string;
  rating?: string;
  reviewCount?: string;
  /** Monthly price label per medication, e.g. "$69/mo". Absent = not shown. */
  prices: { sema?: string; tirz?: string };
  /** Short context for the price (sale date, flat at every dose...). */
  priceNote?: string;
  /** True for compounded-only partners: shows the not-FDA-approved note. */
  compounded: boolean;
  /** Brand-name medication labels per ingredient, for brand partners. */
  brandNames?: { sema?: string; tirz?: string };
  points: string[];
  caveat?: string;
}

export interface HelperOption<T extends string = string> {
  value: T;
  label: string;
}

export const EXPERIENCE_OPTIONS: HelperOption<Experience>[] = [
  { value: "first", label: "Yes, it's my first time" },
  { value: "returning", label: "I've used one before" },
  { value: "switching", label: "I'm on one now and want to switch" },
];

export const MED_OPTIONS: HelperOption<Med>[] = [
  { value: "sema", label: "Semaglutide" },
  { value: "tirz", label: "Tirzepatide" },
  { value: "unsure", label: "Not sure yet" },
];

export const PRIORITY_OPTIONS: HelperOption<Priority>[] = [
  { value: "price", label: "The lowest monthly price" },
  { value: "support", label: "More doctor and support time" },
  { value: "fast", label: "No commitment and fast delivery" },
  { value: "brand", label: "Brand-name meds or using my insurance" },
];

/**
 * Best match and runner-up per priority, from verified facts:
 * - price: welludr has the lowest prices we track (sale from Oct 28, 2026);
 *   embody is the cheapest month-to-month option.
 * - fast: embody bills month to month and ships in 1-2 days; Eden has no
 *   membership or annual plan.
 * - support: Eden offers doctor-guided care with 24/7 human support; welludr
 *   adds a Medical Weight-Care Coach.
 * - brand: ro sells brand-name medication and can bill insurance; Eden is the
 *   flat-price alternative if coverage does not come through.
 */
export const WEIGHT_LOSS_MATCH: Record<Priority, [string, string]> = {
  price: ["wellmedr", "embody"],
  fast: ["embody", "eden"],
  support: ["eden", "wellmedr"],
  brand: ["ro", "eden"],
};

export const WEIGHT_LOSS_PARTNER_IDS = ["wellmedr", "embody", "eden", "ro"] as const;

export const MED_EXPLAINER =
  "Semaglutide (the ingredient in Ozempic and Wegovy) acts on one gut-hormone receptor, GLP-1. Tirzepatide (in Mounjaro and Zepbound) acts on two, GLP-1 and GIP. In separate trials, average weight loss was 14.9% on semaglutide 2.4 mg after 68 weeks and 15% to 21% on tirzepatide after 72 weeks, depending on the dose. A licensed clinician helps decide which fits you.";

export const EXPERIENCE_NOTE: Record<Experience, string> = {
  first:
    "First time? Every provider starts with an online health questionnaire, and a licensed clinician decides whether a GLP-1 is right for you.",
  returning: "Tell the clinician which medication and dose you used before, so they can plan where to start.",
  switching: "Switching? Share your current medication and dose with the new clinician so they can plan your next step.",
};
