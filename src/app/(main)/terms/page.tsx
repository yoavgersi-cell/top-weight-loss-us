import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://www.topweightloss.us/terms";
const UPDATED = "2026-10-04";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using topweightloss.us: information only, not medical advice, no warranty, independent third-party providers, liability limits and content use.",
  alternates: { canonical: CANONICAL },
};

const ext = "font-semibold text-[#0C4B75] hover:underline";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#191919]">Terms of use</h1>
      <p className="mb-8 text-[13px] text-gray-400">Last updated {UPDATED}</p>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>These terms apply to your use of topweightloss.us (&ldquo;the site&rdquo;), operated as Top Weight Loss. Using the site means you accept them. If you do not accept them, please do not use the site.</p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">1. General information, not medical advice</h2>
        <p>
          The site compares online GLP-1 and medical weight loss providers and publishes general information about
          those treatments. Nothing on it is medical, legal or financial advice, and using it does not create a
          clinician-patient relationship. You decide, together with a licensed clinician, what is right for your
          health and whether any medication or provider suits you. Do not ignore professional medical advice because
          of anything you read on the site.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">2. No warranty</h2>
        <p>
          The site is provided &ldquo;as is&rdquo;. We aim to keep prices, terms and provider details accurate and we
          date each verification, but providers can change their offers without notice. We make no warranty that any
          information is complete, current or free of errors. Check every price, term and eligibility requirement
          with the provider before you pay.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">3. Third-party providers and links</h2>
        <p>
          Every provider listed on the site is an independent company. Top Weight Loss does not provide, prescribe,
          dispense or ship any treatment and is not a party to any transaction between you and a provider. Provider
          links are affiliate links, as explained in our <Link href="/disclaimer" className={ext}>disclaimer</Link>.
          When you leave the site, the provider&rsquo;s own terms and privacy policy govern. We are not responsible
          for any provider&rsquo;s services, pricing, availability, medical care or conduct.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">4. Reviews and quoted content</h2>
        <p>
          Customer reviews and forum posts quoted on the site express the views of the people who wrote them. They
          are reproduced from public sources with attribution and are not our statements. Individual results
          described in them are not typical. Our editorial scores and verdicts are opinions, reached using the method
          on{" "}
          <Link href="/how-we-rank" className={ext}>how we rank</Link>.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">5. Limitation of liability</h2>
        <p>
          To the maximum extent the law allows, neither Top Weight Loss nor the people who work on it are liable for
          any loss or damage that results from using the site or relying on its content, including a decision to use
          or not use any provider or treatment. Where the law does not allow liability to be excluded, it is limited
          to the amount the law permits.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">6. Our content</h2>
        <p>
          Unless stated otherwise, the site&rsquo;s text, tables, verified price registry and design belong to us. You
          are free to read pages and share links to them. Copying substantial parts of the site, or reproducing the
          price registry or review compilations, for commercial use requires our permission. Provider and medication
          trademarks remain the property of their owners.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">7. Acceptable use</h2>
        <p>You may not scrape the site in bulk, disrupt how it runs, or use it for any unlawful purpose.</p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">8. Changes</h2>
        <p>These terms may be updated from time to time, and the date at the top marks the current version. If you keep using the site after an update, you accept the updated terms.</p>

        <p className="pt-4 text-[14px]">
          Related: our <Link href="/privacy" className={ext}>privacy policy</Link> and{" "}
          <Link href="/disclaimer" className={ext}>disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
