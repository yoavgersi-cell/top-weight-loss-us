#!/usr/bin/env python3
"""Validate src/data/seo-meta.ts.

Usage: python3 -I .claude/skills/topweightloss-seo/scripts/meta_check.py

Flags titles over 60 characters, descriptions outside 120-160 characters,
em/en dashes, duplicate titles or descriptions, and titles/descriptions too
similar to the sister site's (references/treatmentshub-meta.tsv: path, title,
description) - title similarity > 0.6 or description similarity > 0.45.
"""
import difflib
import os
import re
import sys

ROOT = os.getcwd()
HERE = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(HERE, "..", "references", "treatmentshub-meta.tsv")


def main():
    src = open(os.path.join(ROOT, "src/data/seo-meta.ts"), encoding="utf-8").read()
    entries = re.findall(
        r'"(/[^"]*)":\s*\{\s*title:\s*"((?:[^"\\]|\\.)*)",\s*description:\s*"((?:[^"\\]|\\.)*)"', src
    )
    ref = {}
    if os.path.exists(REF):
        for line in open(REF, encoding="utf-8"):
            parts = line.rstrip("\n").split("\t")
            if len(parts) >= 3:
                ref[parts[0]] = (parts[1], parts[2])
    problems = []
    for path, title, desc in entries:
        issues = []
        if len(title) > 60:
            issues.append(f"title {len(title)} chars")
        if not 120 <= len(desc) <= 160:
            issues.append(f"description {len(desc)} chars")
        if re.search("[–—]", title + desc):
            issues.append("em/en dash")
        if path in ref:
            ts = difflib.SequenceMatcher(None, title.lower(), ref[path][0].lower()).ratio()
            ds = difflib.SequenceMatcher(None, desc.lower(), ref[path][1].lower()).ratio()
            if ts > 0.6:
                issues.append(f"title similarity to treatmentshub {ts:.2f}")
            if ds > 0.45:
                issues.append(f"description similarity to treatmentshub {ds:.2f}")
        if issues:
            problems.append(f"{path}: {', '.join(issues)} | {title}")
    titles = [t for _, t, _ in entries]
    descs = [d for _, _, d in entries]
    if len(set(titles)) != len(titles):
        problems.append("duplicate titles present")
    if len(set(descs)) != len(descs):
        problems.append("duplicate descriptions present")
    print(f"{len(entries)} meta entries checked")
    for p in problems:
        print("  ", p)
    if not problems:
        print("No problems found.")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
