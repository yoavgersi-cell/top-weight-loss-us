import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ───── Weight-loss guide cluster ─────
// The standalone GLP-1 guides (static routes + config landing pages) are the
// pages Google discovered on the hub but never crawled: most of them were only
// reachable from the footer or from one or two articles. This block cross-links
// every guide from every other guide, so each one has a full set of inbound
// links from its topically closest siblings - the strongest crawl signal we
// control. Titles mirror the destination pages' own H1s; blurbs describe the
// page's job with no figures, so nothing here can drift from the page it
// points at.
//
// Weight-loss only. Rendered near the foot of each guide page, above the
// sources/disclaimer block, minus the page it's on.

export type GuideLink = {
  slug: string;
  title: string;
  blurb: string;
};

export const WEIGHT_LOSS_GUIDES: GuideLink[] = [
  {
    slug: "how-to-choose-a-glp1-provider",
    title: "How to Choose a GLP-1 Provider",
    blurb: "A 12-point checklist applied to ten providers, with checked prices and Trustpilot history.",
  },
  {
    slug: "cheapest-glp1",
    title: "Cheapest GLP-1 Online",
    blurb: "Monthly prices we confirmed for each provider, sorted from cheapest up.",
  },
  {
    slug: "glp1-provider-comparison",
    title: "GLP-1 Providers Compared",
    blurb: "Eight providers side by side: checked prices, review trends, Reddit threads and refund rules.",
  },
  {
    slug: "glp1-provider-support",
    title: "Provider Customer Support Compared",
    blurb: "How each provider handles support, shipping and billing, based on saved Trustpilot reviews.",
  },
  {
    slug: "glp1-shipping-times",
    title: "Shipping Times by Provider",
    blurb: "Promised delivery windows versus the days customers actually report waiting.",
  },
  {
    slug: "glp1-price-changes",
    title: "GLP-1 Price Changes",
    blurb: "A dated log of confirmed online GLP-1 price moves, showing old and new prices.",
  },
  {
    slug: "glp1-weight-loss-statistics",
    title: "GLP-1 Price Index & Statistics",
    blurb: "Our dated price index and change log alongside the key clinical-trial numbers.",
  },
  {
    slug: "semaglutide",
    title: "Best Semaglutide Providers",
    blurb: "Online clinics that prescribe semaglutide, and the price each one charges.",
  },
  {
    slug: "tirzepatide",
    title: "Best Tirzepatide Providers",
    blurb: "Ranked options for compounded tirzepatide, Zepbound and Mounjaro.",
  },
  {
    slug: "glp1-pills-vs-injections",
    title: "GLP-1 Pills vs Injections",
    blurb: "Daily GLP-1 tablets versus weekly shots, compared on results, price and ease of use.",
  },
  {
    slug: "weight-loss-pills",
    title: "Prescription Weight Loss Pills",
    blurb: "The prescription-strength oral options and how they stack up.",
  },
  {
    slug: "retatrutide-weight-loss",
    title: "Retatrutide for Weight Loss",
    blurb: "What trials show for this triple-agonist drug, and whether it is available yet.",
  },
  {
    slug: "ozempic-alternatives",
    title: "Ozempic, Wegovy & Mounjaro Alternatives",
    blurb: "Compounded and brand-name routes to try when the brand drug is not an option.",
  },
  {
    slug: "switch-from-ozempic",
    title: "Switching From Ozempic",
    blurb: "Changing providers or medications without missing doses along the way.",
  },
  {
    slug: "wegovy-providers",
    title: "Best Wegovy Providers & Alternatives",
    blurb: "Online sources for Wegovy, plus alternatives worth a look.",
  },
  {
    slug: "ozempic-for-weight-loss",
    title: "Ozempic for Weight Loss",
    blurb: "Off-label Ozempic: which providers offer it, what it costs and what else to consider.",
  },
];

export function GuideCluster({
  currentSlug,
  prefix = "",
  className = "",
}: {
  /** Slug of the page rendering the block - excluded from the list. */
  currentSlug: string;
  /** Link prefix; "/" on the hub, "" on the legacy root routes. */
  prefix?: string;
  className?: string;
}) {
  const guides = WEIGHT_LOSS_GUIDES.filter((g) => g.slug !== currentSlug);
  if (guides.length === 0) return null;
  return (
    <section className={`mt-10 ${className}`} aria-labelledby="guide-cluster-heading">
      <h2 id="guide-cluster-heading" className="mb-1 text-[20px] font-bold text-[#191919]">
        Related GLP-1 guides
      </h2>
      <p className="mb-4 text-[14px] text-gray-500">
        Every other weight loss medication guide on Top Weight Loss, each built on prices we have checked ourselves.
      </p>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`${prefix}/${g.slug}`}
              className="group flex h-full items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-[#0C4B75]/40 hover:bg-[#F5F9FC]"
            >
              <span>
                <span className="block text-[14px] font-bold text-[#191919] group-hover:text-[#0C4B75]">{g.title}</span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-500">{g.blurb}</span>
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-[#0C4B75]" strokeWidth={2.5} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
