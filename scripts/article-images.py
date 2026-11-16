#!/usr/bin/env python3
"""Generate hero images + alt text for articles that have none (OpenAI).

Usage:
  OPENAI_API_KEY=... python3 scripts/article-images.py            # next 5 articles
  python3 scripts/article-images.py --count 3
  python3 scripts/article-images.py --slug tirzepatide-cost-2026  # one article (e.g. a new one)
  python3 scripts/article-images.py --dry-run                     # list what would be done

For each article: gpt-4.1-mini writes an image brief and the alt text from the
article's title, description and key takeaways, following the site's image
rules (no brand packaging or logos, no text, no before/after bodies, no
clinicians implying endorsement); gpt-image-2 draws it; Pillow crops to 16:9
and saves public/article-images/<slug>.webp (1536x864, under ~300 KB). The
image path, alt text, model and date go into src/data/article-images.json,
which the site merges into articles that have no hand-set image.

Order: the most-visited articles first (PRIORITY), then the rest A-Z.
Retired and noindex articles are skipped. Requires: Pillow.
"""
import argparse
import base64
import datetime
import glob
import io
import json
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "article-images")
REGISTRY = os.path.join(ROOT, "src", "data", "article-images.json")
TEXT_MODEL = os.environ.get("OPENAI_TEXT_MODEL", "gpt-4.1-mini")
IMAGE_MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-2")
API = "https://api.openai.com/v1"

# Most-shown articles in Search Console (Nov 2026) get images first.
PRIORITY = [
    "is-ro-legit", "best-ro-alternatives", "in-person-vs-online-weight-loss", "wellmedr-cost",
    "tirzepatide-cost-2026", "choosing-telehealth-weight-loss-provider", "ro-cost",
    "compounded-semaglutide-vs-brand-name", "wegovy-pill-price-online", "how-to-get-ozempic-online",
    "can-you-get-ozempic-without-doctor", "what-to-eat-on-glp1-medication", "exercise-while-on-glp1-medication",
    "glp1-cost-2026-how-to-pay-less", "how-long-for-semaglutide-to-work", "glp1-side-effects-risks-2026",
]

BRIEF_RULES = """You art-direct hero images for Top Weight Loss, an independent US site comparing online GLP-1 weight loss providers (a health topic, so images must be trustworthy and calm).
Return JSON: {"prompt": "...", "alt": "..."}.
prompt (for an image model, 60-110 words): ONE concrete scene that is specific to this article's subject, realistic editorial photography, soft natural daylight, calm and hopeful mood, subtle navy blue and soft light blue accents, landscape 3:2, main subject centered with generous margins (it is cropped to 16:9 and to a wide strip).
Pick the scene from the article's actual topic, for example: costs or insurance -> a person's hands with a calculator and a blank envelope at a desk; checking if a company is legit -> a magnifying glass over a laptop showing an abstract blurred web page; comparing providers -> two blurred laptop windows side by side or two neatly arranged plain boxes; online vs in-person care -> a phone or laptop on a home desk with a blurred video call of a person in casual clothes; food and diet -> a balanced plate, vegetables and protein; exercise -> walking shoes, resistance band, a person walking outdoors; side effects -> a glass of water, ginger tea, crackers; delivery or shipping -> a plain cardboard box at a front door; pills -> a plain unlabeled pill bottle. Use a plain injection pen ONLY when the article is about injections themselves, and never default to a pen, water glass and notebook still life.
Never write a provider name, company name, drug name, the article title or any words that could be drawn as text into the prompt; describe objects only.
Hard rules: NO text, letters, numbers, handwriting, labels, logos or brand names anywhere, including on screens, notebooks and packaging (screens show only abstract shapes or blurred color); no medication packaging; pens, vials and pill bottles plain and unbranded; no needles piercing skin; no before/after bodies, no bodies emphasized for weight, no scales; no doctors, nurses, scrubs, white coats or stethoscopes, including on screens; no recognizable real people or places; people, if shown, are adults of varied ages and backgrounds in everyday clothes; no money; nothing alarming or clinical.
alt (80-125 characters, never longer): describe ONLY what is visible, then say what the image is for in a few words that include the article's main search term, e.g. "Hand holding a magnifying glass over a laptop while checking whether ro is a legitimate telehealth provider". The provider name (if the article is about one) and generic drug names (semaglutide, tirzepatide) are allowed in the alt; never drug brand names. No mood words; no "image of" or "photo of"; no em or en dashes."""


def call(path, payload, timeout=300):
    key = os.environ.get("OPENAI_API_KEY", "proxy-injected")
    req = urllib.request.Request(
        f"{API}/{path}", data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def ts_objects():
    """Yield (slug, block) for every article object in src/data."""
    for f in glob.glob(os.path.join(ROOT, "src", "data", "**", "*.ts"), recursive=True):
        s = open(f, encoding="utf-8").read()
        for m in re.finditer(r'\n\s*slug:\s*"([a-z0-9-]+)",', s):
            nxt = s.find("slug: \"", m.end())
            yield m.group(1), s[m.end(): nxt if nxt > 0 else m.end() + 6000]


def articles():
    retired = set(re.findall(r'"([a-z0-9-]+)"', (re.search(r"RETIRED_ARTICLE_SLUGS[^=]*=\s*(?:new Set\()?\[(.*?)\]", open(os.path.join(ROOT, "src/lib/config-store.ts")).read(), re.S) or [None, ""])[1]))
    cfg = open(os.path.join(ROOT, "src/lib/config.ts")).read()
    noindex = set(re.findall(r'"([a-z0-9-]+)"', (re.search(r"NOINDEX_ARTICLE_SLUGS[^=]*=\s*\[(.*?)\]", cfg, re.S) or [None, ""])[1]))
    found = {}
    for slug, block in ts_objects():
        t = re.search(r'\btitle:\s*"((?:[^"\\]|\\.)*)"', block)
        d = re.search(r'\bdescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"', block)
        if not t or not d or "readTime" not in block[:1500] or slug in found:
            continue
        k = re.search(r"keyTakeaways:\s*\[(.*?)\n\s*\],", block, re.S)
        found[slug] = {
            "slug": slug, "title": t.group(1), "description": d.group(1),
            "takeaways": re.findall(r'"((?:[^"\\]|\\.)*)"', k.group(1))[:3] if k else [],
            "has_image": bool(re.search(r'\n\s*image:\s*"', block[:1500])),
        }
    return {s: a for s, a in found.items() if s not in retired and s not in noindex}


def brief(a):
    kind = (
        "This article checks whether a company is legitimate: use a verification scene (a magnifying glass over a laptop with an abstract screen, "
        "or a phone showing a plain shield shape, or a blank checklist), not a calculator or envelope. "
        if a["slug"].endswith("-legit") else ""
    )
    user = kind + f"Article title: {a['title']}\nDescription: {a['description']}\nKey points: " + " | ".join(a["takeaways"])
    r = call("chat/completions", {
        "model": TEXT_MODEL, "response_format": {"type": "json_object"}, "temperature": 0.7,
        "messages": [{"role": "system", "content": BRIEF_RULES}, {"role": "user", "content": user}],
    })
    out = json.loads(r["choices"][0]["message"]["content"])
    alt = re.sub(r"\s*[–—]\s*", ", ", out["alt"]).strip()
    alt = alt[:1].upper() + alt[1:]
    return out["prompt"].strip(), alt


IMAGE_SUFFIX = (
    " Strict requirements: absolutely no text, letters, words, numbers, handwriting, logos, signs, posters with words,"
    " book titles or labels anywhere in the image; every screen, page, notebook, envelope, box and label is completely blank"
    " or shows only soft abstract color; no doctors, nurses, white coats, scrubs or stethoscopes, including on screens;"
    " no brand packaging. Photorealistic editorial photo."
)

QA_RULES = """You check a hero image for a health website. Return JSON {"ok": true|false, "problems": ["..."]}.
Set ok to false if you see ANY of: legible or pseudo text, letters, numbers, handwriting, logos or brand names (on screens, paper, mugs, books, signs, packaging, calculators showing digits are allowed only if blurred); a doctor, nurse, white coat, scrubs or stethoscope (including on a screen); medication packaging with labels; needles in skin; before/after bodies or scales; anything distorted or alarming."""


def qa(raw):
    b64 = base64.b64encode(raw).decode()
    r = call("chat/completions", {
        "model": TEXT_MODEL, "response_format": {"type": "json_object"}, "temperature": 0,
        "messages": [{"role": "system", "content": QA_RULES}, {"role": "user", "content": [
            {"type": "text", "text": "Check this image."},
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}", "detail": "high"}},
        ]}],
    })
    out = json.loads(r["choices"][0]["message"]["content"])
    return bool(out.get("ok")), out.get("problems", [])


def draw(prompt):
    r = call("images/generations", {"model": IMAGE_MODEL, "prompt": prompt + IMAGE_SUFFIX, "size": "1536x1024", "quality": "medium", "n": 1}, timeout=600)
    item = r["data"][0]
    if item.get("b64_json"):
        return base64.b64decode(item["b64_json"])
    with urllib.request.urlopen(item["url"], timeout=120) as resp:
        return resp.read()


def save_webp(raw, slug):
    from PIL import Image
    im = Image.open(io.BytesIO(raw)).convert("RGB")
    w, h = im.size
    th = round(w * 9 / 16)
    if th < h:
        top = (h - th) // 2
        im = im.crop((0, top, w, top + th))
    im = im.resize((1536, 864), Image.LANCZOS)
    path = os.path.join(OUT_DIR, f"{slug}.webp")
    for q in (82, 76, 70, 64):
        im.save(path, "WEBP", quality=q, method=6)
        if os.path.getsize(path) <= 300_000:
            break
    return f"/article-images/{slug}.webp", os.path.getsize(path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=5)
    ap.add_argument("--slug", action="append", default=[])
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    registry = json.load(open(REGISTRY)) if os.path.exists(REGISTRY) else {}
    arts = articles()
    if args.slug:
        todo = [arts[s] for s in args.slug if s in arts]
        missing = [s for s in args.slug if s not in arts]
        if missing:
            sys.exit(f"Unknown or excluded article slug(s): {', '.join(missing)}")
    else:
        pending = [a for a in arts.values() if not a["has_image"] and a["slug"] not in registry]
        pending.sort(key=lambda a: (PRIORITY.index(a["slug"]) if a["slug"] in PRIORITY else len(PRIORITY), a["slug"]))
        todo = pending[: args.count]
        print(f"{len(arts)} articles, {len(pending)} without an image; doing {len(todo)}")
    if args.dry_run:
        for a in todo:
            print("  ", a["slug"])
        return

    done = []
    for a in todo:
        for attempt in range(1, 4):
            prompt, alt = brief(a)
            raw = draw(prompt)
            ok, problems = qa(raw)
            if ok:
                break
            print(f"   retry {a['slug']} (attempt {attempt}): {'; '.join(problems)[:200]}")
        else:
            print(f"SKIP {a['slug']}: failed the image check 3 times")
            continue
        rel, size = save_webp(raw, a["slug"])
        registry[a["slug"]] = {
            "image": rel, "imageAlt": alt, "model": IMAGE_MODEL,
            "generatedAt": datetime.date.today().isoformat(), "prompt": prompt,
        }
        json.dump(dict(sorted(registry.items())), open(REGISTRY, "w"), indent=2, ensure_ascii=False)
        open(REGISTRY, "a").write("\n")
        done.append(a["slug"])
        print(f"OK {a['slug']} ({size // 1024} KB)\n   alt: {alt}")
    print(f"Generated {len(done)} image(s).")


if __name__ == "__main__":
    main()
