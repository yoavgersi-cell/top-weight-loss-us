import { DEFAULT_VERTICAL } from "./config";

// ─────────────────────────────────────────────────────────────────────────────
// Site context
//
// topweightloss.us is a single-topic site served at the domain root. Page
// templates still receive a SiteContext (internal-link prefix, canonical
// origin, schema branding) so the same components render consistently.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_ORIGIN = "https://www.topweightloss.us";
export const SITE_NAME = "Top Weight Loss";
export const SITE_DOMAIN = "topweightloss.us";

export interface SiteContext {
  vertical: string;
  /** Prefix for internal (relative) links - always "" on this site. */
  prefix: string;
  /** Absolute origin used for canonical / OpenGraph / schema URLs. */
  origin: string;
  /** Path prefix inside the canonical origin - always "". */
  canonicalPrefix: string;
  /** Bare domain, for domain-style references. */
  brandDomain: string;
  /** Site name as Google should display it (schema, og:site_name, <title>). */
  brandName: string;
  /** Display name for schema author/publisher. */
  brandTeam: string;
  /** When true, pages in this context are kept out of the index. */
  noindex: boolean;
}

export const ROOT_CONTEXT: SiteContext = {
  vertical: DEFAULT_VERTICAL,
  prefix: "",
  origin: SITE_ORIGIN,
  canonicalPrefix: "",
  brandDomain: SITE_DOMAIN,
  brandName: SITE_NAME,
  brandTeam: `${SITE_NAME} Team`,
  noindex: false,
};

// Kept for template compatibility: every page renders in the root context.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function hubContext(_vertical?: string): SiteContext {
  return ROOT_CONTEXT;
}

// Absolute canonical URL for an internal path, e.g. canonicalUrl(ctx, "/reviews/altrx").
export function canonicalUrl(ctx: SiteContext, path: string): string {
  const tail = path === "/" ? "" : path;
  return `${ctx.origin}${ctx.canonicalPrefix}${tail}`;
}

export function verticalNameInProse(name: string): string {
  return name
    .split(" ")
    .map((w) => (w.length <= 4 && w === w.toUpperCase() ? w : w.toLowerCase()))
    .join(" ");
}

// Internal <Link> href for an internal path.
export function hubLink(ctx: SiteContext, path: string): string {
  if (path === "/") return ctx.prefix || "/";
  return `${ctx.prefix}${path}`;
}
