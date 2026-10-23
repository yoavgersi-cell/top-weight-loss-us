import type { Metadata } from "next";
import { SEO_META } from "@/data/seo-meta";
import { clampMetadata } from "@/lib/utils";

// Applies the page's entry from src/data/seo-meta.ts (written for this
// domain) over the metadata a template generates, then clamps the
// description length. Pages without an entry keep their generated metadata.
export function withSeo(path: string, base: Metadata): Metadata {
  const entry = SEO_META[path];
  if (!entry) return clampMetadata(base);
  const og = (base.openGraph ?? {}) as Record<string, unknown>;
  const tw = (base.twitter ?? {}) as Record<string, unknown>;
  return clampMetadata({
    ...base,
    title: { absolute: entry.title },
    description: entry.description,
    openGraph: { ...og, title: entry.title, description: entry.description },
    twitter: { ...tw, title: entry.title, description: entry.description },
  } as Metadata);
}
