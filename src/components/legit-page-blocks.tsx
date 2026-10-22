import Link from "next/link";
import { ArrowUpRight, Check, AlertTriangle } from "lucide-react";
import { ProviderCta } from "@/components/provider-cta";
import type { Provider } from "@/lib/config";

// ───── Blocks for "is <brand> legit?" articles ─────
// Code-rendered trust and conversion blocks for the brand legitimacy pages:
// a scannable legitimacy checklist under the quick answer, a verdict CTA at
// the end, and a dated capture of the provider's own pricing page. Every line
// is operator-verified; pages without an entry here render nothing extra.

export type LegitChecklistItem = { ok: boolean; text: string };

export type LegitPageData = {
  providerId: string;
  checklist: LegitChecklistItem[];
  /** One line of verified pricing for the verdict box, e.g. "$49/mo semaglutide · $89/mo tirzepatide". */
  priceLine: string;
  /** Optional secondary link for readers the caveat rules out. */
  alternative?: { text: string; href: string };
  capture?: { image: string; width: number; height: number; capturedAt: string; shows: string };
};

export const LEGIT_PAGES: Record<string, LegitPageData> = {
  "is-wellmedr-legit": {
    providerId: "wellmedr",
    checklist: [
      { ok: true, text: "Every medical intake goes to a licensed provider before anything is prescribed, so approval is never automatic" },
      { ok: true, text: "A valid prescription is mandatory: welludr offers no way to buy medication without one" },
      { ok: true, text: "Medication comes from a regulated US pharmacy (separate Reddit users identify it as a Florida pharmacy)" },
      { ok: true, text: "Rated 4.6 on Trustpilot from 2,188 reviews, checked again on October 5, 2026" },
      { ok: true, text: "Offers a weight loss warranty, and the conditions are posted on welludr's website" },
      { ok: false, text: "The $49 and $89 prices require a 12-month plan billed month by month, and standard shipping takes 3-5 business days" },
    ],
    priceLine: "Compounded semaglutide $49/mo · tirzepatide $89/mo, with no price change as the dose goes up",
    alternative: { text: "Prefer not to commit for 12 months? See the month-to-month option in embody vs welludr", href: "/embody-vs-wellmedr" },
    capture: {
      image: "/verification/wellmedr-pricing-2026-10-05.webp",
      width: 900,
      height: 325,
      capturedAt: "2026-10-05",
      shows: "tirzepatide monthly plan starting at $89 and semaglutide at $49, shipped every 4 weeks, same price regardless of dosage, cancel or change anytime",
    },
  },
};

function dateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

const ctaClass =
  "inline-flex h-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#0C4B75] px-6 text-[14.5px] font-bold text-white transition-colors hover:bg-[#093d61]";

export function LegitChecklist({ data, provider, linkPrefix = "" }: { data: LegitPageData; provider: Provider; linkPrefix?: string }) {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Is it legit? The checklist</p>
      <p className="mt-1 text-[14px] text-gray-600">Everything we confirmed about {provider.name}, plus the one condition to know before signing up.</p>
      <ul className="mt-4 space-y-2.5">
        {data.checklist.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-800">
            {item.ok ? (
              <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
            ) : (
              <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-amber-500" strokeWidth={2.25} />
            )}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13.5px] text-gray-600">{data.priceLine}</p>
        <div className="flex items-center gap-4">
          <Link href={`${linkPrefix}/reviews/${provider.id}`} className="text-[13px] font-semibold text-[#0C4B75] hover:underline">
            Read the review
          </Link>
          <ProviderCta
            href={provider.affiliateUrl}
            providerName={provider.name}
            providerSlug={provider.id}
            position={1}
            pageType="listing"
            sourceFlow="main_comparison"
            className={`${ctaClass} h-[42px] px-5 text-[13.5px]`}
          >
            See if you qualify at {provider.name}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </ProviderCta>
        </div>
      </div>
    </div>
  );
}

export function LegitVerdictCta({ data, provider, linkPrefix = "" }: { data: LegitPageData; provider: Provider; linkPrefix?: string }) {
  return (
    <div className="my-8 rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
      <div>
        <p className="text-[15px] font-bold text-[#191919]">Bottom line: {provider.name} passes every legitimacy check we ran</p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-gray-600">
          {data.priceLine}.
          {data.alternative && (
            <>
              {" "}
              <Link href={`${linkPrefix}${data.alternative.href}`} className="font-semibold text-[#0C4B75] hover:underline">
                {data.alternative.text} →
              </Link>
            </>
          )}
        </p>
      </div>
      <ProviderCta
        href={provider.affiliateUrl}
        providerName={provider.name}
        providerSlug={provider.id}
        position={1}
        pageType="listing"
        sourceFlow="main_comparison"
        className={`${ctaClass} mt-4 w-full shrink-0 sm:mt-0 sm:w-auto`}
      >
        See if you qualify at {provider.name}
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </ProviderCta>
    </div>
  );
}

export function PricingCapture({ data, provider }: { data: LegitPageData; provider: Provider }) {
  const c = data.capture;
  if (!c) return null;
  const when = dateLabel(c.capturedAt);
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Price checked {when}</p>
        <p className="mt-0.5 text-[13.5px] text-gray-600">
          Cropped screenshot of {provider.name}&rsquo;s pricing page on that date. Offers and prices can change, so confirm the current figures on the provider&rsquo;s site.
        </p>
      </div>
      <a href={c.image} target="_blank" rel="noopener noreferrer" title="View the full-size screenshot" className="block bg-[#F7F8FA] p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.image}
          alt={`Screenshot of the ${provider.name} pricing page taken ${when}, showing ${c.shows}`}
          width={c.width}
          height={c.height}
          loading="lazy"
          className="mx-auto max-h-[360px] w-auto max-w-full rounded-lg border border-gray-200 bg-white object-contain"
        />
      </a>
      <figcaption className="px-5 py-3 text-[12.5px] leading-snug text-gray-500">On that date the pricing page listed {c.shows}.</figcaption>
    </figure>
  );
}
