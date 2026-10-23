import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROOT_CONTEXT } from "@/lib/site-context";
import { BattlePageView, battleMetadata } from "@/components/pages/battle-page";

export const revalidate = 3600;

// Single-segment content pages: head-to-head comparisons (/altrx-vs-ro),
// three-way comparisons and keyword landing pages (/semaglutide).
const RESERVED_SLUGS = ["about", "admin", "api", "articles", "disclaimer", "find-your-match", "reviews"];

async function baseMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}): Promise<Metadata> {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return {};
  return (await battleMetadata(battleSlug, ROOT_CONTEXT));
}

export default async function BattlePage({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}) {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return notFound();
  return BattlePageView({ slug: battleSlug, ctx: ROOT_CONTEXT });
}

export async function generateMetadata(props: { params: Promise<Record<string, string>> }): Promise<Metadata> {
  const params = props.params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withSeo(`/${(await params).battleSlug}`, await baseMetadata(props as any));
}
