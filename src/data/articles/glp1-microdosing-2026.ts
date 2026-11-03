import type { Article } from "../articles";
import { microdoseSectionsA } from "./glp1-microdosing-2026-a";
import { microdoseSectionsB } from "./glp1-microdosing-2026-b";

// Long-form evidence guide (Nov 2, 2026): what "GLP-1 microdosing" means, who
// does it and why (survey data with limits), what lower-dose trial arms and
// SURMOUNT-MAINTAIN show, safety risks of self-adjusted dosing, cost math and
// questions for a prescriber. No dosing instructions. Every figure is sourced
// inline; the full source list closes the final section.
export const glp1Microdosing2026: Article = {
  slug: "glp1-microdosing-2026",
  title: "GLP-1 Microdosing in 2026: What the Evidence Actually Shows",
  description:
    "Does microdosing semaglutide or tirzepatide work? What surveys, dose-ranging trials and SURMOUNT-MAINTAIN show, the safety risks of self-dosing, and the cost math.",
  category: "Safety",
  readTime: "55 min read",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  heroColor: "#F3F0FA",
  author: "Top Weight Loss Research Team",
  keyTakeaways: [
    "No randomized trial has tested GLP-1 \"microdosing\" as it is marketed, and no human randomized trial of microdosing had reported results as of November 2026.",
    "Microdosing is common: in an Evidation survey of 8,486 current injectable GLP-1 users (self-reported, ISPOR 2026), 15.0% said they microdose now or did before, most often because of side effects, cost or weight maintenance.",
    "The best evidence for a lower dose is SURMOUNT-MAINTAIN: after weight loss on tirzepatide, people who stepped down to the labeled 5 mg dose were 16.6% below their starting weight at week 112, versus 21.9% on their maximum dose and 9.9% on placebo.",
    "Self-adjusted dosing carries real risks: FDA had received 990 adverse event reports tied to compounded semaglutide and more than 730 tied to compounded tirzepatide by May 31, 2026, and it has warned of overdoses caused by confusing milligrams, milliliters and units. Change your dose only with your prescriber.",
  ],
  sections: [...microdoseSectionsA, ...microdoseSectionsB],
};
