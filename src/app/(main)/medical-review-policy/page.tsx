import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HUB_ORIGIN, REVIEWERS, reviewerDisplayName, reviewerPath, reviewerPersonSchema } from "@/data/reviewers";

const CANONICAL = `${HUB_ORIGIN}/medical-review-policy`;
const TITLE = "Medical Review Policy: How We Check GLP-1 Content";
const DESCRIPTION =
  "Who checks the medical claims on Top Weight Loss, what the review covers and excludes, when a page is marked reviewed with a date, and how to report an error.";
const UPDATED = "2026-10-04";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

export default function MedicalReviewPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": CANONICAL,
    url: CANONICAL,
    name: TITLE,
    description: DESCRIPTION,
    dateModified: UPDATED,
    isPartOf: { "@type": "WebSite", name: "Top Weight Loss", url: HUB_ORIGIN },
    about: { "@type": "Organization", name: "Top Weight Loss", url: HUB_ORIGIN, employee: REVIEWERS.map(reviewerPersonSchema) },
  };
  const ext = "font-semibold text-[#0C4B75] hover:underline";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Medical review policy" }]} />
          <h1 className="text-[28px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">How Top Weight Loss reviews medical content</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            A page on Top Weight Loss is marked as reviewed for medical accuracy only after a named reviewer has checked it
            and the page is entered in our review log. We compare GLP-1 and medical weight loss providers, and this page
            explains what the medical review covers, what it leaves out, and how review dates are shown.
          </p>
          <p className="mt-3 text-[13px] text-gray-400">Last updated {UPDATED}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">Who reviews the medical statements?</h2>
          <div className="space-y-3">
            {REVIEWERS.map((r) => (
              <Link key={r.slug} href={reviewerPath(r)} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-[#0C4B75]/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image.thumb} alt={r.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <span>
                  <span className="block text-[15px] font-bold text-[#191919]">{reviewerDisplayName(r)}</span>
                  <span className="block text-[13px] text-gray-500">{r.jobTitle} · {r.headline}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-gray-500">
            Our reviewer is a licensed medical laboratory scientist who holds a Master of Public Health degree and has
            clinical-trial experience. She is not a prescribing physician, which is why our pages use the phrase
            &ldquo;reviewed for medical accuracy&rdquo; and never &ldquo;medically reviewed by a doctor&rdquo;.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">What does the medical review check?</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>The mechanism of a medication or treatment, and the terms used to explain it.</li>
            <li>Clinical-trial figures, checked against what the cited study really measured.</li>
            <li>Regulatory status, including FDA approval, compounding rules, and what &ldquo;compounded&rdquo; does and does not mean.</li>
            <li>Safety statements, side effects and contraindications, checked against the drug label and regulator guidance.</li>
            <li>Whether each claim is backed by the source it cites, and whether that source is still current.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">What is outside the medical review?</h2>
          <p className="mb-3">
            Editorial content is not part of the medical review. That covers prices, provider rankings, which partners are
            included, provider descriptions and &ldquo;best for&rdquo; verdicts. The Top Weight Loss research team produces
            them using the method on <Link href="/how-we-rank" className={ext}>how we rank</Link>, and the reviewer plays no
            part in them. Trustpilot figures and Reddit excerpts are quoted exactly as captured and are not treated as
            medical evidence.
          </p>
          <p>
            Reviewers have no say in which providers appear, what prices or rankings are shown, or any commercial
            partnership. Provider links may earn us a commission, and that commission never alters a medical statement or a
            review date.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">When is a page marked as reviewed?</h2>
          <p className="mb-3">
            A page is marked as reviewed only when it has an entry in our review log. Each content page shows a review bar
            below its title, in one of two states:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-[#191919]">&ldquo;Reviewed for medical accuracy by&rdquo; with a date.</strong> The page
              is in the review log: the named reviewer checked it on the date shown, and that date also appears in the
              page&rsquo;s structured data.
            </li>
            <li>
              <strong className="text-[#191919]">&ldquo;Medical reviewer&rdquo; with no date.</strong> The page is not in the
              review log yet. It names the site&rsquo;s reviewer as staff, but it has not been reviewed, and it does not claim
              to have been. Review dates are never backfilled.
            </li>
          </ul>
          <p className="mt-3">
            Our medical reviewer checked the launch content of Top Weight Loss in October 2026, and every page she reviewed
            carries that date. Pages added later move to the dated state only once each one is reviewed and logged. A reviewed page is checked again when its medical content changes in a
            meaningful way or when the guidance behind it changes. Updates to prices or rankings do not lead to a medical
            re-review and leave the review date unchanged.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <h2 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-[#191919]">
            <ShieldCheck className="h-5 w-5 text-emerald-600" strokeWidth={2} />
            How do I report a medical error?
          </h2>
          <p className="text-[15px] leading-[1.75] text-gray-600">
            Use the contact details on our <Link href="/about" className={ext}>about page</Link> and include the page
            address and the statement you believe is wrong. When a medical error is confirmed, we correct it and the page is
            reviewed again.
          </p>
        </section>

        <p className="text-[13px] leading-relaxed text-gray-400">
          Top Weight Loss does not give medical advice. Compounded medications are not FDA-approved. Before you start or
          change any treatment, speak with a licensed clinician about your own circumstances.
        </p>
      </div>
    </div>
  );
}
