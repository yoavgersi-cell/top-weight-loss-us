import { getConfigSync } from "@/lib/config-store";
import { PRICE_INDEX } from "@/lib/price-index";
import { seedTrustpilot } from "@/data/trustpilot";
import { WEIGHT_LOSS_PARTNER_IDS, type HelperPartner } from "@/lib/helper-bot";
import { HelperBot } from "./helper-bot";

// Server-side: builds the partner cards from the site's verified data (price
// index, Trustpilot aggregates, provider config) so the helper never carries
// its own copy of a price or rating. Only the small card objects reach the
// client, not the review data.

// Facts per partner that are not in the price index, verified in
// src/data/reviews.ts and the comparison data (Nov 2026).
const PARTNER_FACTS: Record<string, Omit<HelperPartner, "id" | "name" | "logo" | "affiliateUrl" | "reviewHref" | "rating" | "reviewCount">> = {
  wellmedr: {
    prices: {},
    priceNote: "Pre-Black Friday sale price from Oct 28, 2026",
    compounded: true,
    points: [
      "The lowest compounded prices we track",
      "A Medical Weight-Care Coach and a weight-loss warranty",
      "Ships in 3-5 business days",
    ],
    caveat: "Check the plan terms behind the sale price at checkout.",
  },
  embody: {
    prices: {},
    priceNote: "Month to month, cancel anytime",
    compounded: true,
    points: [
      "No contract: billed month to month",
      "Ships in 1-2 days, cold-chain",
      "Full refund if a provider does not approve you",
    ],
  },
  eden: {
    prices: { sema: "$99/mo", tirz: "$129/mo" },
    priceNote: "Same price at every dose, no membership",
    compounded: true,
    points: [
      "Doctor-guided care with 24/7 human support",
      "No membership and no annual plan",
      "One flat price as your dose goes up",
    ],
  },
  ro: {
    prices: {},
    compounded: false,
    brandNames: { sema: "Wegovy", tirz: "Zepbound" },
    priceNote: "Membership for care; medication billed separately",
    points: [
      "FDA-approved brand-name Wegovy and Zepbound",
      "Can bill your insurance if your plan covers it",
      "Its own pharmacy delivers to your door",
    ],
    caveat: "Your total depends on your insurance; check coverage before you start.",
  },
};

const priceLabel = (p?: string) => (p ? `${p}/mo` : undefined);

export function HelperBotMount() {
  const config = getConfigSync();
  const partners: HelperPartner[] = [];
  for (const id of WEIGHT_LOSS_PARTNER_IDS) {
    const provider = config.providers.find((p) => p.id === id);
    const facts = PARTNER_FACTS[id];
    if (!provider || !facts) continue;
    const row = PRICE_INDEX.find((r) => r.providerId === id);
    const tp = seedTrustpilot[id];
    partners.push({
      id,
      name: provider.name,
      logo: provider.logo,
      affiliateUrl: provider.affiliateUrl,
      reviewHref: `/reviews/${id}`,
      rating: tp?.rating,
      reviewCount: tp?.reviewCount,
      ...facts,
      prices: row
        ? { sema: priceLabel(row.semaglutide?.price), tirz: priceLabel(row.tirzepatide?.price) }
        : facts.prices,
    });
  }
  if (partners.length < 2) return null;
  return <HelperBot partners={partners} />;
}
