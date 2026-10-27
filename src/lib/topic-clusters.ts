// ───── Topic clusters (internal linking) ─────
// Every article belongs to one topic cluster with a single hub. Templates use
// this map to link each article up to its hub (high on the page), to a rotating
// set of siblings (bottom of the page) and to the cluster's key non-article
// pages, and to link each hub down to every member. One hub per topic keeps
// near-duplicate queries (e.g. "GLP-1 cost") pointed at one page instead of
// several competing ones. Provider entity clusters (review, legit, cost,
// alternatives, comparisons) are derived from the provider id, not listed here.

export interface TopicCluster {
  id: string;
  /** Short topic name used in headings ("More on ..."). */
  name: string;
  /** The hub: an article slug or a root-relative page path. */
  hub: { href: string; label: string };
  /** Article slugs in this cluster (the hub excluded). */
  articles: string[];
  /** Non-article pages that belong to the topic, with descriptive anchors. */
  pages: { href: string; label: string }[];
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: "cost",
    name: "GLP-1 costs and coverage",
    hub: { href: "/articles/glp1-cost-2026-how-to-pay-less", label: "GLP-1 costs in 2026: every way to pay less" },
    articles: [
      "semaglutide-cost-per-month",
      "weight-loss-medication-without-insurance",
      "glp1-with-insurance",
      "glp1-after-65-medicare",
      "lost-insurance-coverage-zepbound-wegovy",
      "zepbound-price-online",
      "wegovy-pill-price-online",
      "glp1-true-cost-month-1-vs-year-one",
      "what-100-to-200-a-month-gets-you-glp1",
      "before-you-prepay-glp1",
    ],
    pages: [
      { href: "/cheapest-glp1", label: "Cheapest GLP-1 providers, by verified price" },
      { href: "/cheapest-weight-loss-medication", label: "Cheapest weight loss medication online" },
      { href: "/glp1-price-changes", label: "GLP-1 price changes log" },
    ],
  },
  {
    id: "safety",
    name: "GLP-1 side effects and safety",
    hub: { href: "/articles/glp1-side-effects-risks-2026", label: "GLP-1 side effects in 2026: the real odds" },
    articles: [
      "semaglutide-side-effects-guide",
      "ozempic-hair-loss",
      "ozempic-face",
      "glp1-and-mental-health",
      "stopping-glp1-medication-what-happens",
      "first-month-weight-loss-medication",
    ],
    pages: [{ href: "/retatrutide-weight-loss", label: "Retatrutide: trial results and gray-market risks" }],
  },
  {
    id: "medications",
    name: "Choosing a GLP-1 medication",
    hub: { href: "/articles/best-glp1-for-weight-loss", label: "Best GLP-1 for weight loss, compared" },
    articles: [
      "how-glp1-medications-work",
      "tirzepatide-vs-semaglutide",
      "ozempic-vs-wegovy-differences",
      "mounjaro-vs-ozempic",
      "zepbound-vs-wegovy",
      "zepbound-vs-wegovy-vs-ozempic",
      "foundayo-vs-wegovy-pill",
      "how-long-for-semaglutide-to-work",
      "weight-loss-medication-that-works-fast",
      "compounded-semaglutide-vs-brand-name",
      "503a-vs-503b-pharmacy-28-day-rule",
      "best-ozempic-alternatives",
      "best-wegovy-alternatives",
      "best-mounjaro-alternatives",
    ],
    pages: [
      { href: "/semaglutide", label: "Semaglutide online: providers and prices" },
      { href: "/tirzepatide", label: "Tirzepatide online: providers and prices" },
      { href: "/best-weight-loss-injections", label: "Best weight loss injections" },
      { href: "/weight-loss-pills", label: "GLP-1 weight loss pills" },
      { href: "/glp1-pills-vs-injections", label: "GLP-1 pills vs injections" },
      { href: "/ozempic-alternatives", label: "Ozempic alternatives online" },
    ],
  },
  {
    id: "getting-started",
    name: "Getting a GLP-1 online",
    hub: { href: "/articles/glp1-weight-loss-online-complete-guide", label: "GLP-1 weight loss online: the complete guide" },
    articles: [
      "choosing-telehealth-weight-loss-provider",
      "in-person-vs-online-weight-loss",
      "who-qualifies-for-glp1-weight-loss",
      "how-to-get-ozempic-online",
      "can-you-get-ozempic-without-doctor",
      "best-tirzepatide-online",
      "best-ro-alternatives",
      "best-noom-alternatives",
    ],
    pages: [
      { href: "/how-to-choose-a-glp1-provider", label: "How to choose a GLP-1 provider" },
      { href: "/best-online-weight-loss-programs", label: "Best online weight loss programs" },
      { href: "/wegovy-providers", label: "Where to get Wegovy online" },
      { href: "/compare", label: "Every GLP-1 provider comparison" },
      { href: "/find-your-match", label: "Find your GLP-1 provider match" },
    ],
  },
  {
    id: "living",
    name: "Living well on a GLP-1",
    hub: { href: "/articles/what-to-eat-on-glp1-medication", label: "What to eat on GLP-1 medication" },
    articles: [
      "exercise-while-on-glp1-medication",
      "weight-loss-plateau-what-to-do",
      "emotional-eating-and-weight-loss",
      "glp1-weight-loss-for-women",
      "glp1-weight-loss-over-40",
      "menopause-weight-gain",
      "testosterone-and-weight-loss",
    ],
    pages: [{ href: "/glp1-weight-loss-statistics", label: "GLP-1 weight loss statistics" }],
  },
];

const hubSlug = (c: TopicCluster) => c.hub.href.replace(/^\/articles\//, "");

/** The cluster an article belongs to, and whether it is that cluster's hub. */
export function clusterForArticle(slug: string): { cluster: TopicCluster; isHub: boolean } | null {
  for (const c of TOPIC_CLUSTERS) {
    if (hubSlug(c) === slug) return { cluster: c, isHub: true };
    if (c.articles.includes(slug)) return { cluster: c, isHub: false };
  }
  return null;
}

/**
 * Siblings to link from a member article: a window of `count` members that
 * starts right after the article itself and wraps around, so every member is
 * linked from the same number of siblings instead of the first few getting
 * all the links.
 */
export function siblingSlugs(cluster: TopicCluster, slug: string, count: number): string[] {
  const list = cluster.articles;
  const i = list.indexOf(slug);
  if (i < 0) return list.slice(0, count);
  const out: string[] = [];
  for (let k = 1; k < list.length && out.length < count; k++) out.push(list[(i + k) % list.length]);
  return out;
}
