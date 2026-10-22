import { PRICE_INDEX, PRICE_INDEX_VERIFIED, type PriceCell } from "./price-index";

// ───── True cost of a GLP-1 plan: month 1 vs the price you keep paying ─────
// Every figure here is DERIVED from the verified price index at module load,
// never typed by hand, so the "what will I really pay" article can't drift
// from the index. The only logic is reading the index's own notes:
//   • "reg. $X"              → a struck regular price is listed; the current
//                              price is a promotion of unstated length
//   • "20% off month one"    → month 1 is 80% of the listed price, then the
//                              listed price
//   • "$N at checkout"       → a prepaid plan; the year is paid up front
//   • "starting price"/"from"→ the listed price is an entry point and the
//                              maintenance price isn't published
//   • anything else ("flat at every dose", "same price at every dose",
//     "locked for life", "month-to-month") → one price, every month
// Year-one columns are bounds, not predictions: "if the current price holds
// all year" and "at the regular price". Where a promo's length isn't
// published, the truth sits between the two - and the article says so.

export const PROVIDER_NAMES: Record<string, string> = {
  wellmedr: "welludr",
  embody: "embody",
  altrx: "altRx",
  medvi: "Medvi",
  healthrx: "HealthRx",
  directmeds: "DirectMeds",
  sprout: "Sprout",
  trimrx: "TrimRx",
  shed: "SHED",
};

export type TrueCostRow = {
  providerId: string;
  name: string;
  /** What the first month costs at today's listed price (a prepaid plan shows the checkout total). */
  month1: number;
  /** The price the index says you keep paying, or null when only an entry price is published. */
  maintenance: number | null;
  /** Struck regular price listed next to a promotional price, if any. */
  regular: number | null;
  /** True when the listed price is a "starting"/"from" figure. */
  entryOnly: boolean;
  /** Prepaid total charged at checkout, if the plan is prepaid. */
  prepaidTotal: number | null;
  /** Commitment wording from the index. */
  commitment: string;
  /** Year-one total if today's price holds every month (or the prepaid total). */
  yearAtCurrent: number | null;
  /** Year-one total at the regular price, when one is listed. */
  yearAtRegular: number | null;
  /** One-line reading of the row, in plain words. */
  reading: string;
};

const money = (n: number) =>
  n % 1 === 0 ? `$${n.toLocaleString("en-US")}` : `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function firstDollars(s: string): number | null {
  const m = s.match(/\$([\d,]+(?:\.\d+)?)/);
  return m ? Number(m[1].replace(/,/g, "")) : null;
}

export function trueCostRow(providerId: string, cell: PriceCell | null | undefined, commitment: string): TrueCostRow | null {
  if (!cell) return null;
  const listed = firstDollars(cell.price);
  if (listed === null) return null;
  const note = cell.note ?? "";
  const regMatch = note.match(/reg\.\s*\$([\d,]+)/i);
  const regular = regMatch ? Number(regMatch[1].replace(/,/g, "")) : null;
  const prepaidMatch = note.match(/\$([\d,]+)\s*at checkout/i);
  const prepaidTotal = prepaidMatch ? Number(prepaidMatch[1].replace(/,/g, "")) : null;
  const entryOnly = /starting price|^from\b/i.test(note) || /^from\b/i.test(cell.price.trim());
  const monthOneDiscount = /20% off month one/i.test(note);
  const promo = /promo/i.test(note) || regular !== null;

  const month1 = prepaidTotal ?? (monthOneDiscount ? Math.round(listed * 0.8 * 100) / 100 : listed);
  const maintenance = entryOnly ? null : listed; // the listed price is what the index says you keep paying
  const yearAtCurrent = prepaidTotal ?? (maintenance === null ? null : month1 + maintenance * 11);
  const yearAtRegular = regular !== null ? regular * 12 : monthOneDiscount ? listed * 12 : null;

  const name = PROVIDER_NAMES[providerId] ?? providerId;
  let reading: string;
  if (prepaidTotal !== null) reading = `${name} bills the full year at checkout: ${money(prepaidTotal)} paid once, which works out to ${money(listed)} per month. No further charges follow, and stopping early does not return any of it.`;
  else if (entryOnly) reading = `${name} lists ${cell.price} as its starting price only. The monthly cost at your ongoing dose is not published, so confirm it with ${name} before you enroll.`;
  else if (monthOneDiscount) reading = `${name} discounts the first month by 20% to ${money(month1)}; from month two on you pay ${money(listed)} a month.`;
  else if (promo && regular !== null) reading = `${name} shows ${money(listed)} as a promotional rate, with ${money(regular)} as the regular price. The pricing page we checked gives no end date for the promotion, so a first year costs somewhere from ${money(listed * 12)} to ${money(regular * 12)}.`;
  else reading = `${name} charges a flat ${money(listed)} a month, the same at every dose (${commitment.toLowerCase()}).`;

  return { providerId, name, month1, maintenance, regular, entryOnly, prepaidTotal, commitment, yearAtCurrent, yearAtRegular, reading };
}

export function trueCostRows(drug: "semaglutide" | "tirzepatide"): TrueCostRow[] {
  return PRICE_INDEX.map((r) => trueCostRow(r.providerId, r[drug], r.commitment))
    .filter((r): r is TrueCostRow => r !== null)
    .sort((a, b) => (a.yearAtCurrent ?? Infinity) - (b.yearAtCurrent ?? Infinity));
}

/** HTML table for an article body: month 1, the price you keep paying, year one (bounds). */
export function trueCostTable(drug: "semaglutide" | "tirzepatide"): string {
  const rows = trueCostRows(drug)
    .map((r) => {
      const keep = r.prepaidTotal !== null
        ? `${money(r.month1 / 12)} per month averaged (prepaid)`
        : r.maintenance === null
          ? "Not published"
          : r.regular !== null
            ? `${money(r.maintenance)} during the promotion; ${money(r.regular)} at the regular price`
            : money(r.maintenance);
      const year = r.yearAtCurrent === null
        ? "-"
        : r.yearAtRegular !== null && r.yearAtRegular !== r.yearAtCurrent
          ? `${money(r.yearAtCurrent)} - ${money(r.yearAtRegular)}`
          : money(r.yearAtCurrent);
      const m1 = r.prepaidTotal !== null ? `${money(r.month1)} paid up front` : money(r.month1);
      return `<tr><td><a href="/reviews/${r.providerId}">${r.name}</a></td><td>${m1}</td><td>${keep}</td><td>${year}</td><td>${r.commitment}</td></tr>`;
    })
    .join("");
  const label = drug === "semaglutide" ? "Compounded semaglutide" : "Compounded tirzepatide";
  return `<table><thead><tr><th>Provider</th><th>Month 1</th><th>Ongoing monthly price</th><th>First-year total</th><th>Commitment</th></tr></thead><tbody>${rows}</tbody></table><p><em>${label}, taken from each provider's published pricing and checked on ${new Date(PRICE_INDEX_VERIFIED + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}. When a promotional price has no stated end date, year one appears as a range: the lower figure assumes the promotion lasts all twelve months, the higher figure uses the regular price.</em></p>`;
}

/** Rows bucketed by what you keep paying, for the "$100-$200" article. */
export function budgetBuckets(drug: "semaglutide" | "tirzepatide"): { label: string; rows: TrueCostRow[] }[] {
  const rows = trueCostRows(drug);
  const price = (r: TrueCostRow) => (r.prepaidTotal !== null ? r.month1 / 12 : r.maintenance ?? r.month1);
  return [
    { label: "Under $100 a month", rows: rows.filter((r) => price(r) < 100) },
    { label: "$100 to $150", rows: rows.filter((r) => price(r) >= 100 && price(r) <= 150) },
    { label: "$150 to $200", rows: rows.filter((r) => price(r) > 150 && price(r) <= 200) },
    { label: "Over $200", rows: rows.filter((r) => price(r) > 200) },
  ];
}

export function budgetList(drug: "semaglutide" | "tirzepatide"): string {
  return budgetBuckets(drug)
    .filter((b) => b.rows.length > 0)
    .map(
      (b) =>
        `<h4>${b.label}</h4><ul>${b.rows
          .map((r) => {
            const p = r.prepaidTotal !== null ? `${money(r.month1 / 12)} per month averaged, ${money(r.prepaidTotal)} paid up front` : money(r.maintenance ?? r.month1);
            const tag = r.entryOnly ? " (starting price; ongoing price not published)" : r.regular !== null ? ` (promotional; regular ${money(r.regular)})` : "";
            return `<li><a href="/reviews/${r.providerId}">${r.name}</a> - ${p}${tag}; ${r.commitment.toLowerCase()}</li>`;
          })
          .join("")}</ul>`,
    )
    .join("");
}

export const TRUE_COST_VERIFIED = PRICE_INDEX_VERIFIED;
export { money as formatMoney };
