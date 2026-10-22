// ───── The verified GLP-1 price index ─────
// One registry, real published prices only - the single source of truth for
// the price-first switcher pages (/cheapest-glp1, /switch-from-ozempic).
// Every figure here is a provider-published price or a Trustpilot record we
// have verified; never add a row or edit a number from memory or estimation.
// Sorted by semaglutide price ascending - the order IS the editorial answer.

export type PriceCell = {
  /** Headline monthly figure, e.g. "$49" or "from $179". */
  price: string;
  /** The honest condition attached to that figure - promo, plan, cadence. */
  note: string;
} | null; // null = the provider doesn't publish this medication

export type PriceIndexRow = {
  providerId: string;
  /** The one-line edge - why this row exists in the index. */
  edge: string;
  semaglutide: PriceCell;
  tirzepatide: PriceCell;
  shipping: string;
  commitment: string;
  /** Verified Trustpilot record, or null when none is published. */
  trustpilot: { rating: string; count: string } | null;
};

export const PRICE_INDEX: PriceIndexRow[] = [
  {
    providerId: "wellmedr",
    edge: "Lowest ongoing price in this index, with one price at every dose",
    semaglutide: { price: "$49", note: "12-month plan; locked for life" },
    tirzepatide: { price: "$89", note: "shipped every 4 weeks" },
    shipping: "Ships in 3-5 business days",
    commitment: "12-month plan for the lowest rate; cancel or change anytime",
    trustpilot: { rating: "4.6", count: "2,188" },
  },
  {
    providerId: "embody",
    edge: "Lowest price without a contract: month-to-month billing and 1-2 day shipping",
    semaglutide: { price: "$69", note: "reg. $79; month-to-month" },
    tirzepatide: { price: "$119", note: "reg. $129; month-to-month" },
    shipping: "Ships in 1-2 days, cold-chain",
    commitment: "None - month to month, cancel anytime",
    trustpilot: { rating: "3.8", count: "9,604" },
  },
  {
    providerId: "altrx",
    edge: "One price at every dose, and brand-name medications sold alongside compounded",
    semaglutide: { price: "$89", note: "reg. $199; flat at every dose" },
    tirzepatide: { price: "$149", note: "reg. $299; flat at every dose" },
    shipping: "Free shipping in 5-7 days",
    commitment: "None - pause or cancel anytime; Buy Now, Pay Later",
    trustpilot: null,
  },
  {
    providerId: "medvi",
    edge: "Visits, a dietician and coaching are all included in the monthly price",
    semaglutide: { price: "$99", note: "promo; reg. $199 - all-inclusive" },
    tirzepatide: { price: "$166", note: "promo; reg. $299" },
    shipping: "Free shipping",
    commitment: "None - no membership or hidden fees; HSA/FSA",
    trustpilot: { rating: "4.3", count: "14,987" },
  },
  {
    providerId: "healthrx",
    edge: "A full year paid up front, delivered overnight in cold-chain packaging",
    semaglutide: { price: "$99", note: "12-mo prepaid - $1,188 at checkout" },
    tirzepatide: { price: "from $179", note: "per month" },
    shipping: "Overnight cold-chain shipping",
    commitment: "12-month prepaid plan",
    trustpilot: null,
  },
  {
    providerId: "directmeds",
    edge: "Semaglutide and tirzepatide cost the same, as injections or oral drops",
    semaglutide: { price: "$147", note: "flat at every dose" },
    tirzepatide: { price: "$147", note: "flat at every dose" },
    shipping: "Free 1-2 day shipping",
    commitment: "None - no membership, cancel anytime",
    trustpilot: { rating: "4.6", count: "16,390" },
  },
  {
    providerId: "sprout",
    edge: "Compounded GLP-1 plans, with brand-name Wegovy also available",
    semaglutide: { price: "$149", note: "starting price" },
    tirzepatide: { price: "$199", note: "starting price" },
    shipping: "Prescription shipped within 2 days",
    commitment: "See provider site for plan terms",
    trustpilot: { rating: "4.1", count: "188" },
  },
  {
    providerId: "trimrx",
    edge: "Dosing tailored to you, plus unlimited check-ins with a provider",
    semaglutide: { price: "$149", note: "same price at every dose; $140 discount applied" },
    tirzepatide: { price: "$259", note: "per month" },
    shipping: "Free tracked delivery, often next-day",
    commitment: "None - month to month",
    trustpilot: { rating: "3.8", count: "5,392" },
  },
  {
    providerId: "shed",
    edge: "Coaching built in, backed by a money-back guarantee if you lose under 5% in 120 days",
    semaglutide: { price: "$199", note: "20% off month one" },
    tirzepatide: { price: "$299", note: "20% off month one" },
    shipping: "Home delivery included",
    commitment: "None - HSA/FSA approved",
    trustpilot: { rating: "4.6", count: "1,134" },
  },
];

// Date of the last operator verification pass over the index above. Bump it
// whenever a row is re-checked or changed - the statistics page prints it as
// the dataset's "verified as of" date and emits it as schema dateModified.
export const PRICE_INDEX_VERIFIED = "2026-10-16";

// Public change log for the index. One entry per operator-verified change,
// newest first, describing what our listing said before and after. Only add
// an entry when the underlying row actually changed after verification - this
// log is published on the statistics page as the citable record.
export const PRICE_CHANGELOG: { date: string; providerId: string; change: string }[] = [
  {
    date: "2026-09-21",
    providerId: "altrx",
    change:
      "altRx extended its sale on compounded semaglutide ($89/month) and tirzepatide ($149/month). The listed end date moved from September 20 to September 25; the prices themselves did not change.",
  },
  {
    date: "2026-09-15",
    providerId: "trimrx",
    change:
      "TrimRx compounded semaglutide moved to $149/month at every dose, with a $140 discount applied. Our earlier listing showed $179 for month one and $299 a month after that. Tirzepatide stayed at $259/month.",
  },
  {
    date: "2026-09-14",
    providerId: "altrx",
    change:
      "We confirmed altRx's sale prices of $89/month for semaglutide and $149/month for tirzepatide, with a listed end date of September 20. The regular prices are still $199 and $299.",
  },
  {
    date: "2026-09-14",
    providerId: "wellmedr",
    change:
      "welludr lowered compounded semaglutide to $49/month on the 12-month plan (down from $59) and tirzepatide to $89/month (down from $99). Each price applies at every dose.",
  },
];

// Brand-name list prices actually published on our providers' brand shelves -
// used for the brand-vs-compounded math. Real figures only.
export const BRAND_SHELF: { drug: string; ingredient: string; price: string; soldAt: string }[] = [
  { drug: "Ozempic", ingredient: "Semaglutide", price: "$1,149-$1,399/mo", soldAt: "altRx $1,149 · welludr $1,399" },
  { drug: "Zepbound", ingredient: "Tirzepatide", price: "$1,249-$1,599/mo", soldAt: "altRx $1,249 · welludr $1,599" },
  { drug: "Wegovy", ingredient: "Semaglutide", price: "$1,579-$1,799/mo", soldAt: "altRx $1,579 · Sprout $1,799" },
];
