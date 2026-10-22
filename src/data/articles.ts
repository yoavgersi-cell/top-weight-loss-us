import { articlesPart1 } from "./articles/part-1";
import { articlesPart2 } from "./articles/part-2";
import { articlesPart3 } from "./articles/part-3";
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
  keyTakeaways?: string[];
  sections: { heading: string; body: string }[];
}

export const articles: Article[] = [
  ...articlesPart1,
  ...articlesPart2,
  ...articlesPart3,
  ...brandClusterArticles,
  pillarGlp1Online,
];
