// IndexNow: tell Bing (and other IndexNow engines: Yandex, Seznam, Naver)
// which pages changed, so they re-crawl them soon instead of on their own
// schedule. Reads the LIVE sitemap and submits URLs whose <lastmod> is within
// the last N days (default 3), or every URL with --all.
//
// Usage: node scripts/indexnow.mjs            # recently updated pages
//        node scripts/indexnow.mjs --all      # every sitemap URL
//        node scripts/indexnow.mjs --days 7   # wider window
//        node scripts/indexnow.mjs --dry-run  # list URLs, submit nothing
// Runs from .github/workflows/indexnow.yml after each deploy to main.

const HOST = "www.topweightloss.us";
const KEY = "f95eb935c67033ab546c2fd3ba63c81a"; // public by design; served at /f95eb935c67033ab546c2fd3ba63c81a.txt
const SITEMAP = process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`;

const args = process.argv.slice(2);
const all = args.includes("--all");
const dry = args.includes("--dry-run");
const daysArg = args.indexOf("--days");
const days = daysArg >= 0 ? Number(args[daysArg + 1]) : 3;

const xml = await (await fetch(SITEMAP)).text();
const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => ({ loc: m[1], lastmod: m[2] }));
const cutoff = Date.now() - days * 86400000;
const urls = entries.filter((e) => all || (e.lastmod && Date.parse(e.lastmod) >= cutoff)).map((e) => e.loc);

console.log(`Sitemap: ${entries.length} URLs; submitting ${urls.length} (${all ? "all" : `lastmod within ${days} days`})`);
if (urls.length === 0) process.exit(0);
if (dry) {
  urls.forEach((u) => console.log("  " + u));
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});
console.log(`IndexNow response: ${res.status} ${res.statusText}`);
urls.forEach((u) => console.log("  " + u));
// 200 = accepted; 202 = accepted, key validation pending. Anything else fails the job.
if (res.status !== 200 && res.status !== 202) process.exit(1);
