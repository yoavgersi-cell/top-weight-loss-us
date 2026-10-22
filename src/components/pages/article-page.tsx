import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { NOINDEX_ARTICLE_SLUGS, latestUpdate, AFFILIATE_PROVIDER_IDS, DEFAULT_ROBOTS } from "@/lib/config";
import { PRODUCT_CATALOG } from "@/lib/product-catalog";
import { enhanceArticleHtml } from "@/components/prose";
import { type SiteContext, canonicalUrl, hubLink } from "@/lib/site-context";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import { MedicalSources } from "@/components/medical-sources";
import { ProductCarousel } from "@/components/product-carousel";
import { TrustpilotCarousel, MixedTrustpilotCarousel, type MixedReviewItem } from "@/components/trustpilot-carousel";
import { TopProvidersBlock, TopTwoPicks } from "@/components/top-providers-block";
import { TirzepatidePriceTable } from "@/components/tirzepatide-price-table";
import { TrustpilotSummary } from "@/components/trustpilot-summary";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { LEGIT_PAGES, LegitChecklist, LegitVerdictCta, PricingCapture } from "@/components/legit-page-blocks";
import { ProviderCta } from "@/components/provider-cta";
import { PRICE_INDEX } from "@/lib/price-index";
import type { TrustpilotReview } from "@/lib/config";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { notFound, permanentRedirect } from "next/navigation";

// Code-side CTR overrides for high-impression articles whose stored meta lives
// in the CMS blob (so it can't be tuned from the content files). Applied only
// site-wide. Prices cited are the providers' real listed
// prices - keep in sync when pricing changes.
const ARTICLE_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  // Oct 2026, Bing 30-day export: the "legit or scam" phrasings convert at
  // 50-100% ("is embody legit or scam" 2/2, "embody weight loss scam" 2/1,
  // "is welludr a scam" 2/2, "welludr scam" 1/1), so the titles name the
  // question the searcher is actually typing. The pages answer it directly.
  "is-embody-legit": {
    title: "Is embody Legit or a Scam? Pharmacy, Prices, Reviews (2026)",
    description:
      "Is embody legit? Licensed prescribers, LegitScript-certified 503A pharmacies, $69 semaglutide, $119 tirzepatide, a refund if not approved, and real customer feedback.",
  },
  "is-wellmedr-legit": {
    title: "Is welludr Legit or a Scam? Complaints & Prices (2026)",
    description:
      "Is welludr a scam? It holds a verified 4.6 on Trustpilot from 2,188 reviews. We cover what complaints say, how the $49-$89 pricing really works, and our verdict.",
  },
  "is-altrx-legit": {
    // Keeps the keyword-rich SERP snippet (prices, flat-dose) even though the
    // visible on-page dek was shortened to a clean editorial line.
    title: "Is altRx Legit? Prescribing, Pricing & Catches (2026)",
    description:
      "altRx sells $89 compounded plans next to brand-name Ozempic from $1,149. We checked who writes the prescriptions, how flat-dose pricing works and the catches to know.",
  },
  "tirzepatide-vs-semaglutide": {
    title: "Tirzepatide vs Semaglutide (2026): Weight Loss & Cost",
    description:
      "Tirzepatide vs semaglutide: up to 22.5% vs about 15% weight loss in trials, plus side effects and dosing. Checked compounded prices start at $49 and $89 per month.",
  },
  "best-mounjaro-alternatives": {
    title: "7 Best Mounjaro Alternatives for 2026 (From $89/Month)",
    description:
      "Compounded tirzepatide, the active ingredient in Mounjaro, costs from $89/month at licensed providers versus $1,000+ for brand pens. Prices checked August 2026.",
  },
  "best-wegovy-alternatives": {
    title: "7 Best Wegovy Alternatives for 2026 (From $49/Month)",
    description:
      "Compounded semaglutide, the active ingredient in Wegovy, costs $49-$89/month through licensed online providers. Real prices, what each plan includes and how to pick.",
  },
  "best-ro-alternatives": {
    title: "Best ro Alternatives for Weight Loss in 2026 (From $49/mo)",
    description:
      "GLP-1 providers with flat pricing that rival ro: welludr at $49/mo, embody at $69/mo, altRx at $89/mo and more, compared on cost, shipping speed and support.",
  },
  "can-you-get-ozempic-without-doctor": {
    title: "Can You Get Ozempic Without a Doctor Visit? (2026)",
    description:
      "No. Every GLP-1 needs a prescription by law, but an office visit is optional: licensed telehealth clinicians assess you online, with treatment from $49/month.",
  },
  "weight-loss-medication-that-works-fast": {
    title: "Weight Loss Medication That Works Fast: 2026 Guide",
    description:
      "GLP-1s are the quickest evidence-based option: appetite often shifts within weeks and real weight loss builds over months. Realistic timelines and where to begin online.",
  },
  "how-to-get-ozempic-online": {
    title: "How to Get Ozempic Online Legally in 2026: 3 Steps",
    description:
      "The legal path has three steps: an online intake, review by a licensed provider, and medication by mail. Brand-name and compounded semaglutide options from $49/month.",
  },
  "semaglutide-cost-per-month": {
    title: "Semaglutide Cost Per Month (2026): From $49 vs $1,150+",
    description:
      "Compounded semaglutide costs $49-$199/month all-in through telehealth, while brand Ozempic or Wegovy costs $1,150-$1,600 without insurance. Full price breakdown.",
  },
  "weight-loss-medication-without-insurance": {
    title: "Weight Loss Medication Without Insurance: From $49/mo",
    description:
      "No insurance? Self-pay compounded GLP-1s start at $49-$89/month with the provider visit included. Prices from licensed telehealth providers, compared side by side.",
  },
  "compounded-semaglutide-vs-brand-name": {
    title: "Compounded Semaglutide vs Brand Name: Key Differences",
    description:
      "Same active ingredient, made by 503A pharmacies, at roughly a 10x lower price ($49-$199 vs $1,150+/mo). What the FDA says, the trade-offs and how to stay safe.",
  },
};

// Direct-answer boxes injected at the top of key articles (featured-snippet
// targets). Code-rendered, so they work for articles whose body lives in the
// blob. Every figure is a real, listed price - no invented numbers.
const ARTICLE_QUICK_ANSWERS: Record<string, string> = {
  // Oct 20, 2026 pillar. Figures are the verified price index and the two
  // pivotal trials cited inside the article.
  "glp1-weight-loss-online-complete-guide":
    "There are three ways to get a GLP-1 online, and every one needs a prescription from a licensed clinician: brand-name Wegovy or Zepbound (pens or the new pills) through a telehealth prescriber, the same brands through your insurance, or compounded semaglutide or tirzepatide made by a state-licensed pharmacy and prescribed by a telehealth provider. Checked compounded prices are $49-$199/month for semaglutide and $89-$299/month for tirzepatide, while brand-name cash prices start near $1,249/month. In the pivotal trials, average weight loss was about 15% on semaglutide and up to 21% on tirzepatide after 15-17 months, and most of that weight returned within a year of stopping.",
  // Oct 8, 2026 research-driven cluster. Figures derive from the verified
  // price index (see src/lib/true-cost.ts) and dated external sources cited
  // inside each article; the dollar stamp below carries the index date.
  "glp1-true-cost-month-1-vs-year-one":
    "What you keep paying after month 1 matters more than the intro price. At checked prices, a first year of compounded semaglutide costs from $588 on welludr's 12-month plan to roughly $1,800-$2,400 at month-to-month providers, and tirzepatide adds about $500-$1,200 on top. The month-2 price jump comes from promos with no published end date, 20%-off first-month deals and memberships billed alongside the medication, and you can see all of them before you pay.",
  "before-you-prepay-glp1":
    "Pay month to month for your first two or three cycles, and prepay only after the provider has shipped on time and replied when you contacted it. Before you sign up for any prepaid or 12-month plan, get written answers to five questions: when you are charged and for what; what is refunded if shipments stop; how you cancel and whether you get a confirmation; whether the plan auto-renews and how much notice you receive; and whether a financing company bills you separately.",
  "what-100-to-200-a-month-gets-you-glp1":
    "At checked published prices, under $100 a month gets you compounded semaglutide from welludr ($49 on a 12-month plan), embody ($69, month to month), altRx ($89) or Medvi ($99 promo). Between $100 and $150 buys compounded tirzepatide from embody ($119), DirectMeds ($147) or altRx ($149). From $150 to $200 you are paying for all-inclusive and coaching-led programs. Above $200 the options turn brand-name: Foundayo from $149 a month and brand injections from $1,149.",
  "lost-insurance-coverage-zepbound-wegovy":
    "You have five options. Appeal, if the drug is still on your formulary. Use the manufacturer's savings card or direct price (Foundayo lists $149-$349 a month self-pay, or $25 with commercial insurance). On Medicare, join the GLP-1 Bridge pilot, which charges a flat $50 a month for Wegovy, the Zepbound KwikPen and Foundayo through December 2027. Pay cash for brand-name medication through telehealth ($1,149-$1,799 a month). Or move to a compounded version at $49-$299 a month. Whether your current dose carries over is a decision for a licensed clinician.",
  "503a-vs-503b-pharmacy-28-day-rule":
    "A 503A pharmacy compounds medication for one named patient with a prescription and is overseen by its state board. A 503B outsourcing facility is registered with the FDA and produces larger batches under manufacturing standards. Now that semaglutide and tirzepatide are off the FDA shortage list, a legitimate compounded GLP-1 comes from a licensed pharmacy filling a patient-specific prescription. The 28-day rule is the standard window for using an opened multi-dose vial, which is why plans ship monthly and a 90-day vial is a red flag. Ask for the pharmacy's name, its state license and the beyond-use date.",
  "glp1-after-65-medicare":
    "Since July 1, 2026, eligible Medicare beneficiaries can use the GLP-1 Bridge pilot to get the Wegovy pill and injection, the Zepbound KwikPen and Foundayo for a flat $50 monthly copay that stays the same as the dose rises, through December 31, 2027. Eligibility depends on clinical criteria plus an approval step through your Part D plan. Medicare never covers compounded GLP-1s. If you do not qualify, you can pay cash for brand-name drugs ($149-$349 a month for Foundayo, $1,149+ for injections) or for compounded versions ($49-$299).",
  "is-wellmedr-legit":
    "Yes. welludr passes every check we can verify: a licensed provider reviews you before prescribing, medication comes from a regulated US pharmacy, it offers a weight loss warranty, and it holds a verified 4.6 on Trustpilot from 2,188 reviews (tied for the highest score among the providers we track). The caveats: the advertised $49 and $89 prices require a 12-month plan, the complaints that do exist focus on shipping delays and slow support replies, and individual results vary no matter how good the service is.",
  // Oct 9, 2026 oral GLP-1 pair. Ro figures are its verified published
  // prices; manufacturer figures are as reported by sources dated inside the
  // articles, so these two carry their own stamp (QUICK_ANSWER_STAMPS).
  "wegovy-pill-price-online":
    "At ro, the Wegovy pill costs $149 for the first month and $299 a month after that, plus a membership of $39 for month one and $74-149 after; this is the only telehealth price we have verified. Novo Nordisk's direct-pay pricing is reported at $149 for the starting dose, rising to $299 for the maintenance dose. If commercial insurance covers Wegovy, the manufacturer's savings offer reportedly lowers the cost to as little as $25 a month, and on Medicare the GLP-1 Bridge pilot charges a flat $50 through December 2027. Every route needs a prescription.",
  "foundayo-vs-wegovy-pill":
    "Both are FDA-approved GLP-1 pills taken once a day. In OASIS 4, the Wegovy pill (oral semaglutide, approved December 2025) produced 13.6% average weight loss at 64 weeks. In ATTAIN-1, Foundayo (orforglipron, approved April 1, 2026) produced 11.2% at its top dose over 72 weeks. These were separate trials, not a head-to-head comparison. The Wegovy pill must be taken on an empty stomach followed by a 30-minute wait, while Foundayo has no food or water rules. Paying cash, Foundayo lists $149-$349 a month by dose, and the Wegovy pill costs $149 then $299 plus membership at ro. Both drop to $25 with a commercial savings card and $50 under Medicare's pilot.",
  "zepbound-price-online":
    "Paying cash, brand-name Zepbound costs $1,249/month at altRx and $1,599 at welludr. At ro, Zepbound KwikPens start at $299 for month one (then $399-449) plus a monthly membership of $39 at first and $74-149 after, and insurance can apply there. Compounded tirzepatide, which has the same active ingredient, costs $89-$299/month from licensed telehealth providers. Every one of these routes requires a prescription.",
  "best-tirzepatide-online":
    "Checked compounded tirzepatide prices range from $89 to $299 a month. welludr is the lowest at $89 on a 12-month plan, embody at $119 is the cheapest with no commitment, and Medvi at $166 is all-inclusive and has one of the two largest review bases. For brand-name Zepbound, altRx charges $1,249/month cash, and ro's KwikPen starts at $299 for month one plus membership; where insurance applies, ro can cost far less. Every legitimate source requires a prescription.",
  "ozempic-face":
    "Ozempic face is the loss of facial volume that comes from losing weight quickly; it is not a chemical side effect of the drug. It can happen with any GLP-1 or any rapid weight loss. What helps: a moderate pace of weight loss, enough protein, resistance training and good hydration. Facial volume often returns in part once your weight stabilizes.",
  "zepbound-vs-wegovy-vs-ozempic":
    "In trials, Zepbound (tirzepatide) produced up to 22.5% average weight loss, compared with about 15% for Wegovy (semaglutide). Ozempic is the same semaglutide sold under its diabetes approval. Checked prices: brand Zepbound costs $1,249/month and Wegovy $1,579 at altRx, while compounded semaglutide starts at $49 and compounded tirzepatide at $89 through licensed telehealth.",
  "glp1-with-insurance":
    "Many plans cover GLP-1s for diabetes, but far fewer cover them for weight loss alone. Your plan's formulary is the only reliable answer, and prior authorization (BMI cutoffs, documented conditions) is the usual hurdle. If coverage falls through, checked self-pay compounded semaglutide costs $49-$99/month through licensed telehealth providers.",
  "ozempic-vs-wegovy-differences":
    "Ozempic and Wegovy share one active ingredient, semaglutide, but they are different products. Ozempic is FDA-approved for type 2 diabetes, while Wegovy is approved for chronic weight management and goes up to a higher maximum dose (2.4 mg vs 2 mg). For self-pay weight loss, checked compounded semaglutide costs $49-$99/month, compared with $1,149+ for either brand.",
  "zepbound-vs-wegovy":
    "Zepbound and Wegovy are both FDA-approved for weight loss, but they are different drugs. Zepbound (tirzepatide) acts on two hormone receptors and produced up to 22.5% average weight loss in trials, compared with about 15% for Wegovy (semaglutide). At checked prices, brand Zepbound costs $1,249/month at altRx (pens from $299 for month one at ro), and compounded options start at $49-$99/month.",
  "mounjaro-vs-ozempic":
    "Mounjaro and Ozempic are different drugs. Mounjaro (tirzepatide) acts on two hormone receptors and produced up to 22.5% average weight loss in trials, compared with about 15% for Ozempic (semaglutide). The compounded version of Ozempic's ingredient costs less, from a checked $49/month versus $89 for compounded tirzepatide, and both need a prescription from a licensed provider.",
  "best-mounjaro-alternatives":
    "The closest alternatives to Mounjaro are compounded tirzepatide plans, which use the same active ingredient, from licensed telehealth providers: $89/month at welludr, $119 at embody and $147 at DirectMeds, compared with roughly $1,000+ for the brand. A prescription is required, and medication ships to your door.",
  "best-wegovy-alternatives":
    "The closest alternatives to Wegovy are compounded semaglutide plans with the same active ingredient, starting at $49/month (welludr), $69 (embody) and $89 (altRx) through licensed online providers, compared with $1,150+ for the brand without insurance.",
  "best-ro-alternatives":
    "The strongest alternatives to ro are compounded GLP-1 providers with flat pricing: welludr from $49/month, embody at $69 with 1-2 day shipping, and altRx at $89, which also offers brand-name options. Each one requires an online review by a licensed provider.",
  "can-you-get-ozempic-without-doctor":
    "No. In the US, Ozempic and every other GLP-1 medication require a prescription by law. What you can skip is the in-person appointment: licensed telehealth providers assess you online and, when appropriate, prescribe treatment that starts at about $49-$89/month.",
  "weight-loss-medication-that-works-fast":
    "GLP-1 medications such as semaglutide and tirzepatide are the fastest evidence-based option. Most people notice their appetite change in the first few weeks, and meaningful weight loss builds over 3-6 months. No pill or program works overnight, so be wary of anyone who promises that.",
  "how-to-get-ozempic-online":
    "It takes three steps: complete an online health questionnaire, have a licensed provider review it (a legal requirement), and receive your medication by mail if it is prescribed. Brand-name Ozempic costs $1,150+/month, while compounded semaglutide with the same active ingredient starts at $49-$89.",
  "semaglutide-cost-per-month":
    "Through licensed telehealth providers, compounded semaglutide costs $49-$199 per month all-in (welludr $49, embody $69, altRx $89). Without insurance, brand-name Ozempic or Wegovy costs roughly $1,150-$1,600 per month.",
  "weight-loss-medication-without-insurance":
    "Insurance is not required. Self-pay compounded GLP-1 plans bundle the provider visit and medication from $49/month (welludr), $69 (embody) or $89 (altRx). Without coverage, brand-name drugs cost $1,150+, which is the main reason the compounded route exists.",
  "compounded-semaglutide-vs-brand-name":
    "Compounded semaglutide has the same active ingredient as Ozempic and Wegovy and is made by state-licensed 503A compounding pharmacies, at $49-$199/month compared with $1,150+ for the brands. The trade-off: compounded versions are not FDA-approved products, so the quality of the provider and pharmacy matters most.",
};

// Per-article override of the dated price stamp under the quick answer, for
// articles whose dollar figures are not (only) from the verified price index.
const QUICK_ANSWER_STAMPS: Record<string, string> = {
  "wegovy-pill-price-online":
    "ro's prices come from its own published pricing, checked August 2026. Manufacturer prices come from the dated sources linked in this article and have not been verified by us.",
  "foundayo-vs-wegovy-pill":
    "ro's prices come from its own published pricing, checked August 2026. Manufacturer prices come from the dated sources linked in this article and have not been verified by us.",
};

export async function articleMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  const config = await getConfig(ctx.vertical);
  const article = (config.articles ?? []).find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  const url = canonicalUrl(ctx, `/articles/${slug}`);

  // CTR override (code-controlled) wins over stored meta for target articles.
  const override = ARTICLE_SEO_OVERRIDES[slug];

  return {
    title: override?.title ?? article.title,
    description: override?.description ?? article.description,
    robots: ctx.noindex
      ? { index: false, follow: false }
      : NOINDEX_ARTICLE_SLUGS.includes(slug)
        ? { index: false, follow: true }
        : DEFAULT_ROBOTS,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: override?.title ?? article.title,
      description: override?.description ?? article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: latestUpdate(article.updatedAt),
      // Older articles store the pre-migration team name; brand it for the hub.
      authors: [(article.author || ctx.brandName).replace(/TopWeightLoss/gi, ctx.brandTeam.replace(/\s+Team$/i, ""))],
    },
  };
}

const categoryColors: Record<string, string> = {
  Science: "bg-blue-50 text-blue-700",
  Guide: "bg-emerald-50 text-emerald-700",
  Advice: "bg-amber-50 text-amber-700",
  Wellness: "bg-purple-50 text-purple-700",
};

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function ArticlePageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const articles = config.articles ?? [];
  const experts = config.experts ?? [];

  // Head-to-head provider comparisons are canonical at the root battle URL.
  // If a battle owns this slug, consolidate /articles/<slug> → /<slug> (301/308)
  // so a duplicate or stale /articles/ URL doesn't compete with the battle page.
  if ((config.battles ?? []).some((b) => b.slug === slug)) {
    permanentRedirect(hubLink(ctx, `/${slug}`));
  }

  // Cannibalization consolidation: the generic "best telehealth providers"
  // article competed with the ranking homepage for the exact query cluster the
  // homepage should own ("best telehealth weight loss", "best online weight
  // loss clinic"). Its equity 301s to the homepage instead.
  if (slug === "best-weight-loss-telehealth-providers") {
    permanentRedirect(hubLink(ctx, "/"));
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[currentIndex + 1] || null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  // Brand-cluster articles (is-embody-legit, happyhead-cost, ...) carry the
  // provider id as a slug segment. On those, surface the provider's real
  // social proof - Trustpilot and Reddit carousels - high on the page.
  // Exact segment match so "ro" never fires inside "sprout". Trustpilot data
  // lives on the current vertical's own provider record, so it's safe on any
  // vertical; the Reddit registry is weight-loss-researched and stays gated
  // (a shared provider id like directmeds must not inherit those threads).
  const slugParts = slug.split("-");
  const subjectProvider = config.providers.find((p) => slugParts.includes(p.id));

  // On a single-brand legitimacy article ("is-<brand>-legit"), the product
  // carousel should showcase THAT brand only - competitors' products don't
  // belong on a page about whether this one provider is legit. Guarded so we
  // only restrict when the subject actually has affiliate catalog products
  // (otherwise fall back to the full catalog rather than an empty carousel).
  const isLegitArticle = /^is-.+-legit$/.test(slug);
  const restrictCarouselToSubject =
    isLegitArticle &&
    !!subjectProvider &&
    PRODUCT_CATALOG.some(
      (p) => p.providerId === subjectProvider.id && AFFILIATE_PROVIDER_IDS.includes(p.providerId),
    );
  const subjectTrustpilot =
    subjectProvider?.trustpilotReviews?.length ? subjectProvider : undefined;
  const subjectReddit =
    subjectProvider && REDDIT_COMMUNITY_FEEDBACK[subjectProvider.id]
      ? subjectProvider
      : undefined;

  // Conversion block: on select high-intent buyer guides that are otherwise all
  // prose, surface the site's top-ranked providers with the same ranked cards +
  // CTAs the comparison page uses, high on the page. Gated to specific slugs so
  // it never leaks onto informational articles.
  const TOP_PROVIDERS_CRO_SLUGS = new Set(["best-tirzepatide-online"]);
  const showTopProvidersCro = TOP_PROVIDERS_CRO_SLUGS.has(slug);

  // The tirzepatide buyer guide is tuned as a topic page (Oct 2026 CRO pass):
  // the top-3 block shows only providers with a verified tirzepatide price and
  // prints that price on the card; the price table is code-rendered with CTAs;
  // the product carousel is tirzepatide-only; the cross-provider Trustpilot
  // carousel shows every stored review that mentions the molecule; and the
  // generic mid-page blocks (duplicate provider list, stock-photo callout) are
  // dropped so the page stays on topic.
  const isTirzGuide = slug === "best-tirzepatide-online";
  // Mid-article product carousel: topic-matched and capped (Oct 2026). The full
  // 29-card catalog on every article put ~550 identical words on 80 pages; an
  // article about tirzepatide now shows tirzepatide plans, a semaglutide or
  // Ozempic/Wegovy article shows semaglutide plans, an oral-GLP-1 article shows
  // tablets, and everything else shows the eight cheapest plans.
  const topicText = `${slug} ${article.title}`.toLowerCase();
  const tirzTopic = /tirzepatide|zepbound|mounjaro/.test(topicText);
  const semaTopic = /semaglutide|ozempic|wegovy/.test(topicText);
  // The catalog has no oral products yet, so pill articles fall back to the
  // medication rule (the Wegovy pill is semaglutide) rather than an empty strip.
  const carouselMedication: "tirzepatide" | "semaglutide" | undefined = isTirzGuide
    ? "tirzepatide"
    : tirzTopic && !semaTopic
      ? "tirzepatide"
      : semaTopic && !tirzTopic
        ? "semaglutide"
        : undefined;
  const carouselTitle = isTirzGuide
    ? "Tirzepatide plans and prices by provider"
    : carouselMedication
      ? `${carouselMedication.charAt(0).toUpperCase()}${carouselMedication.slice(1)} plans and prices by provider`
      : "Lowest-priced GLP-1 plans";
  const carouselSubtitle = isTirzGuide
    ? "Each provider's published tirzepatide plan, sorted from lowest price, with the terms listed under every price."
    : carouselMedication
      ? `Each provider's published ${carouselMedication} plan, sorted from lowest price, with the terms listed under every price.`
      : "The cheapest published plans, sorted from lowest price, with the terms listed under every price.";
  const tirzNote = (id: string): string | undefined => {
    const cell = PRICE_INDEX.find((r) => r.providerId === id)?.tirzepatide;
    if (!cell) return undefined;
    const reg = cell.note.match(/reg\.\s*(\$[\d,]+)/i);
    return `Tirzepatide ${cell.price}/mo${reg ? ` (reg. ${reg[1]})` : ""}`;
  };
  const TIRZ_TOP_IDS = ["embody", "altrx", "wellmedr"];
  const tirzPriceNotes = Object.fromEntries(
    TIRZ_TOP_IDS.map((id) => [id, tirzNote(id)]).filter((e): e is [string, string] => typeof e[1] === "string"),
  );
  const reviewTime = (r: TrustpilotReview): number => {
    if (!r.date) return 0;
    const t = new Date(r.date).getTime();
    return isNaN(t) ? 0 : t;
  };
  // Every stored Trustpilot review, across providers, that mentions the
  // molecule or its brand names - a fixed rule, no cherry-picking - newest first.
  const tirzReviews: MixedReviewItem[] = isTirzGuide
    ? config.providers
        .flatMap((p) =>
          (p.trustpilotReviews ?? [])
            .filter((r) => /tirzepatide|zepbound|mounjaro/i.test(`${r.title} ${r.text}`))
            .map((review) => ({
              review,
              provider: { name: p.name, href: hubLink(ctx, `/reviews/${p.id}`), total: p.trustpilotReviews!.length },
            })),
        )
        .sort((a, b) => reviewTime(b.review) - reviewTime(a.review))
    : [];
  const tirzEmbody = isTirzGuide ? config.providers.find((p) => p.id === "embody") : undefined;
  const tirzWellmedr = isTirzGuide ? config.providers.find((p) => p.id === "wellmedr") : undefined;

  // "is <brand> legit" pages with operator-verified trust blocks (see
  // LEGIT_PAGES): checklist under the quick answer, dated pricing capture
  // after the cost section, verdict CTA after the last section.
  const legitData = LEGIT_PAGES[slug];
  const legitProvider = legitData ? config.providers.find((p) => p.id === legitData.providerId) : undefined;
  const legitCaptureAfter = legitData ? article.sections.findIndex((s) => /^how much does/i.test(s.heading)) : -1;
  // Every provider-"alternatives" guide (altrx-alternatives, best-ozempic-
  // alternatives, etc.) gets a CRO block featuring our three GLP-1 partners
  // (embody, altRx, TrimRx) with the same comparison-page cards.
  const showPartnerCro = slug.endsWith("-alternatives");
  // "Our top 2 picks" (embody, altRx) after the intro on every other weight-loss
  // article. Skipped where a provider block already renders (the two above) and
  // on "is X legit" trust-check pages, for the same reason as the inline CTA.
  // Also skipped on every "<provider>-cost" guide (Oct 11, 2026): a block
  // ranking two other providers made no sense on a page about what one
  // provider costs.
  const showTopTwo =
    !showTopProvidersCro && !showPartnerCro && !/^is-.+-legit$/.test(slug) && !/-cost$/.test(slug);

  // Byline author: match the article's author to a team member, else the lead
  const author = experts.find((e) => e.name === article.author) ?? experts[0];

  // Related articles: same category first, then others, exclude self, max 3
  const relatedArticles = [
    ...articles.filter(
      (a) => a.slug !== slug && a.category === article.category
    ),
    ...articles.filter(
      (a) => a.slug !== slug && a.category !== article.category
    ),
  ].slice(0, 3);

  const formattedDate = new Date(latestUpdate(article.updatedAt)).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
  );

  // Word count for schema
  const wordCount = article.sections.reduce(
    (sum, s) =>
      sum + s.body.replace(/<[^>]*>/g, "").split(/\s+/).length,
    0
  );

  // JSON-LD Article schema (enhanced)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    // Only a real image: the un-hashed /opengraph-image path is not a served
    // route (Next hashes the file-convention URL), so pointing schema at it
    // emitted a 404 image on every article.
    ...(article.image && { image: `${ctx.origin}${article.image}` }),
    datePublished: article.publishedAt,
    dateModified: latestUpdate(article.updatedAt),
    wordCount,
    articleSection: article.category,
    ...pageReviewSchema(`${ctx.prefix}/articles/${slug}`),
    // The research team is a group, so it is an Organization, not a Person.
    author: {
      "@type": "Organization",
      name: author ? author.name.replace(/TopWeightLoss/gi, ctx.brandTeam.replace(/\s+Team$/i, "")) : article.author || ctx.brandName,
      url: canonicalUrl(ctx, "/about"),
    },
    publisher: {
      "@type": "Organization",
      name: ctx.brandName,
      url: ctx.origin,
      logo: {
        "@type": "ImageObject",
        url: `${ctx.origin}/logo-mark.png`,
      },
    },
    // Medical content (Science / Guide / Wellness) is typed as a MedicalWebPage
    // so the reviewedBy / lastReviewed signal sits on the page entity Google
    // expects it on; provider-business articles (Advice: legit, cost,
    // alternatives) stay plain WebPage.
    mainEntityOfPage: {
      "@type": ["Science", "Guide", "Wellness"].includes(article.category) ? "MedicalWebPage" : "WebPage",
      "@id": canonicalUrl(ctx, `/articles/${slug}`),
      ...pageReviewSchema(`${ctx.prefix}/articles/${slug}`),
    },
    keywords: [
      "weight loss",
      "GLP-1",
      "semaglutide",
      "tirzepatide",
      article.category.toLowerCase(),
      ...article.sections.map((s) => s.heading),
    ],
  };

  // JSON-LD Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl(ctx, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: canonicalUrl(ctx, "/articles"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl(ctx, `/articles/${slug}`),
      },
    ],
  };

  // FAQ schema - ONLY from sections that are genuinely question-shaped (heading
  // ends with "?"). Marking narrative section headings as FAQ questions is
  // non-compliant structured data (risk of a Google structured-data flag, and no
  // upside since FAQ rich results are gated to authoritative health/gov sites),
  // so we emit FAQPage only when there are at least two real questions.
  const faqEntries = article.sections.filter((s) => s.heading.trim().endsWith("?"));
  const faqSchema =
    faqEntries.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((s) => ({
            "@type": "Question",
            name: s.heading,
            acceptedAnswer: {
              "@type": "Answer",
              text: s.body.replace(/<[^>]*>/g, ""),
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Hero band */}
        <div
          className="relative w-full overflow-hidden"
          style={{ backgroundColor: article.heroColor }}
        >
          {/* The vertical's hero image, in the same spot and at the same size as
              on the ranking page (desktop only; the wrapper is display:none
              below the sm breakpoint). Verticals without a hero image render
              nothing here, exactly like their ranking pages. Oct 17, 2026. */}
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
                { label: "Home", href: hubLink(ctx, "/") },
                { label: "Articles", href: hubLink(ctx, "/articles") },
                { label: article.title },
              ]}
            />

            {/* Tight editorial masthead: eyebrow (category + read time) → H1 →
                short dek → low-weight byline/date. Spacing kept deliberately
                compact so the first mobile viewport reads like a publication,
                not a long SEO intro. */}
            <div className="mb-2 flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-gray-400">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {article.readTime}
              </span>
            </div>

            {/* Mobile sizes chosen so a typical title wraps to two lines and
                the dek to three on a 390px viewport (Oct 18, 2026); desktop
                sizes unchanged. */}
            <h1 className="text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-[#191919] sm:max-w-[640px] sm:text-[32px] sm:leading-tight sm:tracking-normal">
              {article.title}
            </h1>
            <p className="mt-2 max-w-[640px] text-[14px] leading-[1.45] text-gray-600 sm:text-[16px] sm:leading-[1.55]">
              {article.description}
            </p>
            <p className="mt-2 text-[12px] text-gray-400">Last updated {formattedDate}</p>
            <MedicalReviewBar path={`${ctx.prefix}/articles/${slug}`} className="mt-3 max-w-[760px]" />
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          <div>
          {/* On a brand legitimacy article ("is-<brand>-legit"), real user
              experiences answer the reader's core question first - so the
              operator-verified Reddit threads lead the page, above everything
              else. Other articles keep it mid-body (rendered in the loop). */}
          {isLegitArticle && subjectReddit && (
            <div className="mb-8">
              <RedditThreadCarousel
                providers={[subjectReddit]}
                reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
              />
            </div>
          )}
          {/* Direct answer up top (featured-snippet target) - code-injected so
              it also covers articles whose body lives in the CMS blob. */}
          {ARTICLE_QUICK_ANSWERS[slug] && (
            <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-800">
              <div className="qa">
                <strong>Short answer</strong>
                {ARTICLE_QUICK_ANSWERS[slug]}
                {/* Dated price stamp: answer engines prefer a figure with an
                    explicit "as of" date; the date is the price index's own
                    verification date, so it moves only when prices are re-checked. */}
                {/\$\d/.test(ARTICLE_QUICK_ANSWERS[slug]) && (
                  <span className="mt-2 block text-[13px] text-gray-500">
                    {QUICK_ANSWER_STAMPS[slug] ?? (
                      <>
                        Prices checked on each provider&rsquo;s website on{" "}
                        {new Date(PRICE_INDEX_VERIFIED).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}.
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
          {legitData && legitProvider && (
            <LegitChecklist data={legitData} provider={legitProvider} linkPrefix={ctx.prefix} />
          )}
          {/* Key takeaways - 3-4 verified bullets, scannable and quotable
              (featured snippets / AI overviews lift lists like this whole). */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mb-8 rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 sm:p-6">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">Key points</p>
              <ul className="space-y-2">
                {article.keyTakeaways.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-800">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Table of contents - anchor jump-links. Signals structure to Google
              (eligible for "jump to" sitelinks) and improves navigation on long
              articles. Rendered only when there are enough sections to warrant it. */}
          {article.sections.length >= 4 && (
            <nav aria-label="Table of contents" className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-gray-400">
                On this page
              </p>
              <ol className="space-y-1.5">
                {article.sections.map((s, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-snug">
                    <span className="shrink-0 font-semibold text-gray-400">{i + 1}.</span>
                    <a href={`#${slugifyHeading(s.heading)}`} className="text-[#0C4B75] hover:underline">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <article className="space-y-8">
            {article.sections.map((section, i) => (
              <div key={i}>
                <section id={slugifyHeading(section.heading)}>
                  <h2 className="mb-3 text-[20px] font-bold text-[#191919] scroll-mt-24">
                    {section.heading}
                  </h2>
                  {/* div (not p) so author HTML can include block elements -
                      lists, tables, callouts - styled via .article-body css */}
                  <div
                    className="article-body text-[16px] leading-[1.75] text-gray-800 [&_a]:text-[#0C4B75] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#093d61]"
                    dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(section.body) }}
                  />
                </section>

                {/* Tirzepatide guide: code-rendered price table (CTAs, review
                    links, Trustpilot per row) right under the "cheapest" section,
                    then the cross-provider carousel of tirzepatide reviews. */}
                {isTirzGuide && i === 1 && (
                  <>
                    <TirzepatidePriceTable providers={config.providers} linkPrefix={ctx.prefix} />
                    {tirzReviews.length > 0 && (
                      <div className="my-10">
                        <MixedTrustpilotCarousel
                          items={tirzReviews}
                          title="Trustpilot reviews that mention tirzepatide"
                          subtitle="All saved reviews from any provider that mention tirzepatide, Zepbound or Mounjaro, newest first, with reviewer names shortened."
                        />
                      </div>
                    )}
                    {/* Top-providers conversion block: the ranked comparison-page
                        cards + CTAs on an otherwise-prose buyer guide. Oct 22,
                        2026 (operator request): moved up one notch, from under
                        the third section to here, directly after the price
                        table and Trustpilot carousel, so the cards follow the
                        prices without a section of prose in between. Gated per
                        slug (see showTopProvidersCro). */}
                    {showTopProvidersCro && (
                      <TopProvidersBlock
                        config={config}
                        linkPrefix={ctx.prefix}
                        limit={3}
                        providerIds={TIRZ_TOP_IDS}
                        priceNotes={tirzPriceNotes}
                        introMode="short"
                        title="Best 3 tirzepatide providers right now"
                        subtitle="The top-ranked providers that publish a compounded tirzepatide price we have checked. These are the cards from our full ranking, with each tirzepatide price shown below the starting price."
                      />
                    )}
                  </>
                )}

                {legitData && legitProvider && i === legitCaptureAfter && (
                  <PricingCapture data={legitData} provider={legitProvider} />
                )}
                {legitData && legitProvider && i === article.sections.length - 1 && (
                  <LegitVerdictCta data={legitData} provider={legitProvider} linkPrefix={ctx.prefix} />
                )}

                {/* Tirzepatide guide: the verdict gets a CTA - the no-commitment
                    pick and the 12-month floor, both at their verified rates. */}
                {isTirzGuide && i === article.sections.length - 1 && tirzEmbody && (
                  <div className="my-8 rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                    <div>
                      <p className="text-[15px] font-bold text-[#191919]">Lowest price without a contract: {tirzEmbody.name}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-gray-600">
                        {tirzNote("embody")?.replace("Tirzepatide ", "Compounded tirzepatide ")}, billed month to month, shipped in 1-2 days, with a full refund if you are not approved.
                        {tirzWellmedr && tirzNote("wellmedr") && (
                          <>
                            {" "}Comfortable with a 12-month plan?{" "}
                            <ProviderCta
                              href={tirzWellmedr.affiliateUrl}
                              providerName={tirzWellmedr.name}
                              providerSlug={tirzWellmedr.id}
                              position={2}
                              pageType="listing"
                              sourceFlow="main_comparison"
                              className="font-semibold text-[#0C4B75] hover:underline"
                            >
                              {tirzWellmedr.name} at {PRICE_INDEX.find((r) => r.providerId === "wellmedr")?.tirzepatide?.price}/mo →
                            </ProviderCta>
                          </>
                        )}
                      </p>
                    </div>
                    <ProviderCta
                      href={tirzEmbody.affiliateUrl}
                      providerName={tirzEmbody.name}
                      providerSlug={tirzEmbody.id}
                      position={1}
                      pageType="listing"
                      sourceFlow="main_comparison"
                      className="mt-4 inline-flex h-[46px] w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] px-6 text-[14.5px] font-bold text-white transition-colors hover:bg-[#093d61] sm:mt-0 sm:w-auto"
                    >
                      See if you qualify at {tirzEmbody.name}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </ProviderCta>
                  </div>
                )}

                {i === 0 && showTopTwo && <TopTwoPicks config={config} linkPrefix={ctx.prefix} />}

                {/* Provider-"alternatives" guides: CRO block of our three GLP-1
                    partners with the comparison-page cards (see showPartnerCro). */}
                {i === 0 && showPartnerCro && (
                  <TopProvidersBlock
                    config={config}
                    linkPrefix={ctx.prefix}
                    limit={3}
                    providerIds={["embody", "altrx", "trimrx"]}
                    introMode="short"
                    title="Recommended GLP-1 providers"
                    subtitle="Three telehealth providers our editors recommend, shown with the same cards as our full ranking."
                  />
                )}

                {/* Subject-provider social proof, high on the page: Trustpilot
                    carousel after the first section, Reddit carousel after the
                    second (or first, on very short articles). Verified data
                    only - providers without it simply render nothing. */}
                {i === 0 && subjectTrustpilot && (
                  <div className="my-10 space-y-3">
                    <TrustpilotSummary
                      providerName={subjectTrustpilot.name}
                      reviews={subjectTrustpilot.trustpilotReviews!}
                      rating={subjectTrustpilot.trustpilotRating}
                      reviewCount={subjectTrustpilot.trustpilotReviewCount}
                    />
                    <TrustpilotCarousel
                      providerName={subjectTrustpilot.name}
                      providerLogo={subjectTrustpilot.logo}
                      reviews={subjectTrustpilot.trustpilotReviews!}
                      rating={subjectTrustpilot.trustpilotRating}
                      reviewCount={subjectTrustpilot.trustpilotReviewCount}
                    />
                  </div>
                )}
                {!isLegitArticle && i === Math.min(1, article.sections.length - 1) && subjectReddit && (
                  <div className="my-10">
                    <RedditThreadCarousel
                      providers={[subjectReddit]}
                      reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
                    />
                  </div>
                )}

                {/* Full-catalog product carousel mid-article (weight-loss only) -
                    after roughly the halfway section, never at the bottom. */}
                {i === Math.max(0, Math.ceil(article.sections.length / 2) - 1) && (
                    <div className="my-10">
                      <ProductCarousel
                        providers={config.providers}
                        onlyProviderIds={
                          restrictCarouselToSubject && subjectProvider ? [subjectProvider.id] : undefined
                        }
                        onlyMedication={restrictCarouselToSubject && subjectProvider ? undefined : carouselMedication}
                        limit={restrictCarouselToSubject && subjectProvider ? undefined : isTirzGuide ? undefined : 8}
                        title={
                          restrictCarouselToSubject && subjectProvider
                            ? `${subjectProvider.name} GLP-1 plans and prices`
                            : carouselTitle
                        }
                        subtitle={
                          restrictCarouselToSubject && subjectProvider
                            ? `Every plan ${subjectProvider.name} publishes, with its terms listed under each price.`
                            : carouselSubtitle
                        }
                        withSchema
                        pageUrl={canonicalUrl(ctx, `/articles/${slug}`)}
                      />
                    </div>
                  )}

                {/* Editorial callout after 4th section - GLP-1 copy, so
                    weight-loss articles only (it was leaking onto every
                    vertical's articles before this gate). */}
                {!isTirzGuide && i === 3 && article.sections.length > 4 && (
                  <div className="my-10 overflow-hidden rounded-xl bg-transparent">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 py-6 pr-6 sm:py-8 sm:pr-8">
                        <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#0C4B75] sm:text-[20px]">
                          Is GLP-1 Treatment Right for You?
                        </h3>
                        <p className="mb-3 text-[16px] leading-[1.75] text-gray-800">
                          GLP-1 medication is prescription-only: a licensed clinician has to decide it is appropriate, and it is not a fit for everyone. Side effects are possible, and they tend to show up in the first few weeks while your body adapts.
                        </p>
                        <p className="mb-3 text-[16px] leading-[1.75] text-gray-800">
                          Results are usually best when the medication is paired with simple daily habits, such as balanced meals and regular movement.
                        </p>
                        <p className="text-[16px] leading-[1.75] text-gray-800">
                          For both safety and lasting progress, pick a provider that screens you properly before prescribing and keeps following up once treatment starts.
                        </p>
                      </div>
                      <div className="flex items-center justify-center sm:w-[260px] sm:shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/editorial-injection.png"
                          alt="Woman getting a GLP-1 weight loss injection pen ready"
                          className="h-[200px] w-full object-cover sm:h-full sm:rounded-r-xl"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* The inline "Top-Rated Providers" strip that sat here after
                    the 2nd section (three logo rows with taglines) was removed
                    Oct 8, 2026 at the operator's request. The TopProvidersBlock
                    and the end-of-article CTA remain. */}
              </div>
            ))}
          </article>

          {/* CTA box */}
          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 text-center sm:p-8">
            <p className="text-[18px] font-bold text-[#191919]">
              {isTirzGuide ? "See every tirzepatide provider in one ranking" : "Which weight loss provider fits you best?"}
            </p>
            <p className="mt-1 text-[14px] text-gray-500">
              {isTirzGuide
                ? "All providers with a checked compounded tirzepatide price, ranked on cost, plans, shipping and reviews."
                : "Our ranking compares the leading providers on price, clinical support and medication choices."}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={hubLink(ctx, isTirzGuide ? "/tirzepatide" : "/")}
                className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                {isTirzGuide ? "View tirzepatide ranking" : "View the Ranking"}
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-5 text-[18px] font-bold text-[#191919]">
                You Might Also Like
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedArticles.map((ra) => (
                  <Link
                    key={ra.slug}
                    href={hubLink(ctx, `/articles/${ra.slug}`)}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold mb-2 ${categoryColors[ra.category] || "bg-gray-100 text-gray-600"}`}
                    >
                      {ra.category}
                    </span>
                    <p className="text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#0C4B75] transition-colors">
                      {ra.title}
                    </p>
                    <p className="mt-1.5 text-[12px] text-gray-400 line-clamp-2">
                      {ra.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next navigation */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {prevArticle ? (
              <Link
                href={hubLink(ctx, `/articles/${prevArticle.slug}`)}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#0C4B75] transition-colors" strokeWidth={2} />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Previous
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#0C4B75] transition-colors">
                    {prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle && (
              <Link
                href={hubLink(ctx, `/articles/${nextArticle.slug}`)}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md sm:text-right sm:flex-row-reverse"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#0C4B75] transition-colors" strokeWidth={2} />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Next
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#0C4B75] transition-colors">
                    {nextArticle.title}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* Contextual comparison hub (weight-loss): routes informational
              readers into the highest-intent comparison pages. Code-injected,
              so it also renders on articles whose bodies live in the CMS blob. */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
              <h2 className="mb-1 text-[17px] font-bold text-[#191919]">Popular provider matchups</h2>
              <p className="mb-4 text-[13.5px] text-gray-500">
                Side-by-side comparisons with checked prices, the ones readers rely on most when choosing.
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  { href: "/embody-vs-wellmedr", label: "embody vs welludr: $69 or $49" },
                  { href: "/altrx-vs-embody", label: "altRx vs embody: $89 or $69" },
                  { href: "/healthrx-vs-medvi", label: "HealthRx vs Medvi: prepaid or monthly" },
                  { href: "/embody-vs-altrx-vs-wellmedr", label: "Lowest-cost trio: embody vs altRx vs welludr" },
                ].map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                  >
                    <span className="truncate">{c.label}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  </Link>
                ))}
              </div>
            </div>

          <MedicalSources vertical={ctx.vertical} />

          </div>
        </div>
      </div>
    </>
  );
}
