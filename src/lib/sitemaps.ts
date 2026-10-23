// ───── Sitemap ─────
// /sitemap.xml is a single urlset of every indexable page on topweightloss.us.
// Each entry's lastmod is the item's own updatedAt (stable fallback when none).
import type { MetadataRoute } from "next";
import { REVIEWERS } from "@/data/reviewers";
import { getConfig } from "@/lib/config-store";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";
import {
  CONTENT_LAST_UPDATED,
  latestUpdate,
  NOINDEX_ARTICLE_SLUGS,
  NOINDEX_WL_REVIEW_SLUGS,
  NOINDEX_WL_BATTLE_SLUGS,
  type SiteConfig,
} from "@/lib/config";
import { SITE_ORIGIN } from "@/lib/site-context";

const FALLBACK_DATE = new Date(CONTENT_LAST_UPDATED);

const flooredLastModified = (updatedAt?: string) => new Date(latestUpdate(updatedAt));

// Custom-coded standalone pages.
const WL_STATIC_PATHS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/find-your-match", priority: 0.8, changeFrequency: "monthly" },
  { path: "/glp1-provider-support", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-shipping-times", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-price-changes", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-provider-comparison", priority: 0.8, changeFrequency: "weekly" },
  { path: "/weight-loss-pills", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-pills-vs-injections", priority: 0.8, changeFrequency: "weekly" },
  { path: "/retatrutide-weight-loss", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ozempic-alternatives", priority: 0.8, changeFrequency: "weekly" },
  { path: "/cheapest-glp1", priority: 0.8, changeFrequency: "weekly" },
  { path: "/switch-from-ozempic", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-weight-loss-statistics", priority: 0.8, changeFrequency: "weekly" },
  { path: "/how-to-choose-a-glp1-provider", priority: 0.8, changeFrequency: "weekly" },
  { path: "/compare", priority: 0.9, changeFrequency: "weekly" },
  { path: "/how-we-rank", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.3, changeFrequency: "monthly" },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "monthly" },
  { path: "/medical-review-policy", priority: 0.4, changeFrequency: "monthly" },
];

export async function siteSitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getConfig();
  return [
    ...verticalEntries(SITE_ORIGIN, config, true),
    ...REVIEWERS.map((r) => ({
      url: `${SITE_ORIGIN}/reviewers/${r.slug}`,
      lastModified: new Date(`${r.since}-01`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}

// ───── XML serializers ─────
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const iso = (d: MetadataRoute.Sitemap[number]["lastModified"]) =>
  d ? new Date(d).toISOString() : undefined;

export function urlsetXml(entries: MetadataRoute.Sitemap): string {
  const body = entries
    .map((e) => {
      const lm = iso(e.lastModified);
      return (
        "<url>" +
        `<loc>${esc(e.url)}</loc>` +
        (lm ? `<lastmod>${lm}</lastmod>` : "") +
        (e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : "") +
        (e.priority !== undefined ? `<priority>${e.priority}</priority>` : "") +
        "</url>"
      );
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapIndexXml(sitemaps: { loc: string; lastmod?: Date }[]): string {
  const body = sitemaps
    .map((s) => `<sitemap><loc>${esc(s.loc)}</loc>${s.lastmod ? `<lastmod>${s.lastmod.toISOString()}</lastmod>` : ""}</sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export const XML_HEADERS = { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" };

export function newestLastModified(entries: MetadataRoute.Sitemap): Date | undefined {
  const times = entries.map((e) => (e.lastModified ? new Date(e.lastModified).getTime() : 0)).filter((t) => t > 0);
  return times.length ? new Date(Math.max(...times)) : undefined;
}

// Sitemap entries for one vertical, rooted at `base` (origin + /<vertical>).
function verticalEntries(base: string, config: SiteConfig, isWeightLoss: boolean): MetadataRoute.Sitemap {
  const P = (path: string) => `${base}${path}`;

  // Listing pages (vertical home, /reviews, /articles) change whenever one of
  // the items they list changes, so their lastmod is the newest child date -
  // a real value, not a shared constant.
  const newest = (dates: (string | undefined)[]) => {
    const real = dates.filter((d): d is string => !!d).sort();
    return real.length ? new Date(real[real.length - 1]) : FALLBACK_DATE;
  };
  const reviewsNewest = newest((config.reviews ?? []).map((r) => r.updatedAt));
  const articlesNewest = newest((config.articles ?? []).map((a) => a.updatedAt));
  const battlesNewest = newest((config.battles ?? []).map((b) => b.updatedAt));
  const homeNewest = new Date(Math.max(reviewsNewest.getTime(), articlesNewest.getTime(), battlesNewest.getTime()));

  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: homeNewest, changeFrequency: "weekly", priority: 0.9 },
    { url: P("/reviews"), lastModified: reviewsNewest, changeFrequency: "weekly", priority: 0.9 },
  ];

  // The articles index only earns a sitemap slot once the vertical actually
  // has articles - an empty "No articles" page is thin content.
  if ((config.articles ?? []).length > 0) {
    entries.push({ url: P("/articles"), lastModified: articlesNewest, changeFrequency: "weekly", priority: 0.8 });
  }

  // Reviews - provider reviews are indexable by default (operator policy, Aug
  // 2026: impressions on every vertical first). Exception: thin filler reviews
  // on weight-loss are noindex and dropped here so they match review-page robots
  // (Sep 2026 crawl-budget pruning).
  entries.push(
    ...(config.reviews ?? [])
      .filter((r) => !(isWeightLoss && NOINDEX_WL_REVIEW_SLUGS.has(r.slug)))
      .map((r) => ({
        url: P(`/reviews/${r.slug}`),
        lastModified: flooredLastModified(r.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.articles ?? [])
      .filter((a) => !NOINDEX_ARTICLE_SLUGS.includes(a.slug))
      .map((a) => ({
        url: P(`/articles/${a.slug}`),
        lastModified: flooredLastModified(a.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.battles ?? [])
      .filter((b) => !(isWeightLoss && NOINDEX_WL_BATTLE_SLUGS.has(b.slug)))
      .map((b) => ({
        url: P(`/compare/${b.slug}`),
        lastModified: flooredLastModified(b.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.landingPages ?? []).map((lp) => ({
      url: P(`/${lp.slug}`),
      lastModified: lp.updatedAt ? new Date(lp.updatedAt) : FALLBACK_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  // Curated 3-way comparisons (weight-loss only). Near-zero search demand, so
  // they're noindex and excluded here (Sep 2026 crawl-budget pruning).
  if (isWeightLoss) {
    entries.push(
      ...THREE_WAY_COMPARISONS.filter((t) => !NOINDEX_WL_BATTLE_SLUGS.has(t.slug)).map((t) => ({
        url: P(`/compare/${t.slug}`),
        lastModified: flooredLastModified(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    );
  }

  if (isWeightLoss) {
    entries.push(
      ...WL_STATIC_PATHS.map((s) => ({
        url: P(s.path),
        lastModified: FALLBACK_DATE,
        changeFrequency: s.changeFrequency,
        priority: s.priority,
      }))
    );
  }

  return entries;
}

