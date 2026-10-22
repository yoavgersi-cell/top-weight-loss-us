import type { Metadata } from "next";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED } from "@/lib/config";
import { ROOT_CONTEXT, canonicalUrl } from "@/lib/site-context";
import { ComparisonLayout } from "@/components/comparison-layout";
import { EditorialContent } from "@/components/editorial-content";
import { ProductCarousel } from "@/components/product-carousel";
import { LatestGuides, newestGuides } from "@/components/latest-guides";

export const revalidate = 3600;

const META_DESCRIPTION =
  "Compare 2026's best online GLP-1 weight loss providers. Verified prices from $49/mo semaglutide and $89/mo tirzepatide, real reviews and side-by-side comparisons.";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  const url = canonicalUrl(ROOT_CONTEXT, "/");
  return {
    title: { absolute: config.hero.h1 },
    description: META_DESCRIPTION,
    alternates: { canonical: url },
    openGraph: { title: config.hero.h1, description: META_DESCRIPTION, url, type: "website" },
  };
}

export default async function HomePage() {
  const config = await getConfig();
  const ctx = ROOT_CONTEXT;
  const researchTeam = `The ${ctx.brandName} Research Team`;

  // WebPage + ItemList (ranked providers) + FAQPage schema: authorship,
  // freshness and the ranked entities in machine-readable form for search
  // engines and AI answer engines.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.hero.h1,
    description: config.hero.description,
    url: canonicalUrl(ctx, "/"),
    inLanguage: "en-US",
    datePublished: "2026-10-22",
    dateModified: CONTENT_LAST_UPDATED,
    isPartOf: { "@type": "WebSite", name: ctx.brandName, url: ctx.origin },
    author: { "@type": "Organization", name: researchTeam, url: canonicalUrl(ctx, "/about") },
    ...pageReviewSchema("/"),
    publisher: {
      "@type": "Organization",
      name: ctx.brandName,
      url: ctx.origin,
      logo: { "@type": "ImageObject", url: `${ctx.origin}/logo.png` },
    },
    mainEntity: {
      "@type": "ItemList",
      name: config.hero.h1,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: config.ranking.providerOrder.length,
      itemListElement: config.ranking.providerOrder.map((id, i) => {
        const p = config.providers.find((pr) => pr.id === id);
        return { "@type": "ListItem", position: i + 1, name: p?.name ?? id, url: canonicalUrl(ctx, `/reviews/${id}`) };
      }),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (config.faqs ?? []).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const byline = <MedicalReviewBar path="/" className="max-w-[760px]" />;

  return (
    <div className="bg-[#FAFAFA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema.mainEntity.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ComparisonLayout config={config} byline={byline}>
        <EditorialContent
          midSlot={
            <ProductCarousel
              providers={config.providers}
              title="Shop GLP-1 plans by product"
              subtitle="Every provider's published plans side by side - cheapest first, with the conditions under each price."
            />
          }
        />
        <section className="mx-auto max-w-[1200px] px-4 pb-12">
          <LatestGuides
            items={newestGuides({ "": config.articles ?? [] }, 6)}
            title="Latest weight loss guides"
            subtitle="Independent, dated guides from our editorial team - newest first."
            allHref="/articles"
            allLabel="All weight loss guides"
          />
        </section>
      </ComparisonLayout>
    </div>
  );
}
