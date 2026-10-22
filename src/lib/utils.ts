import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Meta descriptions over ~160 characters are cut off in search results. Keep
// whole sentences when they fit; otherwise cut at a word boundary.
export function clampMeta(text: string, max = 160): string {
  const s = text.replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const head = s.slice(0, max);
  const sentenceEnd = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  if (sentenceEnd >= 110) return head.slice(0, sentenceEnd + 1);
  const space = head.lastIndexOf(" ", max - 1);
  return `${head.slice(0, space > 0 ? space : max - 1).replace(/[,;:\-]+$/, "")}…`;
}

// Provider names keep their own casing even at the start of a title.
const BRAND_CASE: [RegExp, string][] = [
  [/\bEmbody\b/g, "embody"],
  [/\bRo\b/g, "ro"],
  [/\bAltRx\b|\bAltrx\b|\bALTRX\b/g, "altRx"],
  [/\bShed\b/g, "SHED"],
  [/\bWelludr\b/g, "welludr"],
  [/\bTrimrx\b|\bTrimRX\b/g, "TrimRx"],
  [/\bBmimd\b|\bBmiMD\b/g, "bmiMD"],
  [/\bFound\b(?= vs| review)/gi, "found"],
];
export function fixBrandCase(text: string): string {
  return BRAND_CASE.reduce((acc, [re, to]) => acc.replace(re, to), text);
}

// Clamp a page's meta and OpenGraph descriptions in one place.
export function clampMetadata<T extends { description?: string | null; openGraph?: unknown }>(m: T): T {
  const og = m.openGraph as { description?: string } | undefined;
  return {
    ...m,
    ...(typeof m.description === "string" && { description: clampMeta(m.description) }),
    ...(og && typeof og.description === "string" && { openGraph: { ...og, description: clampMeta(og.description) } }),
  };
}
