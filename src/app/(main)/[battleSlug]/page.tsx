import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ROOT_CONTEXT } from "@/lib/site-context";
import { BattlePageView, battleMetadata } from "@/components/pages/battle-page";
import { isComparisonSlug } from "@/lib/compare";

export const revalidate = 3600;

// Single-segment keyword landing pages (/semaglutide, /tirzepatide, ...).
// Head-to-head and three-way comparisons live under /compare/<slug>; a bare
// comparison URL is 301'd there by the proxy, with this redirect as fallback.
const RESERVED_SLUGS = ["about", "admin", "api", "articles", "compare", "disclaimer", "find-your-match", "reviews"];

async function baseMetadata(battleSlug: string): Promise<Metadata> {
  if (RESERVED_SLUGS.includes(battleSlug) || isComparisonSlug(battleSlug)) return {};
  return battleMetadata(battleSlug, ROOT_CONTEXT);
}

export async function generateMetadata({ params }: { params: Promise<{ battleSlug: string }> }): Promise<Metadata> {
  const { battleSlug } = await params;
  return withSeo(`/${battleSlug}`, await baseMetadata(battleSlug));
}

export default async function LandingPage({ params }: { params: Promise<{ battleSlug: string }> }) {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return notFound();
  if (isComparisonSlug(battleSlug)) permanentRedirect(`/compare/${battleSlug}`);
  return BattlePageView({ slug: battleSlug, ctx: ROOT_CONTEXT });
}
