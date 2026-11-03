---
name: topweightloss-seo
description: The SEO / GEO / AEO content and audit workflow for topweightloss.us. Use for any content or SEO work on this repo - writing or deepening articles, acting on Search Console data, updating provider prices or Trustpilot data, changing a comparison winner, internal linking, medical-review logging, cannibalisation checks - and before merging any content PR (site check).
---

# topweightloss.us SEO / GEO / AEO workflow

topweightloss.us is an independent US comparison site for online GLP-1 weight loss providers (YMYL health content, affiliate revenue). Next.js 16 App Router; all content lives in code (no CMS). Read `AGENTS.md` before touching Next.js APIs.

This skill is the house playbook. Pick the workflow that matches the job:

| Job | Workflow |
|---|---|
| New long-form article (research → fact sheet → writers → fact-check → wire → PR) | `workflows/new-article.md` |
| Act on Search Console data (titles, deepen existing pages, answer queries) | `workflows/deepen-from-gsc.md` |
| Provider price change, Trustpilot update, comparison winner change | `workflows/data-updates.md` |
| Internal linking audit or pass | `workflows/internal-linking.md` |
| Medical reviewer sign-off, review log, reviewer schema | `workflows/medical-review.md` |
| Two pages competing for the same queries | `workflows/cannibalization.md` |
| Before every content PR | `scripts/site_check.py` (below) |

## House rules (apply to every job)

**Facts**
- No invented facts, numbers, prices, dates or quotes. Every number comes from a source you can link, the site's verified data files, or a dated operator-supplied screenshot/notice. If it cannot be verified, say it qualitatively or leave it out.
- Verified data lives in code: `src/lib/price-index.ts` (compounded prices + public `PRICE_CHANGELOG`), `src/lib/product-catalog.ts`, `src/data/products.json`, `src/data/trustpilot.ts` (verbatim reviews), `src/data/review-insights.ts`, `src/data/reviews.ts`, battles in `src/data/battles*.ts`, three-ways in `src/lib/three-way.ts`.
- Trustpilot/Reddit quotes are verbatim and never edited. Price history entries are never rewritten.
- Compounded drugs are never "FDA-approved" or "generic". Investigational drugs (retatrutide, CagriSema, amycretin, MariTide...) are always "not FDA-approved, not prescribable outside a clinical trial, no announced price"; never predict approval dates beyond what the company has stated.
- Trial results name the trial, duration, dose and estimand (efficacy estimand vs treatment-regimen). Cross-trial numbers are never presented as head-to-head.
- When a fact in existing content contradicts verified data, fix it and say so in the PR (this has caught real errors: ratings, doses, prices, a provider's medication lineup).

**Voice**
- Plain, warm, precise, second person, no hype. Answer first (1-2 quotable sentences naming the subject), then evidence, then what to do. Say who an option is NOT for.
- No em dashes or en dashes anywhere (hyphen, commas, colons). No "delve", "testament", "game-changer", "furthermore", "moreover", "in conclusion".
- Brand casing: ro (lowercase), welludr (provider id/slug `wellmedr`), embody, altRx, TrimRx, Medvi, DirectMeds, SHED, Sprout, Eden, HealthRx, bmiMD, found, Wegovy, Ozempic, Zepbound, Mounjaro, Foundayo, TrumpRx, NovoCare, LillyDirect.
- Site name "Top Weight Loss". Never mention treatmentshub.com (the sister site this codebase came from; never write to that repo).

**SEO / GEO structure**
- Question-style section headings (they feed FAQPage schema), unique per page.
- Titles <= 60 chars with the searched term first; descriptions 120-160 chars with a concrete number. Central meta lives in `src/data/seo-meta.ts` (applied by `withSeo`). Keep titles distinct from treatmentshub's (`references/treatmentshub-meta.tsv`, similarity <= 0.6 via `scripts/meta_check.py`).
- Tables for anything tabular; inline source links `<a href="URL" target="_blank" rel="noopener">`; internal links root-relative.
- Affiliate links always carry `rel` with `sponsored` and/or `nofollow` (`ProviderCta` does this; any raw `<a href={affiliateUrl}>` must too).

**Change discipline (do not churn)**
- One release per batch; then let Google crawl. Do not rewrite the same titles or URLs again within 4-6 weeks unless data justifies it. Price/Trustpilot/fact fixes are always fine.
- `updatedAt` / `dateModified` changes only with a material content change (no fake freshness).
- URL removals: 301 in `src/proxy.ts` `PATH_REDIRECTS`, retire in `RETIRED_ARTICLE_SLUGS` (`src/lib/config-store.ts`), and repoint internal links to the new URL (never link to a redirect).
- Medical review claims only for pages actually reviewed (see `workflows/medical-review.md`).

**Git / delivery**
- Work on the session branch, commit with clear messages, open a PR, merge only when the owner says "merge it". Keep PR descriptions specific (what changed, why, checks).

## Checks before every content PR

```bash
npx tsc --noEmit -p .
npx next build
npx next start -p 3123 &   # then:
python3 -I .claude/skills/topweightloss-seo/scripts/site_check.py --base http://localhost:3123
python3 -I .claude/skills/topweightloss-seo/scripts/meta_check.py
```

`site_check.py` crawls every sitemap URL and reports: non-200s, H1 count != 1, invalid JSON-LD, `reviewedBy` on a non-WebPage node, visible "Reviewed for medical accuracy" byline without schema (or the reverse), internal links to non-sitemap pages, unmarked affiliate links, em/en dashes in visible text, and in-prose inbound link counts for any URLs you pass with `--watch`. Fix everything it flags before the PR.
