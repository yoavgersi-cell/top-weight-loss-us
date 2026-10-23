import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { DEFAULT_ROBOTS } from "@/lib/config";
import { ROOT_CONTEXT, canonicalUrl } from "@/lib/site-context";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";
import { pageReviewSchema } from "@/data/reviewers";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { FaqAccordion } from "@/components/faq-accordion";
import { withSeo } from "@/lib/seo";

export const revalidate = 3600;

const URL = canonicalUrl(ROOT_CONTEXT, "/compare");

export async function generateMetadata(): Promise<Metadata> {
  return withSeo("/compare", {
    title: { absolute: "GLP-1 Provider Comparisons 2026: Every Head-to-Head" },
    description:
      "Every online GLP-1 matchup we've run, in one table: our pick for each pair, semaglutide prices side by side, and a link to the full head-to-head.",
    robots: DEFAULT_ROBOTS,
    alternates: { canonical: URL },
    openGraph: { url: URL, type: "website" },
  });
}

const verified = new Date(`${PRICE_INDEX_VERIFIED}T00:00:00Z`).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

// Compounded semaglutide price: the verified price index first, then the
// provider review's own published plan. Brand-only programs show as such.
function semaPrice(providerId: string, reviews: { providerId: string; pricingPlans?: { medication: string; price: string }[] }[]): string {
  const indexed = PRICE_INDEX.find((r) => r.providerId === providerId)?.semaglutide?.price;
  if (indexed) return indexed;
  const plan = reviews
    .find((r) => r.providerId === providerId)
    ?.pricingPlans?.find((p) => /compounded semaglutide/i.test(p.medication));
  if (plan) return plan.price;
  return providerId === "ro" ? "brand only" : "n/a";
}

export default async function CompareHubPage() {
  const config = await getConfig();
  const name = (id: string) => config.providers.find((p) => p.id === id)?.name ?? id;
  const order = config.ranking.providerOrder;
  const rank = (id: string) => (order.indexOf(id) < 0 ? 99 : order.indexOf(id));

  // Head-to-heads, led by the matchups between the highest-ranked providers.
  const battles = [...(config.battles ?? [])].sort(
    (a, b) =>
      Math.min(rank(a.provider1Id), rank(a.provider2Id)) - Math.min(rank(b.provider1Id), rank(b.provider2Id)) ||
      Math.max(rank(a.provider1Id), rank(a.provider2Id)) - Math.max(rank(b.provider1Id), rank(b.provider2Id)),
  );
  const label = (b: (typeof battles)[number]) => b.matchupLabel || `${name(b.provider1Id)} vs ${name(b.provider2Id)}`;

  const faqs = [
    {
      question: "How do you decide the winner of a GLP-1 comparison?",
      answer:
        "Each head-to-head scores both providers on price, medication options, medical support, convenience and customer experience, using prices checked on the providers' own sites and their public Trustpilot records. The provider that wins more of those categories for most readers is our pick, and every page also says who should choose the other one.",
    },
    {
      question: "Which online GLP-1 provider wins the most comparisons?",
      answer: `Our overall ranking is led by ${name(order[0])}, followed by ${name(order[1])} and ${name(order[2])}. Head-to-head results depend on the pair: a cheaper provider usually wins on price, while a brand-name program can win on insurance support.`,
    },
    {
      question: "Are the prices in these comparisons current?",
      answer: `Semaglutide prices in the table were checked on each provider's website on ${verified}. Promotional prices change, so confirm the current rate at checkout before you buy.`,
    },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GLP-1 provider comparisons",
    numberOfItems: battles.length + THREE_WAY_COMPARISONS.length,
    itemListElement: [
      ...battles.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: label(b), url: canonicalUrl(ROOT_CONTEXT, `/compare/${b.slug}`) })),
      ...THREE_WAY_COMPARISONS.map((t, i) => ({
        "@type": "ListItem",
        position: battles.length + i + 1,
        name: t.title,
        url: canonicalUrl(ROOT_CONTEXT, `/compare/${t.slug}`),
      })),
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": URL,
    url: URL,
    name: "GLP-1 Provider Comparisons",
    description: "Head-to-head and three-way comparisons of online GLP-1 weight loss providers.",
    inLanguage: "en-US",
    dateModified: PRICE_INDEX_VERIFIED,
    isPartOf: { "@type": "WebSite", name: ROOT_CONTEXT.brandName, url: ROOT_CONTEXT.origin },
    ...pageReviewSchema("/compare"),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ROOT_CONTEXT, "/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: URL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="bg-[#FAFAFA]">
      {[collectionSchema, itemListSchema, breadcrumbSchema, faqSchema].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="mx-auto max-w-[1100px] px-4 pb-16 pt-6 sm:px-6 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
        <h1 className="text-[28px] font-extrabold leading-[1.15] text-[#191919] sm:text-[40px]">
          GLP-1 Provider Comparisons
        </h1>
        <p className="mt-3 max-w-[760px] text-[16px] leading-relaxed text-gray-600">
          Every online GLP-1 matchup we have run, in one place. Each row names our pick for the pair and shows both
          providers&rsquo; compounded semaglutide price, checked on {verified}. Open any comparison for the full
          breakdown of price, medications, support and customer reviews.
        </p>
        <div className="mt-4 max-w-[760px]">
          <MedicalReviewBar path="/compare" compact />
        </div>

        <section className="mt-10">
          <h2 className="text-[22px] font-bold text-[#191919] sm:text-[26px]">Head-to-head comparisons</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead className="bg-[#0C4B75]/[0.04] text-[12px] font-bold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Matchup</th>
                  <th className="px-4 py-3">Our pick</th>
                  <th className="px-4 py-3">Semaglutide, per month</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {battles.map((b) => {
                  const p1 = semaPrice(b.provider1Id, config.reviews ?? []);
                  const p2 = semaPrice(b.provider2Id, config.reviews ?? []);
                  return (
                    <tr key={b.slug} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-semibold text-[#191919]">{label(b)}</td>
                      <td className="px-4 py-3 text-gray-700">{name(b.winnerId)}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {name(b.provider1Id)} {p1} · {name(b.provider2Id)} {p2}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/compare/${b.slug}`}
                          className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-[#0C4B75] hover:underline"
                        >
                          Compare <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12.5px] text-gray-400">
            Brand only: the provider prescribes brand-name medication only. n/a: no compounded semaglutide price is published.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-[22px] font-bold text-[#191919] sm:text-[26px]">Three-way comparisons</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {THREE_WAY_COMPARISONS.map((t) => (
              <Link
                key={t.slug}
                href={`/compare/${t.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <p className="text-[16px] font-bold text-[#191919] group-hover:text-[#0C4B75]">{t.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-gray-600 line-clamp-3">{t.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="-mx-4 mt-6">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </div>
  );
}
