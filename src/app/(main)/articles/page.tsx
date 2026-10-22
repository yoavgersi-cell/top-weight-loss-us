import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { ArticlesIndexView, articlesIndexMetadata } from "@/components/pages/articles-index-page";
import { ROOT_CONTEXT } from "@/lib/site-context";

export const revalidate = 60;

async function baseMetadata(): Promise<Metadata> {
  return articlesIndexMetadata(ROOT_CONTEXT);
}

export default async function ArticlesPage() {
  return ArticlesIndexView({ ctx: ROOT_CONTEXT });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withSeo("/articles", await baseMetadata());
}
