import { NextResponse, type NextRequest } from "next/server";
import { SLUG_ALIASES } from "@/lib/slug-aliases";

const CANONICAL_HOST = "www.topweightloss.us";

// Comparison slugs ("embody-vs-ro", "embody-vs-altrx-vs-medvi"). Root pages
// that contain "-vs-" but are guides, not comparisons, are listed separately.
const COMPARISON_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*-vs-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const NOT_COMPARISONS = new Set(["glp1-pills-vs-injections"]);

// Content paths that were consolidated onto a stronger page. Resolved here so
// each one collapses to its destination in a single 301.
const PATH_REDIRECTS: Record<string, string> = {
  "/embody-vs-noom": "/reviews/embody",
  "/noom-vs-embody": "/reviews/embody",
  "/embody-vs-found": "/reviews/embody",
  "/compare/embody-vs-noom": "/reviews/embody",
  "/compare/noom-vs-embody": "/reviews/embody",
  "/compare/embody-vs-found": "/reviews/embody",
  "/articles/embody-weight-loss-review": "/reviews/embody",
  "/articles/glp1-pills-vs-injections": "/glp1-pills-vs-injections",
  "/articles/online-vs-clinic-weight-loss": "/articles/in-person-vs-online-weight-loss",
  "/articles/noom-vs-glp1-providers": "/best-online-weight-loss-programs",
  "/articles/noom-weight-loss-review": "/articles/best-noom-alternatives",
  "/articles/noom-subscription-cost": "/articles/best-noom-alternatives",
  "/articles/best-weight-loss-telehealth-providers": "/",
  "/articles/altrx-vs-ro": "/compare/altrx-vs-ro",
  "/find-your-match-weight-loss": "/find-your-match",
};

// topweightloss.us is a single-topic site at the domain root.
//   • The apex and any other topweightloss.us subdomain 301 to www, one hop.
//   • Consolidated content paths and duplicate comparison slugs 301 to their
//     canonical page in one hop.
//   • Any other host (Vercel preview URLs) stays reachable but is never indexed.
export function proxy(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  const { pathname } = req.nextUrl;

  if (host.endsWith("topweightloss.us") && host !== CANONICAL_HOST) {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  if (PATH_REDIRECTS[pathname] !== undefined) {
    const url = req.nextUrl.clone();
    url.pathname = PATH_REDIRECTS[pathname];
    return NextResponse.redirect(url, 301);
  }

  // Comparisons live under /compare/<slug>. A bare /<a>-vs-<b> URL (the
  // original location) and any reversed or retired alias resolve to the
  // canonical comparison in a single 301.
  const segments = pathname.split("/").filter(Boolean);
  const inCompare = segments[0] === "compare" && segments.length === 2;
  const slug = inCompare ? segments[1] : segments.length === 1 ? segments[0] : undefined;
  if (slug) {
    const target = SLUG_ALIASES[slug] ?? slug;
    const isComparison = COMPARISON_RE.test(target) && !NOT_COMPARISONS.has(target);
    const dest = isComparison ? `/compare/${target}` : `/${target}`;
    if ((SLUG_ALIASES[slug] || (isComparison && !inCompare)) && dest !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = dest;
      return NextResponse.redirect(url, 301);
    }
  }

  const res = NextResponse.next();
  if (host !== CANONICAL_HOST && host !== "localhost") {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
