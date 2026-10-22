import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://www.topweightloss.us/privacy";
const UPDATED = "2026-10-04";

export const metadata: Metadata = withSeo("/privacy", {
  title: "Privacy Policy",
  description:
    "Top Weight Loss has no accounts or sign-up forms. See what analytics collect, what we never collect, what happens when you click a provider link, and your choices.",
  alternates: { canonical: CANONICAL },
});

const ext = "font-semibold text-[#0C4B75] hover:underline";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#191919]">Privacy policy</h1>
      <p className="mb-8 text-[13px] text-gray-400">Last updated {UPDATED}</p>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Top Weight Loss (topweightloss.us) is an information and comparison website. There are no accounts, no
          sign-up, no newsletter and no forms that send your details to us. This policy explains the limited data
          collected when you visit and how you can reduce it.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">What does Top Weight Loss not collect?</h2>
        <p>
          We never ask for or keep your name, email address, phone number, health information, payment details or
          login credentials. The provider-matching quiz runs inside your browser: your answers are used only to show
          results on the page, and they are not sent to us or stored by us. We do not sell personal information.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">What is collected automatically?</h2>
        <p>
          <strong className="text-[#191919]">Google Analytics 4.</strong> Google Analytics shows us which pages
          people read and how they move around the site. It sets cookies and collects a pseudonymous identifier, the
          pages viewed, an approximate location based on IP address, device and browser details, and events such as
          clicks on provider links. We never send it names, email addresses or health details. Google explains its
          practices at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={ext}>
            policies.google.com/technologies/partner-sites
          </a>.
        </p>
        <p>
          <strong className="text-[#191919]">Vercel Analytics.</strong> Our hosting provider counts page views and
          measures performance in aggregate, with no cookies and no persistent identifier.
        </p>
        <p>
          <strong className="text-[#191919]">Server logs.</strong> As on any website, our hosting infrastructure logs
          requests, including IP addresses, for security and reliability, and keeps those logs for a limited time.
        </p>
        <p>The site runs no advertising pixels and no social-media trackers.</p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">What happens when you click a provider link?</h2>
        <p>
          Provider links are affiliate links. Clicking one takes you off Top Weight Loss, and the provider or its
          affiliate network records that you arrived from us so a commission can be credited. After that, the
          provider&rsquo;s own privacy policy covers anything you enter on its site. Providers do not send us your
          name or health information; we receive only aggregate reports of clicks and qualifying actions.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">What choices do you have?</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Block or delete cookies in your browser, or add Google&rsquo;s{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={ext}>Analytics opt-out add-on</a>.
            Every part of the site works without analytics cookies.
          </li>
          <li>Turn on Global Privacy Control or Do Not Track in your browser. Either way, we do not sell personal information or share it for targeted advertising.</li>
          <li>If you live in a US state with a consumer privacy law, you can ask to access or delete your personal information. We hold no information that identifies you, so there is usually nothing to provide or erase, but you can still send a request to <a href="mailto:contact@topweightloss.us" className={ext}>contact@topweightloss.us</a>.</li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Children&rsquo;s privacy</h2>
        <p>Top Weight Loss is meant for adults and is not aimed at children under 18. We do not knowingly collect information from children.</p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Changes to this policy</h2>
        <p>Before any change to what we collect takes effect, this page is updated and the date at the top changes.</p>

        <p className="pt-4 text-[14px]">
          Related: our <Link href="/disclaimer" className={ext}>disclaimer</Link> and{" "}
          <Link href="/terms" className={ext}>terms of use</Link>.
        </p>
      </div>
    </div>
  );
}
