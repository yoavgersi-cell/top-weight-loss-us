import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, ArrowUpRight, Shield, Star, ArrowBigUp, ArrowBigDown, MessageCircle, ShieldCheck, UserRound, Users, Stethoscope, type LucideIcon } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { latestUpdate, VERTICALS, NOINDEX_WL_REVIEW_SLUGS, NOINDEX_WL_BATTLE_SLUGS, DEFAULT_ROBOTS } from "@/lib/config";
import { SLUG_ALIASES } from "@/lib/slug-aliases";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";
import {
  type SiteContext,
  canonicalUrl,
  hubLink,
} from "@/lib/site-context";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProviderCta } from "@/components/provider-cta";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { TrustpilotSummary } from "@/components/trustpilot-summary";
import { FeaturedReviews, ReviewInsights } from "@/components/review-insights";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import { LastUpdated } from "@/components/last-updated";
import { PromoPopup } from "@/components/promo-popup";
import { resolvePromoPopup } from "@/lib/promo-popups";
import { TrustDisclosure, MedicalSources } from "@/components/medical-sources";
import { SourcesMethodology } from "@/components/sources-methodology";
import { ProductCarousel } from "@/components/product-carousel";
import { notFound } from "next/navigation";
import { REDDIT_COMMUNITY_FEEDBACK as REVIEW_COMMUNITY_FEEDBACK, RedditMark } from "@/components/reddit-community";
import { YoutubeReviewSection } from "@/components/youtube-review";
import { ReadableProse, enhanceArticleHtml } from "@/components/prose";
import { ProviderAudit } from "@/components/provider-audit";
import { HowItWorksShowcase, HOW_IT_WORKS_SHOWCASE } from "@/components/how-it-works-showcase";
import { catalogPriceSnippet } from "@/lib/product-catalog";

// Per-provider SEO overrides for reviews with distinctive search demand.
// Code-controlled (not CMS-merged) so they reliably target trending queries -
// e.g. surging "embody reviews" and "embody glp1".
// `{prices}` in a description is filled at render time with the provider's
// lowest verified catalog prices (product-catalog.ts), so the snippet Bing
// prints almost verbatim always carries current numbers and never a hand-typed
// price that can go stale. Providers without a catalog entry get the token
// removed cleanly.
const REVIEW_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  embody: {
    // Bing weights the exact phrase "embody reviews", so the title opens with
    // it; "Weight Loss" stays for Google, where "embody weight loss reviews" is
    // the main query, and "Legit" covers the legit/scam long-tails.
    title: "embody Reviews 2026: Weight Loss Pricing, Results & Legitimacy",
    description:
      "embody reviews: {prices}, free 1-2 day shipping, LegitScript-certified with 503A pharmacies, and a full refund if you're not approved. Is embody legit?",
  },
  medvi: {
    // The review owns "medvi reviews / cost / verdict"; the is-medvi-legit
    // article owns the legitimacy query, so "legit" stays out of this title.
    title: "Medvi GLP-1 Reviews 2026: Price, Care Team & Our Verdict",
    description:
      "Medvi reviews: {prices}, one all-inclusive monthly price with video visits, a dietician and care coaching. What it costs, pros, cons and our verdict.",
  },
  sprout: {
    title: "Sprout Reviews 2026: GLP-1 Pricing, Wegovy & Is It Legit?",
    description:
      "Sprout reviews: {prices}, plus brand-name Wegovy on the menu and 2-day fulfillment. Is Sprout legit? Monthly cost, pros, cons and who it suits.",
  },
  altrx: {
    title: "altRx Reviews 2026: Legit? Pricing, Complaints & Verdict",
    description:
      "altRx reviews: {prices}, a brand-name Zepbound and Wegovy shelf, and Buy Now, Pay Later. Is altRx legit? Real costs, pros, cons and our verdict.",
  },
  ro: {
    // Title matches the generated shared-provider title byte-for-byte - this
    // entry exists only to put "GLP-1" in the description (desc-only pass).
    title: "ro Weight Loss Review 2026: Cost, Pros, Cons & Our Verdict",
    description:
      "ro weight loss review: a membership from $39 the first month, with brand-name Wegovy or Zepbound billed separately and insurance accepted. Verified costs, pros and cons.",
  },
  eden: {
    title: "Eden Reviews 2026: $99 Flat GLP-1 Pricing & Is It Legit?",
    description:
      "Eden reviews: {prices}, the same price every month at every dose, no membership fee and 24/7 human support. Is Eden legit? Trustpilot record and verdict.",
  },
  trimrx: {
    title: "TrimRx Reviews 2026 (Trim Rx): Legit? Pricing & Verdict",
    description:
      "TrimRx (Trim Rx) reviews: {prices}, month-to-month with no long-term contract and clinical support built in. Is TrimRx legit? Costs, pros and cons.",
  },
  shed: {
    title: "SHED Reviews 2026: Legit? Pricing, Results & Guarantee",
    description:
      "SHED reviews: {prices}, health coaching on every plan and a lose-5%-or-your-money-back guarantee. Is SHED legit and worth the price? Pros and cons.",
  },
  directmeds: {
    title: "DirectMeds Reviews 2026: Legit? Flat Pricing & Verdict",
    description:
      "DirectMeds reviews: {prices} at every dose, as injections or needle-free drops, with free 1-2 day shipping. Is DirectMeds legit? Costs and verdict.",
  },
  wellmedr: {
    // Rebranded Oct 2026; the old name stays in the title so searches for
    // "wellmedr reviews" still match this page.
    title: "welludr (formerly wellmedr) Reviews 2026: Legit? Price & Verdict",
    description:
      "welludr (formerly wellmedr) reviews: {prices}, 1M+ patients served and a weight-loss warranty. Is welludr legit? Real costs, pros, cons and our verdict.",
  },
  healthrx: {
    title: "HealthRx Reviews 2026: Legit? The $99/mo GLP-1 Plan Explained",
    description:
      "HealthRx reviews: {prices} (semaglutide on a 12-month prepaid plan), overnight cold-chain shipping and LegitScript certification. Is HealthRx legit?",
  },
};

// "Is [brand] legit?" trust block - targets the high-intent "is X legit" query
// cluster inside the existing review page (no separate page → no cannibalization).
// Only defined for providers where the legitimacy signals are genuinely verifiable;
// each signal is grounded in that provider's real credentials/practices.
const REVIEW_LEGIT: Record<string, { verdict: string; signals: string[] }> = {
  embody: {
    verdict:
      "Yes. embody is a real, US-based telehealth weight-loss company with LegitScript certification. State-licensed doctors, supervised by embody's own medical director, write the prescriptions, and US-based, state-licensed 503A compounding pharmacies fill them.",
    signals: [
      "Certified by LegitScript",
      "Medication filled by US-based, state-licensed 503A compounding pharmacies",
      "State-licensed doctors backed by a medical director and nursing team",
      "Published flat prices: $69/mo semaglutide, $119/mo tirzepatide",
      "Money back in full if a provider doesn't approve you",
    ],
  },
  altrx: {
    verdict:
      "Yes. altRx is a genuine self-pay telehealth service: a licensed physician, PA or nurse practitioner reviews your assessment before any prescription is written, and a licensed pharmacy fills the order.",
    signals: [
      "Every assessment reviewed by a licensed physician, PA or NP",
      "Orders filled by licensed pharmacies",
      "Flat published pricing with no hidden fees and no insurance needed",
      "Pause or cancel anytime, no long-term contract",
      "Buy Now, Pay Later at checkout",
    ],
  },
  trimrx: {
    verdict:
      "Yes. TrimRx is a genuine telehealth GLP-1 provider. Compounded semaglutide and tirzepatide are prescribed only after a medical review, licensed clinicians guide you through treatment, and prices are published up front with no long-term contract.",
    signals: [
      "Licensed clinicians guide you from start to finish",
      "Compounded semaglutide and tirzepatide, prescribed after a medical review",
      "Published, competitive prices with discounts on multi-month plans",
      "No long-term contract",
      "Fully online, no clinic visit required",
    ],
  },
  medvi: {
    verdict:
      "Yes. Medvi is a real medical weight-loss platform. Licensed providers oversee every prescription and monitor you on a regular schedule, and one all-inclusive price covers the program with no surprise charges.",
    signals: [
      "Licensed providers oversee every prescription",
      "Scheduled monitoring and provider check-ins",
      "One all-inclusive price, no surprise charges",
      "Strong ratings for personal service on Trustpilot",
      "Fully online, no clinic visit needed",
    ],
  },
  wellmedr: {
    verdict:
      "Yes. welludr is a genuine telehealth platform. After a medical review, board-certified specialists build your plan, and US state-licensed pharmacies prepare the medication under FDA compounding standards.",
    signals: [
      "Plans tailored by board-certified specialists",
      "Medication from US state-licensed pharmacies under FDA compounding standards",
      "Full medical intake reviewed before anything is prescribed",
      "Fully online, with provider messaging anytime",
      "Plain, unbranded packaging",
    ],
  },
  healthrx: {
    verdict:
      "Yes. HealthRx is a real GLP-1 telehealth program with LegitScript certification (cert. 50087439). An independent US-licensed clinician reviews each request before treatment goes ahead, licensed 503A pharmacies prepare the medication, and orders ship overnight in temperature-controlled, lot-tracked packaging.",
    signals: [
      "LegitScript certification number 50087439",
      "Each request reviewed by an independent US-licensed clinician; approval is never automatic",
      "Filled by licensed 503A pharmacies",
      "Overnight cold-chain delivery, lot-tracked to your door",
      "Prepaid pricing shown up front: $99/mo semaglutide ($1,188 at checkout), no hidden fees",
    ],
  },
};

// Extra code-controlled FAQs appended to specific reviews (and their FAQPage
// schema) - high-intent questions grounded in each provider's real published
// terms. Side-effect answers stay at medication level and link the full guide.
const REVIEW_EXTRA_FAQS: Record<string, { question: string; answer: string }[]> = {
  embody: [
    {
      question: "How much does embody cost per month?",
      answer:
        "embody charges a flat $69/month for compounded semaglutide and $119/month for compounded tirzepatide (regular prices $79 and $129). That price covers the medication, the doctor review, supplies and free 1-2 day shipping, with no membership fee or hidden costs. If a provider doesn't approve your prescription, embody refunds you in full.",
    },
    {
      question: "How long does embody take to ship?",
      answer:
        "embody ships free in 1-2 days in temperature-controlled packaging that is tracked and insured, and orders placed before 2pm CT go out the same day. The intake takes about 5 minutes, and a doctor usually reviews it within 24 hours.",
    },
    {
      question: "Can I cancel embody at any time?",
      answer:
        "Yes. embody plans are month-to-month with no long-term contract and no membership fee, so you can cancel whenever you choose. If a provider declines your prescription at the start, embody issues a full refund.",
    },
    {
      question: "Are embody's medications FDA-approved?",
      answer:
        "No. embody prescribes compounded semaglutide and tirzepatide, which are not FDA-approved brand-name drugs. US-based, state-licensed 503A compounding pharmacies prepare them with the same active ingredients found in the approved brands (semaglutide in Ozempic and Wegovy, tirzepatide in Mounjaro and Zepbound). Compounded medication is legal when a licensed provider prescribes it, and embody itself is LegitScript-certified.",
    },
    {
      question: "What side effects can embody's GLP-1 medications cause?",
      answer:
        "embody's compounded semaglutide and tirzepatide carry the usual GLP-1 side effects, mostly digestive: nausea, constipation and diarrhea. These tend to show up in the first weeks and as the dose goes up, and they usually ease as your body adjusts. Your prescriber screens your history for contraindications, embody's nursing team is on hand during treatment, and our semaglutide side-effects guide covers when to seek care.",
    },
  ],
  altrx: [
    {
      question: "How long does altRx shipping take?",
      answer:
        "altRx shipping is free and takes about 5-7 days. That is slower than 1-2 day providers such as embody and DirectMeds; altRx makes up for it with lower prices ($89/month semaglutide, $149/month tirzepatide) and a brand-name shelf.",
    },
    {
      question: "Does altRx sell brand-name GLP-1 medication?",
      answer:
        "Yes. Next to compounded semaglutide ($89/month) and tirzepatide ($149/month), altRx publishes monthly prices for brand-name Ozempic ($1,149), Zepbound ($1,249) and Wegovy ($1,579). Few providers in our ranking offer a real brand-name shelf.",
    },
    {
      question: "Can I pause or cancel altRx?",
      answer:
        "Yes. altRx is self-pay with no long-term contract, so you can pause or cancel whenever you like. Buy Now, Pay Later is also available if you prefer to split the monthly cost.",
    },
  ],
  trimrx: [
    {
      question: "Does TrimRx lock you into a contract?",
      answer:
        "No. TrimRx plans run month to month with no long-term commitment. Semaglutide costs $149 at every dose and compounded tirzepatide costs $259/month, and both include custom dosing and unlimited provider check-ins.",
    },
    {
      question: "Which medications does TrimRx prescribe?",
      answer:
        "TrimRx prescribes compounded semaglutide (a GLP-1) and compounded tirzepatide (a GLP-1 plus GIP), both as weekly injections dosed by your provider. It has no brand-name or oral option; for those, look at altRx (brand-name shelf) or Medvi (dissolving tablets).",
    },
    {
      question: "How quickly does TrimRx deliver?",
      answer:
        "TrimRx delivery is free and tracked, and it often arrives the day after your prescription is issued. You start with a free 2-minute online assessment, and the consultation is free too.",
    },
  ],
  shed: [
    {
      question: "How does SHED's money-back guarantee work?",
      answer:
        "SHED says that if you lose less than 5% of your body weight in 120 days on its program, you get your money back. It is the most concrete guarantee among the providers we rank. Read SHED's site for the current terms and conditions.",
    },
    {
      question: "Is coaching included with SHED?",
      answer:
        "Yes. Every SHED plan includes health coaching, along with the provider visit and home delivery, rather than charging for it as an add-on. On Trustpilot (4.6 across 1,134 reviews), reviewers most often name the coaches and onboarding staff.",
    },
    {
      question: "Can I use HSA or FSA funds for SHED?",
      answer:
        "Yes. SHED plans are HSA/FSA approved. Compounded semaglutide starts at $199/month and tirzepatide at $299/month, and the first month is 20% off.",
    },
  ],
  wellmedr: [
    {
      question: "Does welludr charge more at higher doses?",
      answer:
        "welludr has advertised one price at every dose. In its Pre-Black Friday sale (from October 28, 2026), compounded semaglutide is from $41/month and tirzepatide from $71/month; check the plan terms, including any dose conditions, at checkout.",
    },
    {
      question: "How long does welludr shipping take?",
      answer:
        "welludr's standard delivery takes about 3-5 business days, and refills ship every 4 weeks. That is slower than 1-2 day providers like embody and DirectMeds, which is the trade-off for the lowest compounded prices in our ranking.",
    },
    {
      question: "Can I cancel welludr whenever I want?",
      answer:
        "Yes. You can cancel or change your welludr plan at any time. The headline price, from $41/month, is part of its Pre-Black Friday sale (from October 28, 2026), so check the plan terms at checkout, and the program comes with welludr's weight-loss warranty.",
    },
  ],
  medvi: [
    {
      question: "What is included in Medvi's monthly price?",
      answer:
        "Medvi's single price covers provider visits, the GLP-1 medication, free shipping, and free dietician and care coaching. There is no membership fee and no hidden charge, and plans are HSA/FSA approved.",
    },
    {
      question: "Is there a needle-free Medvi option?",
      answer:
        "Yes. Medvi sells a daily oral dissolving GLP-1 tablet for $249/month, one of the few needle-free GLP-1 formats among the providers we rank. Weekly semaglutide injections currently start at $99/month (regular price $199).",
    },
    {
      question: "Does Medvi require insurance?",
      answer:
        "No. Medvi is cash-pay at one flat, all-inclusive price, with no insurance or prior authorization needed. You can pay with pre-tax HSA/FSA funds because plans are HSA/FSA approved.",
    },
  ],
  directmeds: [
    {
      question: "Is DirectMeds a membership program?",
      answer:
        "No. DirectMeds has no monthly membership and no hidden fees. You pay a flat $147/month at every dose, the telemedicine visit and prescription are included, and you can cancel at any time.",
    },
    {
      question: "How do DirectMeds' sublingual drops work?",
      answer:
        "The drops are DirectMeds' needle-free option: compounded semaglutide or tirzepatide taken daily as liquid drops under the tongue instead of a weekly shot. They cost the same flat $147/month as the injections.",
    },
    {
      question: "How long does DirectMeds take to ship?",
      answer:
        "DirectMeds ships free and delivers in 1-2 days after your prescription is issued, which matches embody for the fastest delivery in our ranking.",
    },
  ],
  sprout: [
    {
      question: "What does Sprout cost each month?",
      answer:
        "Sprout's compounded semaglutide starts at $149/month and compounded tirzepatide at $199/month, with a standing $200 off the first month. Brand-name Wegovy starts at $1,799/month. Check Sprout's site for current plan terms and the first-month offer.",
    },
    {
      question: "Can I get brand-name Wegovy through Sprout?",
      answer:
        "Yes. Besides compounded semaglutide (from $149/month) and compounded tirzepatide (from $199/month), Sprout lists brand-name Wegovy from $1,799/month. Few mid-priced providers keep a branded option on the menu.",
    },
    {
      question: "How fast does Sprout fill prescriptions?",
      answer:
        "Sprout ships prescriptions within 2 days of approval, one of the quicker fulfillment windows in our ranking. Everything starts with an online intake that a licensed provider reviews.",
    },
  ],
  healthrx: [
    {
      question: "Is HealthRx paid for a year in advance?",
      answer:
        "Yes, for the headline price. HealthRx's $99/month semaglutide rate is a 12-month prepaid plan with $1,188 due at checkout, and tirzepatide plans start at $179/month. The 60-second assessment is free with nothing to pay up front, and approval is never automatic.",
    },
    {
      question: "Does the HealthRx price rise as the dose goes up?",
      answer:
        "No. HealthRx's all-in price covers dose adjustments, so the monthly cost stays the same as your dose is titrated up. It also includes the clinician consult, shipping and regular care-team check-ins.",
    },
    {
      question: "How does HealthRx ship medication?",
      answer:
        "HealthRx ships overnight on every plan at no charge, in temperature-controlled, lot-tracked cold-chain packaging sent from a licensed 503A pharmacy.",
    },
  ],
};

// Operator-verified standing promos, shown as a prominent banner under the hero
// on the provider's review page. Segments flagged bold render emphasized.
const REVIEW_PROMOS: Record<string, { segments: { text: string; bold?: boolean }[] }> = {
  wellmedr: {
    segments: [
      { text: "Get " },
      { text: "$200 off", bold: true },
      { text: " every month, or semaglutide from " },
      { text: "$41/mo", bold: true },
      { text: " in the Pre-Black Friday sale (from October 28, 2026)." },
    ],
  },
};

// Per-provider trust strip, shown as a light band under the hero on the
// provider's review page. Operator-supplied brand claims - keyed by provider.
const REVIEW_TRUST_STRIP: Record<string, { icon: LucideIcon; label: string }[]> = {
  altrx: [
    { icon: ShieldCheck, label: "State-licensed 503A pharmacies" },
    { icon: UserRound, label: "Treatment tailored to you" },
    { icon: Users, label: "125k+ Americans served" },
    { icon: Stethoscope, label: "One-on-one medical support" },
  ],
};


// Providers that changed their brand name. The old name is shown under the H1
// and declared as the Organization's alternateName, so returning readers and
// searches for the old name still land on the right page.
const FORMER_NAMES: Record<string, string> = {
  wellmedr: "wellmedr", // welludr since Oct 2026; id and slug unchanged
};

function fillPrices(text: string, prices: string): string {
  if (!text.includes("{prices}")) return text;
  if (prices) return text.replace("{prices}", prices);
  return text.replace(/\{prices\}(,? ?| ?\([^)]*\) ?)/, "").replace(/:\s+,/, ":").replace(/\s{2,}/g, " ");
}

export async function reviewMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  const config = await getConfig(ctx.vertical);
  const review = (config.reviews ?? []).find((r) => r.slug === slug);
  if (!review) return { title: "Review Not Found" };

  const provider = config.providers.find((p) => p.id === review.providerId);
  if (!provider) return { title: "Review Not Found" };

  // Overrides are written against weight-loss offers (GLP-1 pricing etc.).
  const override = ctx.vertical === "weight-loss" ? REVIEW_SEO_OVERRIDES[slug] : undefined;
  // These providers keep "Weight Loss" in their generated title (ro's override
  // matches it byte-for-byte), so their titles stay as they were.
  const SHARED_REVIEW_PROVIDER_IDS = ["ro", "shed", "directmeds"];
  const verticalQualifier = SHARED_REVIEW_PROVIDER_IDS.includes(provider.id)
    ? ` ${VERTICALS.find((v) => v.id === ctx.vertical)?.name ?? ""}`.trimEnd() + " "
    : " ";
  const pageTitle =
    override?.title ?? `${provider.name}${verticalQualifier}Review 2026: Cost, Pros, Cons & Our Verdict`;
  const prices = ctx.vertical === "weight-loss" ? catalogPriceSnippet(provider.id) : "";
  const pageDescription = fillPrices(override?.description ?? review.shortSummary, prices);

  // Operator policy (Aug 2026): provider reviews are indexable by default - the
  // goal is impressions across every vertical first. Exception (Sep 2026): thin
  // filler/unmonetized-brand reviews on weight-loss are noindex,follow so crawl
  // budget on the young hub concentrates on the money pages (see
  // NOINDEX_WL_REVIEW_SLUGS); "follow" keeps link equity flowing.
  const url = canonicalUrl(ctx, `/reviews/${slug}`);
  const isThinNoindex = ctx.vertical === "weight-loss" && NOINDEX_WL_REVIEW_SLUGS.has(slug);

  return {
    title: pageTitle,
    description: pageDescription,
    robots: ctx.noindex
      ? { index: false, follow: false }
      : isThinNoindex
        ? { index: false, follow: true }
        : DEFAULT_ROBOTS,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      type: "article",
      modifiedTime: latestUpdate(review.updatedAt),
    },
  };
}

export async function ReviewPageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const review = (config.reviews ?? []).find((r) => r.slug === slug);
  if (!review) return notFound();

  const provider = config.providers.find((p) => p.id === review.providerId);
  if (!provider) return notFound();

  const legit = REVIEW_LEGIT[slug];

  // Site's own editorial rating for this provider (same scoring shown on the
  // homepage), keyed off its ranking position. Surfaced visibly on the page.
  // Marked up as an editorial Review (see editorialReviewSchema); Trustpilot's
  // aggregate is never marked up as AggregateRating.
  const rankIndex = config.ranking.providerOrder.indexOf(provider.id);
  const editorial =
    rankIndex >= 0
      ? config.ranking.positions[rankIndex] ??
        config.ranking.positions[config.ranking.positions.length - 1]
      : null;
  const editorialStars = editorial ? editorial.score / 2 : 0;
  const editorialFullStars = Math.floor(editorialStars);
  const editorialHasHalf = editorialStars % 1 >= 0.5;

  // Promo popup for this provider, if it has a registered creative.
  const promoPopup = resolvePromoPopup([provider]);

  // Operator-verified promo banner, surfaced prominently under the hero on the
  // provider's own review page. Bold segments render emphasized. Keyed by
  // provider id so only providers with a confirmed standing offer show one.
  const reviewPromo = REVIEW_PROMOS[provider.id];
  const trustStrip = REVIEW_TRUST_STRIP[provider.id];
  const showcase = HOW_IT_WORKS_SHOWCASE[provider.id];

  // Note: we intentionally do NOT emit an AggregateOffer/price in the schema.
  // A structured price can surface in the SERP rich result and goes stale the
  // moment a provider changes pricing, so on-page pricing tables stay the single
  // source of truth and the search snippet carries no price.

  // No AggregateRating: the Trustpilot score is third-party data and stays
  // visible text only. Our own score is marked up as an editorial Review below.

  // Article schema (no rating, no price) - the same shape the article and
  // battle templates emit. It gives the page a machine-readable headline,
  // author, publisher and - most importantly for freshness signals - a
  // dateModified that tracks the review's own updatedAt. `about` names the
  // reviewed provider so the entity relationship is explicit for LLM/AI
  // answer engines without requesting review stars.
  const reviewUpdatedAt = latestUpdate(review.updatedAt);
  const author = config.experts?.[0];
  const reviewArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${provider.name} Review 2026: Cost, Pros, Cons & Our Verdict`,
    description: review.shortSummary,
    dateModified: reviewUpdatedAt,
    ...pageReviewSchema(`${ctx.prefix}/reviews/${slug}`),
    // The research team is a group, so it is an Organization, not a Person.
    author: {
      "@type": "Organization",
      name: author ? author.name.replace(/TopWeightLoss/gi, ctx.brandTeam.replace(/\s+Team$/i, "")) : ctx.brandTeam,
      url: canonicalUrl(ctx, "/about"),
    },
    publisher: {
      "@type": "Organization",
      name: ctx.brandName,
      url: ctx.origin,
      logo: { "@type": "ImageObject", url: `${ctx.origin}/logo.png` },
    },
    about: {
      "@type": "Organization",
      name: provider.name,
      ...(FORMER_NAMES[provider.id] && { alternateName: FORMER_NAMES[provider.id] }),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl(ctx, `/reviews/${slug}`) },
  };

  // Our own editorial review of the provider: the score shown in the hero, the
  // pros and cons listed on the page, and the verdict. This is a critic review
  // by an independent site, which review-snippet guidelines allow. Trustpilot's
  // aggregate is deliberately NOT marked up as AggregateRating: Google's rules
  // say ratings collected on other websites must not be aggregated in markup,
  // so the Trustpilot figures stay visible, attributed text only.
  const editorialReviewSchema = editorial
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        name: `${provider.name} review`,
        url: canonicalUrl(ctx, `/reviews/${slug}`),
        datePublished: reviewUpdatedAt,
        itemReviewed: {
          "@type": "Organization",
          name: provider.name,
          ...(FORMER_NAMES[provider.id] && { alternateName: FORMER_NAMES[provider.id] }),
        },
        author: { "@type": "Organization", name: ctx.brandName, url: ctx.origin },
        publisher: { "@type": "Organization", name: ctx.brandName, url: ctx.origin },
        reviewRating: { "@type": "Rating", ratingValue: editorial.score, bestRating: 10, worstRating: 0 },
        reviewBody: review.finalVerdict || review.shortSummary,
        ...(review.pros.length > 0 && {
          positiveNotes: {
            "@type": "ItemList",
            itemListElement: review.pros.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
          },
        }),
        ...(review.cons.length > 0 && {
          negativeNotes: {
            "@type": "ItemList",
            itemListElement: review.cons.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
          },
        }),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
      { "@type": "ListItem", position: 2, name: "Reviews", item: canonicalUrl(ctx, "/reviews") },
      { "@type": "ListItem", position: 3, name: `${provider.name} Review`, item: canonicalUrl(ctx, `/reviews/${slug}`) },
    ],
  };

  // FAQ - real, query-shaped questions answered entirely from this review's
  // own researched content (pricing, treatments, best-for, verdict). Powers
  // both the visible FAQ section and the FAQPage schema (rich results / PAA).
  const reviewFaqs = [
    { question: `Is ${provider.name} a legitimate company?`, answer: legit?.verdict ?? review.reviewIntro },
    { question: `What does ${provider.name} cost?`, answer: review.pricingSummary },
    review.treatmentOptions?.length
      ? { question: `Which weight-loss treatments can you get from ${provider.name}?`, answer: `${provider.name} currently offers: ${review.treatmentOptions.join(", ")}.` }
      : null,
    review.bestFor?.length
      ? { question: `Who should choose ${provider.name}?`, answer: `${provider.name} is a strong fit for: ${review.bestFor.join("; ")}.` }
      : null,
    { question: `Is ${provider.name} worth the money?`, answer: review.finalVerdict },
    // Extra FAQs are all researched against weight-loss offers.
    ...(ctx.vertical === "weight-loss" ? REVIEW_EXTRA_FAQS[slug] ?? [] : []),
  ].filter((f): f is { question: string; answer: string } => !!f && !!f.answer);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: reviewFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // Related comparisons: one per opponent, canonical slugs only, opponents
  // that are still in the ranking, indexable pages only, capped. The raw
  // battle list carries aliased duplicates (altrx-vs-embody and
  // embody-vs-altrx) and retired matchups (Noom), which produced a Related
  // list with repeated and dead entries (operator screenshot, Oct 2026).
  const ranked = new Set(config.ranking.providerOrder);
  const seenOpponent = new Set<string>();
  const relatedBattles = (config.battles ?? [])
    .filter((b) => b.provider1Id === provider.id || b.provider2Id === provider.id)
    .filter((b) => !(b.slug in SLUG_ALIASES))
    .filter((b) => !(ctx.vertical === "weight-loss" && NOINDEX_WL_BATTLE_SLUGS.has(b.slug)))
    .filter((b) => {
      const other = b.provider1Id === provider.id ? b.provider2Id : b.provider1Id;
      if (!ranked.has(other) || seenOpponent.has(other)) return false;
      seenOpponent.add(other);
      return true;
    })
    .slice(0, 6);

  // This provider's own question cluster (is-X-legit / X-cost / X-alternatives)
  // - the highest-intent internal links a review can carry. Rendered only for
  // cluster articles that actually exist in the config.
  const clusterSlugs = [
    { slug: `is-${provider.id}-legit`, label: `Is ${provider.name} legit? Full check` },
    { slug: `${provider.id}-cost`, label: `${provider.name} cost breakdown` },
    { slug: `${provider.id}-alternatives`, label: `Top alternatives to ${provider.name}` },
    { slug: `${provider.id}-tirzepatide-cost`, label: `${provider.name} tirzepatide cost` },
    { slug: `${provider.id}-tirzepatide-review`, label: `${provider.name} tirzepatide review` },
  ].filter((c) => (config.articles ?? []).some((a) => a.slug === c.slug));

  // Three-way comparisons featuring this provider.
  const relatedTrios = THREE_WAY_COMPARISONS.filter((t) => t.providerIds.includes(provider.id));

  // Related articles: actually related, not just the first three in the array.
  // Prefer articles that mention this provider (excluding its own cluster,
  // which has a dedicated box below), then fill with the newest guides.
  const clusterSet = new Set(clusterSlugs.map((c) => c.slug));
  const mentions = (a: { slug: string; title: string }) =>
    a.slug.includes(provider.id) || a.title.toLowerCase().includes(provider.name.toLowerCase());
  const nonCluster = (config.articles ?? []).filter((a) => !clusterSet.has(a.slug));
  const relatedArticles = [
    ...nonCluster.filter(mentions),
    ...nonCluster
      .filter((a) => !mentions(a))
      .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")),
  ].slice(0, 3);

  // The evidence-led seven-provider comparison (Oct 12, 2026) covers these
  // weight-loss partners; link it from each of their reviews.
  const COMPARED_PROVIDER_IDS = new Set(["wellmedr", "embody", "eden", "directmeds", "medvi", "trimrx", "altrx", "ro"]);
  const showComparisonLink = ctx.vertical === "weight-loss" && COMPARED_PROVIDER_IDS.has(provider.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {editorialReviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(editorialReviewSchema) }} />
      )}

      {/* Hero header */}
      <div className="border-b border-gray-200 bg-white">
        {/* Phone-tight masthead (Oct 2026): less padding above the breadcrumbs
            and between the rows; desktop spacing unchanged. */}
        <div className="mx-auto max-w-[1000px] px-4 pb-5 pt-4 sm:px-6 sm:pb-8 sm:pt-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: hubLink(ctx, "/") },
              { label: "Reviews", href: hubLink(ctx, "/reviews") },
              { label: `${provider.name} Review` },
            ]}
          />

          <div className="mt-2 flex flex-col gap-4 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="flex items-center gap-3.5 sm:gap-5">
              <div className="flex h-[44px] w-[96px] shrink-0 items-center sm:h-[50px] sm:w-[130px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={provider.logo} alt={`${provider.name} logo`} width={130} height={50} className="max-h-full max-w-full object-contain object-left" />
              </div>
              <div className="min-w-0">
                <h1 className="text-[22px] font-bold text-[#191919] sm:text-[28px]">
                  {provider.name} Reviews
                </h1>
                {FORMER_NAMES[provider.id] && (
                  <p className="mt-0.5 text-[13px] text-gray-500">Previously known as {FORMER_NAMES[provider.id]}</p>
                )}
                <p className="mt-0.5 text-[14px] text-gray-700">
                  {provider.tagline}
                </p>
                <LastUpdated date={reviewUpdatedAt} className="mt-1" />
                {editorial && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < editorialFullStars
                              ? "fill-[#FDB515] text-[#FDB515]"
                              : i === editorialFullStars && editorialHasHalf
                                ? "fill-[#FDB515]/50 text-[#FDB515]"
                                : "fill-gray-300 text-gray-300"
                          )}
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span className="text-[14px] font-bold text-[#191919]">
                      {editorial.score}/10
                    </span>
                    <span className="text-[13px] text-gray-500">
                      {editorial.label} - Top Weight Loss score
                    </span>
                  </div>
                )}
                {/* Desktop: byline inside the title column. Mobile renders it
                    full-width below the header row instead (see sm:hidden). */}
                <div className="hidden sm:block">
                  <MedicalReviewBar path={`${ctx.prefix}/reviews/${slug}`} className="mt-3 max-w-[760px]" compact />
                </div>
              </div>
            </div>
            <div className="sm:hidden">
              <MedicalReviewBar path={`${ctx.prefix}/reviews/${slug}`} />
            </div>
            <ProviderCta
              href={provider.affiliateUrl}
              providerName={provider.name}
              providerSlug={provider.id}
              pageType="review"
              sourceFlow="provider_review"
              className="flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61] sm:shrink-0"
            >
              See {provider.name} plans
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </ProviderCta>
          </div>
          <TrustDisclosure disclaimerHref={"/disclaimer"} />
        </div>
      </div>

      {/* Operator-verified promo banner - emphasized directly under the hero */}
      {reviewPromo && (
        <div className="border-b border-[#EADFC6] bg-[#FBF6EC]">
          <div className="mx-auto max-w-[1000px] px-4 py-4 sm:px-6 sm:py-5">
            <p className="text-center text-[17px] font-semibold leading-snug text-[#1F3345] sm:text-[21px]">
              {reviewPromo.segments.map((s, i) =>
                s.bold ? (
                  <strong key={i} className="font-extrabold text-[#0C4B75]">{s.text}</strong>
                ) : (
                  <span key={i}>{s.text}</span>
                )
              )}
            </p>
          </div>
        </div>
      )}

      {/* Per-provider trust strip - operator-supplied brand claims as free-
          floating icon + label items under the hero (no box, no background) */}
      {trustStrip && (
        <div className="mx-auto max-w-[1000px] px-4 pt-6 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:flex-nowrap sm:justify-between sm:gap-x-4">
            {trustStrip.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 whitespace-nowrap">
                <Icon className="h-[18px] w-[18px] shrink-0 text-[#0C4B75]" strokeWidth={2} />
                <span className="text-[13px] font-semibold text-[#12355B] sm:text-[13px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6">
        {/* The Bottom Line - the verdict up top, so the answer to "is it worth
            it" doesn't hide at the bottom of the page. */}
        {review.finalVerdict && (
          <div className="mb-8 rounded-2xl border border-[#0C4B75]/20 bg-white p-5 shadow-sm sm:p-6">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">Our verdict in brief</p>
            <ReadableProse text={review.finalVerdict} paragraphClassName="text-[15px] leading-[1.8] text-gray-800" />
          </div>
        )}

        {/* This provider's products, shopping-style (weight-loss catalog only) */}
        {ctx.vertical === "weight-loss" && (
          <div className="mb-8">
            <ProductCarousel
              providers={config.providers}
              title={`${provider.name} plans and current prices`}
              subtitle="Each card shows a published price with its conditions and links straight to the provider."
              onlyProviderIds={[provider.id]}
              pageType="review"
              pageUrl={canonicalUrl(ctx, `/reviews/${slug}`)}
            />
          </div>
        )}

        {/* Intro */}
        <div className="mb-8">
          <ReadableProse text={review.reviewIntro} paragraphClassName="text-[16px] leading-[1.8] text-gray-600" />
        </div>

        {/* Is [brand] legit? - trust block for the "is X legit" query cluster */}
        {legit && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 bg-emerald-50/50 px-6 py-4">
              <Shield className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <h2 className="text-[18px] font-bold text-[#191919]">
                Is {provider.name} legit? What we checked
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-4 text-[15px] leading-[1.75] text-gray-600">
                {legit.verdict}
              </p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {legit.signals.map((signal) => (
                  <li key={signal} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    {signal}
                  </li>
                ))}
                {provider.trustpilotRating && provider.trustpilotReviewCount && (
                  <li className="flex items-start gap-2.5 text-[14px] text-gray-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    {provider.trustpilotRating}/5 average from {provider.trustpilotReviewCount} Trustpilot reviews
                  </li>
                )}
              </ul>
              <p className="mt-4 text-[12px] leading-relaxed text-gray-400">
                By &ldquo;legitimate&rdquo; we mean a real telehealth business working with licensed
                clinicians and pharmacies. It says nothing about the results you will get. Compounded
                medications are not FDA-approved brand-name drugs. Check eligibility and current terms
                with the provider before you start.
              </p>
            </div>
          </div>
        )}

        {/* Trustpilot Reviews - social proof right after the legitimacy block,
            before the feature/pricing detail (moved up, operator request Sept 20). */}
        {/* In-depth editorial deep-dive (long-form review sections, rendered when present) */}
        {review.sections && review.sections.length > 0 && (
          <article className="mb-8 space-y-8 border-t border-gray-200 pt-8">
            {review.sections.map((section, i) => (
              <section key={i}>
                <h2 className="mb-3 text-[20px] font-bold text-[#191919]">{section.heading}</h2>
                <div
                  className="article-body text-[16px] leading-[1.75] text-gray-800 [&_a]:text-[#0C4B75] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#093d61]"
                  dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(section.body) }}
                />
              </section>
            ))}
          </article>
        )}

        {(provider.trustpilotReviews?.length ?? 0) > 0 && (
          <>
            <ReviewInsights
              providerId={provider.id}
              providerName={provider.name}
              reviews={provider.trustpilotReviews!}
              rating={provider.trustpilotRating}
              reviewCount={provider.trustpilotReviewCount}
            />
            <FeaturedReviews providerId={provider.id} providerName={provider.name} reviews={provider.trustpilotReviews!} />
          </>
        )}

        {(provider.trustpilotReviews?.length ?? 0) > 0 && (
          <div className="mb-6 space-y-3">
            <TrustpilotSummary
              providerName={provider.name}
              reviews={provider.trustpilotReviews!}
              rating={provider.trustpilotRating}
              reviewCount={provider.trustpilotReviewCount}
            />
            <TrustpilotCarousel
              providerName={provider.name}
              providerLogo={provider.logo}
              reviews={provider.trustpilotReviews!}
              rating={provider.trustpilotRating}
              reviewCount={provider.trustpilotReviewCount}
            />
          </div>
        )}

        {/* Key Features + Pricing side by side on desktop */}
        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <Section title={`What ${provider.name} includes`}>
            <ul className="space-y-2.5">
              {review.keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>
          </Section>

          <Section title={`${provider.name} treatment options`}>
            <ul className="space-y-2.5">
              {review.treatmentOptions.map((option) => (
                <li key={option} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />
                  {option}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Pricing */}
        <Section title={`How much does ${provider.name} cost?`}>
          {review.pricingPlans && review.pricingPlans.length > 0 && (
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              {review.pricingPlans.map((plan) => (
                <div key={plan.name} className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-[15px] font-bold text-[#191919]">{plan.name}</h4>
                    {plan.cadence && (
                      <span className="rounded-full bg-[#0C4B75]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#0C4B75]">
                        {plan.cadence}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[13px] text-gray-500">{plan.medication}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-[28px] font-extrabold leading-none text-[#191919]">{plan.price}</span>
                    {plan.unit && <span className="text-[14px] font-semibold text-gray-500">{plan.unit}</span>}
                    {plan.regularPrice && (
                      <span className="text-[15px] font-medium text-gray-400 line-through">{plan.regularPrice}</span>
                    )}
                  </div>
                  {plan.regularPrice && (
                    <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      {plan.saleEnds ? `Offer ends ${plan.saleEnds}` : "Discounted price"}
                    </span>
                  )}
                  {plan.highlights && plan.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {plan.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] text-gray-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          <ReadableProse text={review.pricingSummary} paragraphClassName="text-[15px] leading-[1.75] text-gray-600" />
        </Section>

        {/* The Top Weight Loss audit - verified-facts card. Registry-gated:
            providers whose data isn't fully verified render nothing. */}
        <ProviderAudit providerId={provider.id} providerName={provider.name} vertical={ctx.vertical} />

        {/* How it works - visual showcase from the provider's own creative
            when one is registered (altRx today); the plain numbered list
            otherwise. Never both. */}
        {showcase && (
          <HowItWorksShowcase
            spec={showcase}
            providerName={provider.name}
            providerId={provider.id}
            affiliateUrl={provider.affiliateUrl}
          />
        )}
        {!showcase && review.howItWorks && review.howItWorks.length > 0 && (
          <Section title={`How does ${provider.name} work?`}>
            <ol className="space-y-4">
              {review.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0C4B75] text-[13px] font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    {step.timing && (
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#0C4B75]">
                        {step.timing}
                      </span>
                    )}
                    <p className="text-[15px] font-bold text-[#191919]">{step.title}</p>
                    {step.detail && (
                      <p className="mt-0.5 text-[14px] leading-[1.65] text-gray-600">{step.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Pros & Cons */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="grid sm:grid-cols-2">
            <div className="p-6 sm:border-r sm:border-gray-100">
              <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-emerald-700">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                </div>
                What we like
              </h3>
              <ul className="space-y-2.5">
                {review.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-100 p-6 sm:border-t-0">
              <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-red-600">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                  <X className="h-3.5 w-3.5 text-red-500" strokeWidth={2.5} />
                </div>
                What to watch for
              </h3>
              <ul className="space-y-2.5">
                {review.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={2} />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mb-6 rounded-xl border border-[#0C4B75]/10 bg-[#0C4B75]/[0.03] p-5 text-center sm:p-6">
          <p className="mb-3 text-[16px] font-bold text-[#191919]">
            Thinking about {provider.name}?
          </p>
          <p className="mb-4 text-[13px] text-gray-500">
            See whether you qualify and check today&rsquo;s prices on the {provider.name} site.
          </p>
          <ProviderCta
            href={provider.affiliateUrl}
            providerName={provider.name}
            providerSlug={provider.id}
            pageType="review"
            sourceFlow="provider_review"
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-8 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
          >
            Check my eligibility
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </ProviderCta>
        </div>

        {/* Best For */}
        <Section title={`Who is ${provider.name} best for?`}>
          <ul className="space-y-2.5">
            {review.bestFor.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0C4B75]" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Community feedback - real Reddit threads, rendered Reddit-style.
            Each registry entry names the vertical its threads were captured
            for (legacy entries without one are weight-loss research), so the
            block renders only on the matching vertical. */}
        {REVIEW_COMMUNITY_FEEDBACK[slug] &&
          (REVIEW_COMMUNITY_FEEDBACK[slug].vertical ?? "weight-loss") === ctx.vertical && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
            <div className="mb-2 flex items-center gap-2.5">
              <RedditMark className="h-7 w-7 shrink-0" />
              <h2 className="text-[20px] font-bold text-[#191919]">
                What do Reddit users say about {provider.name}?
              </h2>
            </div>
            <p className="mb-5 text-[14.5px] leading-relaxed text-gray-700">
              {REVIEW_COMMUNITY_FEEDBACK[slug].intro}
            </p>

            <div className="space-y-4">
              {REVIEW_COMMUNITY_FEEDBACK[slug].threads.map((t, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-[#FCFCFC] p-4 sm:p-5">
                  {/* Post header - the Reddit identity line */}
                  <div className="mb-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D93A00] text-[10px] font-bold text-white">
                      r/
                    </span>
                    {t.subreddit ? (
                      <>
                        <span className="font-bold text-[#191919]">{t.subreddit}</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-500">u/{t.author}</span>
                      </>
                    ) : (
                      <span className="font-bold text-[#191919]">u/{t.author}</span>
                    )}
                    {t.age && (
                      <>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-400">{t.age}</span>
                      </>
                    )}
                    {t.url && (
                      <a
                        href={t.url}
                        target="_blank"
                        rel="nofollow noopener"
                        className="ml-auto font-semibold text-[#0C4B75] hover:underline"
                      >
                        Read the thread
                      </a>
                    )}
                  </div>

                  {t.title && (
                    <p className="mb-2 text-[15.5px] font-bold leading-snug text-[#191919]">{t.title}</p>
                  )}

                  <div className="space-y-2">
                    {t.body.map((para, j) => (
                      <p key={j} className="text-[13.5px] leading-[1.7] text-gray-600">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Vote / comment pills - only real counts, never estimates */}
                  {(t.upvotes !== undefined || t.commentCount !== undefined) && (
                    <div className="mt-3 flex items-center gap-2">
                      {t.upvotes !== undefined && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-bold text-gray-600">
                          <ArrowBigUp className="h-4 w-4 text-[#FF4500]" strokeWidth={2} />
                          {t.upvotes}
                          <ArrowBigDown className="h-4 w-4 text-gray-400" strokeWidth={2} />
                        </span>
                      )}
                      {t.commentCount !== undefined && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-semibold text-gray-600">
                          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                          {t.commentCount} comments
                        </span>
                      )}
                    </div>
                  )}

                  {/* Replies - threaded with the Reddit comment line */}
                  {t.replies && t.replies.length > 0 && (
                    <div className="mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
                      {t.replies.map((r, j) => (
                        <div key={j}>
                          <div className="mb-1 flex items-center gap-1.5 text-[12px]">
                            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-300 text-[9px] font-bold uppercase text-white">
                              {r.author.charAt(0)}
                            </span>
                            <span className="font-bold text-gray-800">u/{r.author}</span>
                          </div>
                          <p className="text-[13px] leading-[1.65] text-gray-600">{r.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-5 border-t border-gray-100 pt-4 text-[14px] leading-relaxed text-gray-700">
              <span className="font-semibold text-[#191919]">What the threads add up to: </span>
              {REVIEW_COMMUNITY_FEEDBACK[slug].takeaway}
            </p>
            <p className="mt-2 text-[11.5px] leading-relaxed text-gray-400">
              Quoted from public Reddit posts with light trimming. Vote and comment counts are as
              they stood when we captured them. Reddit is a trademark of Reddit, Inc., which has no
              connection to this site.
             Each post describes one person&rsquo;s experience. Any weight loss mentioned is individual, not typical, and your results may differ.</p>
          </div>
        )}

        {/* Independent YouTube review - registry-gated, one real video per
            provider, embedded click-to-load so the iframe never weighs on
            initial load. */}
        <YoutubeReviewSection providerId={provider.id} providerName={provider.name} vertical={ctx.vertical} />

        {/* Final Verdict */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-4">
            <h3 className="text-[18px] font-bold text-[#191919]">Our final verdict on {provider.name}</h3>
          </div>
          <div className="p-6">
            <ReadableProse text={review.finalVerdict} paragraphClassName="text-[15px] leading-[1.75] text-gray-600" />
            <ProviderCta
              href={provider.affiliateUrl}
              providerName={provider.name}
              providerSlug={provider.id}
              pageType="review"
              sourceFlow="provider_review"
              className="mt-5 flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61] sm:w-auto sm:px-8"
            >
              Get started with {provider.name}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </ProviderCta>
          </div>
        </div>

        {/* FAQ */}
        {reviewFaqs.length > 0 && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-4">
              <h2 className="text-[18px] font-bold text-[#191919]">
                {provider.name} questions, answered
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {reviewFaqs.map((f, i) => (
                <div key={i} className="p-6">
                  <h3 className="mb-2 text-[15px] font-bold text-[#191919]">{f.question}</h3>
                  <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not sure? Quiz CTA */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="mb-1 text-[15px] font-bold text-[#191919]">Still deciding whether {provider.name} fits you?</p>
          <p className="mb-4 text-[13px] text-gray-500">Answer a few quick questions and we&rsquo;ll match you with a provider for free.</p>
          <Link
            href={"/find-your-match"}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-[#0C4B75] px-6 text-[14px] font-bold text-[#0C4B75] transition-colors hover:bg-[#0C4B75]/5"
          >
            Take the free quiz
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Related content */}
        {(relatedBattles.length > 0 || relatedTrios.length > 0 || relatedArticles.length > 0 || showComparisonLink) && (
          <div className="mb-6">
            <h3 className="mb-4 text-[18px] font-bold text-[#191919]">Keep comparing</h3>
            {relatedBattles.length > 0 && (
              <>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-gray-400">Side-by-side matchups</p>
                <div className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedBattles.map((battle) => {
                    const otherProvider = config.providers.find(
                      (p) => p.id === (battle.provider1Id === provider.id ? battle.provider2Id : battle.provider1Id)
                    );
                    return (
                      <Link
                        key={battle.slug}
                        href={hubLink(ctx, `/compare/${battle.slug}`)}
                        className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                      >
                        <span className="truncate">{provider.name} vs {otherProvider?.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2.5} />
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
            {relatedTrios.length > 0 && (
              <>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-gray-400">Three-way comparisons</p>
                <div className="mb-5 grid gap-2 sm:grid-cols-2">
                  {relatedTrios.map((t) => (
                    <Link
                      key={t.slug}
                      href={hubLink(ctx, `/compare/${t.slug}`)}
                      className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                    >
                      <span className="truncate">{t.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2.5} />
                    </Link>
                  ))}
                </div>
              </>
            )}
            {(relatedArticles.length > 0 || showComparisonLink) && (
              <>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-gray-400">Guides and comparisons</p>
                <div className="space-y-2">
                  {showComparisonLink && (
                    <Link
                      href="/glp1-provider-comparison"
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#191919] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                    >
                      <span className="truncate">How {provider.name} stacks up against seven other GLP-1 telehealth providers on price, Trustpilot and Reddit</span>
                      <span className="ml-auto shrink-0 text-[12px] text-gray-400">Comparison</span>
                    </Link>
                  )}
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={hubLink(ctx, `/articles/${article.slug}`)}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#191919] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                    >
                      <span className="truncate">{article.title}</span>
                      <span className="ml-auto shrink-0 text-[12px] text-gray-400">{article.readTime}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Provider question cluster - the review's highest-intent internal links */}
        {clusterSlugs.length > 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
            <h2 className="mb-1 text-[17px] font-bold text-[#191919]">
              Common questions about {provider.name}
            </h2>
            <p className="mb-4 text-[13.5px] text-gray-500">
              In-depth answers to what people check before they sign up.
            </p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {clusterSlugs.map((c) => (
                <Link
                  key={c.slug}
                  href={hubLink(ctx, `/articles/${c.slug}`)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                >
                  <span className="truncate">{c.label}</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <SourcesMethodology
          ctx={ctx}
          providers={[{ id: provider.id, name: provider.name }]}
          headingLabel={provider.name}
          kind="review"
        />

        {/* Authoritative medical citations (FDA / NEJM / NIH) - the same YMYL
            grounding block the article template carries. */}
        <MedicalSources vertical={ctx.vertical} />
      </div>

      {/* Mobile-only promo popup - shown on the provider's own review page when
          it has a registered creative (same once-per-session behavior as on
          comparisons). */}
      {promoPopup && (
        <PromoPopup
          spec={promoPopup}
          href={provider.affiliateUrl}
          position={rankIndex >= 0 ? rankIndex + 1 : undefined}
        />
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-[17px] font-bold text-[#191919]">{title}</h3>
      {children}
    </div>
  );
}
