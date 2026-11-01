# Internal linking

## Architecture (already built - extend, do not rebuild)
- `src/lib/topic-clusters.ts`: five clusters, each with one hub (cost, safety, medications, getting started, living well). Article pages link up to their hub near the top, to a rotating window of siblings at the bottom; hubs link down to every member (the cost hub also lists every provider cost page, the getting-started hub every legit check). New articles: add the slug to a cluster.
- Provider entity block on provider articles (review, legit, cost, alternatives, head-to-heads, three-ways). Review pages and three-way pages cross-link.
- `GuideCluster` (`src/components/guide-cluster.tsx`) cross-links standalone guides and the topic hubs.

## When to do a pass
After a batch of new or deepened pages, or when Search Console shows impressions on a page that few others link to. Measure first:

```bash
python3 -I .claude/skills/topweightloss-seo/scripts/site_check.py --base http://localhost:3123 --watch /articles/x /compare/y
```

`--watch` prints all-inbound and in-prose inbound counts for those URLs.

## Contextual (in-prose) links: the rules
- Link only where the source paragraph already discusses the target topic: wrap a natural phrase, or add ONE short navigation sentence at the end of the paragraph. No new facts in that sentence.
- At most one new link per target per source page; at most two new links on any page per pass; 3-4 new sources per target is plenty.
- Vary anchors, describe the target, never the full page title as the anchor, never two identical new anchors to one target.
- Never in headings, titles, meta, keyTakeaways or plain-text FAQ answers.
- Never link to a redirect or a retired page; repoint instead.
- Do not force it: skip a target rather than add links from unrelated pages.

## Anchors in templates
Template labels repeated hundreds of times must still describe the target ("Read our {provider} review", "More {provider} Reddit threads"), not "Read more" / "All threads".
