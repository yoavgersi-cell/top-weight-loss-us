import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { ReviewsIndexView, reviewsIndexMetadata } from "@/components/pages/reviews-index-page";
import { ROOT_CONTEXT } from "@/lib/site-context";

export const revalidate = 60;

async function baseMetadata(): Promise<Metadata> {
  return reviewsIndexMetadata(ROOT_CONTEXT);
}

export default async function ReviewsPage() {
  return ReviewsIndexView({ ctx: ROOT_CONTEXT });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withSeo("/reviews", await baseMetadata());
}
