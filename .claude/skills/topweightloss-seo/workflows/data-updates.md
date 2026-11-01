# Data updates: prices, Trustpilot, comparison winners

These are always allowed, even during a content freeze. Accuracy beats stability.

## Provider price change (e.g. welludr Pre-Black Friday sale, Oct 28, 2026)
1. Source: the provider's page or an operator-supplied notice. Note exactly what is known (price, "from", sale or regular, start date) and what is not (plan length, dose rules, end date). Never attach old conditions to a new price.
2. Core data: `src/lib/price-index.ts` (row + a new dated `PRICE_CHANGELOG` entry at the top; keep old entries), `src/lib/product-catalog.ts`, `src/data/products.json`, `src/lib/provider-audit.ts`, `src/data/quiz.ts`, `src/lib/config.ts` copy.
3. Content: grep every mention (hundreds is normal). Split by file across 2-3 subagents with a strict brief: which numbers change, the full list of derived arithmetic to recompute (year totals, gaps vs rivals, ratios, ranges like "$49-$199"), what NOT to change (other providers sharing a number, verbatim quotes, history, dated screenshot captions).
4. Re-check claims that the new price makes false (e.g. "Medicare's $50 is below every compounded price").
5. Crawl the build and grep rendered pages for the old figure next to the provider name; leftovers must be history only.

## Trustpilot update (e.g. Eden 4.5 / 5,044, Oct 29, 2026)
1. `src/data/trustpilot.ts`: update `rating` / `reviewCount` and the dated comment; append new reviews verbatim at the END of the array (names to first name + last initial; relative times converted to dates, note possible one-day drift).
2. `src/data/review-insights.ts`: extend the provider's `tags` array to the new length (one tag string per review, uppercase = praise, lowercase = complaint) or the insights silently disappear; update `refs`, `featured` and the summary.
3. Replace the old count everywhere (`grep -rn "4,917"`-style), including products.json `reviewCount`, battle feature rows "(Mon DD, YYYY)", `glp1-provider-comparison` check dates and "dated X to Y" ranges.

## Comparison winner change (e.g. Eden over embody, altRx over TrimRx)
1. Check the page's own category scoring and the verified data support the new pick; if a category explanation contradicts verified prices, fix it.
2. Update in the battle object: `winnerId`, `updatedAt` (today), `description`, `intro`, `verdict`, swap `verdictWinnerPoints` / `verdictLoserPoints`, category winners that the data supports, the feature row, and the "Which is better" FAQ (must agree with the winner and say who should pick the other).
3. Meta in `src/data/seo-meta.ts` if it states the old pick (respect the title freeze otherwise).
4. Popups: per-page exclusions live in `POPUP_EXCLUDED` in `src/components/pages/battle-page.tsx`.
5. The loser keeps its real strengths in a "choose X instead if..." line. That is what makes the verdict credible.
