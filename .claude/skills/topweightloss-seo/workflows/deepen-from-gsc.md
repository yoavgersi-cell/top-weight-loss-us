# Act on Search Console data

Owner preference: **no new pages unless there is a clear opportunity; make existing pages deeper.**

## 1. Read the data honestly
- Note the window (24h / 7d / 28d) and that early data is thin. Average position and CTR mean little until there are a few weeks of data.
- Group queries into clusters (cost / no insurance, Ozempic online, provider X reviews / legit / cost, GLP-1 meals, stopping, timeline...). Map each cluster to the page Google already shows for it (ask the owner for the Query → Pages breakdown when unclear).
- Flag AI-Mode-style long prompts ("give me an honest review about ro...") - they mean the page is being used as an AI source; answer them directly on that page.
- Comparison pages earn clicks; protect and strengthen them.

## 2. Titles (once per cycle, then freeze)
- For pages with impressions and no clicks, put the searched words first in the `src/data/seo-meta.ts` title. Keep <= 60 chars and distinct from treatmentshub (`scripts/meta_check.py`).
- Do not touch the same titles again for 4-6 weeks.

## 3. Deepen pages (parallel subagents, one file each)
- Brief (see the Oct 29, 2026 pass): for each page, the exact queries it gets; add question-headed sections that answer them directly (1-2 sentence answer, then depth, tables), or expand an existing thin section instead of duplicating it. Target ~1,800-2,800 words per article. Set `updatedAt` to today (material change). 2-4 internal links. Facts only from site data, the fact sheets, or newly researched primary sources, linked inline.
- Split agents by FILE so no two edit the same file (articles live in `src/data/articles/part-*.ts`, `src/data/brand-cluster-articles*.ts`, `src/data/pillar-glp1-online.ts`, `src/data/landing-pages.ts`; standalone pages in `src/app/(main)/<route>/page.tsx`).
- Landing pages render `editorialSections` inside a `div` (block HTML is allowed).
- Comparison pages: add reader questions via the battle's `faqs` field (rendered + FAQPage). A hand-written "which is better" FAQ replaces the generic one; its answer must agree with `winnerId`.
- Review pages: `REVIEW_EXTRA_FAQS` in `src/components/pages/review-page.tsx`.

## 4. Verify
- Read each agent's report. Agents regularly surface stale or wrong existing text (old prices, unsourced timelines, wrong lineups): fix those with sources.
- Pages rewritten after the last medical review lose their reviewed byline until re-reviewed (handled automatically for articles via `updatedAt`; add non-article routes to `REVIEW_PENDING_PATHS`).
- Build, site check, PR.
