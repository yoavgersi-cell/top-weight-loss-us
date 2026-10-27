import { type SiteConfig, type Expert, defaultConfig, WEIGHT_LOSS_HERO_TEXT } from "./config";
import productsJson from "@/data/products.json";
import faqsJson from "@/data/faqs.json";
import { articles as defaultArticlesData } from "@/data/articles";
import { seedTrustpilot } from "@/data/trustpilot";
import { reviews } from "@/data/reviews";
import { battles } from "@/data/battles";
import { landingPages } from "@/data/landing-pages";
import { quiz } from "@/data/quiz";

// ─────────────────────────────────────────────────────────────────────────────
// Site content store - topweightloss.us
//
// Every provider, affiliate link, ranking, review, comparison and article ships
// from code: what is reviewed in the repo is exactly what is live. There is no
// CMS or blob layer to drift out of sync.
// ─────────────────────────────────────────────────────────────────────────────

const CANONICAL_NAMES: Record<string, string> = {
  altrx: "altRx",
  shed: "SHED",
  embody: "embody",
  // Rebranded from wellmedr to welludr (operator, Oct 19, 2026). The id, the
  // review slug and the battle slugs keep "wellmedr" so no URL changes.
  wellmedr: "welludr",
  sprout: "Sprout",
  sprouthealth: "Sprout",
  directmeds: "DirectMeds",
  found: "found",
  skinnyrx: "skinnyRx",
  noom: "Noom",
  ro: "ro",
  // TrimRx writes its own name in camel case in prose (the all-lowercase form
  // is only its logo wordmark). Switched Oct 11, 2026 to match.
  trimrx: "TrimRx",
  medvi: "Medvi",
};

// Wrong-cased brand mentions inside display text. "Shed"/"Embody" only match
// the capitalized form (lowercase are common English verbs); "Found" is not
// text-replaced at all for the same reason - only the provider name field.
const BRAND_TEXT_FIXES: [RegExp, string][] = [
  [/\balt\s?rx\b/gi, "altRx"],
  [/\bShed\b/g, "SHED"],
  [/\bEmbody\b/g, "embody"],
  [/\bwell\s?medr\b/gi, "welludr"],
  [/\bSprout\s+Health\b/gi, "Sprout"],
  [/\bdirect\s?meds\b/gi, "DirectMeds"],
  [/\bskinny\s?rx\b/gi, "skinnyRx"],
  [/\bnoom\b/gi, "Noom"],
  // "(Trim Rx)" in parentheses is a deliberate search-variant tag on the
  // TrimRx titles and intros; the lookbehind leaves it alone.
  [/(?<!\()\btrim\s?rx\b/gi, "TrimRx"],
  // ro brands itself lowercase; capital-only match so ordinary words are safe.
  [/\bRo\b/g, "ro"],
];

function fixBrandText(s: string): string {
  // The all-lowercase "trimrx" was the house spelling until Oct 11, 2026 and
  // survives in CMS-saved text; recase it in prose only - never inside a path
  // ("/reviews/trimrx"), a slug ("altrx-vs-trimrx") or a quoted id.
  const recased = s
    .replace(/(?<![/\w"'.-])trimrx(?![\w"-]|'(?!s\b))/g, "TrimRx")
    // wellmedr -> welludr rebrand (Oct 19, 2026): prose only, same guards, so
    // CMS-saved text follows the new name while paths and slugs stay intact.
    .replace(/(?<![/\w"'.-])wellmedr(?![\w"-]|'(?!s\b))/g, "welludr");
  // Skip all-lowercase single-token matches (likely slugs/URLs in HTML bodies)
  return BRAND_TEXT_FIXES.reduce(
    (acc, [re, to]) => acc.replace(re, (m) => (m === m.toLowerCase() && !/\s/.test(m) ? m : to)),
    recased
  );
}
const fixBrandArr = (a?: string[]) => a?.map(fixBrandText) ?? [];

// House typography: no long dashes anywhere on the sites. Em/en dashes are
// replaced with a plain hyphen in every string of the config - a deep pass so
// CMS-saved blob content (and anything typed into the admin later) is covered,
// not just code-seeded copy. Runs inside normalizeBrandCasing so every
// getConfig path gets it.
function replaceLongDashesDeep(config: SiteConfig): SiteConfig {
  return JSON.parse(JSON.stringify(config), (_key, value) =>
    typeof value === "string" ? value.replace(/[—–]/g, "-") : value
  );
}

function normalizeBrandCasing(rawConfig: SiteConfig): SiteConfig {
  const config = replaceLongDashesDeep(rawConfig);
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return {
    ...config,
    providers: config.providers.map((p) => ({
      ...p,
      name: CANONICAL_NAMES[p.id] ?? CANONICAL_NAMES[norm(p.name)] ?? p.name,
      tagline: fixBrandText(p.tagline),
    })),
    faqs: config.faqs.map((f) => ({ ...f, question: fixBrandText(f.question), answer: fixBrandText(f.answer) })),
    reviews: config.reviews.map((r) => ({
      ...r,
      shortSummary: fixBrandText(r.shortSummary),
      reviewIntro: fixBrandText(r.reviewIntro),
      keyFeatures: fixBrandArr(r.keyFeatures),
      pricingSummary: fixBrandText(r.pricingSummary),
      treatmentOptions: fixBrandArr(r.treatmentOptions),
      pros: fixBrandArr(r.pros),
      cons: fixBrandArr(r.cons),
      bestFor: fixBrandArr(r.bestFor),
      finalVerdict: fixBrandText(r.finalVerdict),
    })),
    battles: config.battles.map((b) => ({
      ...b,
      title: fixBrandText(b.title),
      matchupLabel: b.matchupLabel ? fixBrandText(b.matchupLabel) : b.matchupLabel,
      subtitle: fixBrandText(b.subtitle ?? ""),
      description: fixBrandText(b.description),
      intro: fixBrandText(b.intro),
      verdict: fixBrandText(b.verdict),
      verdictWinnerPoints: fixBrandArr(b.verdictWinnerPoints),
      verdictLoserPoints: fixBrandArr(b.verdictLoserPoints),
      categories: b.categories.map((c) => ({
        ...c,
        name: fixBrandText(c.name),
        explanation: fixBrandText(c.explanation),
        supportingPoints: fixBrandArr(c.supportingPoints),
      })),
      features: (b.features ?? []).map((f) => ({
        ...f,
        feature: fixBrandText(f.feature),
        provider1Value: fixBrandText(f.provider1Value),
        provider2Value: fixBrandText(f.provider2Value),
      })),
    })),
    articles: config.articles.map((a) => ({
      ...a,
      title: fixBrandText(a.title),
      description: fixBrandText(a.description),
      keyTakeaways: a.keyTakeaways ? fixBrandArr(a.keyTakeaways) : a.keyTakeaways,
      sections: a.sections.map((s) => ({ ...s, heading: fixBrandText(s.heading), body: fixBrandText(s.body) })),
    })),
    landingPages: (config.landingPages ?? []).map((lp) => ({
      ...lp,
      seoTitle: fixBrandText(lp.seoTitle),
      seoDescription: fixBrandText(lp.seoDescription),
      h1: fixBrandText(lp.h1),
      h2: fixBrandText(lp.h2),
      heroDescription: fixBrandText(lp.heroDescription),
      editorialSections: lp.editorialSections?.map((s) => ({
        ...s,
        heading: fixBrandText(s.heading),
        body: fixBrandText(s.body),
        bullets: s.bullets ? fixBrandArr(s.bullets) : undefined,
      })),
    })),
  };
}


// Editorial team shown in bylines.
// Uses initials avatars and editorial/research roles (no fabricated medical
// licenses). Add real credentials only for people who actually hold them.
const defaultExperts: Expert[] = [
  {
    id: "research-team",
    name: "The Top Weight Loss Research Team",
    role: "Editorial & Research",
    bio: "We compare online GLP-1 providers on what they charge, which medications they prescribe, how clinicians oversee care and what customers report. Rankings follow that evidence, and we revisit them whenever prices or plans change.",
    specialties: ["Provider comparison", "GLP-1 treatment", "Pricing analysis"],
  },
  {
    id: "content-reviewer",
    name: "Editorial Review Desk",
    role: "Clinical Content Reviewer",
    bio: "Each review and comparison is checked for accuracy and readability before publishing, then rechecked when a provider changes its plans, prices or medications.",
    specialties: ["Accuracy review", "Editorial standards"],
  },
];

// Live ranking order. Only providers with a working partner or official link
// are ranked, so no card ever leads to a dead CTA.
const RANKING_ORDER = ["embody", "altrx", "eden", "wellmedr", "ro", "trimrx", "shed", "medvi", "sprout", "wellorithm", "directmeds", "healthrx", "bmimd"];

// Articles about providers we don't list (no working link) are not published.
// weight-loss-medication-cost-guide: consolidated into the 2026 cost pillar
// (glp1-cost-2026-how-to-pay-less), which targets the same queries.
const RETIRED_ARTICLE_SLUGS = new Set([
  "noom-weight-loss-review",
  "noom-subscription-cost",
  "best-weight-loss-telehealth-providers",
  "weight-loss-medication-cost-guide",
]);

function buildConfig(): SiteConfig {
  const providerIds = new Set(productsJson.map((p) => p.id));
  return {
    ...defaultConfig,
    hero: { ...defaultConfig.hero, ...WEIGHT_LOSS_HERO_TEXT },
    experts: defaultExperts,
    providers: productsJson.map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      logo: p.logo,
      smallLogo: ("smallLogo" in p && typeof p.smallLogo === "string" && p.smallLogo) || `/logos/${p.id}-icon.svg`,
      highlights: p.highlights,
      affiliateUrl: p.affiliateUrl,
      ctaText: p.ctaText,
      trustpilotRating: seedTrustpilot[p.id]?.rating,
      trustpilotReviewCount: seedTrustpilot[p.id]?.reviewCount,
      trustpilotReviews: seedTrustpilot[p.id]?.reviews,
    })),
    ranking: {
      providerOrder: RANKING_ORDER.filter((id) => providerIds.has(id)),
      positions: [
        { score: 9.8, starRating: 5, label: "Exceptional", badge: "Our Most Popular" },
        { score: 9.7, starRating: 5, label: "Exceptional" },
        { score: 9.6, starRating: 4.5, label: "Excellent" },
        { score: 9.4, starRating: 4, label: "Excellent" },
        { score: 9.3, starRating: 4, label: "Excellent" },
        { score: 9.1, starRating: 3.5, label: "Excellent" },
        { score: 8.9, starRating: 3.5, label: "Very Good" },
        { score: 8.7, starRating: 3, label: "Very Good" },
        { score: 8.5, starRating: 3, label: "Very Good" },
        { score: 8.4, starRating: 3, label: "Very Good" },
        { score: 8.2, starRating: 3, label: "Very Good" },
        { score: 8.0, starRating: 3, label: "Very Good" },
        { score: 7.9, starRating: 3, label: "Good" },
      ],
    },
    faqs: faqsJson,
    reviews: reviews.filter((r) => providerIds.has(r.providerId)),
    articles: defaultArticlesData.filter((a) => !RETIRED_ARTICLE_SLUGS.has(a.slug)),
    battles: battles.filter((b) => providerIds.has(b.provider1Id) && providerIds.has(b.provider2Id)),
    landingPages,
    sidebars: [
      {
        id: "articles-default",
        name: "Articles Sidebar",
        area: "articles" as const,
        active: true,
        blocks: [
          { type: "providers" as const, enabled: true },
          { type: "quizCta" as const, enabled: true },
          { type: "relatedArticles" as const, enabled: true },
        ],
        providerIds: ["embody", "altrx", "eden"],
        quizCta: {
          headline: "Not sure which provider fits you?",
          description: "Answer four quick questions and get a matched recommendation.",
          ctaText: "Find My Match",
          ctaUrl: "/find-your-match",
        },
        articleSlugs: ["how-glp1-medications-work", "first-month-weight-loss-medication", "choosing-telehealth-weight-loss-provider"],
      },
    ],
    quiz: {
      ...quiz,
      providerProfiles: quiz.providerProfiles.filter((p) => providerIds.has(p.providerId)),
    },
  };
}

const config: SiteConfig = normalizeBrandCasing(buildConfig());

// Kept async so page templates can stay unchanged; the argument is ignored
// (the site has a single vertical).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getConfig(_vertical?: string): Promise<SiteConfig> {
  return config;
}

export function getConfigSync(): SiteConfig {
  return config;
}
