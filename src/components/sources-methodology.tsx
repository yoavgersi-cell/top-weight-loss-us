import { FileText, Stethoscope, MessagesSquare, ClipboardCheck, ExternalLink } from "lucide-react";
import { type SiteContext, hubLink } from "@/lib/site-context";
import { PROVIDER_DATA_CHECKED } from "@/lib/config";
import { SOURCES_BY_VERTICAL } from "@/components/medical-sources";

// "Sources & methodology" - the evidence/authority layer for comparison and
// review pages. It does not introduce a single new claim: it names the sources
// the page is already built on (provider-published data we verified, curated
// regulatory/medical references, and third-party customer feedback) and states
// when the data was last checked. This is the "show your work" section Google's
// review-content guidance asks for on YMYL pages.
//
// Everything here must stay true. Provider-source lines link to our own review
// pages (where the full pricing/plan breakdown lives) rather than to a
// fabricated policy URL, and the medical-references group renders only for
// verticals that have a hand-verified source list - never invented citations.

interface SourceProvider {
  id: string;
  name: string;
}

function GroupLabel({ icon: Icon, children }: { icon: typeof FileText; children: React.ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <Icon className="h-[15px] w-[15px] text-[#0C4B75]" strokeWidth={2} />
      <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#191919]">{children}</p>
    </div>
  );
}

export function SourcesMethodology({
  ctx,
  providers,
  headingLabel,
  kind = "comparison",
}: {
  ctx: SiteContext;
  providers: SourceProvider[];
  // What the page compares, e.g. "embody and Medvi" or "embody" - fills the
  // one-line "How we researched ___" opener.
  headingLabel: string;
  // On a provider's own review page the provider rows would just link back to
  // the page itself - "review" renders them as plain text instead.
  kind?: "comparison" | "review";
}) {
  const medicalSources = SOURCES_BY_VERTICAL[ctx.vertical] ?? [];

  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-4 sm:px-7">
        <div className="flex items-center gap-2.5">
          <ClipboardCheck className="h-[18px] w-[18px] text-[#0C4B75]" strokeWidth={2} />
          <h2 className="text-[15px] font-bold uppercase tracking-[0.05em] text-[#191919]">
            How we researched this
          </h2>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-7">
        <p className="mb-6 max-w-[760px] text-[14px] leading-relaxed text-gray-700">
          This {kind} of {headingLabel}{" "}starts with{" "}
          {kind === "review" ? "the provider's" : "each provider's"} published prices, plans and
          policies. We then compare those details with regulatory and peer-reviewed medical
          references and weigh them against what real customers report. Every price and plan detail
          was checked on the provider&apos;s own published information, because a provider&apos;s
          claims about itself are not accepted until we confirm them.
        </p>

        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {/* Provider-published data - links to our own detailed breakdowns */}
          <div>
            <GroupLabel icon={FileText}>Provider data</GroupLabel>
            <p className="mb-2.5 text-[13px] leading-relaxed text-gray-500">
              Prices, plan terms, shipping and policies, confirmed on each provider&apos;s website.
            </p>
            <ul className="space-y-1.5">
              {providers.map((p) => (
                <li key={p.id} className="text-[13.5px] leading-relaxed">
                  {kind === "review" ? (
                    <>
                      <span className="font-semibold text-[#191919]">{p.name}</span>
                      <span className="text-gray-400">
                        {" "}
                        - prices, plans &amp; policies from its official website
                      </span>
                    </>
                  ) : (
                    <>
                      <a
                        href={hubLink(ctx, `/reviews/${p.id}`)}
                        className="font-semibold text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]"
                      >
                        {p.name}
                      </a>
                      <span className="text-gray-400"> - complete price &amp; plan review</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1 text-[12px] font-semibold text-gray-500">
              <ClipboardCheck className="h-3.5 w-3.5 text-[#0C4B75]" strokeWidth={2} />
              Provider details confirmed {PROVIDER_DATA_CHECKED}
            </p>
          </div>

          {/* Customer & community feedback - the social-proof layer, named */}
          <div>
            <GroupLabel icon={MessagesSquare}>What customers and communities say</GroupLabel>
            <p className="text-[13px] leading-relaxed text-gray-500">
              Outside sources cited here and in our reviews include verified Trustpilot ratings,
              public Reddit threads and independent YouTube reviews. We quote and summarize them,
              but their ratings are kept separate from our own scores.
            </p>
          </div>

          {/* Medical & regulatory references - only where a hand-verified list
              exists for the vertical; never fabricated. */}
          {medicalSources.length > 0 && (
            <div className="sm:col-span-2">
              <GroupLabel icon={Stethoscope}>Clinical &amp; regulatory sources</GroupLabel>
              <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {medicalSources.map((s, i) => (
                  <li key={i} className="flex gap-2 text-[13px] leading-relaxed">
                    <span className="shrink-0 font-semibold text-gray-400">{i + 1}.</span>
                    <span className="text-gray-600">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline font-medium text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]"
                      >
                        {s.label}
                        <ExternalLink className="mb-0.5 ml-0.5 inline h-3 w-3" strokeWidth={2} />
                      </a>{" "}
                      <span className="text-gray-400">- {s.publisher}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <p className="mt-7 border-t border-gray-100 pt-4 text-[12.5px] leading-relaxed text-gray-400">
          Last reviewed {PROVIDER_DATA_CHECKED}. When a provider changes its prices or policies, we
          update this comparison. The content here is for general information, not medical advice:
          talk to a licensed clinician before you begin any treatment.
        </p>
      </div>
    </section>
  );
}
