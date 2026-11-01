#!/usr/bin/env python3
"""Replace the <!--SOURCES--> placeholder in a long-form article with its source list.

Usage:
  python3 -I .claude/skills/topweightloss-seo/scripts/build_sources.py src/data/articles/<slug>-a.ts src/data/articles/<slug>-b.ts

Collects every external <a href="http..."> across the given files (in order,
deduplicated), sorts by publisher domain, and writes an
"Every source cited in this guide (N)" list in place of the single
<!--SOURCES--> marker (which must appear exactly once across the files).
"""
import html
import re
import sys
from urllib.parse import urlparse


def main(paths):
    texts = {p: open(p, encoding="utf-8").read() for p in paths}
    holders = [p for p, t in texts.items() if "<!--SOURCES-->" in t]
    if len(holders) != 1 or texts[holders[0]].count("<!--SOURCES-->") != 1:
        sys.exit("Expected exactly one <!--SOURCES--> marker across the files.")
    seen, links = set(), []
    for t in texts.values():
        for m in re.finditer(r'<a href="(https?://[^"]+)"[^>]*>(.*?)</a>', t, re.S):
            url = m.group(1).replace("&amp;", "&")
            if url in seen:
                continue
            seen.add(url)
            links.append((url, re.sub(r"<[^>]+>", "", m.group(2)).strip()))
    domain = lambda u: urlparse(u).netloc.replace("www.", "")
    links.sort(key=lambda x: domain(x[0]))
    items = "\n".join(
        f'<li><a href="{html.escape(u, quote=True)}" target="_blank" rel="noopener">{domain(u)}</a>: {label}</li>'
        for u, label in links
    )
    block = f"<h3>Every source cited in this guide ({len(links)})</h3>\n<ul>\n{items}\n</ul>"
    p = holders[0]
    with open(p, "w", encoding="utf-8") as f:
        f.write(texts[p].replace("<!--SOURCES-->", block))
    print(f"Wrote {len(links)} sources into {p}")


if __name__ == "__main__":
    main(sys.argv[1:])
