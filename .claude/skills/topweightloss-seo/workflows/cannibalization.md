# Cannibalisation check (two pages competing for the same queries)

Run only with at least 28 days of Search Console data. Earlier data is too thin to decide anything.

## Data to request from the owner
Search Console > Performance > Search results, last 28 days (and 3 months when available), export with the Queries AND Pages tabs. Best: the query + page pairs (filter by page, or the API/Looker export with both dimensions).

## Analysis
1. For each query with impressions, list every URL that received impressions for it. Queries served by 2+ URLs are candidates.
2. For each candidate pair, compare: impressions, clicks, average position, which URL Google prefers over time, and the pages' intent (is one a hub and the other a spoke with a narrower intent?).
3. Known pairs to check first (Oct 2026 suspicions):
   - `/cheapest-glp1` vs `/cheapest-weight-loss-medication` vs `/articles/weight-loss-medication-without-insurance`
   - `/articles/is-ro-legit` vs `/reviews/ro` (and `/articles/ro-cost`)
   - `/articles/medvi-cost` vs `/articles/medvi-tirzepatide-cost`
   - Medicare sections of `/articles/glp1-cost-2026-how-to-pay-less` vs `/articles/glp1-after-65-medicare`

## Decision per pair
- **Differentiate** (default when intents differ): sharpen each page's title/H1/intro to its own intent, link the spoke to the hub with a descriptive anchor and the hub down to the spoke.
- **Consolidate** (same intent, one clearly weaker): merge the useful content into the stronger page, 301 the weaker one (`src/proxy.ts` `PATH_REDIRECTS`), retire it (`RETIRED_ARTICLE_SLUGS` for articles), repoint every internal link, remove its `seo-meta` entry and cluster membership. Precedent: `weight-loss-medication-cost-guide` -> the 2026 cost pillar.
- **Leave alone** when both pages rank and earn clicks for different queries.

Present the evidence table and recommendation to the owner before any merge or redirect (hard to reverse).
