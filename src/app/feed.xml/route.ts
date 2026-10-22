import { NextResponse } from "next/server";
import { getConfig } from "@/lib/config-store";
import { NOINDEX_ARTICLE_SLUGS, type ArticleData } from "@/lib/config";

// RSS 2.0 feed of every published guide, newest update first. Feeds are one of
// the signals answer engines and Bing use to tell that a site publishes dated
// editorial. Every entry's
// title, description and dates come straight from the article record. Parked
// (noindex) articles are left out, as they are from the sitemap.

export const revalidate = 3600;

const HUB = "https://www.topweightloss.us";
const PARKED = new Set<string>(NOINDEX_ARTICLE_SLUGS);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function rfc822(iso?: string): string | undefined {
  const d = new Date(iso ?? "");
  return Number.isNaN(d.getTime()) ? undefined : d.toUTCString();
}

const stamp = (a: ArticleData) => Date.parse(a.updatedAt || a.publishedAt || "") || 0;

export async function GET() {
  const config = await getConfig();
  const entries = (config.articles ?? []).filter((a) => !PARKED.has(a.slug)).map((article) => ({ article }));
  entries.sort((a, b) => stamp(b.article) - stamp(a.article));
  const items = entries.slice(0, 100);
  const lastBuild = rfc822(items[0]?.article.updatedAt) ?? new Date().toUTCString();

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `<channel>`,
    `<title>Top Weight Loss - Guides</title>`,
    `<link>${HUB}</link>`,
    `<atom:link href="${HUB}/feed.xml" rel="self" type="application/rss+xml" />`,
    `<description>Independent guides to GLP-1 weight loss medication, costs and online providers.</description>`,
    `<language>en-us</language>`,
    `<lastBuildDate>${lastBuild}</lastBuildDate>`,
    ...items.map(({ article: a }) => {
      const url = `${HUB}/articles/${a.slug}`;
      const pub = rfc822(a.publishedAt) ?? rfc822(a.updatedAt);
      return [
        `<item>`,
        `<title>${esc(a.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        pub ? `<pubDate>${pub}</pubDate>` : "",
        a.category ? `<category>${esc(a.category)}</category>` : "",
        `<description>${esc(a.description)}</description>`,
        `</item>`,
      ]
        .filter(Boolean)
        .join("");
    }),
    `</channel>`,
    `</rss>`,
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
