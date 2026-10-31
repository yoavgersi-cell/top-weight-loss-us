import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, GraduationCap, BadgeCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  HUB_ORIGIN,
  REVIEWERS,
  getReviewer,
  reviewerDisplayName,
  reviewerPersonSchema,
  reviewerUrl,
  reviewsBy,
} from "@/data/reviewers";
import { SEO_META } from "@/data/seo-meta";

// Visible labels for logged pages: the page's own SEO title where it has one.
const STATIC_LABELS: Record<string, string> = {
  "/": "Top Weight Loss home: online GLP-1 provider ranking",
  "/reviews": "All GLP-1 provider reviews",
  "/articles": "All weight loss guides",
  "/compare": "All GLP-1 provider comparisons",
};
const pageLabel = (path: string) => STATIC_LABELS[path] ?? SEO_META[path]?.title ?? path;
const pageGroup = (path: string) =>
  path.startsWith("/articles/")
    ? "Guides and articles"
    : path.startsWith("/reviews/")
      ? "Provider reviews"
      : path.startsWith("/compare/")
        ? "Provider comparisons"
        : "Guides and hub pages";
const fmtDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export const dynamicParams = false;

export function generateStaticParams() {
  return REVIEWERS.map((r) => ({ slug: r.slug }));
}

async function baseMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getReviewer(slug);
  if (!r) return {};
  const title = `${reviewerDisplayName(r)} - ${r.jobTitle}`;
  // Meta description: the bio's first sentence (the full bio runs past 300
  // characters and was truncated in results).
  const description = `${r.shortBio.split(". ")[0]}.`;
  return {
    title,
    description,
    alternates: { canonical: reviewerUrl(r) },
    openGraph: {
      title,
      description,
      url: reviewerUrl(r),
      type: "profile",
      images: [{ url: `${HUB_ORIGIN}${r.image.src}`, width: r.image.width, height: r.image.height, alt: r.name }],
    },
  };
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}


export default async function ReviewerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getReviewer(slug);
  if (!r) notFound();

  const person = reviewerPersonSchema(r);
  const reviewed = reviewsBy(r.slug);
  const latestReview = reviewed[0]?.reviewedAt;
  const latestBatch = reviewed.filter((x) => x.reviewedAt === latestReview);
  const groups = ["Guides and articles", "Guides and hub pages", "Provider reviews", "Provider comparisons"]
    .map((g) => ({ name: g, items: reviewed.filter((x) => pageGroup(x.path) === g) }))
    .filter((g) => g.items.length > 0);
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": reviewerUrl(r),
    url: reviewerUrl(r),
    name: `${reviewerDisplayName(r)} - ${r.jobTitle}`,
    dateCreated: `${r.since}-01`,
    ...(latestReview && { dateModified: latestReview }),
    mainEntity: person,
    isPartOf: { "@type": "WebSite", name: "Top Weight Loss", url: HUB_ORIGIN },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: HUB_ORIGIN },
      { "@type": "ListItem", position: 2, name: "Medical review", item: `${HUB_ORIGIN}/medical-review-policy` },
      { "@type": "ListItem", position: 3, name: r.name, item: reviewerUrl(r) },
    ],
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Medical review", href: "/medical-review-policy" }, { label: r.name }]} />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <picture className="shrink-0">
              <source srcSet={r.image.webp} type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.image.src}
                alt={`${r.name}, ${r.jobTitle}`}
                width={160}
                height={160}
                className="h-[120px] w-[120px] rounded-2xl object-cover sm:h-[160px] sm:w-[160px]"
              />
            </picture>
            <div className="min-w-0">
              <p className="mb-1 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-emerald-700">
                <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />
                Medical content reviewer
              </p>
              <h1 className="text-[28px] font-extrabold leading-[1.15] text-[#191919] sm:text-[34px]">
                {r.name}
                <span className="font-semibold text-gray-400">, {r.credentials.join(", ")}</span>
              </h1>
              <p className="mt-1 text-[16px] font-semibold text-[#191919]">{r.jobTitle}, Top Weight Loss</p>
              <p className="mt-1 text-[15px] leading-relaxed text-gray-500">{r.headline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.licensure.map((c) => (
                  <span key={c.title} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
                    {c.title}
                  </span>
                ))}
                {r.education.map((e) => (
                  <span key={e.degree} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] font-semibold text-gray-700">
                    <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} />
                    {e.degree}, {e.school}
                  </span>
                ))}
              </div>
              {r.linkedin && (
                <a
                  href={r.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="mt-4 inline-flex h-[40px] items-center gap-2 rounded-lg bg-[#0A66C2] px-4 text-[13.5px] font-bold text-white hover:opacity-90"
                >
                  <LinkedInMark className="h-4 w-4" />
                  View LinkedIn profile
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Scope */}
        <section className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <h2 className="mb-2 text-[18px] font-bold text-[#191919]">What does {r.name.split(" ")[0]} review on Top Weight Loss?</h2>
          <p className="text-[15px] leading-[1.75] text-gray-600">{r.scope}</p>
          <p className="mt-2 text-[14px] text-gray-500">
            A page shows a dated &ldquo;Reviewed for medical accuracy&rdquo; line only after she has reviewed it and it is
            entered in our review log. Pages not yet in the log name her as the site&rsquo;s medical reviewer with no review
            date. Read the complete{" "}
            <Link href="/medical-review-policy" className={ext}>medical review policy</Link>.
          </p>
        </section>

        {/* Review record: every logged review, dated. */}
        {reviewed.length > 0 && (
          <section className="mb-10" id="pages-reviewed">
            <h2 className="mb-2 text-[24px] font-bold text-[#191919]">Which pages has {r.name.split(" ")[0]} reviewed?</h2>
            <p className="text-[15px] leading-[1.75] text-gray-600">
              {r.name} has reviewed the medical and scientific statements on {reviewed.length} pages of Top Weight Loss.
              Her most recent review was on <time dateTime={latestReview}>{fmtDate(latestReview!)}</time>
              {latestBatch.length > 1 ? `, covering ${latestBatch.length} pages` : ""}. Each page shows the date she reviewed it.
            </p>
            <h3 className="mb-2 mt-5 text-[16px] font-bold text-[#191919]">Most recent reviews</h3>
            <ul className="space-y-1.5">
              {latestBatch.map((x) => (
                <li key={x.path} className="text-[14.5px] leading-snug">
                  <Link href={x.path} className={ext}>{pageLabel(x.path)}</Link>
                  <span className="text-gray-400"> · <time dateTime={x.reviewedAt}>{fmtDate(x.reviewedAt)}</time></span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2">
              {groups.map((g) => (
                <details key={g.name} className="rounded-xl border border-gray-200 bg-white p-4">
                  <summary className="cursor-pointer text-[15px] font-bold text-[#191919]">
                    {g.name} ({g.items.length})
                  </summary>
                  <ul className="mt-3 space-y-1.5">
                    {g.items.map((x) => (
                      <li key={x.path} className="text-[14px] leading-snug">
                        <Link href={x.path} className={ext}>{pageLabel(x.path)}</Link>
                        <span className="text-gray-400"> · <time dateTime={x.reviewedAt}>{fmtDate(x.reviewedAt)}</time></span>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Bio */}
        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">Professional background</h2>
          {r.longBio.map((p) => (
            <p key={p.slice(0, 40)} className="mb-4">{p}</p>
          ))}
        </section>

        {/* Credentials and education */}
        <section className="mb-10">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Licensure and education</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {r.licensure.map((c) => (
              <div key={c.title} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-emerald-700">
                  <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} /> Licensure
                </p>
                <p className="text-[15px] font-bold text-[#191919]">{c.title}</p>
                <p className="text-[13px] text-gray-500">{c.issuer}</p>
                {c.detail && <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">{c.detail}</p>}
              </div>
            ))}
            {r.education.map((e) => (
              <div key={e.degree} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#0C4B75]">
                  <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} /> Education
                </p>
                <p className="text-[15px] font-bold text-[#191919]">{e.degree}</p>
                <p className="text-[13px] text-gray-500">
                  {e.school}
                  {e.location ? `, ${e.location}` : ""}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">{e.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Work experience</h2>
          <div className="space-y-3">
            {r.experience.map((g) => (
              <div key={g.area} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-2 text-[15px] font-bold text-[#191919]">{g.area}</p>
                <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-gray-600">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {r.specialties.map((s) => (
              <span key={s} className="rounded-full bg-gray-100 px-3 py-1 text-[12.5px] font-semibold text-gray-700">{s}</span>
            ))}
          </div>
        </section>

        {/* The "Selected writing" list (external articles) was removed from the
            profile at the operator's request, Oct 2026. The entries stay in the
            reviewer record so they can come back without re-sourcing. */}

        <p className="text-[13px] leading-relaxed text-gray-400">
          Reviewers check medical and scientific statements only. They have no role in choosing providers, setting prices
          or rankings, or any commercial partnership. Top Weight Loss does not give medical advice; speak with a licensed
          clinician about your own situation.
        </p>
      </div>
    </div>
  );
}

export async function generateMetadata(props: { params: Promise<Record<string, string>> }): Promise<Metadata> {
  const params = props.params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withSeo(`/reviewers/${(await params).slug}`, await baseMetadata(props as any));
}
