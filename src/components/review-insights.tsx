import { Check, Minus, Star } from "lucide-react";
import type { TrustpilotReview } from "@/lib/config";
import { tpStarColor } from "@/components/trustpilot-rating";
import {
  REVIEW_TOPICS,
  reviewInsight,
  topicTallies,
  type TopicKey,
  type TopicTally,
} from "@/data/review-insights";

// Review-driven sections for the review and comparison templates. Everything
// rendered here is derived from the quoted Trustpilot reviews in
// src/data/trustpilot.ts and the reading of them in src/data/review-insights.ts:
// counts are computed, quotes are verbatim, nothing is typed in by hand.

const share = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);
const positive = (reviews: TrustpilotReview[]) => reviews.filter((r) => r.rating >= 4).length;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="flex h-4 w-4 items-center justify-center"
          style={{ backgroundColor: i <= rating ? tpStarColor(rating) : "#DCDCE6" }}
        >
          <Star className="h-3 w-3 fill-white text-white" strokeWidth={0} />
        </span>
      ))}
    </span>
  );
}

function initials(name: string) {
  const parts = name.replace(/[^A-Za-z\s.]/g, "").trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/** Review Insights: a computed lead-in, the summary, and pros and cons with how many reviews raise each. */
export function ReviewInsights({
  providerId,
  providerName,
  reviews,
  rating,
  reviewCount,
}: {
  providerId: string;
  providerName: string;
  reviews: TrustpilotReview[];
  rating?: string;
  reviewCount?: string;
}) {
  const insight = reviewInsight(providerId);
  if (!insight || reviews.length < 5) return null;
  const n = reviews.length;

  return (
    <section id="review-insights" className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-[20px] font-bold text-[#191919]">What {providerName} customers say: review insights</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
        Based on the {n} {providerName} Trustpilot reviews we quote on this page ({share(positive(reviews), n)}% rated 4
        or 5 stars)
        {rating && reviewCount ? `, taken from the ${reviewCount} reviews on its public profile (${rating} out of 5)` : ""}.
        We read every one and grouped what reviewers praise and criticize.
      </p>
      <p className="mt-3 text-[15.5px] leading-[1.75] text-gray-800">{insight.summary}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
          <h3 className="mb-3 text-[15px] font-bold text-emerald-800">What reviewers praise</h3>
          <ul className="space-y-3">
            {insight.pros.map((p) => (
              <li key={p.text} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
                <span className="text-[14px] leading-snug text-gray-800">
                  {p.text}
                  <span className="mt-0.5 block text-[12px] text-gray-500">
                    Raised in {p.refs.length} of {n} reviews
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
          <h3 className="mb-3 text-[15px] font-bold text-gray-800">What reviewers criticize</h3>
          {insight.cons.length > 0 ? (
            <ul className="space-y-3">
              {insight.cons.map((c) => (
                <li key={c.text} className="flex items-start gap-2.5">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" strokeWidth={2.5} />
                  <span className="text-[14px] leading-snug text-gray-700">
                    {c.text}
                    <span className="mt-0.5 block text-[12px] text-gray-500">
                      Raised in {c.refs.length} of {n} reviews
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14px] leading-relaxed text-gray-600">
              None of the {n} reviews we quote raises a complaint. Lower-rated reviews can still appear on the full
              Trustpilot profile, so read a few before you sign up.
            </p>
          )}
          {insight.cons.length > 0 && insight.cons.length < 3 && (
            <p className="mt-3 text-[12px] text-gray-500">
              These are the only complaint themes in the reviews we quote.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/** Featured Reviews: the 4-5 most telling quotes, each tagged with the topic it speaks to. */
export function FeaturedReviews({
  providerId,
  providerName,
  reviews,
}: {
  providerId: string;
  providerName: string;
  reviews: TrustpilotReview[];
}) {
  const insight = reviewInsight(providerId);
  if (!insight || insight.featured.length === 0) return null;

  return (
    <section id="featured-reviews" className="mb-6">
      <h2 className="text-[20px] font-bold text-[#191919]">Featured {providerName} reviews by topic</h2>
      <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">
        Quoted word for word from Trustpilot, chosen to cover each topic reviewers raise most, praise and complaints
        alike.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {insight.featured.map(({ i, topic }) => {
          const r = reviews[i];
          return (
            <figure key={i} className="flex flex-col rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#0C4B75]/[0.07] px-2.5 py-0.5 text-[11.5px] font-bold text-[#0C4B75]">
                  {topic}
                </span>
                <Stars rating={r.rating} />
              </div>
              <blockquote className="mt-3 flex-1">
                <p className="text-[14.5px] font-bold text-[#191919]">{r.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-gray-700">&ldquo;{r.text}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2.5 border-t border-gray-100 pt-3">
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[12px] font-bold text-gray-600"
                >
                  {initials(r.name)}
                </span>
                <span className="text-[12.5px] leading-tight text-gray-500">
                  <cite className="font-semibold not-italic text-gray-800">{r.name}</cite>
                  {r.location ? `, ${r.location}` : ""}
                  <br />
                  {r.rating} out of 5 on Trustpilot{r.date ? ` · ${r.date}` : ""}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

type Side = {
  id: string;
  name: string;
  reviews: TrustpilotReview[];
  rating?: string;
  reviewCount?: string;
};

// Net sentiment for a topic: (praised - criticized) / quoted reviews.
const net = (t: TopicTally, n: number) => (n ? (t.praised - t.criticized) / n : 0);
const MIN_MENTIONS = 2;

function topicEdge(a: Side, b: Side, ta: TopicTally, tb: TopicTally): string | null {
  if (ta.praised + ta.criticized < MIN_MENTIONS || tb.praised + tb.criticized < MIN_MENTIONS) return null;
  const diff = net(ta, a.reviews.length) - net(tb, b.reviews.length);
  if (Math.abs(diff) < 0.05) return "Even";
  return diff > 0 ? a.name : b.name;
}

function tallyText(t: TopicTally) {
  if (t.praised + t.criticized === 0) return "Not mentioned";
  return `${t.praised} praise · ${t.criticized} complaint${t.criticized === 1 ? "" : "s"}`;
}

/** Battle pages: a side-by-side of real customer experience, built from both providers' quoted reviews. */
export function ReviewExperienceComparison({ a, b }: { a: Side; b: Side }) {
  const ia = reviewInsight(a.id);
  const ib = reviewInsight(b.id);
  const ta = topicTallies(a.id);
  const tb = topicTallies(b.id);
  if (!ia || !ib || !ta || !tb || a.reviews.length < 5 || b.reviews.length < 5) return null;

  const keys = Object.keys(REVIEW_TOPICS) as TopicKey[];
  const edges = keys.map((k) => ({ k, edge: topicEdge(a, b, ta[k], tb[k]) }));
  const leads = (side: Side) => edges.filter((e) => e.edge === side.name).map((e) => REVIEW_TOPICS[e.k].toLowerCase());
  const aLeads = leads(a);
  const bLeads = leads(b);
  const ra = parseFloat(a.rating ?? "");
  const rb = parseFloat(b.rating ?? "");
  const ratingEdge = isNaN(ra) || isNaN(rb) ? null : ra === rb ? "Even" : ra > rb ? a.name : b.name;
  const list = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}` : xs[0]);

  const rows: { label: string; va: string; vb: string; edge: string | null }[] = [
    {
      label: "Trustpilot rating",
      va: a.rating ? `${a.rating} / 5` : "Not published",
      vb: b.rating ? `${b.rating} / 5` : "Not published",
      edge: ratingEdge,
    },
    { label: "Trustpilot reviews", va: a.reviewCount ?? "Not published", vb: b.reviewCount ?? "Not published", edge: null },
    {
      label: "Quoted reviews rated 4-5 stars",
      va: `${share(positive(a.reviews), a.reviews.length)}% of ${a.reviews.length}`,
      vb: `${share(positive(b.reviews), b.reviews.length)}% of ${b.reviews.length}`,
      edge: null,
    },
    ...edges.map(({ k, edge }) => ({ label: REVIEW_TOPICS[k], va: tallyText(ta[k]), vb: tallyText(tb[k]), edge })),
    { label: "Praised most", va: ia.pros[0]?.text ?? "n/a", vb: ib.pros[0]?.text ?? "n/a", edge: null },
    {
      label: "Most common complaint",
      va: ia.cons[0]?.text ?? "None in the reviews we quote",
      vb: ib.cons[0]?.text ?? "None in the reviews we quote",
      edge: null,
    },
  ];

  return (
    <div id="customer-experience" className="mb-12">
      <h2 className="mb-1.5 text-[22px] font-bold text-[#191919]">
        {a.name} vs {b.name}: what customers say in their reviews
      </h2>
      <p className="mb-4 max-w-[720px] text-[14px] leading-relaxed text-gray-500">
        {aLeads.length > 0 || bLeads.length > 0 ? (
          <>
            {aLeads.length > 0 && (
              <>
                In the reviews we quote, {a.name} customers come out ahead on {list(aLeads)}.{" "}
              </>
            )}
            {bLeads.length > 0 && (
              <>
                {b.name} customers come out ahead on {list(bLeads)}.{" "}
              </>
            )}
          </>
        ) : (
          <>Neither provider pulls clearly ahead on any topic in the reviews we quote. </>
        )}
        Each count is the number of quoted Trustpilot reviews ({a.reviews.length} for {a.name}, {b.reviews.length} for{" "}
        {b.name}) that praise or criticize that topic. A topic needs at least {MIN_MENTIONS} mentions on both sides to call
        an edge.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">
            Customer experience from Trustpilot reviews, {a.name} compared with {b.name}
          </caption>
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50/80">
              <th scope="col" className="w-[24%] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">
                Topic
              </th>
              <th scope="col" className="px-4 py-3.5 text-[14px] font-bold text-[#191919]">{a.name}</th>
              <th scope="col" className="px-4 py-3.5 text-[14px] font-bold text-[#191919]">{b.name}</th>
              <th scope="col" className="w-[16%] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">
                Edge
              </th>
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-gray-100 align-top last:border-0">
                <th scope="row" className="px-4 py-3 text-[12.5px] font-semibold leading-snug text-gray-500">{r.label}</th>
                <td className="px-4 py-3 text-gray-800 [font-variant-numeric:tabular-nums]">{r.va}</td>
                <td className="px-4 py-3 text-gray-800 [font-variant-numeric:tabular-nums]">{r.vb}</td>
                <td className="px-4 py-3 font-semibold text-[#0C4B75]">{r.edge ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12.5px] text-gray-400">
        Quoted reviews are a sample, not the full profile. Our pick for this matchup weighs price, medications and
        support as well as reviews.
      </p>
    </div>
  );
}
