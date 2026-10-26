import { pageReviewSchema } from "@/data/reviewers";
import { fixBrandCase } from "@/lib/utils";
import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, latestUpdate, NOINDEX_WL_BATTLE_SLUGS, DEFAULT_ROBOTS } from "@/lib/config";
import { splitSentences, BoldKeyFacts, ReadableProse } from "@/components/prose";
import { type SiteContext, canonicalUrl, hubLink } from "@/lib/site-context";
import { ComparisonLayout } from "@/components/comparison-layout";
import { EditorialContent } from "@/components/editorial-content";
import { LandingEditorial } from "@/components/landing-editorial";
import { landingFocusFor } from "@/lib/landing-focus";
import { GuideCluster } from "@/components/guide-cluster";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, Check, Minus, ShieldCheck, Sparkles, Star } from "lucide-react";
import { LastUpdated } from "@/components/last-updated";
import { ProviderCta } from "@/components/provider-cta";
import { BattleStickyCta } from "@/components/battle-sticky-cta";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { ReviewExperienceComparison } from "@/components/review-insights";
import { TrustpilotRating } from "@/components/trustpilot-rating";
import { LicensedTelehealthBadge } from "@/components/licensed-badge";
import { PromoPopup } from "@/components/promo-popup";
import { resolvePromoPopup } from "@/lib/promo-popups";
import { TrustDisclosure } from "@/components/medical-sources";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { SourcesMethodology } from "@/components/sources-methodology";
import { ProductCarousel } from "@/components/product-carousel";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { threeWayBySlug, THREE_WAY_COMPARISONS } from "@/lib/three-way";
import { ThreeWayPageView, threeWayMetadata } from "@/components/pages/three-way-page";

// Code-side CTR overrides for the highest-performing "versus" pages. These
// pages live in the CMS blob, so their stored titles can't be tuned from code -
// this map wins over the stored meta for exactly these slugs. Every price is
// the provider's real listed price; keep them in sync when pricing changes.
// Per-battle 12-month cost math - the decision-grade table SERP winners for
// "X vs Y" queries carry. Values are computed from the same verified prices as
// the price index; rows align to the battle's provider1/provider2 order.
// Seed a battle here only with real, current published rates.
const BATTLE_COST_MATH: Record<
  string,
  { rows: [string, string, string][]; note: string }
> = {
  // provider1 = embody, provider2 = Medvi
  "embody-vs-medvi": {
    rows: [
      ["Month 1, semaglutide", "$69", "$99"],
      ["Six months, total", "$414", "$594"],
      ["Full year, total", "$828", "$1,188"],
      ["Tirzepatide per month", "$119 (reg. $129)", "$166 promo (reg. $299)"],
      ["After the promo (regular rate)", "$79/mo regular - $948/yr", "$199/mo regular - $2,388/yr"],
    ],
    note: "Both columns use semaglutide at each provider's current published price, with promo terms applied the way each provider states them. embody: $69/mo promo (regular $79), month to month. Medvi: $99/mo promo (regular $199), all-inclusive with a dietician and care coaching. Neither one asks for a prepaid term.",
  },
  // provider1 = Medvi, provider2 = TrimRx - both sides fully verified.
  "medvi-vs-trimrx": {
    rows: [
      ["Month 1, semaglutide", "$99 promo (reg. $199)", "$149"],
      ["Six months, total", "$594", "$894"],
      ["Full year, total", "$1,188", "$1,788"],
      ["Tirzepatide per month", "$166 promo (reg. $299)", "$259"],
      ["Fine print", "$99 promo price; $199 regular", "$149 at every dose; no long-term contract"],
    ],
    note: "Semaglutide at published prices, with promo terms applied as each provider states them. Medvi: $99/mo promo (regular $199), all-inclusive with a dietician and care coaching. TrimRx: $149/month for semaglutide at every dose, with no long-term contract. Neither one asks for a prepaid term.",
  },
  // provider1 = embody, provider2 = Ro. Ro's figures are its own published
  // pricing (verified Aug 2026): a Ro Body membership ($39 first month, then
  // $74-$149/mo by plan) PLUS the brand-name medication, billed separately
  // via insurance or cash-pay. Different products - compounded vs brand-name
  // - so the note spells out what each column buys.
  "embody-vs-ro": {
    rows: [
      ["What you pay for", "All-inclusive compounded semaglutide", "Membership plus brand-name medication, billed separately"],
      ["Month 1, semaglutide", "$69", "$39 membership + Wegovy pill from $149"],
      ["Each month after", "$69 (reg. $79)", "$74-$149 membership + $149-$399 medication (cash-pay)"],
      ["Full year, total", "$828", "~$2,676-$4,476 cash-pay (annual membership + Wegovy)"],
      ["Tirzepatide per month", "$119 (reg. $129)", "Zepbound KwikPen from $299 in month one, then $399-449, plus membership"],
      ["If insurance covers it", "-", "Membership plus your copay, which can be much lower with coverage"],
    ],
    note: "The embody column is its published all-inclusive price: semaglutide at a $69/mo promo (regular $79), month to month. The ro column uses ro's own published pricing from August 2026. The ro Body membership costs $39 for month one, then $74/mo on an annual prepaid plan, up to $149/mo, and brand-name medication is charged on top: Wegovy pill from $149/mo (up to $299 after the intro period), Wegovy pen from $199 for two months (up to $399/mo) and Zepbound KwikPen from $299 (then $399-449). The core difference: embody sends compounded semaglutide, while ro sends FDA-approved brand-name medication, and where insurance pays, ro's cost changes completely. Confirm current figures on both sites.",
  },
  // provider1 = embody, provider2 = altRx (slug order is reversed)
  "altrx-vs-embody": {
    rows: [
      ["Month 1, semaglutide", "$69", "$89"],
      ["Six months, total", "$414", "$534"],
      ["Full year, total", "$828", "$1,068"],
      ["Tirzepatide per month", "$119 (reg. $129)", "$149 (reg. $299)"],
      ["After the promo (regular rate)", "$79/mo regular - $948/yr", "$199/mo regular - $2,388/yr"],
    ],
    note: "Semaglutide at each provider's current published price. embody: $69/mo promo (regular $79), month to month. altRx: $89/mo promo (regular $199), the same at every dose, with pause-anytime terms and buy now, pay later. Neither one asks for a prepaid term.",
  },
  // provider1 = embody, provider2 = welludr
  "embody-vs-wellmedr": {
    rows: [
      ["Month 1, semaglutide", "$69", "$49"],
      ["Six months, total", "$414", "$294"],
      ["Full year, total", "$828", "$588"],
      ["Tirzepatide per month", "$119 (reg. $129)", "$89"],
      ["Fine print", "$69 promo price (reg. $79), month to month", "$49 requires a 12-month plan"],
    ],
    note: "Semaglutide at each provider's published price. embody: $69/mo promo (regular $79), no commitment. welludr: $49/mo on a 12-month plan billed monthly, the same at every dose. Over a full year welludr costs $240 less, while embody is far easier to leave.",
  },
  // provider1 = Medvi, provider2 = HealthRx
  "healthrx-vs-medvi": {
    rows: [
      ["First charge, semaglutide", "$99", "$1,188 upfront at checkout"],
      ["Six months, total", "$594", "No shorter plan published"],
      ["Full year, total", "$1,188", "$1,188"],
      ["Tirzepatide per month", "$166 promo (reg. $299)", "from $179"],
      ["Fine print", "$99 promo price (reg. $199)", "$99/mo rate fixed by the prepaid year"],
    ],
    note: "Both years add up to $1,188, but the payment structures differ. Medvi charges $99 each month at a promo rate (regular $199) with nothing prepaid. HealthRx collects the full $1,188 at checkout, which fixes the rate for 12 months no matter how promos change.",
  },
  // provider1 = embody, provider2 = TrimRx
  "embody-vs-trimrx": {
    rows: [
      ["Month 1, semaglutide", "$69", "$149"],
      ["Six months, total", "$414", "$894"],
      ["Full year, total", "$828", "$1,788"],
      ["Tirzepatide per month", "$119 (reg. $129)", "$259"],
      ["Fine print", "$69 promo price (reg. $79)", "$149 at every dose; no long-term contract"],
    ],
    note: "Semaglutide at published prices. embody: $69/mo promo (regular $79), the same each month. TrimRx: $149/month for semaglutide at every dose, with no long-term contract.",
  },
  // provider1 = embody, provider2 = Sprout
  "embody-vs-sprout": {
    rows: [
      ["Semaglutide per month", "$69 (reg. $79)", "$149"],
      ["Tirzepatide per month", "$119 (reg. $129)", "$199"],
      ["Fine print", "$69 promo price (reg. $79)", "Starts at $149; first-month offer advertised, check terms on Sprout's site"],
    ],
    note: "Semaglutide at published prices. embody: $69/mo promo (regular $79), month to month. Sprout: from $149/mo. Sprout also advertises $200 off the first month, which is more than its $149 starting price, so we do not compute six-month or yearly totals for it. Check Sprout's site for its current plan terms.",
  },
};

const BATTLE_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  "embody-vs-sprout": {
    title: "embody vs Sprout (2026): $69 vs $149 GLP-1 Price Check",
    description:
      "embody charges $69/mo for semaglutide with 1-2 day cold-chain shipping and LegitScript certification. Sprout starts at $149/mo, ships in 2 days and offers Wegovy.",
  },
  "altrx-vs-sprout": {
    title: "altRx vs Sprout (2026): $89 vs $149 Brand-Name GLP-1s",
    description:
      "altRx pairs $89/mo semaglutide with Ozempic, Zepbound and Wegovy plus buy now, pay later. Sprout starts at $149/mo with Wegovy and 2-day fulfillment. Compared.",
  },
  "sprout-vs-trimrx": {
    title: "Sprout vs TrimRx (2026): Two $149 GLP-1 Plans, One Pick",
    description:
      "Both charge $149/mo for semaglutide. Sprout holds that price, ships in 2 days and offers Wegovy; TrimRx is flat at every dose with custom dosing, unlimited check-ins and no contract.",
  },
  "sprout-vs-wellmedr": {
    title: "Sprout vs welludr (2026): $149 vs $49 GLP-1 Price Gap",
    description:
      "welludr charges $49/mo, holds 4.6 on Trustpilot, reports 1M+ patients and offers a warranty. Sprout costs $149/mo with 2-day fulfillment and brand-name Wegovy.",
  },
  "embody-vs-wellmedr": {
    title: "embody vs welludr (2026): $69 vs $49 Semaglutide Compared",
    description:
      "embody: $69/mo semaglutide, free 1-2 day shipping and a refund if you are not approved. welludr: $49/mo, 1M+ patients and a weight loss warranty. See the trade-offs.",
  },
  "altrx-vs-embody": {
    // Measured winner, restored Aug 30: when both reverse slugs were live, the
    // question-format title on /embody-vs-altrx did 18.2% CTR on the "altrx vs
    // embody" query vs 6.7% for the price-format title on this slug - same
    // page, same query. Do not switch back to price format without new data.
    title: "altRx vs embody (2026): Which GLP-1 Provider Should You Pick?",
    description:
      "altRx offers $89/mo semaglutide plus brand-name Zepbound and Wegovy with buy now, pay later. embody is $69/mo flat, ships in 1-2 days and is LegitScript-certified.",
  },
  "altrx-vs-trimrx": {
    title: "altRx vs TrimRx (2026): $89 vs $149 Semaglutide Plans",
    description:
      "altRx charges $89/mo for semaglutide at every dose and also sells brand-name options. TrimRx costs $149/mo with no contract and multi-month discounts. Compared.",
  },
  "altrx-vs-wellmedr": {
    title: "altRx vs welludr (2026): $89 vs $49 GLP-1 Head to Head",
    description:
      "welludr is the cheaper start at $49/mo and reports 1M+ patients. altRx costs $89/mo but adds the lowest-priced brand-name shelf. Price, meds, support and guarantees.",
  },
  "embody-vs-trimrx": {
    title: "embody vs TrimRx (2026): $69 vs $149 Semaglutide Compared",
    description:
      "embody charges a flat $69/mo for semaglutide with free 1-2 day shipping. TrimRx costs $149/mo on flexible plans with no contract. Price, delivery speed and support.",
  },
  "embody-vs-medvi": {
    title: "embody vs Medvi (2026): $69 vs $99 GLP-1 Plans Compared",
    description:
      "embody is $69/mo for semaglutide with 1-2 day shipping and a refund policy. Medvi's $99/mo promo is all-inclusive with hands-on provider support. Price or extra care?",
  },
  "embody-vs-ro": {
    // Sept 3 CTR pass: 0.5% CTR at avg position 6 over 191 impressions (3d) -
    // ~10x below the ~4-6% benchmark for that position. SERP has no AI Overview;
    // the two comparison pages above us (glp1picks, exploretreatments) both LEAD
    // their snippet with a bolded one-line verdict, while ours led with a price
    // spec dump. Fix: title-cased for SERP authority + $69 front-loaded, but the
    // proven "Big Brand?" hook is KEPT (the Aug-24 price-format rewrite tanked
    // clicks 3/day -> 0; do not drop the hook again). Description now leads with
    // the difference NEUTRALLY - "embody vs ro" is comparison-research intent,
    // so the snippet states the real structural difference and lets the reader
    // decide (matches exploretreatments #2, which leads with a neutral factual
    // differentiator, not a winner). Oct 5, 2026: the ranking now places embody
    // (9.8) above ro (9.6) and the battle verdict names embody the winner; the
    // neutral snippet is kept because it matches the comparison-research intent.
    title: "embody vs ro (2026): $69 Flat Price or the Big Brand?",
    description:
      "embody charges a flat $69/mo for compounded semaglutide, all in. ro charges $39, then $74-149/mo for membership, plus brand-name Wegovy or Zepbound. Price, plans, speed.",
  },
  "medvi-vs-trimrx": {
    title: "Medvi vs TrimRx (2026): $99 vs $149 Semaglutide Compared",
    description:
      "Medvi's $99/mo promo is all-inclusive, and Trustpilot reviewers praise its support. TrimRx is $149/mo at every dose with no long-term contract. Which one suits you?",
  },
  "medvi-vs-wellmedr": {
    title: "Medvi vs welludr (2026): $99 or $49 for Semaglutide?",
    description:
      "Medvi's $99/mo promo includes personal provider support. welludr charges $49/mo, reports 1M+ patients and offers a warranty. Is the extra care worth the price gap?",
  },
  "medvi-vs-altrx": {
    title: "Medvi vs altRx (2026): $99 vs $89 GLP-1 Plans Compared",
    description:
      "Medvi bundles everything into a $99/mo promo with personal support. altRx is $89/mo flat, adds brand-name medications and offers buy now, pay later. Side by side.",
  },
  "trimrx-vs-wellmedr": {
    // Oct 15, 2026: welludr leads (named winner, shown first on the page).
    title: "welludr vs TrimRx (2026): $49 vs $149 Semaglutide Compared",
    description:
      "welludr: $49/mo semaglutide at every dose, a weight loss warranty and 4.6 on Trustpilot. TrimRx: $149/mo flat, custom dosing and no contract. Price, flexibility, support.",
  },
  "trimrx-vs-ro": {
    title: "TrimRx vs ro (2026): Which GLP-1 Provider Suits You?",
    description:
      "TrimRx costs $149/mo with clinical support and no long-term contract. ro is an established brand with its own in-house pharmacy. Clear pricing or brand trust? Compared.",
  },
  "medvi-vs-ro": {
    title: "Medvi vs ro (2026): $99 All-In or Membership Plus Brand?",
    description:
      "Medvi charges a $99/mo promo for all-inclusive compounded semaglutide. ro charges $39 for month one, then $74-149/mo membership, with Wegovy or Zepbound billed on top.",
  },
  "altrx-vs-ro": {
    title: "altRx vs ro (2026): $89 Flat GLP-1 or Membership Plus Brand?",
    description:
      "altRx: compounded semaglutide at a flat $89/mo promo (reg. $199) with buy now, pay later. ro: $39 first month, then $74-149/mo membership plus brand-name meds billed separately.",
  },
  "healthrx-vs-medvi": {
    // Title matches the stored (CMS) title byte-for-byte - this entry exists
    // only to put "GLP-1" in the description (desc-only pass, Aug 30).
    title: "HealthRx vs Medvi (2026): Two $99 Semaglutide Plans Compared",
    description:
      "Both cost $99/month for GLP-1 semaglutide, but HealthRx takes $1,188 upfront for a prepaid year while Medvi bills a monthly all-inclusive promo. Here is the math.",
  },
  "ro-vs-wellmedr": {
    title: "ro vs welludr (2026): Big-Name Brand or $49 GLP-1?",
    description:
      "ro is a major telehealth brand with an in-house pharmacy. welludr charges $49/mo for semaglutide, reports 1M+ patients and offers a weight loss warranty. Compared.",
  },
};

// Category word used in the uniform battle SERP title.
const BATTLE_CATEGORY = "GLP-1";

// Title-case a "{a} vs {b}" matchup so no SERP title starts lowercase, while
// preserving any internal brand capitals (altRx -> AltRx, TrimRX -> TrimRX).
function titleCaseMatchup(label: string): string {
  return label
    .split(/\s+vs\s+/i)
    .map((side) => (side ? side.charAt(0).toUpperCase() + side.slice(1) : side))
    .map(fixBrandCase)
    .join(" vs ");
}

// Title-case only the leading matchup of a curated override title (the part
// before the first ":"), so a hand-written title keeps its tested hook/price
// tail verbatim while never starting lowercase - matching the uniform titles.
function titleCaseOverrideTitle(title: string): string {
  const idx = title.indexOf(":");
  if (idx === -1) return fixBrandCase(title.charAt(0).toUpperCase() + title.slice(1));
  return `${titleCaseMatchup(title.slice(0, idx))}${title.slice(idx)}`;
}

// Desc-only meta overrides for CMS landing pages: the stored descriptions
// lack the "GLP-1" category term the audience actually searches (Aug 2026
// audit). Titles stay whatever the CMS stores - descriptions only.
const LANDING_META_DESCRIPTION: Record<string, string> = {
  semaglutide:
    "Best semaglutide (GLP-1) providers for 2026, compared on checked prices from $49/month, licensed online prescribing and the trade-offs of each program.",
  tirzepatide:
    "Best tirzepatide providers for 2026: compounded GLP-1 prices from $89/month that we checked, licensed online prescribing, and the pros and cons of each.",
  "ozempic-for-weight-loss":
    "Ozempic for weight loss in 2026: how this GLP-1 works, which online providers prescribe it, and checked alternatives that start at $49/month.",
  "wegovy-providers":
    "Wegovy online in 2026: the providers that prescribe it, compared, plus checked GLP-1 alternatives from $49/month if brand-name prices are out of reach.",
  "ozempic-alternatives":
    "Alternatives to Ozempic, Wegovy and Mounjaro in 2026: GLP-1 options from $49/month, compared on checked prices, plan terms and patient support.",
  "switch-from-ozempic":
    "Moving from Ozempic to compounded semaglutide: how the GLP-1 switch works, checked prices from $49/month and the questions to ask your prescriber.",
  "retatrutide-weight-loss":
    "Retatrutide in 2026: where this next-generation GLP-1-class drug stands, what its clinical trials found, and the approved options you can use today.",
};

// Metadata for a landing page or head-to-head battle at /<slug> (root) or
// /<vertical>/<slug> (hub). Returns { title: "Not Found" } for an unknown slug.
export async function battleMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  // Curated 3-way comparisons (/{a}-vs-{b}-vs-{c}) resolve before 2-way battles.
  const trio = threeWayBySlug.get(slug);
  if (trio) return threeWayMetadata(trio, ctx);

  const config = await getConfig(ctx.vertical);

  // Check landing pages first
  const landing = (config.landingPages ?? []).find((lp) => lp.slug === slug);
  if (landing) {
    const url = canonicalUrl(ctx, `/${landing.slug}`);
    const landingDesc =
      LANDING_META_DESCRIPTION[landing.slug] ||
      landing.seoDescription;
    return {
      title: landing.seoTitle,
      description: landingDesc,
      robots: ctx.noindex ? { index: false, follow: false } : DEFAULT_ROBOTS,
      alternates: { canonical: url },
      openGraph: {
        title: landing.seoTitle,
        description: landingDesc,
        url,
      },
    };
  }

  const battle = (config.battles ?? []).find((b) => b.slug === slug);
  if (!battle) return { title: "Not Found" };

  // Reverse-pair canonicalization: if another battle compares the same two
  // providers in the opposite order (e.g. altrx-vs-noom and noom-vs-altrx),
  // both target the same query intent and split ranking signals. Point every
  // page for a given provider pair at one deterministic canonical - the
  // alphabetically-first slug - so Google consolidates them into one result.
  const samePairSlugs = (config.battles ?? [])
    .filter(
      (b) =>
        (b.provider1Id === battle.provider1Id && b.provider2Id === battle.provider2Id) ||
        (b.provider1Id === battle.provider2Id && b.provider2Id === battle.provider1Id)
    )
    .map((b) => b.slug)
    .sort();
  const canonicalSlug = samePairSlugs[0] ?? battle.slug;
  const url = canonicalUrl(ctx, `/compare/${canonicalSlug}`);

  // SERP title: a curated per-matchup override title wins when one exists (these
  // carry tested CTR hooks/prices - e.g. the question format on altrx-vs-embody
  // measured 18.2% vs 6.7% for the price format, and embody-vs-ro keeps its
  // "Big Brand?" hook because the price rewrite tanked its clicks). The override
  // is title-cased at the matchup so it never starts lowercase. Battles without
  // an override fall back to the uniform, competitor-style neutral pattern
  // "{A} vs {B} (2026): {Category} Cost, Plans & Meds Compared". DESCRIPTIONS
  // are always the bespoke override (real prices) when present.
  const override = BATTLE_SEO_OVERRIDES[slug];
  const baseLabel = (battle.matchupLabel ?? battle.title.split(":")[0]).trim();
  const battleCategory = BATTLE_CATEGORY;
  const metaTitle = override?.title
    ? titleCaseOverrideTitle(override.title)
    : `${titleCaseMatchup(baseLabel)} (2026): ${battleCategory && !baseLabel.toLowerCase().includes(battleCategory.toLowerCase()) ? `${battleCategory} ` : ""}Prices, Plans & Medications`;
  const metaDescription = override?.description ?? battle.description;

  // Thin, low-demand matchups (Tier-2-brand pairs) are noindex,follow so crawl
  // budget concentrates on the money battles - see NOINDEX_WL_BATTLE_SLUGS.
  const isThinNoindex = NOINDEX_WL_BATTLE_SLUGS.has(slug);

  return {
    title: metaTitle,
    description: metaDescription,
    robots: ctx.noindex
      ? { index: false, follow: false }
      : isThinNoindex
        ? { index: false, follow: true }
        : DEFAULT_ROBOTS,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      type: "article",
    },
  };
}

/// Read-more treatment for long editorial copy: the first `n` sentences stay
// visible, the remainder renders inside a native <details> element - so ALL
// content is in the initial HTML/DOM for search engines, and the toggle is
// purely visual (no JS, no fetch). Sentence splitting and key-fact bolding
// come from the shared prose module.
function ReadMoreProse({ text, label, visibleSentences = 2 }: { text: string; label: string; visibleSentences?: number }) {
  const [visible, rest] = splitSentences(text, visibleSentences);
  if (!rest) {
    return (
      <p className="mb-6 max-w-[820px] text-[15px] leading-[1.85] text-gray-600">
        <BoldKeyFacts text={text} />
      </p>
    );
  }
  return (
    <div className="mb-6 max-w-[820px]">
      <p className="text-[15px] leading-[1.85] text-gray-600">
        <BoldKeyFacts text={visible} />
      </p>
      <details className="group mt-1.5">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[14px] font-semibold text-[#0C4B75] hover:underline [&::-webkit-details-marker]:hidden">
          {label}
          <span className="text-[11px] transition-transform group-open:rotate-180">▾</span>
        </summary>
        <ReadableProse text={rest} className="mt-2" paragraphClassName="text-[15px] leading-[1.85] text-gray-600" />
      </details>
    </div>
  );
}

export async function BattlePageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  // Curated 3-way comparisons render their own template.
  const trio = threeWayBySlug.get(slug);
  if (trio) return ThreeWayPageView({ trio, ctx });

  const config = await getConfig(ctx.vertical);

  // ───── LANDING PAGE ─────
  const landing = (config.landingPages ?? []).find((lp) => lp.slug === slug);
  if (landing) {
    // Build a config override with custom provider order + positions
    const customConfig = {
      ...config,
      ranking: {
        ...config.ranking,
        providerOrder: landing.providerOrder.length > 0 ? landing.providerOrder : config.ranking.providerOrder,
      },
    };

    const baseOrder = landing.providerOrder.length > 0 ? landing.providerOrder : config.ranking.providerOrder;
    // Page-specific card facts (verified molecule/brand price per provider) and,
    // on molecule pages, only the providers that publish that molecule.
    const focus = landingFocusFor(landing.slug, baseOrder);
    const providerOrder = focus ? focus.providerIds : baseOrder;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: landing.seoTitle,
      description: landing.seoDescription,
      url: canonicalUrl(ctx, `/${landing.slug}`),
      dateModified: landing.updatedAt || CONTENT_LAST_UPDATED,
      ...pageReviewSchema(`${ctx.prefix}/${landing.slug}`),
      publisher: { "@type": "Organization", name: ctx.brandName, url: ctx.origin },
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: landing.h1,
      numberOfItems: providerOrder.length,
      itemListElement: providerOrder.map((id, i) => {
        const p = config.providers.find((pr) => pr.id === id);
        return { "@type": "ListItem", position: i + 1, name: p?.name ?? id };
      }),
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
        { "@type": "ListItem", position: 2, name: landing.h1, item: canonicalUrl(ctx, `/${landing.slug}`) },
      ],
    };

    // FAQ schema from editorial sections
    const landingFaqSchema = landing.editorialSections && landing.editorialSections.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: landing.editorialSections.map((s) => ({
        "@type": "Question",
        name: s.heading,
        acceptedAnswer: { "@type": "Answer", text: s.body.replace(/<[^>]*>/g, "") },
      })),
    } : null;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {landingFaqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingFaqSchema) }} />}
        <ComparisonLayout
          config={customConfig}
          linkPrefix={ctx.prefix}
          cardIntroMode={focus ? "short" : "full"}
          priceNotes={focus?.priceNotes}
          onlyProviderIds={focus ? focus.providerIds : undefined}
          byline={<MedicalReviewBar path={`${ctx.prefix}/${landing.slug}`} className="max-w-[760px]" />}
          heroOverrides={{
            h1: landing.h1,
            h2: landing.h2,
            description: landing.heroDescription,
          }}
        >
          {landing.editorialSections && landing.editorialSections.length > 0 ? (
            <LandingEditorial sections={landing.editorialSections} />
          ) : (
            <EditorialContent />
          )}
          <div className="mx-auto max-w-[1200px] px-4 pb-12">
            <GuideCluster currentSlug={landing.slug} prefix={ctx.prefix} />
          </div>
        </ComparisonLayout>
      </>
    );
  }

  // ───── BATTLE PAGE ─────
  const battle = (config.battles ?? []).find((b) => b.slug === slug);
  if (!battle) return notFound();

  // Collapse reverse-pair duplicates (e.g. embody-vs-altrx ↔ altrx-vs-embody):
  // both slugs render the same matchup and compete in search. 308-redirect any
  // non-canonical slug to the single canonical (alphabetically-first) slug for
  // this provider pair so only one URL is indexed and its authority is pooled.
  const samePairSlugs = (config.battles ?? [])
    .filter(
      (b) =>
        (b.provider1Id === battle.provider1Id && b.provider2Id === battle.provider2Id) ||
        (b.provider1Id === battle.provider2Id && b.provider2Id === battle.provider1Id)
    )
    .map((b) => b.slug)
    .sort();
  const canonicalPairSlug = samePairSlugs[0] ?? battle.slug;
  if (canonicalPairSlug !== slug) {
    permanentRedirect(hubLink(ctx, `/compare/${canonicalPairSlug}`));
  }

  const p1 = config.providers.find((p) => p.id === battle.provider1Id);
  const p2 = config.providers.find((p) => p.id === battle.provider2Id);
  if (!p1 || !p2) return notFound();

  // Display label for the "X vs Y" matchup (breadcrumb, FAQ, schema). A battle
  // can lead the label with a high-demand brand via matchupLabel without
  // reordering provider1/provider2 (which drives winner logic).
  const matchupLabel = battle.matchupLabel || `${p1.name} vs ${p2.name}`;

  // Objective framing: no declared "winner". Map the per-side verdict points to
  // each provider (the CMS stores them as winner/loser points) so both columns
  // read as an even "go with X if… / go with Y if…" recommendation.
  const p1IsBattleWinner = battle.winnerId === p1.id;
  const p1VerdictPoints = p1IsBattleWinner ? (battle.verdictWinnerPoints ?? []) : (battle.verdictLoserPoints ?? []);
  const p2VerdictPoints = p1IsBattleWinner ? (battle.verdictLoserPoints ?? []) : (battle.verdictWinnerPoints ?? []);

  // Per-provider deep dives. Each provider gets its own rich, full section
  // (intro, what-you-get, pricing, pros/cons, its own Trustpilot reviews, CTA)
  // pulled from that provider's review data - so the page reads as two honest,
  // standalone write-ups rather than a "who wins" head-to-head. `bestForFallback`
  // covers providers that don't have a review entry yet.
  const p1Review = (config.reviews ?? []).find((r) => r.providerId === p1.id);
  const p2Review = (config.reviews ?? []).find((r) => r.providerId === p2.id);
  const deepDives = [
    { provider: p1, review: p1Review, bestForFallback: p1VerdictPoints },
    { provider: p2, review: p2Review, bestForFallback: p2VerdictPoints },
  ];

  // Mobile promo popup - the highest-priority featured provider that has a
  // creative (registry + priority in @/lib/promo-popups). Each popup's link and
  // offer come from that provider's own real affiliate data.
  const promoPopup = resolvePromoPopup([p1, p2]);

  // CRO layer (rolled out to all battles after the embody-vs-ro prototype):
  // quick answer, fit finder, Reddit synthesis, read-more accordions (content
  // stays fully in the DOM via <details>) and sticky-CTA hierarchy. All
  // data-driven from each battle's own verdict fields - presentation only.
  const verdictWinner = battle.winnerId === p2.id ? p2 : battle.winnerId === p1.id ? p1 : null;
  const verdictRunnerUp = verdictWinner === p1 ? p2 : verdictWinner === p2 ? p1 : null;
  const winnerPts = battle.verdictWinnerPoints ?? [];
  const runnerUpPts = battle.verdictLoserPoints ?? [];

  // "Short answer" box (top of page): the one-line verdict a searcher came for,
  // above the fold, before any prose. Numeric scores are our real editorial
  // ranking scores (the same values shown on ranking/home cards), pulled by the
  // provider's index in the ranking - shown ONLY when they agree with the
  // declared winner, so the number never contradicts the verdict. No invented
  // figures: when scores would conflict or are missing, the box runs without them.
  const rankingScoreFor = (id: string): number | undefined => {
    const idx = config.ranking.providerOrder.indexOf(id);
    return idx >= 0 ? config.ranking.positions[idx]?.score : undefined;
  };
  const winnerScore = verdictWinner ? rankingScoreFor(verdictWinner.id) : undefined;
  const runnerUpScore = verdictRunnerUp ? rankingScoreFor(verdictRunnerUp.id) : undefined;
  const showShortAnswerScores =
    winnerScore != null && runnerUpScore != null && winnerScore >= runnerUpScore;
  const shortAnswerReason = winnerPts[0] ?? runnerUpPts[0] ?? "";

  // Above-the-fold quick-comparison rows: the three decisions searchers care
  // about first (price, prescription, delivery), pulled from this battle's own
  // feature data so every value is real. The prescription row is a market
  // constant - every provider we compare requires a licensed-provider review.
  const findFeature = (re: RegExp) => (battle.features ?? []).find((f) => re.test(f.feature));
  const rxValue = "Yes - a licensed clinician reviews your intake online";
  const priceRow = findFeature(/price|cost/i);
  const shippingRow = findFeature(/shipping|delivery|speed/i);
  const medsRow = findFeature(/medication|treatment/i);
  const quickRows = [
    priceRow && { label: "Price from", v1: priceRow.provider1Value, v2: priceRow.provider2Value },
    medsRow && { label: "Medications offered", v1: medsRow.provider1Value, v2: medsRow.provider2Value },
    { label: "Prescription needed?", v1: rxValue, v2: rxValue },
    shippingRow && { label: "Shipping", v1: shippingRow.provider1Value, v2: shippingRow.provider2Value },
  ].filter(Boolean) as { label: string; v1: string; v2: string }[];

  // Related comparisons - other battles featuring either provider (internal links).
  // Ordered by relevance: comparisons involving this matchup's winner surface
  // first (a reader is most likely to keep evaluating the winner against other
  // options), then the rest in config order - the stable sort preserves that
  // order within each tier.
  const relatedBattles = (config.battles ?? [])
    .filter(
      (b) =>
        b.slug !== battle.slug &&
        [b.provider1Id, b.provider2Id].some((id) => id === p1.id || id === p2.id)
    )
    .map((b) => {
      const bp1 = config.providers.find((p) => p.id === b.provider1Id);
      const bp2 = config.providers.find((p) => p.id === b.provider2Id);
      if (!bp1 || !bp2) return null;
      const featuresWinner =
        b.provider1Id === battle.winnerId || b.provider2Id === battle.winnerId;
      return { slug: b.slug, bp1, bp2, featuresWinner };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => Number(b.featuresWinner) - Number(a.featuresWinner))
    .slice(0, 6);

  // Curated 3-way comparisons featuring BOTH of this battle's providers - the
  // only internal path into the trio pages, so every trio gets inbound links
  // from its three constituent head-to-heads. Weight-loss only (the registry
  // is a WL registry).
  const relatedTrios = THREE_WAY_COMPARISONS.filter(
    (t) => t.providerIds.includes(p1.id) && t.providerIds.includes(p2.id)
  ).map((t) => ({
    slug: t.slug,
    names: t.providerIds.map(
      (id) => config.providers.find((p) => p.id === id)?.name ?? id
    ),
  }));

  // FAQ - real, query-shaped questions answered from grounded battle content.
  // Expands the queries the page can rank for (long-tail + People Also Ask) and
  // powers both the visible FAQ section and the FAQPage schema.
  const catToQuestion = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("pric") || n.includes("value")) return `Does ${p1.name} cost less than ${p2.name}?`;
    if (n.includes("ship") || n.includes("speed")) return `Does ${p1.name} or ${p2.name} deliver medication faster?`;
    if (n.includes("medication")) return `Does ${p1.name} or ${p2.name} offer more GLP-1 medications?`;
    if (n.includes("medical") || n.includes("care") || n.includes("support") || n.includes("monitor")) return `Does ${p1.name} or ${p2.name} give you more clinical support?`;
    if (n.includes("customer") || n.includes("experience") || n.includes("service") || n.includes("personal")) return `Do customers rate ${p1.name} or ${p2.name} higher?`;
    if (n.includes("flexib")) return `Are ${p1.name} or ${p2.name} plans easier to change or cancel?`;
    if (n.includes("focus") || n.includes("simplic")) return `Is ${p1.name} or ${p2.name} more dedicated to weight loss?`;
    if (n.includes("range") || n.includes("beyond")) return `Does ${p2.name} treat more than weight loss, unlike ${p1.name}?`;
    if (n.includes("brand") || n.includes("track") || n.includes("pharmacy")) return `Is ${p1.name} or ${p2.name} the longer-established company?`;
    if (n.includes("transparen") || n.includes("certif")) return `Is ${p1.name} or ${p2.name} clearer about what you will pay?`;
    return `${p1.name} or ${p2.name}: which wins on ${name.toLowerCase()}?`;
  };

  const battleFaqs = [
    { question: `${matchupLabel}: which GLP-1 provider is better?`, answer: battle.verdict },
    ...battle.categories.map((cat) => ({ question: catToQuestion(cat.name), answer: cat.explanation })),
  ].filter((f, i, arr) => !!f.answer && arr.findIndex((x) => x.question === f.question) === i);

  const battleUpdatedAt = latestUpdate(battle.updatedAt);

  // Named author for the byline + schema (same expert the article and review
  // templates credit), branded for the current context.
  const battleAuthor = config.experts?.[0]
    ? {
        ...config.experts[0],
        name: config.experts[0].name.replace(/TopWeightLoss/gi, ctx.brandTeam.replace(/\s+Team$/i, "")),
      }
    : null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    ...pageReviewSchema(`${ctx.prefix}/compare/${battle.slug}`),
    headline: battle.title,
    description: battle.description,
    datePublished: battle.publishedAt ?? "2026-06-01",
    dateModified: battleUpdatedAt,
    // The research team is a group, so it is an Organization, not a Person.
    author: {
      "@type": "Organization",
      name: battleAuthor ? battleAuthor.name : ctx.brandTeam,
      url: canonicalUrl(ctx, "/about"),
    },
    publisher: {
      "@type": "Organization",
      name: ctx.brandName,
      url: ctx.origin,
      logo: { "@type": "ImageObject", url: `${ctx.origin}/logo.png` },
    },
    mainEntityOfPage: canonicalUrl(ctx, `/compare/${battle.slug}`),
  };

  const battleBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: canonicalUrl(ctx, "/compare") },
      { "@type": "ListItem", position: 3, name: matchupLabel, item: canonicalUrl(ctx, `/compare/${battle.slug}`) },
    ],
  };

  const battleFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: battleFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(battleBreadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(battleFaqSchema) }} />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-white">
          {/* Subtle gradient accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0C4B75] via-[#1a8cd8] to-[#0C4B75]" />
          {/* Mobile-tight hero: less padding, a smaller subtitle, and a single
              wrapping byline row - the fold should reach real content, not
              spend itself on credits. Desktop keeps its previous scale. */}
          <div className="mx-auto max-w-[1100px] px-4 pb-5 pt-4 sm:px-6 sm:pb-14 sm:pt-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: hubLink(ctx, "/") },
                { label: "Compare", href: hubLink(ctx, "/compare") },
                { label: matchupLabel },
              ]}
            />

            <h1 className="text-[22px] font-extrabold leading-[1.2] tracking-[-0.01em] text-[#191919] sm:text-[38px] sm:leading-[1.15] sm:tracking-normal">
              {battle.title}
            </h1>
            <p className="mt-2 max-w-xl text-[14px] leading-[1.45] text-gray-700 sm:mt-3 sm:text-[15px] sm:leading-relaxed">
              {battle.subtitle || battle.description}
            </p>
            {/* One quiet credibility line - byline, medical review and date read
                as a single strand of muted metadata, so nothing here competes
                with the H1 above or the value block below. No bold-dark names,
                no uppercase pseudo-labels: this is a caption, not a headline. */}
            <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11.5px] leading-[1.5] text-gray-500 sm:mt-4 sm:text-[12.5px]">
              {config.experts && config.experts.length > 0 && (
                <>
                  <span>
                    Written by{" "}
                    <Link href={hubLink(ctx, "/about")} className="font-medium text-gray-600 underline-offset-2 hover:text-[#0C4B75] hover:underline">
                      The {ctx.brandTeam.replace(/\s+Team$/i, "")} Research Team
                    </Link>
                  </span>
                  {/* Separator belongs to the byline: without it the line
                      opened on a stray dot (seen on HRT, which had no byline). */}
                  <span className="text-gray-400">·</span>
                </>
              )}
              <LastUpdated date={battleUpdatedAt} />
            </div>
            <MedicalReviewBar path={`${ctx.prefix}/compare/${battle.slug}`} className="mt-3 max-w-[760px] sm:mt-4" />
            <TrustDisclosure disclaimerHref={"/disclaimer"} />
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-4 pt-10 pb-28 sm:px-6 sm:pb-10">
          {/* ───── THE VERDICT ─────
              The answer a searcher came for, above the fold, before any prose -
              in the site's editorial verdict-card style (matches the review
              "bottom line" and cheapest-glp1 "short answer" cards). Winner logos
              anchor it; the score pill shows only when our rubric agrees with the
              named winner. Renders only when a winner is named. */}
          {verdictWinner && verdictRunnerUp && shortAnswerReason && (
            <div className="mb-8 max-w-[820px] overflow-hidden rounded-2xl border border-[#0C4B75]/20 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-[#F3F9FD] px-5 py-3 sm:px-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0C4B75]">
                  Our recommendation
                </p>
                {showShortAnswerScores && (
                  <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11.5px] font-bold text-[#0C4B75] shadow-sm ring-1 ring-[#0C4B75]/15">
                    <Star className="h-3.5 w-3.5 fill-[#FDB515] text-[#FDB515]" strokeWidth={0} />
                    {winnerScore}/10 vs {runnerUpScore}/10
                  </span>
                )}
              </div>
              <div className="flex items-start gap-4 p-5 sm:p-6">
                <div className="hidden h-[38px] w-[104px] shrink-0 items-center sm:flex">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={verdictWinner.logo}
                    alt={`${verdictWinner.name} logo`}
                    className="max-h-full max-w-full object-contain object-left"
                  />
                </div>
                <p className="text-[15.5px] leading-[1.8] text-gray-800 sm:text-[16px]">
                  <span className="font-bold text-[#191919]">{verdictWinner.name}</span> is the provider we
                  recommend to most readers. The main reason: <BoldKeyFacts text={shortAnswerReason.replace(/\.$/, "")} />.{" "}
                  Scroll down for the full reasoning, the prices, and the situations where {verdictRunnerUp.name} is the better pick.
                </p>
              </div>
            </div>
          )}

          {/* ───── REDDIT COMMUNITY CAROUSEL (verified threads only) ───── */}
          <RedditThreadCarousel
            providers={[p1, p2]}
            reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
          />

          {/* ───── EVIDENCE -> CONCLUSION SYNTHESIS ─────
              Reads the threads shown directly above and says what keeps coming
              up - one written summary per provider, from the same registry as
              the threads themselves, so it only renders on verified material. */}
          {[p1, p2].some((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]?.themes) && (
              <div className="mb-14 max-w-[820px] rounded-2xl border border-gray-200 bg-gray-50/60 p-5 sm:p-6">
                <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
                  What Reddit users keep saying
                </p>
                <div className="space-y-3 text-[14px] leading-[1.7] text-gray-600">
                  {[p1, p2].map((p) =>
                    REDDIT_COMMUNITY_FEEDBACK[p.id]?.themes ? (
                      <p key={p.id}>
                        <span className="font-bold text-[#191919]">{p.name}:</span>{" "}
                        {REDDIT_COMMUNITY_FEEDBACK[p.id].themes}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            )}

          {/* ───── ABOVE-THE-FOLD QUICK COMPARISON ─────
              The three decisions searchers came for - price, prescription,
              delivery - answered before any scrolling, from real feature data. */}
          {quickRows.length > 0 && (
            <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                    <th className="w-[26%] py-3 pl-4 pr-2 text-[11px] font-bold uppercase tracking-[0.06em] text-gray-400 sm:w-[22%] sm:py-3.5 sm:text-[12px]">
                      Key facts
                    </th>
                    <th className="py-3 px-2 text-[13px] font-bold text-[#191919] sm:py-3.5 sm:px-3 sm:text-[15px]">{p1.name}</th>
                    <th className="py-3 px-2 pr-4 text-[13px] font-bold text-[#191919] sm:py-3.5 sm:px-3 sm:text-[15px]">{p2.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {quickRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 align-top last:border-0">
                      <td className="py-3 pl-4 pr-2 text-[12.5px] font-semibold leading-snug text-gray-500 sm:py-3.5 sm:text-[13.5px]">
                        {row.label}
                      </td>
                      {/* break-words: slash-joined values (e.g. medication lists)
                          have no natural break points and would clip on mobile */}
                      <td className="break-words py-3 px-2 text-[12.5px] leading-snug text-[#191919] sm:py-3.5 sm:px-3 sm:text-[14px]">{row.v1}</td>
                      <td className="break-words py-3 px-2 pr-4 text-[12.5px] leading-snug text-[#191919] sm:py-3.5 sm:px-3 sm:text-[14px]">{row.v2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Freshness line - SERP winners date-stamp their prices; ours
                  are verified against published rates on every content pass. */}
              <p className="border-t border-gray-100 px-4 py-2.5 text-[11.5px] text-gray-400">
                These are the published prices from our most recent check. Offers change, so confirm the
                final amount at checkout.{" "}
                <Link href={"/how-we-rank"} className="font-medium text-gray-500 underline underline-offset-2 hover:text-[#0C4B75]">
                  Our price-checking method
                </Link>
              </p>
            </div>
          )}

          {/* ───── PROVIDER CARDS (enriched) ───── */}
          <div className="relative mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* VS badge - desktop: absolute-centered between the two columns */}
            <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0C4B75]/20 bg-white text-[13px] font-extrabold text-[#0C4B75] shadow-sm">
                VS
              </div>
            </div>

            {[p1, p2].map((provider, idx) => {
              return (
              <Fragment key={provider.id}>
                {/* VS badge - mobile: sits in the gap BETWEEN the two stacked cards */}
                {idx === 1 && (
                  <div className="flex items-center justify-center sm:hidden -my-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0C4B75]/20 bg-white text-[12px] font-extrabold text-[#0C4B75]">
                      VS
                    </div>
                  </div>
                )}
              <div className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white px-6 pb-6 pt-7 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-[40px] w-[110px] items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-gray-100 pb-3">
                  {provider.trustpilotRating && (
                    <TrustpilotRating
                      rating={provider.trustpilotRating}
                      reviewCount={provider.trustpilotReviewCount}
                      starSize={16}
                    />
                  )}
                  <LicensedTelehealthBadge />
                </div>

                <p className="mb-4 text-[14px] leading-relaxed text-gray-500">
                  {provider.tagline}
                </p>

                <ul className="mb-5 space-y-2">
                  {provider.highlights.slice(0, 3).map((h, hi) => (
                    <li key={hi} className="flex items-start gap-2 text-[13px] text-gray-800">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
                      {h}
                    </li>
                  ))}
                </ul>

                <ProviderCta
                  href={provider.affiliateUrl}
                  providerName={provider.name}
                  providerSlug={provider.id}
                  pageType="battle"
                  sourceFlow="battle_page"
                  className="mt-auto flex h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
                >
                  Visit {provider.name}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </ProviderCta>
              </div>
              </Fragment>
              );
            })}
          </div>

          {/* ───── PER-PROVIDER DEEP DIVES ───── */}
          <div className="mb-14">
            <div className="mb-8 max-w-[760px]">
              <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
                Provider profiles
              </p>
              <h2 className="text-[24px] font-bold text-[#191919]">
                What do {p1.name} and {p2.name} each offer?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.8] text-gray-600">
                {p1.name} and {p2.name} are both reputable GLP-1 weight loss providers, so
                neither is a bad choice. Below, each one gets its own profile: what is included,
                the real monthly cost and what paying customers report, so you can match the
                provider to <em>your</em> priorities.
              </p>
            </div>

            <div className="space-y-10">
              {deepDives.map(({ provider, review, bestForFallback }) => {
                const features = review?.keyFeatures?.length ? review.keyFeatures : provider.highlights;
                const bestFor = review?.bestFor?.length ? review.bestFor : bestForFallback;
                const plans = review?.pricingPlans ?? [];
                const pros = review?.pros ?? [];
                const cons = review?.cons ?? [];
                const badges = review?.trustBadges ?? [];
                const lead = review?.reviewIntro || provider.tagline;
                const reviewCount = provider.trustpilotReviews?.length ?? 0;

                return (
                  <section
                    key={provider.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    {/* Accent bar */}
                    <div className="h-1 bg-gradient-to-r from-[#0C4B75] via-[#1a8cd8] to-[#0C4B75]" />

                    <div className="p-6 sm:p-8">
                      {/* Header: logo + Trustpilot rating + quick CTA */}
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex h-[44px] w-[130px] items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain" />
                          </div>
                          {provider.trustpilotRating && (
                            <div className="border-l border-gray-200 pl-4">
                              <TrustpilotRating
                                rating={provider.trustpilotRating}
                                reviewCount={provider.trustpilotReviewCount}
                                starSize={15}
                              />
                            </div>
                          )}
                          <div className="border-l border-gray-200 pl-4">
                            <LicensedTelehealthBadge />
                          </div>
                        </div>
                        <ProviderCta
                          href={provider.affiliateUrl}
                          providerName={provider.name}
                          providerSlug={provider.id}
                          pageType="battle"
                          sourceFlow="battle_page"
                          className="inline-flex h-[42px] items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
                        >
                          Visit {provider.name}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </ProviderCta>
                      </div>

                      {/* Intro */}
                      <h3 className="mb-2.5 text-[20px] font-bold text-[#191919]">
                        How does {provider.name} work?
                      </h3>
                      <ReadMoreProse text={lead} label={`More about ${provider.name}`} />

                      {/* Trust badges */}
                      {badges.length > 0 && (
                        <div className="mb-8 flex flex-wrap gap-2">
                          {badges.map((b, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[12px] font-semibold text-gray-600"
                            >
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                              {b}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* What you get + Who it's best for */}
                      <div className="mb-8 grid gap-6 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#191919]">
                            <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.5} />
                            Included with {provider.name}
                          </h4>
                          <ul className="space-y-2">
                            {features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.6] text-gray-600">
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {bestFor.length > 0 && (
                          <div>
                            <h4 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#191919]">
                              <Sparkles className="h-4 w-4 text-[#0C4B75]" strokeWidth={2} />
                              {provider.name} suits you if
                            </h4>
                            <ul className="space-y-2">
                              {bestFor.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.6] text-gray-600">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0C4B75]" strokeWidth={2} />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Pricing */}
                      {plans.length > 0 ? (
                        <div className="mb-8">
                          <h4 className="mb-1.5 text-[17px] font-bold text-[#191919]">
                            How much does {provider.name} cost?
                          </h4>
                          {review?.pricingSummary && (
                            <div className="mb-4 [&>div]:mb-0 [&_p]:text-[14px] [&_p]:leading-[1.7] [&_p]:text-gray-500">
                              <ReadMoreProse
                                text={review.pricingSummary}
                                label="See all pricing details"
                                visibleSentences={1}
                              />
                            </div>
                          )}
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {plans.map((plan, i) => (
                              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                                <p className="text-[13px] font-bold text-[#191919]">{plan.name}</p>
                                <p className="mb-2 text-[12px] text-gray-500">{plan.medication}</p>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-[22px] font-extrabold text-[#0C4B75]">{plan.price}</span>
                                  {plan.regularPrice && (
                                    <span className="text-[13px] text-gray-400 line-through">{plan.regularPrice}</span>
                                  )}
                                  {plan.unit && <span className="text-[12px] text-gray-400">{plan.unit}</span>}
                                </div>
                                {plan.cadence && (
                                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                    {plan.cadence}
                                  </p>
                                )}
                                {plan.highlights && plan.highlights.length > 0 && (
                                  <ul className="mt-3 space-y-1.5 border-t border-gray-200 pt-3">
                                    {plan.highlights.map((h, hi) => (
                                      <li key={hi} className="flex items-start gap-1.5 text-[12px] leading-[1.5] text-gray-500">
                                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" strokeWidth={2} />
                                        {h}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : review?.pricingSummary ? (
                        <div className="mb-8">
                          <h4 className="mb-1.5 text-[17px] font-bold text-[#191919]">
                            How much does {provider.name} cost?
                          </h4>
                          <p className="max-w-[820px] text-[14px] leading-[1.7] text-gray-500">
                            {review.pricingSummary}
                          </p>
                        </div>
                      ) : null}

                      {/* Pros / cons */}
                      {(pros.length > 0 || cons.length > 0) && (
                        <div className="mb-8 grid gap-4 sm:grid-cols-2">
                          {pros.length > 0 && (
                            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5">
                              <p className="mb-3 text-[14px] font-bold text-emerald-800">
                                {provider.name} strengths
                              </p>
                              <ul className="space-y-2">
                                {pros.map((pt, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[13.5px] leading-[1.55] text-gray-800">
                                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                                    {pt}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {cons.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                              <p className="mb-3 text-[14px] font-bold text-gray-800">
                                Possible drawbacks
                              </p>
                              <ul className="space-y-2">
                                {cons.map((c, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[13.5px] leading-[1.55] text-gray-600">
                                    <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* This provider's Trustpilot reviews */}
                      {reviewCount > 0 && (
                        <div className="mb-8">
                          <h4 className="mb-4 text-[17px] font-bold text-[#191919]">
                            {provider.name} reviews from Trustpilot customers
                          </h4>
                          <TrustpilotCarousel
                            providerName={provider.name}
                            providerLogo={provider.logo}
                            reviews={provider.trustpilotReviews!}
                            rating={provider.trustpilotRating}
                            reviewCount={provider.trustpilotReviewCount}
                          />
                        </div>
                      )}

                      {/* Bottom CTA */}
                      <ProviderCta
                        href={provider.affiliateUrl}
                        providerName={provider.name}
                        providerSlug={provider.id}
                        pageType="battle"
                        sourceFlow="battle_page"
                        className="flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61]"
                      >
                        Start your {provider.name} assessment
                        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                      </ProviderCta>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          {/* ───── CUSTOMER EXPERIENCE FROM REVIEWS ─────
              Where each provider leads according to its quoted Trustpilot
              reviews, computed from src/data/review-insights.ts. */}
          <ReviewExperienceComparison
            a={{ id: p1.id, name: p1.name, reviews: p1.trustpilotReviews ?? [], rating: p1.trustpilotRating, reviewCount: p1.trustpilotReviewCount }}
            b={{ id: p2.id, name: p2.name, reviews: p2.trustpilotReviews ?? [], rating: p2.trustpilotRating, reviewCount: p2.trustpilotReviewCount }}
          />

          {/* ───── 12-MONTH COST MATH ─────
              What a realistic course of treatment costs at each provider -
              the number searchers actually decide on, not the headline rate. */}
          {BATTLE_COST_MATH[slug] && (
            <div className="mb-12">
              <h2 className="mb-1.5 text-[22px] font-bold text-[#191919]">
                How much does {p1.name} vs {p2.name} cost over a year?
              </h2>
              <p className="mb-4 max-w-[680px] text-[14px] text-gray-500">
                The advertised monthly price only tells part of the story. These totals add up a full
                course of treatment, with every promo condition applied as the provider publishes it.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                      <th className="w-[34%] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400" />
                      <th className="px-4 py-3.5 text-[14px] font-bold text-[#191919]">{p1.name}</th>
                      <th className="px-4 py-3.5 text-[14px] font-bold text-[#191919]">{p2.name}</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13.5px]">
                    {BATTLE_COST_MATH[slug].rows.map(([label, v1, v2], i) => (
                      <tr key={i} className="border-b border-gray-100 align-top last:border-0">
                        <td className="px-4 py-3.5 text-[12.5px] font-semibold leading-snug text-gray-500">{label}</td>
                        <td className="break-words px-4 py-3.5 font-semibold text-[#191919] [font-variant-numeric:tabular-nums]">{v1}</td>
                        <td className="break-words px-4 py-3.5 font-semibold text-[#191919] [font-variant-numeric:tabular-nums]">{v2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">{BATTLE_COST_MATH[slug].note}</p>
            </div>
          )}

          {/* ───── PRODUCT CAROUSEL ─────
              Shopping-style product cards for THIS matchup's two providers
              only - a battle page sells the contenders, not the whole market.
              Weight-loss only (the catalog is a WL registry). */}
          <div className="mb-12">
            <ProductCarousel
              providers={config.providers}
              title={`${p1.name} and ${p2.name} plans and prices`}
              subtitle="Every published plan from both providers, lowest price first, with the terms listed under each price."
              onlyProviderIds={[p1.id, p2.id]}
              pageType="battle"
              withSchema
              pageUrl={canonicalUrl(ctx, `/compare/${slug}`)}
            />
          </div>

          {/* ───── FEATURE COMPARISON TABLE ───── */}
          {battle.features && battle.features.length > 0 && (
            <div className="mb-14">
              <h2 className="text-[22px] font-bold leading-tight text-[#191919] sm:text-[24px]">
                How are {p1.name} and {p2.name} different?
              </h2>
              <p className="mt-2 mb-5 max-w-[640px] text-[15px] leading-relaxed text-gray-500">
                A feature-by-feature table. Rows where the two providers match are grayed out, so the real differences stand out.
              </p>

              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="w-[32%] py-3 pr-2 align-bottom" />
                    <th className="w-[34%] py-3 px-2 align-bottom text-[13px] font-bold text-[#191919] sm:px-3 sm:text-[15px]">
                      {p1.name}
                    </th>
                    <th className="w-[34%] py-3 pl-2 align-bottom text-[13px] font-bold text-[#191919] sm:pl-3 sm:text-[15px]">
                      {p2.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {battle.features.map((row, i) => {
                    const norm = (s?: string) => (s ?? "").trim().toLowerCase();
                    const same = norm(row.provider1Value) === norm(row.provider2Value);
                    const bestFor = /best[\s-]?for/i.test(row.feature);
                    // Differences read in full contrast; identical rows stay quiet so
                    // the eye is drawn to what actually separates the two providers.
                    const value = `${same ? "text-gray-400" : "text-[#191919]"} ${bestFor ? "font-semibold" : "font-normal"}`;
                    return (
                      <tr key={i} className="border-b border-gray-100 align-top">
                        <td
                          className={`py-3 pr-2 text-[12.5px] leading-snug sm:py-3.5 sm:text-[14px] ${
                            bestFor ? "font-semibold text-[#191919]" : "font-medium text-gray-500"
                          }`}
                        >
                          {row.feature}
                        </td>
                        <td className={`py-3 px-2 text-[12.5px] leading-snug sm:py-3.5 sm:px-3 sm:text-[14.5px] ${value}`}>
                          {row.provider1Value}
                        </td>
                        <td className={`py-3 pl-2 text-[12.5px] leading-snug sm:py-3.5 sm:pl-3 sm:text-[14.5px] ${value}`}>
                          {row.provider2Value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ───── FIT FINDER ─────
              Turns the comparison above into decisions, from each battle's own
              verdict points - find the line that sounds like you. */}
          {verdictWinner && verdictRunnerUp && (winnerPts.length > 0 || runnerUpPts.length > 0) && (
            <div className="mb-14 max-w-[820px]">
              <h2 className="mb-1.5 text-[22px] font-bold text-[#191919]">
                {p1.name} or {p2.name}: which fits you?
              </h2>
              <p className="mb-4 text-[14px] text-gray-500">
                Pick the statement that matches your situation, and the provider beside it is your best fit.
              </p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {[
                  ...winnerPts.slice(0, 3).map((pt) => [pt, verdictWinner.name] as const),
                  ...runnerUpPts.slice(0, 3).map((pt) => [pt, verdictRunnerUp.name] as const),
                ].map(([need, pick], i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 last:border-0 sm:px-5"
                  >
                    <span className="text-[13.5px] leading-snug text-gray-600 sm:text-[14px]">
                      <BoldKeyFacts text={need} />
                    </span>
                    <span className="shrink-0 text-[13.5px] font-bold text-[#0C4B75] sm:text-[14px]">{pick}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───── EXPERT INTRO ───── */}
          <div className="mb-8 max-w-[760px]">
            <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
              Overview
            </p>
            <ReadableProse text={battle.intro} paragraphClassName="text-[16px] leading-[1.85] text-gray-600" />
          </div>

          {/* ───── EARLY QUICK ANSWER ─────
              Answers the search intent immediately, built from each battle's
              own verdict points - no new copy to maintain per page. Renders
              only when a battle actually names a winner with points. */}
          {battle.winnerId && verdictWinner && verdictRunnerUp && winnerPts.length > 0 && runnerUpPts.length > 0 && (
            <div className="mb-12 max-w-[820px] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
                Summary by priority
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[14px] font-bold text-[#191919]">Pick {verdictWinner.name} for</p>
                  <ul className="space-y-2">
                    {winnerPts.slice(0, 3).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.65] text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                        <span><BoldKeyFacts text={pt} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-[14px] font-bold text-[#191919]">Pick {verdictRunnerUp.name} for</p>
                  <ul className="space-y-2">
                    {runnerUpPts.slice(0, 3).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.65] text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0C4B75]" strokeWidth={2.5} />
                        <span><BoldKeyFacts text={pt} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 border-t border-gray-100 pt-3.5 text-[14px] text-gray-800">
                <span className="font-bold text-[#191919]">
                  Our overall pick for most people: {verdictWinner.name}.
                </span>{" "}
                <span className="text-gray-500">
                  The prices and customer feedback on this page explain why, and when {verdictRunnerUp.name} comes out ahead.
                </span>
              </p>
            </div>
          )}

          {/* ───── BOTTOM CTAs ───── */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            {[
              { provider: p1, color: "from-gray-50 to-gray-50/50", hoverColor: "hover:border-[#0C4B75]/30", textColor: "text-[#191919]" },
              { provider: p2, color: "from-gray-50 to-gray-50/50", hoverColor: "hover:border-[#0C4B75]/30", textColor: "text-[#191919]" },
            ].map(({ provider, color, hoverColor, textColor }) => (
              <ProviderCta
                key={provider.id}
                href={provider.affiliateUrl}
                providerName={provider.name}
                providerSlug={provider.id}
                pageType="battle"
                sourceFlow="battle_page"
                className={`group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-gradient-to-b ${color} px-4 py-6 transition-all ${hoverColor} hover:shadow-md`}
              >
                <div className="flex h-[36px] w-[100px] items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className={`flex items-center gap-1 text-[13px] font-bold ${textColor} group-hover:underline`}>
                  Go to Site
                  <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                </span>
              </ProviderCta>
            ))}
          </div>

          {/* ───── FAQ ───── */}
          {battleFaqs.length > 0 && (
            <div className="mb-14">
              <h2 className="mb-6 text-[24px] font-bold text-[#191919]">
                {matchupLabel}: questions people ask
              </h2>
              <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {battleFaqs.map((f, i) => (
                  <div key={i} className="p-6">
                    <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                    <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───── KEEP RESEARCHING (weight-loss) ─────
              Contextual links from the battle pages Google crawls most to the
              money pages it has been slow to index on the new domain (Oct 2026
              URL Inspection: altRx review and the tirzepatide guide "unknown to
              Google" while this template's pages are indexed). */}
          <div className="mb-10">
            <h2 className="mb-1.5 text-[20px] font-bold text-[#191919]">Read next</h2>
            <p className="mb-4 text-[14px] text-gray-500">Where readers of this comparison usually go after this page.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { href: "/articles/best-tirzepatide-online", title: "Best tirzepatide online", blurb: "Eight checked compounded tirzepatide prices starting at $89, plus each brand-name Zepbound option." },
                { href: "/reviews/altrx", title: "altRx review", blurb: "Semaglutide at $89, tirzepatide at $149, and brand-name drugs sold alongside compounded plans." },
                { href: "/glp1-provider-support", title: "GLP-1 provider support compared", blurb: "How each provider handles support, shipping and billing, based on saved Trustpilot reviews." },
                { href: "/articles/zepbound-price-online", title: "Zepbound price online", blurb: "Cash prices of $1,249 to $1,599 for brand Zepbound, the ro pen option and cheaper compounded tiers." },
              ].map((g) => (
                <Link
                  key={g.href}
                  href={hubLink(ctx, g.href)}
                  className="group rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <p className="flex items-center justify-between text-[15px] font-bold text-[#191919] group-hover:text-[#0C4B75]">
                    {g.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#0C4B75]" strokeWidth={2.5} />
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-gray-500">{g.blurb}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* ───── RELATED COMPARISONS ───── */}
          {(relatedBattles.length > 0 || relatedTrios.length > 0) && (
            <div className="mb-10">
              <h2 className="mb-5 text-[20px] font-bold text-[#191919]">More Provider Matchups</h2>
              {/* 3-way comparisons featuring this exact matchup lead the list -
                  the reader already cares about both providers, so "add a third
                  option" is the highest-intent next click. */}
              {relatedTrios.length > 0 && (
                <div className="mb-3 grid gap-3">
                  {relatedTrios.map((t) => (
                    <Link
                      key={t.slug}
                      href={hubLink(ctx, `/compare/${t.slug}`)}
                      className="group flex items-center gap-3 rounded-xl border border-[#0C4B75]/20 bg-[#0C4B75]/[0.03] px-4 py-3.5 transition-colors hover:border-[#0C4B75]/40 hover:bg-[#0C4B75]/[0.06]"
                    >
                      <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-[#191919]">
                        {t.names.map((name, ni) => (
                          <Fragment key={ni}>
                            {ni > 0 && <span className="text-[11px] font-extrabold text-gray-500">VS</span>}
                            <span>{name}</span>
                          </Fragment>
                        ))}
                      </div>
                      <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-[#0C4B75] group-hover:underline">
                        See all three
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedBattles.map(({ slug: relSlug, bp1, bp2 }) => (
                  <Link
                    key={relSlug}
                    href={hubLink(ctx, `/compare/${relSlug}`)}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                  >
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#191919]">
                      <span>{bp1.name}</span>
                      <span className="text-[11px] font-extrabold text-gray-500">VS</span>
                      <span>{bp2.name}</span>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1 text-[13px] font-semibold text-[#0C4B75] group-hover:underline">
                      See matchup
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-4 text-[13px]">
            <Link href={hubLink(ctx, `/reviews/${p1.id}`)} className="font-semibold text-[#0C4B75] hover:underline">
              Our {p1.name} Review
            </Link>
            <span className="text-gray-400">|</span>
            <Link href={hubLink(ctx, `/reviews/${p2.id}`)} className="font-semibold text-[#0C4B75] hover:underline">
              Our {p2.name} Review
            </Link>
            <span className="text-gray-400">|</span>
            <Link href={hubLink(ctx, "/")} className="font-semibold text-[#0C4B75] hover:underline">
              Full Provider Ranking
            </Link>
          </div>

          <SourcesMethodology
            ctx={ctx}
            providers={[{ id: p1.id, name: p1.name }, { id: p2.id, name: p2.name }]}
            headingLabel={`${p1.name} and ${p2.name}`}
          />
        </div>
      </div>

      {/* Mobile-only sticky CTA - both providers, appears after the hero */}
      <BattleStickyCta
        p1={{ id: p1.id, name: p1.name, affiliateUrl: p1.affiliateUrl }}
        p2={{ id: p2.id, name: p2.name, affiliateUrl: p2.affiliateUrl }}
        recommendedId={verdictWinner?.id}
      />

      {/* Mobile-only promo popup - the highest-priority featured provider that
          has a creative (e.g. Embody outranks TrimRx on an Embody-vs-TrimRx
          page, so TrimRx shows on all its other comparisons but not that one) */}
      {promoPopup && (
        <PromoPopup
          spec={promoPopup}
          href={(promoPopup.providerId === p1.id ? p1 : p2).affiliateUrl}
          position={promoPopup.providerId === p1.id ? 1 : 2}
        />
      )}
    </>
  );
}
