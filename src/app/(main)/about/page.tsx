import { withSeo } from "@/lib/seo";
import { REVIEWERS, REVIEW_LOG, reviewerDisplayName, reviewerPath, reviewerPersonSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Search,
  BadgeDollarSign,
  Stethoscope,
  RefreshCw,
  MessageSquareQuote,
  ListOrdered,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED, PRICE_CHANGELOG } from "@/lib/price-index";
import { NOINDEX_WL_REVIEW_SLUGS, NOINDEX_ARTICLE_SLUGS } from "@/lib/config";
import { REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";

export const revalidate = 60;

const CANONICAL = "https://www.topweightloss.us/about";

export const metadata: Metadata = withSeo("/about", {
  title: "About Top Weight Loss: How We Verify GLP-1 Prices",
  description:
    "Top Weight Loss compares US GLP-1 weight loss providers using prices checked on each provider's own site, verbatim customer reviews and a named medical reviewer.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "About Top Weight Loss: How We Verify GLP-1 Prices",
    description:
      "How Top Weight Loss checks every GLP-1 price, quotes customer reviews word for word, handles affiliate revenue and scores every provider with one rubric.",
    url: CANONICAL,
    type: "website",
  },
});

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// Operator-supplied crops of provider pricing pages, captured on the date
// below and used as evidence on the tirzepatide guide. Shown here as "what
// verification looks like"; captions state only what each crop shows.
const CAPTURES_DATE = "2026-10-05";
const CAPTURES = [
  { provider: "embody", image: "/verification/tirzepatide-embody.webp", width: 900, height: 368, shows: "flat pricing of $69/mo for semaglutide and $119/mo for tirzepatide" },
  { provider: "altRx", image: "/verification/tirzepatide-altrx.webp", width: 900, height: 638, shows: "semaglutide from $89 and tirzepatide from $149" },
  { provider: "welludr", image: "/verification/tirzepatide-wellmedr.webp", width: 900, height: 325, shows: "semaglutide from $49 a month and tirzepatide from $89" },
];

const VERTICAL_LINKS = [
  { name: "Best GLP-1 providers", href: "/", note: "The ranked list, with verified prices" },
  { name: "Provider reviews", href: "/reviews", note: "A full review of each program" },
  { name: "Comparisons", href: "/glp1-provider-comparison", note: "Head-to-heads and side-by-side tables" },
  { name: "Cheapest GLP-1", href: "/cheapest-glp1", note: "Programs sorted by lowest verified monthly price" },
  { name: "Guides", href: "/articles", note: "Explainers on medications, cost and safety" },
];

export default async function AboutPage() {
  const config = await getConfig();
  const reviewer = REVIEWERS[0];

  // Every figure on this page is computed from the live config, never typed in,
  // so the "what we cover" numbers can't drift from what the site actually has.
  const rankedProviders = config.ranking.providerOrder.length;
  const publishedReviews = (config.reviews ?? []).filter((r) => !NOINDEX_WL_REVIEW_SLUGS.has(r.slug)).length;
  const publishedGuides = (config.articles ?? []).filter((a) => !NOINDEX_ARTICLE_SLUGS.includes(a.slug)).length;
  const comparisons = (config.battles ?? []).length;
  const indexedProviders = PRICE_INDEX.length;
  const trustpilotCaptured = config.providers.reduce((n, p) => n + (p.trustpilotReviews?.length ?? 0), 0);
  const redditCaptured = Object.values(REDDIT_COMMUNITY_FEEDBACK).reduce((n, p) => n + p.threads.length, 0);
  const pagesReviewed = Object.keys(REVIEW_LOG).length;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Top Weight Loss",
    url: CANONICAL,
    mainEntity: {
      "@type": "Organization",
      name: "Top Weight Loss",
      url: "https://www.topweightloss.us",
      logo: "https://www.topweightloss.us/logo.png",
      description:
        "Independent comparisons of US GLP-1 and medical weight loss providers. Each GLP-1 price is checked against the provider's own published rate and every change is logged; medical statements go to a named reviewer.",
      areaServed: { "@type": "Country", name: "United States" },
      email: "contact@topweightloss.us",
      contactPoint: { "@type": "ContactPoint", email: "contact@topweightloss.us", contactType: "customer support", availableLanguage: "English" },
      foundingDate: "2026",
      knowsAbout: ["GLP-1 weight-loss treatment", "Telehealth weight loss providers", "Compounded semaglutide", "Compounded tirzepatide"],
      employee: REVIEWERS.map(reviewerPersonSchema),
    },
  };

  const stats = [
    { n: rankedProviders, label: "providers in the ranking" },
    { n: publishedReviews, label: "full provider reviews" },
    { n: comparisons, label: "head-to-head matchups" },
    { n: publishedGuides, label: "published guides" },
    { n: trustpilotCaptured, label: "Trustpilot reviews quoted word for word" },
    { n: redditCaptured, label: "Reddit posts quoted word for word" },
  ];

  const steps = [
    {
      icon: Search,
      title: "Check the price where the provider publishes it",
      desc: `We go through each provider's sign-up flow and record three things: the advertised price, the standard rate that applies once any promotion ends, and the condition tied to the price (plan length, prepaid term or first-month rate). All ${indexedProviders} providers sit in a single price index, and every review, comparison and cost table on the site is generated from it.`,
    },
    {
      icon: MessageSquareQuote,
      title: "Quote customers exactly as they wrote it",
      desc: "Trustpilot reviews and Reddit posts appear verbatim, with their dates and shortened names, and critical reviews sit alongside positive ones. If a provider has no public rating, the page states that. Top Weight Loss does not write, reword or invent reviews.",
    },
    {
      icon: ListOrdered,
      title: "Apply one scoring rubric to every provider",
      desc: "Every provider is scored with the same published method. Affiliate compensation may influence which providers are featured and where listings appear; it does not alter a score, a price or a quoted review.",
    },
    {
      icon: Stethoscope,
      title: "Send the medical claims to a named reviewer",
      desc: `Clinical statements, such as how a medication works, trial results, side effects and regulatory status, go to our medical reviewer. A page shows her name with a review date only after she has reviewed it and it is entered in the review log. Pages in the review log right now: ${pagesReviewed}.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* ───── Hero ───── */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-[#E8F3FB] via-[#F3F9FD] to-white">
        <div className="mx-auto max-w-[1000px] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0C4B75]">About Top Weight Loss</p>
          <h1 className="mt-3 max-w-[820px] text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#111] sm:text-[44px]">
            GLP-1 provider comparisons you can check for yourself
          </h1>
          <p className="mt-4 max-w-[700px] text-[16px] leading-relaxed text-gray-700 sm:text-[18px]">
            Top Weight Loss is an independent comparison site for GLP-1 and medical weight loss programs in the US,
            launched in October 2026. We compare providers on the price they publish, the condition tied to that price,
            who prescribes, and what customers report, and we show the evidence behind each number.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5 text-[13px] font-semibold text-[#191919]">
            {[
              `Prices checked on each provider's own site, most recently ${longDate(PRICE_INDEX_VERIFIED)}`,
              `${trustpilotCaptured} dated customer reviews quoted word for word`,
              `Medical reviewer: ${reviewerDisplayName(reviewer)}`,
            ].map((t) => (
              <li key={t} className="inline-flex items-center gap-2 rounded-full border border-[#0C4B75]/15 bg-white px-3.5 py-1.5 shadow-[0_1px_2px_rgba(16,42,67,0.05)]">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={3} />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-[46px] items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] px-6 text-[14.5px] font-bold text-white transition-colors hover:bg-[#093d61]"
            >
              Compare GLP-1 providers
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link
              href="/how-we-rank"
              className="inline-flex h-[46px] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-[14.5px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
            >
              See how we score providers
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 sm:py-12">
        {/* ───── Live numbers ───── */}
        <section className="mb-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map(({ n, label }) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-[26px] font-extrabold leading-none text-[#191919] [font-variant-numeric:tabular-nums]">{n}</p>
                <p className="mt-1.5 text-[12.5px] leading-snug text-gray-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12.5px] text-gray-400">
            These figures are recalculated from the live site whenever this page is rendered, so they always match what is published.
          </p>
        </section>

        {/* ───── Why ───── */}
        <section className="mb-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            Why does Top Weight Loss exist?
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              GLP-1 programs sold online are hard to compare. Many telehealth companies sell semaglutide and tirzepatide
              treatment, and comparison pages often quote loose price ranges, introductory rates without the regular
              price, or figures repeated from other sites. With your health and several hundred dollars a month at
              stake, that is not a sound basis for a decision.
            </p>
            <p>
              Top Weight Loss launched in 2026 with a short set of rules: publish the price the provider itself
              publishes, together with its condition; quote customers in their own words; and state clearly when
              something could not be verified. Anything we cannot check stays off the site.
            </p>
          </div>
        </section>

        {/* ───── Method ───── */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
              What do we check before a page goes live?
            </h2>
            <p className="mt-2 max-w-[640px] text-[15px] text-gray-500">Every provider page goes through these four checks, in this order.</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="relative rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0C4B75]/[0.07]">
                    <Icon className="h-5 w-5 text-[#0C4B75]" strokeWidth={1.75} />
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-400">Step {i + 1}</span>
                </div>
                <h3 className="mt-3.5 text-[17px] font-bold leading-snug text-[#191919]">{title}</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[14px] text-gray-600">
            The complete scoring rubric is on{" "}
            <Link href="/how-we-rank" className="font-semibold text-[#0C4B75] hover:underline">how we rank</Link>;
            the medical review process is described in our{" "}
            <Link href="/medical-review-policy" className="font-semibold text-[#0C4B75] hover:underline">medical review policy</Link>.
          </p>
        </section>

        {/* ───── Evidence ───── */}
        <section className="mb-14 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
          <div className="flex items-start gap-3">
            <BadgeDollarSign className="mt-0.5 h-6 w-6 shrink-0 text-[#0C4B75]" strokeWidth={2} />
            <div>
              <h2 className="text-[22px] font-bold leading-tight text-[#191919] sm:text-[24px]">What does a verified price look like?</h2>
              <p className="mt-1.5 max-w-[680px] text-[14.5px] leading-relaxed text-gray-600">
                A verified price on Top Weight Loss is backed by a dated capture of the provider&rsquo;s own pricing page.
                The three captures below were taken on {longDate(CAPTURES_DATE)} and appear under the price table in our{" "}
                <Link href="/articles/best-tirzepatide-online" className="font-semibold text-[#0C4B75] hover:underline">
                  tirzepatide buying guide
                </Link>. Each change to a listed price goes into a public{" "}
                <Link href="/glp1-weight-loss-statistics" className="font-semibold text-[#0C4B75] hover:underline">
                  price change log
                </Link>{" "}
                with the date, the previous figure and the new figure. The log holds {PRICE_CHANGELOG.length} entries so far.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {CAPTURES.map((c) => (
              <figure key={c.provider} className="overflow-hidden rounded-xl border border-gray-200 bg-[#F7F8FA]">
                <a href={c.image} target="_blank" rel="noopener noreferrer" className="flex h-[150px] items-center justify-center bg-white p-2" title="View the full-size capture">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={`${c.provider} pricing page captured on ${longDate(CAPTURES_DATE)}, showing ${c.shows}`}
                    width={c.width}
                    height={c.height}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </a>
                <figcaption className="border-t border-gray-200 px-3.5 py-3">
                  <p className="text-[13px] font-bold text-[#191919]">{c.provider}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-gray-500">The page showed {c.shows}.</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ───── Medical reviewer ───── */}
        <section className="mb-14">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            Who reviews the medical content?
          </h2>
          <p className="mt-2 max-w-[640px] text-[15px] text-gray-500">
            A reviewer&rsquo;s name appears on a page only after that reviewer has actually reviewed it. We never attach
            a reviewer&rsquo;s name to content she or he has not read.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:gap-7 sm:p-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={reviewer.image.webp}
                alt={`${reviewer.name}, ${reviewer.jobTitle}`}
                width={128}
                height={128}
                className="h-[96px] w-[96px] shrink-0 rounded-2xl object-cover sm:h-[128px] sm:w-[128px]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#0C4B75]">{reviewer.jobTitle}</p>
                <p className="mt-1 text-[22px] font-extrabold leading-tight text-[#191919]">{reviewerDisplayName(reviewer)}</p>
                <p className="mt-1 text-[14px] text-gray-500">{reviewer.headline}</p>
                <p className="mt-3 text-[15px] leading-[1.7] text-gray-600">{reviewer.shortBio}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-gray-600">
                  <strong className="text-[#191919]">Review scope:</strong> {reviewer.scope}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-semibold">
                  <Link href={reviewerPath(reviewer)} className="inline-flex items-center gap-1 text-[#0C4B75] hover:underline">
                    View full profile <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </Link>
                  <Link href="/medical-review-policy" className="text-[#0C4B75] hover:underline">Our review process</Link>
                  {reviewer.linkedin && (
                    <a href={reviewer.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#0C4B75] hover:underline">
                      <LinkedInMark className="h-4 w-4" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 bg-[#F7F8FA] px-5 py-3 text-[13px] text-gray-600 sm:px-7">
              Pages currently showing her name with a review date: {pagesReviewed}. Any clinical statement she flags is corrected before the page goes back up.
            </div>
          </div>
        </section>

        {/* ───── Who writes ───── */}
        <section className="mb-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            Who researches and writes the content?
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              Research and writing at Top Weight Loss are done by an independent editorial team. No one on the research
              team is a clinician, so clinical statements are sent to the medical reviewer above instead of being
              published on the team&rsquo;s own authority. A page is credited to the research team unless a named
              author wrote it.
            </p>
            <p>
              We never publish copy supplied by a provider. When a provider disputes a figure, we check it again
              against that provider&rsquo;s own site and record the result.
            </p>
          </div>
        </section>

        {/* ───── Money ───── */}
        <section className="mb-14">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            How does Top Weight Loss make money?
          </h2>
          <p className="mt-3 max-w-[760px] text-[16px] leading-[1.75] text-gray-600">
            Top Weight Loss is funded by affiliate commissions: some providers pay us when a visitor clicks through from
            this site and signs up. Every page with those links discloses this before the first link appears. The site
            does not cover every provider in the market.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-400">Commissions can influence</p>
              <ul className="mt-3 space-y-2 text-[15px] text-gray-700">
                {["Which providers get in-depth coverage", "Where listings, cards and links are placed, and in what order"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-amber-500" strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-emerald-700">Commissions never change</p>
              <ul className="mt-3 space-y-2 text-[15px] text-gray-800">
                {[
                  "Published prices: each one is the provider's own rate, verified on a stated date",
                  "Quoted Trustpilot ratings and reviews, or quoted Reddit posts",
                  "Medical statements or how they are reviewed",
                  "The verdicts in our reviews and comparisons",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <X className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.75} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-gray-600">
            The complete policy is in our{" "}
            <Link href="/disclaimer" className="font-semibold text-[#0C4B75] hover:underline">disclaimer</Link>.
          </p>
        </section>

        {/* ───── Verticals ───── */}
        <section className="mb-14">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            Where to start on Top Weight Loss
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {VERTICAL_LINKS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="group rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_5px_18px_rgba(16,42,67,0.10)]"
              >
                <p className="flex items-center justify-between text-[15px] font-bold text-[#191919] group-hover:text-[#0C4B75]">
                  {v.name}
                  <ArrowRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[#0C4B75]" strokeWidth={2.5} />
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-gray-500">{v.note}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ───── Current, corrections, disclaimer ───── */}
        <section className="mb-14 grid gap-4 sm:grid-cols-3">
          {([
            {
              icon: RefreshCw,
              title: "How are prices kept current?",
              body: "When a provider changes its published rates, the price index is updated in one place, every page that draws on it re-renders, the change is logged, and each affected page's last-updated date changes with it.",
            },
            {
              icon: Shield,
              title: "How do I report an error?",
              body: "If a price or claim on Top Weight Loss does not match what the provider currently publishes, email contact@topweightloss.us. We check it against the provider's own site, correct the page and log the change the same way as any other update.",
              link: { label: "contact@topweightloss.us", href: "mailto:contact@topweightloss.us" },
            },
            {
              icon: Stethoscope,
              title: "Is this medical advice?",
              body: "No. Top Weight Loss is not a medical provider and does not prescribe. GLP-1 medications are prescription drugs that require an evaluation by a licensed clinician, and individual results vary.",
            },
          ] as { icon: typeof RefreshCw; title: string; body: string; link?: { label: string; href: string } }[]).map(({ icon: Icon, title, body, link }) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-5">
              <Icon className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
              <h2 className="mt-3 text-[16px] font-bold text-[#191919]">{title}</h2>
              <p className="mt-1.5 text-[14px] leading-[1.7] text-gray-600">{body}</p>
              {link && (
                <a href={link.href} className="mt-2 inline-block text-[14px] font-semibold text-[#0C4B75] hover:underline">
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </section>

        {/* ───── CTA ───── */}
        <section className="rounded-2xl bg-[#0C4B75] px-6 py-8 text-center text-white sm:px-10 sm:py-10">
          <p className="text-[22px] font-extrabold leading-tight sm:text-[26px]">See the rankings this method produces</p>
          <p className="mx-auto mt-2 max-w-[520px] text-[14.5px] text-white/80">
            {rankedProviders} GLP-1 weight loss providers, ranked on verified prices and {trustpilotCaptured} quoted customer reviews.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-[46px] items-center justify-center rounded-xl bg-white px-6 text-[14.5px] font-bold text-[#0C4B75] transition-colors hover:bg-gray-100"
            >
              View the rankings
            </Link>
            <Link
              href="/reviews"
              className="inline-flex h-[46px] items-center justify-center rounded-xl border border-white/30 px-6 text-[14.5px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse provider reviews
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
