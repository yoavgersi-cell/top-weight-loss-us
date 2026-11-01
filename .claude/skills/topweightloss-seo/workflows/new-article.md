# New long-form article (~12,500 words)

Proven on `/articles/glp1-cost-2026-how-to-pay-less` and `/articles/new-weight-loss-drugs-2026-2027`.

## 1. Pick the topic (research first, no writing yet)
- WebSearch (mode "extended") for what is in the news this month in GLP-1 / obesity care, and cross-check with the owner's Search Console queries (what the site already gets impressions for).
- Choose a topic that is (a) trending now, (b) high-intent for a provider-comparison site, (c) not already owned by an existing page. If an existing page covers it, deepen that page instead (`deepen-from-gsc.md`) or make the new article a hub that links down to it.
- Tell the owner the topic and why in 3-5 lines before writing.

## 2. Fact sheet (one research subagent)
- Brief a general-purpose subagent to write `<scratchpad>/<topic>/FACTS.md`: 120-220 numbered facts, each one precise sentence + exact source URL + source name/date + confidence HIGH / MEDIUM / UNVERIFIED, conflicts noted, a "re-verify" list at the end.
- Primary sources only (company releases, FDA, CMS, NEJM/Lancet/JAMA, ClinicalTrials.gov, KFF, IRS) or major outlets (Reuters, AP, STAT, CNBC, BioPharma Dive). Peptide, telehealth and affiliate blogs are never a sole source. WebFetch is often blocked by the network proxy; search excerpts quoting primary pages are acceptable, marked as such.
- Read its report. Turn every open question into an "Editor notes" block in the brief (e.g. "label both estimands", "do not cite X", "no approval date").

## 3. Brief + two parallel writers
- Write `<scratchpad>/<topic>/WRITING_BRIEF.md`: site context, voice (see SKILL.md), hard rules, allowed sources (FACTS.md, plus `src/lib/price-index.ts` for compounded prices and the cost fact sheet if relevant), citation format, 4-8 internal links per half from a given list, GEO structure per section (exact question heading, 1-2 sentence quotable answer, depth, tables), required information-gain pieces (a master table, a decision framework with computed numbers, a "how to read the headlines" checklist, a safety/limits table, "who this is NOT for"), output format, word target, checks, and a 26-section outline split A (1-13) / B (14-26).
- Writer files: `src/data/articles/<slug>-a.ts` exporting `<name>SectionsA: Article["sections"]` and `-b.ts` with `...SectionsB`. Section 26 is "Sources and how we researched this guide" and ends with the literal line `<!--SOURCES-->`.
- Launch two general-purpose subagents in one message, each told to read the brief + FACTS fully, run `npx tsc --noEmit -p .`, count words, check dashes, edit only its file, no git, and report facts it could not use.

## 4. Assemble
- `python3 -I .claude/skills/topweightloss-seo/scripts/build_sources.py src/data/articles/<slug>-a.ts src/data/articles/<slug>-b.ts` replaces `<!--SOURCES-->` with the deduplicated source list.
- Wrapper `src/data/articles/<slug>.ts` exporting an `Article` (slug, title, description, category, readTime, publishedAt = updatedAt = today, heroColor, author "Top Weight Loss Research Team", 4 sourced keyTakeaways, sections A+B). Register it in `src/data/articles.ts`.
- Meta in `src/data/seo-meta.ts` (title <= 60, description 120-160, numbers labeled honestly).
- Add the slug to the right cluster in `src/lib/topic-clusters.ts` (it then gets hub/sibling links automatically).
- Internal links inside the body must point to existing sitemap URLs.

## 5. Independent fact-check (one subagent)
- Check every number, date, link and arithmetic against the fact sheets, apply the Editor notes, remove UNVERIFIED/single-source items, keep the sources list in sync. Minimal edits, report each change.
- Read its report yourself; fix anything it flagged as unsure (e.g. mixed estimands in a lead).

## 6. Ship
- Build, run `site_check.py` and `meta_check.py`, commit, PR. New articles get NO reviewer byline until the medical reviewer signs them off (`medical-review.md`). Tell the owner to request indexing after merge.
