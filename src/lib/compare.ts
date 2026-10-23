import { battles } from "@/data/battles";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";

// Every comparison slug served under /compare/<slug>: the head-to-head
// battles plus the three-way comparisons.
export const COMPARISON_SLUGS = new Set<string>([
  ...battles.map((b) => b.slug),
  ...THREE_WAY_COMPARISONS.map((t) => t.slug),
]);

export function isComparisonSlug(slug: string): boolean {
  return COMPARISON_SLUGS.has(slug);
}

export function compareHref(slug: string): string {
  return `/compare/${slug}`;
}
