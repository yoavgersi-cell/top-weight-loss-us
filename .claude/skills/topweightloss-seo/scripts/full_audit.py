#!/usr/bin/env python3
"""Full SEO / GEO / AEO audit of a running topweightloss.us build.

Usage:
  npx next start -p 3123 &
  python3 -I .claude/skills/topweightloss-seo/scripts/full_audit.py --base http://localhost:3123 [--out report.md]

Crawls every sitemap URL (as www.topweightloss.us) and checks:
  Technical: status, canonical (present, absolute, self, in sitemap), robots meta,
    title/description (present, length, unique), lang, viewport, Open Graph and
    Twitter tags, images without alt or dimensions, HTML weight, internal links to
    redirects / non-sitemap URLs, duplicate canonicals.
  Structured data: valid JSON-LD; Organization + WebSite on the home page;
    BreadcrumbList; Article/MedicalWebPage has headline, datePublished,
    dateModified, author, publisher, image; FAQPage present when a page has 3+
    question headings; no self-serving AggregateRating.
  GEO/AEO: question headings, a direct answer right after each question heading
    (first paragraph 15-80 words), visible "updated" date, author/byline, outbound
    citations on articles, key takeaways on articles.
  Site files: robots.txt (sitemap line, AI crawlers not blocked), llms.txt
    (every sitemap page listed), feed.xml, sitemap lastmod.
Prints a summary and writes a markdown report. Exit 1 when any ERROR is found.
"""
import argparse
import collections
import html
import json
import re
import sys
import urllib.error
import urllib.request
from urllib.parse import urlparse

HOST = "www.topweightloss.us"
ORIGIN = f"https://{HOST}"
PAGE_TYPES = {"WebPage", "MedicalWebPage", "CollectionPage", "ProfilePage", "AboutPage", "FAQPage", "ItemPage"}
AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Bingbot", "CCBot", "Applebot-Extended"]


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


OPENER = urllib.request.build_opener(NoRedirect)


def fetch(base, path):
    req = urllib.request.Request(base + path, headers={"Host": HOST, "User-Agent": "Mozilla/5.0 (audit)"})
    try:
        with OPENER.open(req, timeout=60) as r:
            return r.status, r.read().decode("utf-8", "replace"), dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, "", dict(e.headers or {})


def meta(page, attr, name):
    m = re.search(rf'<meta[^>]+{attr}="{re.escape(name)}"[^>]*content="([^"]*)"', page) or re.search(
        rf'<meta[^>]+content="([^"]*)"[^>]*{attr}="{re.escape(name)}"', page
    )
    return html.unescape(m.group(1)) if m else None


def strip(s):
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s))).strip()


def walk(node, fn):
    if isinstance(node, dict):
        fn(node)
        for v in node.values():
            walk(v, fn)
    elif isinstance(node, list):
        for v in node:
            walk(v, fn)


def types_of(d):
    t = d.get("@type")
    return set(t if isinstance(t, list) else [t]) if t else set()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://localhost:3123")
    ap.add_argument("--out", default="")
    args = ap.parse_args()

    issues = collections.defaultdict(list)  # (severity, check) -> [detail]

    def add(sev, check, detail):
        issues[(sev, check)].append(detail)

    # ── Site files ──
    st, robots, _ = fetch(args.base, "/robots.txt")
    if st != 200:
        add("ERROR", "robots.txt missing", str(st))
    else:
        if "Sitemap:" not in robots:
            add("ERROR", "robots.txt has no Sitemap line", "")
        groups = re.split(r"(?im)^user-agent:", robots)
        for bot in AI_BOTS:
            for g in groups:
                lines = g.strip().splitlines()
                if lines and lines[0].strip().lower() == bot.lower() and re.search(r"(?im)^disallow:\s*/\s*$", g):
                    add("WARN", "AI/search crawler blocked in robots.txt", bot)

    st, sm, _ = fetch(args.base, "/sitemap.xml")
    if st != 200:
        sys.exit(f"sitemap.xml returned {st}")
    entries = re.findall(r"<url><loc>([^<]+)</loc>(?:<lastmod>([^<]+)</lastmod>)?", sm)
    urls = [(re.sub(rf"^{re.escape(ORIGIN)}", "", u) or "/", lm) for u, lm in entries]
    paths = [u for u, _ in urls]
    live = set(paths)
    if any(not lm for _, lm in urls):
        add("WARN", "sitemap entries without lastmod", str(sum(1 for _, lm in urls if not lm)))

    st, llms, _ = fetch(args.base, "/llms.txt")
    if st != 200:
        add("WARN", "llms.txt missing", str(st))
    else:
        listed = {re.sub(rf"^{re.escape(ORIGIN)}", "", u).rstrip("/") or "/" for u in re.findall(r"\((https://[^)\s]+)\)", llms)}
        missing = [p for p in paths if p not in listed]
        if missing:
            add("INFO", "sitemap pages not listed in llms.txt", f"{len(missing)} of {len(paths)} (e.g. {', '.join(missing[:5])})")

    st, _, _ = fetch(args.base, "/feed.xml")
    if st != 200:
        add("INFO", "feed.xml missing", str(st))

    # ── Pages ──
    titles, descs, canon_seen = collections.defaultdict(list), collections.defaultdict(list), collections.defaultdict(list)
    redirect_cache = {}
    stats = collections.Counter()

    for path in paths:
        st, page, headers = fetch(args.base, path)
        stats["pages"] += 1
        if st != 200:
            add("ERROR", "sitemap URL not 200", f"{st} {path}")
            continue
        body = re.sub(r"<script\b.*?</script>", "", page, flags=re.S)
        stats["html_kb"] += len(page) // 1024
        if len(page) > 1_500_000:
            add("WARN", "very large HTML (>1.5 MB)", f"{len(page)//1024} KB {path}")

        # Head basics
        if not re.search(r'<html[^>]+lang="en', page):
            add("ERROR", "missing <html lang>", path)
        if 'name="viewport"' not in page:
            add("ERROR", "missing viewport meta", path)
        t = re.search(r"<title>(.*?)</title>", page, re.S)
        title = html.unescape(t.group(1)).strip() if t else ""
        if not title:
            add("ERROR", "missing <title>", path)
        else:
            titles[title].append(path)
            if len(title) > 65:
                add("WARN", "title over 65 chars (truncated in results)", f"{len(title)} {path}")
            if len(title) < 25:
                add("INFO", "short title (<25 chars)", f"{title} {path}")
        d = meta(page, "name", "description") or ""
        if not d:
            add("ERROR", "missing meta description", path)
        else:
            descs[d].append(path)
            if not 110 <= len(d) <= 165:
                add("INFO", "description length outside 110-165", f"{len(d)} {path}")
        rb = meta(page, "name", "robots") or ""
        if "noindex" in rb:
            add("ERROR", "noindex page listed in sitemap", path)
        c = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', page)
        canon = c.group(1) if c else ""
        if not canon:
            add("ERROR", "missing canonical", path)
        else:
            cpath = re.sub(rf"^{re.escape(ORIGIN)}", "", canon).rstrip("/") or "/"
            if not canon.startswith(ORIGIN):
                add("ERROR", "canonical not absolute https://www", f"{canon} {path}")
            elif cpath != path:
                add("WARN", "canonical points elsewhere", f"{path} -> {cpath}")
            canon_seen[cpath].append(path)
        for prop in ("og:title", "og:description", "og:url", "og:image", "og:type"):
            if not meta(page, "property", prop):
                add("WARN", f"missing {prop}", path)
        if not meta(page, "name", "twitter:card"):
            add("INFO", "missing twitter:card", path)

        # Headings
        h1 = re.findall(r"<h1\b", body)
        if len(h1) != 1:
            add("ERROR", "h1 count != 1", f"{len(h1)} {path}")
        heads = [(int(lv), strip(tx)) for lv, tx in re.findall(r"<h([1-6])\b[^>]*>(.*?)</h\1>", body, re.S)]
        questions = [tx for lv, tx in heads if lv in (2, 3) and tx.endswith("?")]

        # Images
        for img in re.findall(r"<img\b[^>]*>", body):
            if not re.search(r'\balt="', img):
                add("WARN", "image without alt attribute", f"{path}")
                break
        for img in re.findall(r"<img\b[^>]*>", body):
            if not (re.search(r'\bwidth="', img) and re.search(r'\bheight="', img)) and "fill" not in img and "absolute" not in img:
                stats["img_no_dims"] += 1

        # Internal links
        for href in set(re.findall(r'<a[^>]+href="(/[^"#?]*)', body)):
            target = href.rstrip("/") or "/"
            if re.search(r"\.\w{2,5}$", target) or target.startswith(("/_next", "/api")):
                continue
            if target not in live:
                if target not in redirect_cache:
                    rst, _, rh = fetch(args.base, target)
                    redirect_cache[target] = (rst, rh.get("Location") or rh.get("location"))
                rst, loc = redirect_cache[target]
                if rst in (301, 302, 307, 308):
                    add("WARN", "internal link to a redirect", f"{path} -> {target} -> {loc}")
                elif rst != 200:
                    add("ERROR", "broken internal link", f"{rst} {path} -> {target}")
                else:
                    add("INFO", "internal link to a page not in the sitemap", f"{path} -> {target}")

        # Structured data
        nodes = []
        for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S):
            try:
                nodes.append(json.loads(raw))
            except json.JSONDecodeError:
                add("ERROR", "invalid JSON-LD", path)
        all_types, flat = set(), []
        for n in nodes:
            walk(n, lambda d: (all_types.update(types_of(d)), flat.append(d)))
        if path == "/":
            for need in ("Organization", "WebSite"):
                if need not in all_types:
                    add("WARN", f"home page missing {need} schema", "/")
            org = next((d for d in flat if "Organization" in types_of(d)), None)
            if org and not org.get("logo"):
                add("WARN", "Organization schema has no logo", "/")
            if org and not org.get("sameAs"):
                add("INFO", "Organization schema has no sameAs (social profiles)", "/")
        elif "BreadcrumbList" not in all_types:
            add("WARN", "no BreadcrumbList schema", path)
        for d in flat:
            ty = types_of(d)
            if ty & {"Article", "NewsArticle", "BlogPosting"}:
                for f in ("headline", "datePublished", "dateModified", "author", "publisher", "image"):
                    if not d.get(f):
                        add("WARN", f"Article schema missing {f}", path)
            if "AggregateRating" in ty or d.get("aggregateRating"):
                add("ERROR", "AggregateRating in schema (third-party ratings are not allowed)", path)
            if "reviewedBy" in d and not ty & PAGE_TYPES:
                add("ERROR", "reviewedBy on a non-page node", path)
        if len(questions) >= 3 and "FAQPage" not in all_types:
            add("INFO", "3+ question headings but no FAQPage schema", f"{len(questions)} {path}")

        # GEO / AEO
        if path.startswith("/articles/") or path.startswith("/compare/") or path.startswith("/reviews/"):
            stats["content_pages"] += 1
            if not re.search(r"(Updated|Last updated|Checked|Last Updated)[^<]{0,40}20\d\d", strip(body)):
                add("WARN", "no visible updated/checked date", path)
            if not re.search(r"(By |Written by|Author|Research Team|Reviewed)", strip(body)):
                add("WARN", "no visible author/byline", path)
        if path.startswith("/articles/") and path != "/articles":
            stats["articles"] += 1
            if "Key takeaways" not in body and "Key points" not in body:
                add("INFO", "article without key takeaways", path)
            ext = set(re.findall(r'<a[^>]+href="(https?://[^"]+)"', body))
            ext = {u for u in ext if HOST not in u and "trustpilot" not in u}
            if len(ext) < 2:
                add("WARN", "article cites fewer than 2 outside sources", f"{len(ext)} {path}")
            # direct answer after question headings
            weak = 0
            for m in re.finditer(r"<h2\b[^>]*>([^<]*\?)</h2>\s*(?:<[^p][^>]*>\s*)*<p\b[^>]*>(.*?)</p>", body, re.S):
                words = len(strip(m.group(2)).split())
                if words < 12 or words > 90:
                    weak += 1
            if weak >= 4:
                add("INFO", "question headings whose first paragraph is not a short direct answer", f"{weak} {path}")

    for t, ps in titles.items():
        if len(ps) > 1:
            add("ERROR", "duplicate title", f"{t} | {', '.join(ps[:4])}")
    for d, ps in descs.items():
        if len(ps) > 1:
            add("WARN", "duplicate meta description", f"{', '.join(ps[:4])}")
    for c, ps in canon_seen.items():
        if len(ps) > 1:
            add("WARN", "several pages share a canonical", f"{c} <- {', '.join(ps[:4])}")
    if stats["img_no_dims"]:
        add("INFO", "img tags without width/height (layout shift risk)", str(stats["img_no_dims"]))

    order = {"ERROR": 0, "WARN": 1, "INFO": 2}
    lines = [f"# Full SEO/GEO/AEO audit", f"Crawled {stats['pages']} sitemap URLs ({stats['articles']} articles), average HTML {stats['html_kb']//max(stats['pages'],1)} KB.", ""]
    counts = collections.Counter()
    for (sev, check), items in sorted(issues.items(), key=lambda kv: (order[kv[0][0]], kv[0][1])):
        counts[sev] += len(items)
        lines.append(f"## [{sev}] {check} ({len(items)})")
        lines += [f"- {i}" for i in sorted(set(items))[:30]]
        lines.append("")
    lines.insert(2, f"Errors: {counts['ERROR']} · Warnings: {counts['WARN']} · Info: {counts['INFO']}")
    report = "\n".join(lines)
    print(report)
    if args.out:
        open(args.out, "w", encoding="utf-8").write(report)
    sys.exit(1 if counts["ERROR"] else 0)


if __name__ == "__main__":
    main()
