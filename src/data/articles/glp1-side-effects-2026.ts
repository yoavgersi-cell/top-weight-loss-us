import type { Article } from "../articles";
import { sideEffectsSectionsA } from "./glp1-side-effects-2026-a";
import { sideEffectsSectionsB } from "./glp1-side-effects-2026-b";

// Long-form evidence guide (Oct 24, 2026) on GLP-1 side effects and emerging
// risks. Every factual claim is sourced inline; the verified fact sheet it was
// written from is listed in the final "Sources" section.
export const glp1SideEffects2026: Article = {
  slug: "glp1-side-effects-risks-2026",
  title: "GLP-1 Side Effects in 2026: Rare Risks, Real Odds, Evidence",
  description:
    "Every known GLP-1 side effect, from nausea to NAION, gallstones and muscle loss, with the real odds from FDA labels, EMA reviews and trials. Updated October 2026.",
  category: "Safety",
  readTime: "55 min read",
  publishedAt: "2026-10-24",
  updatedAt: "2026-10-24",
  heroColor: "#EEF4FB",
  author: "Top Weight Loss Research Team",
  keyTakeaways: [
    "Stomach side effects are the most common by far: on Wegovy in the STEP trials, 44% had nausea (vs 16% on placebo), and they peak while the dose is being raised.",
    "Serious risks are real but uncommon: gallstones (1.6% vs 0.7% on Wegovy), pancreatitis (0.2 cases per 100 patient-years) and pulmonary aspiration during anesthesia are all on the FDA label.",
    "Europe's regulator classes NAION, a sudden optic-nerve vision loss, as a very rare semaglutide side effect affecting up to 1 in 10,000 people; large reviews found no causal link to suicidal thoughts.",
    "About a quarter to two-fifths of the weight lost is lean mass, and most people regain much of the weight after stopping, so protein, strength training and a long-term plan matter as much as the prescription.",
  ],
  sections: [...sideEffectsSectionsA, ...sideEffectsSectionsB],
};
