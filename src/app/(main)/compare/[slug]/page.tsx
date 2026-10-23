import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROOT_CONTEXT } from "@/lib/site-context";
import { BattlePageView, battleMetadata } from "@/components/pages/battle-page";
import { isComparisonSlug } from "@/lib/compare";

export const revalidate = 3600;

// Head-to-head (/compare/altrx-vs-ro) and three-way comparisons.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isComparisonSlug(slug)) return {};
  return withSeo(`/compare/${slug}`, await battleMetadata(slug, ROOT_CONTEXT));
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isComparisonSlug(slug)) return notFound();
  return BattlePageView({ slug, ctx: ROOT_CONTEXT });
}
