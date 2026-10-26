# Top Weight Loss

Source for [topweightloss.us](https://www.topweightloss.us): an independent comparison site for online GLP-1 weight loss providers in the US (compounded and brand-name semaglutide and tirzepatide).

Built on the same Next.js codebase and UI as treatmentshub.com/weight-loss (provider cards, CTAs, fonts, colors, hero and sidebar layout), as a single-topic site served at the domain root. All copy was written fresh for this domain; facts, prices, affiliate links, Trustpilot reviews and Reddit threads were carried over from the source data.

## Where things live

| What | File |
| --- | --- |
| Providers, affiliate links, card taglines | `src/data/products.json` |
| Ranking order and scores | `src/lib/config-store.ts` (`RANKING_ORDER`) |
| Provider reviews | `src/data/reviews.ts` |
| Head-to-head comparisons | `src/data/battles.ts`, `src/data/battles-2.ts` |
| Three-way comparisons | `src/lib/three-way.ts` |
| Articles | `src/data/articles/part-*.ts`, `src/data/brand-cluster-articles*.ts`, `src/data/pillar-glp1-online.ts` |
| Keyword landing pages (/semaglutide, /tirzepatide, ...) | `src/data/landing-pages.ts` |
| Trustpilot reviews (verbatim) | `src/data/trustpilot.ts` |
| Reddit threads (verbatim) | `src/components/reddit-community.tsx` |
| Homepage FAQ | `src/data/faqs.json` |
| Quiz (/find-your-match) | `src/data/quiz.ts` |
| Medical reviewer + review log | `src/data/reviewers.ts` |

Everything ships from code: there is no CMS or blob storage.

## SEO / GEO

- Canonical host `https://www.topweightloss.us`; the apex and other subdomains 301 to www, preview hosts are served `noindex` (`src/proxy.ts`).
- `/sitemap.xml`, `/robots.txt` (with a Content-Signal line), `/llms.txt` for AI answer engines, and `/feed.xml`.
- JSON-LD on every template: Organization, WebSite, WebPage + ItemList (home), editorial Review with our score (reviews), Article, FAQPage, BreadcrumbList. Trustpilot ratings are shown as attributed text and never marked up as AggregateRating (Google forbids aggregating ratings from other sites).
- Review insights (pros, cons, featured reviews) and the battle-page customer-experience table are computed from `src/data/review-insights.ts`, a tagged reading of the quoted Trustpilot reviews.

## Development

```bash
npm install
npm run dev
```

## Environment variables (Vercel)

- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 measurement ID (optional)
- `NEXT_PUBLIC_TABOOLA_PIXEL_ID`: Taboola pixel ID (optional; no default)
