import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { ReviewPageView, reviewMetadata } from "@/components/pages/review-page";
import { ROOT_CONTEXT } from "@/lib/site-context";

export const revalidate = 60;

async function baseMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return (await reviewMetadata(slug, ROOT_CONTEXT));
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return ReviewPageView({ slug, ctx: ROOT_CONTEXT });
}

export async function generateMetadata(props: { params: Promise<Record<string, string>> }): Promise<Metadata> {
  const params = props.params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withSeo(`/reviews/${(await params).slug}`, await baseMetadata(props as any));
}
