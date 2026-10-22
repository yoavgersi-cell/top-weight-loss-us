import { NextResponse, type NextRequest } from "next/server";
import { SLUG_ALIASES } from "@/lib/slug-aliases";

const CANONICAL_HOST = "www.topweightloss.us";

// Content paths that were consolidated onto a stronger page. Resolved here so
// each one collapses to its destination in a single 301.
const PATH_REDIRECTS: Record<string, string> = {
  "/embody-vs-noom": "/reviews/embody",
  "/noom-vs-embody": "/reviews/embody",
  "/embody-vs-found": "/reviews/embody",
  "/articles/embody-weight-loss-review": "/reviews/embody",
  "/articles/glp1-pills-vs-injections": "/glp1-pills-vs-injections",
  "/articles/online-vs-clinic-weight-loss": "/articles/in-person-vs-online-weight-loss",
  "/articles/noom-vs-glp1-providers": "/best-online-weight-loss-programs",
  "/articles/noom-weight-loss-review": "/articles/best-noom-alternatives",
  "/articles/noom-subscription-cost": "/articles/best-noom-alternatives",
  "/articles/best-weight-loss-telehealth-providers": "/",
  "/articles/altrx-vs-ro": "/altrx-vs-ro",
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

  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (segments.length === 1 && last && SLUG_ALIASES[last]) {
    const url = req.nextUrl.clone();
    url.pathname = `/${SLUG_ALIASES[last]}`;
    return NextResponse.redirect(url, 301);
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
