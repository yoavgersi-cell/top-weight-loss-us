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
    "Paying yourself, Zepbound (tirzepatide) costs $299 for 2.5 mg, $399 for 5 mg and $449 for 7.5 mg to 15 mg per 4-week supply through LillyDirect, TrumpRx or a pharmacy with Lilly's self-pay card, as of November 2026; the $449 price requires refilling within 45 days.",
    "A year of weekly tirzepatide takes 13 four-week fills, so a full year at the $449 maintenance price is $5,837 before insurance or savings cards.",
    "Mounjaro is the same molecule but costs $499 a month self-pay; with commercial coverage the Zepbound or Mounjaro savings card can bring a fill to as little as $25, and Medicare's GLP-1 Bridge covers the Zepbound KwikPen for a $50 copay for eligible beneficiaries.",
    "Compounded tirzepatide from online clinics costs from $71 to $299 a month in our price check, but it is not FDA-approved, and no generic tirzepatide has been approved.",
  ],
  sections: [...tirzCostSectionsA, ...tirzCostSectionsB],
};
