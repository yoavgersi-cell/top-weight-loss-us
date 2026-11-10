import type { Article } from "../articles";
import { tirzCostSectionsA } from "./tirzepatide-cost-2026-a";
import { tirzCostSectionsB } from "./tirzepatide-cost-2026-b";

// Long-form tirzepatide cost guide (Nov 9, 2026): Zepbound self-pay ladder,
// Mounjaro, insurance, Medicare GLP-1 Bridge, savings cards, compounded
// tirzepatide prices and legal status, generics, year totals and the cheapest
// path by situation. Every figure is sourced inline; the full source list
// closes the final section. A top-3 partner block renders after section 2
// (TOP3_BLOCKS in article-page.tsx).
export const tirzepatideCost2026: Article = {
  slug: "tirzepatide-cost-2026",
  title: "Tirzepatide Cost in 2026: Zepbound, Mounjaro and Compounded Prices per Month",
  description:
    "What tirzepatide costs in 2026: Zepbound self-pay by dose, Mounjaro, insurance and the $50 Medicare GLP-1 Bridge, savings cards, compounded prices, year totals and the cheapest path.",
  category: "Cost",
  readTime: "55 min read",
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-09",
  heroColor: "#EEF4FA",
  author: "Top Weight Loss Research Team",
  keyTakeaways: [
    "Self-pay Zepbound: $299 (2.5 mg), $399 (5 mg) or $449 (7.5 mg to 15 mg) per 4-week supply through LillyDirect, TrumpRx or Lilly's pharmacy card; the $449 price requires refilling within 45 days.",
    "Full year: 13 four-week fills, so $5,837 at the $449 price before insurance or savings cards.",
    "Mounjaro: the same molecule at $499 a month self-pay.",
    "With insurance or Medicare: as little as $25 a fill with a savings card and commercial coverage, or a $50 copay for the Zepbound KwikPen through Medicare's GLP-1 Bridge if you are eligible.",
    "Compounded: $71 to $299 a month in our price check, but not FDA-approved; no generic tirzepatide has been approved.",
  ],
  takeawaysLead: "Tirzepatide costs depend on how you pay (as of November 2026):",
  sections: [...tirzCostSectionsA, ...tirzCostSectionsB],
};
