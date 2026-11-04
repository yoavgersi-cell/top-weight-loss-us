#!/usr/bin/env python3
"""Crawl every sitemap URL of a running topweightloss.us build and report SEO problems.

Usage:
  npx next start -p 3123 &
  python3 -I .claude/skills/topweightloss-seo/scripts/site_check.py --base http://localhost:3123 [--watch /path ...]

Checks: HTTP status, exactly one <h1>, no skipped heading levels (h2 -> h4), valid JSON-LD, reviewedBy only on page
nodes (WebPage / MedicalWebPage / CollectionPage / ProfilePage), visible review
byline <-> reviewedBy schema agreement, internal links to non-sitemap pages,
affiliate links without rel sponsored/nofollow, em/en dashes in visible text.
--watch prints inbound link counts (all, and in-prose) for the given paths.
Exit code 1 when any problem is found.
"""
import argparse
import collections
import html
import json
import re
import sys
import urllib.request

HOST = "www.topweightloss.us"
AFFILIATE = re.compile(r"revoffers|aff_c|affid|offer_id|/glp1/offer|sub1=")
PAGE_TYPES = {"WebPage", "MedicalWebPage", "CollectionPage", "ProfilePage", "AboutPage", "FAQPage"}
BYLINE = "Reviewed for medical accuracy"
# Pages that explain the review process in prose without being reviewed pages.
BYLINE_EXEMPT = {"/how-we-rank", "/medical-review-policy"}


def fetch(base, path):
    req = urllib.request.Request(base + path, headers={"Host": HOST})
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""


def strip_chrome(s):
    for tag in ("script", "style", "header", "footer", "nav"):
        s = re.sub(rf"<{tag}\b.*?</{tag}>", "", s, flags=re.S)
    return s


def norm(href):
    href = href.split("#")[0].split("?")[0]
    href = re.sub(r"^https://www\.topweightloss\.us", "", href)
    if not href.startswith("/") or href.startswith("//"):
        return None
    if re.search(r"\.\w{2,5}$", href) or href.startswith(("/_next", "/api")):
        return None
    return href.rstrip("/") or "/"


def walk(node, fn):
    if isinstance(node, dict):
        fn(node)
        for v in node.values():
            walk(v, fn)
    elif isinstance(node, list):
        for v in node:
            walk(v, fn)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://localhost:3123")
    ap.add_argument("--watch", nargs="*", default=[])
    args = ap.parse_args()

    status, sm = fetch(args.base, "/sitemap.xml")
    if status != 200:
        sys.exit(f"sitemap.xml returned {status}")
    urls = [re.sub(r"^https://www\.topweightloss\.us", "", u) or "/" for u in re.findall(r"<loc>([^<]+)</loc>", sm)]
    live = set(urls)
    problems = collections.defaultdict(list)
    inbound_all = collections.defaultdict(set)
    inbound_prose = collections.defaultdict(set)

    for path in urls:
        status, page = fetch(args.base, path)
        if status != 200:
            problems["non-200"].append(f"{status} {path}")
            continue
        if page.count("<h1") != 1:
            problems["h1 count != 1"].append(f"{page.count('<h1')} {path}")
        body = re.sub(r"<script\b.*?</script>", "", page, flags=re.S)
        prev = 0
        for lv in (int(x) for x in re.findall(r"<h([1-6])\b", body)):
            if prev and lv > prev + 1:
                problems["heading level skip"].append(f"h{prev}->h{lv} {path}")
                break
            prev = lv

        has_review_schema = False
        for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S):
            try:
                data = json.loads(raw)
            except json.JSONDecodeError:
                problems["invalid JSON-LD"].append(path)
                continue

            def check(d):
                nonlocal has_review_schema
                if "reviewedBy" in d:
                    has_review_schema = True
                    t = d.get("@type")
                    types = set(t if isinstance(t, list) else [t])
                    if not types & PAGE_TYPES:
                        problems["reviewedBy on non-page node"].append(f"{t} {path}")

            walk(data, check)

        visible = strip_chrome(page)
        has_byline = BYLINE in visible
        if path not in BYLINE_EXEMPT and not path.startswith("/reviewers/") and has_byline != has_review_schema:
            problems["byline/schema mismatch"].append(f"byline={has_byline} schema={has_review_schema} {path}")

        text = html.unescape(re.sub(r"<[^>]+>", " ", visible))
        if re.search("[–—]", text):
            problems["em/en dash in visible text"].append(path)

        for a in re.finditer(r"<a\b([^>]*)>", page):
            attrs = a.group(1)
            href = re.search(r'href="([^"]+)"', attrs)
            if not href:
                continue
            if AFFILIATE.search(href.group(1)) and not re.search(r'rel="[^"]*(sponsored|nofollow)', attrs):
                problems["affiliate link without sponsored/nofollow"].append(f"{path} -> {href.group(1)[:60]}")

        for href in re.findall(r'href="([^"]+)"', visible):
            target = norm(href)
            if target is None or target == path:
                continue
            if target not in live:
                problems["internal link to non-sitemap URL"].append(f"{path} -> {target}")
            else:
                inbound_all[target].add(path)
        for block in re.findall(r"<(?:p|li|td)\b[^>]*>(.*?)</(?:p|li|td)>", visible, re.S):
            if len(re.sub(r"<[^>]+>", " ", block).split()) < 12:
                continue
            for href in re.findall(r'href="([^"]+)"', block):
                target = norm(href)
                if target and target != path and target in live:
                    inbound_prose[target].add(path)

    print(f"Crawled {len(urls)} sitemap URLs from {args.base}")
    for kind, items in problems.items():
        print(f"\n[{kind}] {len(items)}")
        for item in sorted(set(items))[:25]:
            print("  ", item)
    if args.watch:
        print("\nInbound links (all / in-prose):")
        for w in args.watch:
            print(f"  {w}: {len(inbound_all[w])} / {len(inbound_prose[w])}")
    if not problems:
        print("\nNo problems found.")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
