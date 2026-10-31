import type { Article } from "../articles";
import { pipelineSectionsA } from "./new-weight-loss-drugs-2026-a";
import { pipelineSectionsB } from "./new-weight-loss-drugs-2026-b";

// Long-form pipeline guide (Oct 31, 2026): approved obesity drugs, the
// late-stage pipeline (retatrutide, CagriSema, amycretin, MariTide and
// others), what is known about safety, price and coverage, and a start-now-
// or-wait framework. Every figure is sourced inline; the full source list
// closes the final section. Investigational drugs are never presented as
// available or approved.
export const newWeightLossDrugs2026: Article = {
  slug: "new-weight-loss-drugs-2026-2027",
  title: "New Weight Loss Drugs 2026-2027: What's Coming, When, and Whether to Wait",
  description:
    "Retatrutide, CagriSema, amycretin, MariTide and new GLP-1 pills: trial results, company-stated timelines, side effects, likely costs and whether to start treatment now.",
  category: "Science",
  readTime: "55 min read",
  publishedAt: "2026-10-31",
  updatedAt: "2026-10-31",
  heroColor: "#EEF4FB",
  author: "Top Weight Loss Research Team",
  keyTakeaways: [
    "No new weight loss drug beyond today's approved options can be prescribed outside a clinical trial yet. Retatrutide, CagriSema, amycretin and MariTide are investigational, with no FDA approval and no announced price.",
    "Retatrutide posted the largest results so far: 28.3% average weight loss at 80 weeks on the top dose in TRIUMPH-1 (efficacy estimand; 25.0% treatment-regimen in NEJM). Lilly plans to file with the FDA in Q1 2027; no approval date has been set.",
    "Novo Nordisk expects an FDA decision on CagriSema in Q4 2026, but in REDEFINE 4 it did not match tirzepatide (20.2% vs 23.6%), so Zepbound remains the strongest approved option on average.",
    "Waiting has a cost: weight lost on a GLP-1 tends to return after stopping, and people who switched to Foundayo kept most of their earlier loss, so starting an approved drug now and switching later is usually possible.",
  ],
  sections: [...pipelineSectionsA, ...pipelineSectionsB],
};
