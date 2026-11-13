// BreadcrumbList structured data for simple pages (Home > Page). Templates
// that already emit their own BreadcrumbList do not use this.
const ORIGIN = "https://www.topweightloss.us";

export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${ORIGIN}${t.path === "/" ? "" : t.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
