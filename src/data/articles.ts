import { articlesPart1 } from "./articles/part-1";
import { articlesPart2 } from "./articles/part-2";
import { articlesPart3 } from "./articles/part-3";
import { glp1SideEffects2026 } from "./articles/glp1-side-effects-2026";
import { glp1Cost2026 } from "./articles/glp1-cost-2026";
import { newWeightLossDrugs2026 } from "./articles/new-weight-loss-drugs-2026";
import { glp1Microdosing2026 } from "./articles/glp1-microdosing-2026";
import { tirzepatideCost2026 } from "./articles/tirzepatide-cost-2026";
import { brandClusterArticles } from "./brand-cluster-articles";
import { pillarGlp1Online } from "./pillar-glp1-online";

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  heroColor: string;
  // Optional 16:9 hero/card image; falls back to the heroColor gradient.
  image?: string;
  // Alt text for that image (SEO + accessibility); falls back to the title.
  imageAlt?: string;
  author?: string;
  // Optional 3-4 verified takeaway bullets rendered in a box above the body.
  // Write them as "Label: short fact" (label up to 5 words): the label is
  // shown in bold, a format AI answers can lift almost word for word.
  keyTakeaways?: string[];
  // Optional one-line lead shown above the takeaways (e.g. "Tirzepatide
  // costs depend on how you pay:").
  takeawaysLead?: string;
  sections: { heading: string; body: string }[];
}

export const articles: Article[] = [
  ...articlesPart1,
  ...articlesPart2,
  ...articlesPart3,
  glp1SideEffects2026,
  glp1Cost2026,
  newWeightLossDrugs2026,
  glp1Microdosing2026,
  tirzepatideCost2026,
  ...brandClusterArticles,
  pillarGlp1Online,
];
