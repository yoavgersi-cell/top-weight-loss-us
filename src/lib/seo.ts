import type { Metadata } from "next";
import { SEO_META } from "@/data/seo-meta";
import { clampMetadata } from "@/lib/utils";
import { DEFAULT_OG_IMAGE } from "@/lib/schema-image";

const ORIGIN = "https://www.topweightloss.us";

// Page-level openGraph replaces the layout's object wholesale (no deep merge),
// so pages that set their own openGraph lost og:image, og:type and og:url.
// Fill those gaps here: the page's own values always win.
function withOgDefaults(path: string, m: Metadata): Metadata {
  const og = (m.openGraph ?? {}) as Record<string, unknown>;
  const tw = (m.twitter ?? {}) as Record<string, unknown>;
  const hasImage = Boolean(og.images && (!Array.isArray(og.images) || og.images.length > 0));
  return {
    ...m,
    openGraph: {
      ...og,
      url: og.url ?? `${ORIGIN}${path === "/" ? "" : path}`,
      type: og.type ?? "website",
      siteName: og.siteName ?? "Top Weight Loss",
      locale: og.locale ?? "en_US",
      ...(hasImage ? {} : { images: [DEFAULT_OG_IMAGE] }),
    } as Metadata["openGraph"],
    twitter: {
      ...tw,
      card: "summary_large_image",
      ...(tw.images ? {} : { images: [hasImage ? (Array.isArray(og.images) ? og.images[0] : og.images) : DEFAULT_OG_IMAGE.url] }),
    } as Metadata["twitter"],
  };
}

// Applies the page's entry from src/data/seo-meta.ts (written for this
// domain) over the metadata a template generates, then clamps the
// description length and fills Open Graph / Twitter defaults. Pages without
// an entry keep their generated title and description.
export function withSeo(path: string, base: Metadata): Metadata {
  const entry = SEO_META[path];
  if (!entry) return clampMetadata(withOgDefaults(path, base));
  const og = (base.openGraph ?? {}) as Record<string, unknown>;
  const tw = (base.twitter ?? {}) as Record<string, unknown>;
  return clampMetadata(
    withOgDefaults(path, {
      ...base,
      title: { absolute: entry.title },
      description: entry.description,
      openGraph: { ...og, title: entry.title, description: entry.description },
      twitter: { ...tw, title: entry.title, description: entry.description },
    } as Metadata),
  );
}
