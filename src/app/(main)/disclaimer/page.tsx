import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://www.topweightloss.us/disclaimer";
const UPDATED = "2026-10-04";

export const metadata: Metadata = {
  title: "Disclaimer: Affiliate, Medical and Review Policies",
  description:
    "Top Weight Loss is funded by affiliate commissions and is not medical advice. See what commissions can and cannot affect and how reviews and prices are used.",
  alternates: { canonical: CANONICAL },
};

const ext = "font-semibold text-[#0C4B75] hover:underline";

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#191919]">Disclaimer</h1>
      <p className="mb-8 text-[13px] text-gray-400">Last updated {UPDATED}</p>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <h2 className="text-xl font-semibold text-[#191919]">Affiliate and advertising disclosure (FTC)</h2>
        <p>
          Top Weight Loss is funded through affiliate links. If you follow a link to a provider and then sign up,
          book a consultation or buy something, we may be paid a commission. You do not pay anything extra as a
          result.
        </p>
        <p>
          <strong className="text-[#191919]">Compensation may influence:</strong> which providers appear on the
          site, and the order and position of listings, cards and links.{" "}
          <strong className="text-[#191919]">Compensation does not influence:</strong> the prices we show (each is
          the provider&rsquo;s own published rate, verified on a stated date); the Trustpilot figures and reviews we
          quote; the Reddit posts we quote; medical statements or how they are reviewed; or what our written reviews
          and comparisons say. Editorial scores are produced under the method described on{" "}
          <Link href="/how-we-rank" className={ext}>how we rank</Link>. The site does not include every provider
          operating in this market.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Medical disclaimer</h2>
        <p>
          Nothing on Top Weight Loss is medical advice. We are not a medical provider, a pharmacy or a clinic; our
          content is general information meant to help you compare services. GLP-1 medications and other
          prescription drugs carry risks and side effects, and they are not right for everyone. Only you and a
          licensed clinician can decide whether a treatment suits you. Compounded medications mentioned on this site
          are not FDA-approved. The{" "}
          <Link href="/medical-review-policy" className={ext}>medical review policy</Link> sets out what our reviewer
          checks and what falls outside her review.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Customer reviews, testimonials and results</h2>
        <p>
          Trustpilot reviews and Reddit posts are quoted word for word, with their dates, to show what customers
          report. Each one is a single person&rsquo;s experience. They are chosen to reflect the full range of
          feedback, negative reviews included, and they do not show that every customer will have the same
          experience.{" "}
          <strong className="text-[#191919]">Any weight loss mentioned in a review or post is that individual&rsquo;s
          result and is not typical. Results from any weight-loss medication differ widely from person to person.</strong>{" "}
          Reviewer names are shortened to first name and initial. Trustpilot ratings and review counts are shown as
          they appeared on the provider&rsquo;s public profile on the capture date, and a Trustpilot rating measures
          customer experience, not medical quality. Trustpilot is a trademark of Trustpilot A/S and Reddit is a
          trademark of Reddit, Inc.; neither company is affiliated with Top Weight Loss.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Prices and provider details</h2>
        <p>
          Prices, plans, shipping terms and program details come from each provider&rsquo;s own published materials
          as of our most recent verification, and that date is shown on the page. Providers can change prices and
          terms without notice, so check the current price, terms and your eligibility on the provider&rsquo;s site
          before you pay. If something has not been verified, the page says so instead of guessing.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Trademarks</h2>
        <p>
          Provider names, logos and brand assets belong to their respective owners, as do medication brand names
          such as Ozempic®, Wegovy®, Mounjaro® and Zepbound®. They are used only to identify the products and
          services being compared. Their use does not imply endorsement, partnership or sponsorship unless we say so.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Accuracy and reporting errors</h2>
        <p>
          We work to keep each page accurate and up to date, and we log price changes as we find them. We cannot
          guarantee that every provider, price or offer is complete or current when you read it. To report an error,
          email <a href="mailto:contact@topweightloss.us" className={ext}>contact@topweightloss.us</a>. Confirmed
          errors are corrected, and medical errors are also re-reviewed.
        </p>

        <p className="pt-4 text-[14px]">
          Related: our <Link href="/privacy" className={ext}>privacy policy</Link> and{" "}
          <Link href="/terms" className={ext}>terms of use</Link>.
        </p>
      </div>
    </div>
  );
}
