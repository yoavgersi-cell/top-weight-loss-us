"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Star, X } from "lucide-react";
import {
  EXPERIENCE_NOTE,
  EXPERIENCE_OPTIONS,
  HELPER_NAME,
  MED_EXPLAINER,
  MED_OPTIONS,
  PRIORITY_OPTIONS,
  WEIGHT_LOSS_MATCH,
  type HelperAnswers,
  type HelperOption,
  type HelperPartner,
  type Med,
} from "@/lib/helper-bot";
import { gtagEvent } from "@/components/google-analytics";
import { HelperAvatar } from "./helper-avatar";

type Stage = "intro" | "browse" | "experience" | "med" | "priority" | "result";
type Msg = { id: number; from: "bot" | "user"; text?: string; node?: React.ReactNode };

const MED_LABEL: Record<Med, string> = { sema: "semaglutide", tirz: "tirzepatide", unsure: "either medication" };

export function HelperPanel({
  open,
  onClose,
  partners,
}: {
  open: boolean;
  onClose: () => void;
  partners: HelperPartner[];
}) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<HelperAnswers>({});
  const [typing, setTyping] = useState(false);
  const [explained, setExplained] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const push = (m: Omit<Msg, "id">) => setMsgs((prev) => [...prev, { ...m, id: ++idRef.current }]);

  // Bot replies arrive after a short "typing" beat so the exchange reads like
  // a conversation; skipped for readers who prefer reduced motion.
  const botSay = (items: Omit<Msg, "id" | "from">[], next: Stage) => {
    const show = () => {
      items.forEach((it) => push({ from: "bot", ...it }));
      setStage(next);
      setTyping(false);
    };
    if (reduceMotion) return show();
    setTyping(true);
    window.setTimeout(show, 550);
  };

  const greet = () => {
    botSay(
      [
        { text: `Hi, I'm ${HELPER_NAME} 😊` },
        { text: "Looking for a GLP-1 weight loss provider? Answer 3 quick questions and I'll match you with one that fits." },
      ],
      "intro",
    );
  };

  useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      greet();
    }
    if (open) headingRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [msgs, typing, reduceMotion]);

  const answer = (stageName: string, label: string, value: string) => {
    push({ from: "user", text: label });
    gtagEvent("helper_answer", { step: stageName, answer: value });
  };

  const restart = () => {
    setMsgs([]);
    setAnswers({});
    setExplained(false);
    setStage("intro");
    gtagEvent("helper_restart", { helper: HELPER_NAME });
    greet();
  };

  // ── Steps ──
  const startMatch = () => {
    answer("intro", "Yes, find my match", "start");
    botSay([{ text: "Great. Is this your first time trying a GLP-1 medication?" }], "experience");
  };

  const justBrowsing = () => {
    answer("intro", "I'm just looking around", "browse");
    botSay(
      [
        { text: "No problem. These are good places to start:" },
        {
          node: (
            <div className="flex flex-col gap-1.5">
              <PanelLink href="/compare" onClose={onClose}>Compare GLP-1 providers side by side</PanelLink>
              <PanelLink href="/cheapest-glp1" onClose={onClose}>Cheapest GLP-1 prices we verified</PanelLink>
              <PanelLink href="/articles/tirzepatide-vs-semaglutide" onClose={onClose}>Semaglutide vs tirzepatide</PanelLink>
            </div>
          ),
        },
        { text: "Want a personal match after all? It takes 30 seconds." },
      ],
      "browse",
    );
  };

  const pickExperience = (o: HelperOption) => {
    answer("experience", o.label, o.value);
    setAnswers((a) => ({ ...a, experience: o.value as HelperAnswers["experience"] }));
    botSay([{ text: "Which medication are you leaning toward?" }], "med");
  };

  const explainMeds = () => {
    answer("med", "What's the difference?", "explain");
    setExplained(true);
    botSay(
      [
        { text: MED_EXPLAINER },
        {
          node: (
            <PanelLink href="/articles/tirzepatide-vs-semaglutide" onClose={onClose}>Read the full comparison</PanelLink>
          ),
        },
        { text: "So, which one are you leaning toward?" },
      ],
      "med",
    );
  };

  const pickMed = (o: HelperOption) => {
    answer("med", o.label, o.value);
    setAnswers((a) => ({ ...a, med: o.value as Med }));
    botSay([{ text: "Last one: what matters most to you?" }], "priority");
  };

  const pickPriority = (o: HelperOption) => {
    answer("priority", o.label, o.value);
    const next = { ...answers, priority: o.value as HelperAnswers["priority"] };
    setAnswers(next);
    const [bestId, altId] = WEIGHT_LOSS_MATCH[next.priority!];
    const best = partners.find((p) => p.id === bestId);
    const alt = partners.find((p) => p.id === altId);
    if (!best) return;
    gtagEvent("helper_match", { provider: best.id, priority: next.priority! });
    botSay(
      [
        { text: `Here's your best match for ${MED_LABEL[next.med ?? "unsure"]}:` },
        { node: <PartnerCard partner={best} med={next.med ?? "unsure"} best /> },
        ...(alt
          ? [
              { text: "Also worth a look:" },
              { node: <PartnerCard partner={alt} med={next.med ?? "unsure"} /> },
            ]
          : []),
        ...(next.experience ? [{ text: EXPERIENCE_NOTE[next.experience] }] : []),
      ],
      "result",
    );
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="helper-title"
      className="fixed inset-x-0 bottom-0 z-[60] flex h-[min(85dvh,640px)] flex-col overflow-hidden rounded-t-2xl border border-gray-200 bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.18)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100dvh-48px))] sm:w-[390px] sm:rounded-2xl sm:shadow-[0_12px_48px_rgba(0,0,0,0.22)]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#0C4B75] px-4 py-3 text-white">
        <HelperAvatar className="h-10 w-10 shrink-0" />
        <div className="min-w-0 flex-1">
          <h2 id="helper-title" ref={headingRef} tabIndex={-1} className="text-[16px] font-bold leading-tight outline-none">
            {HELPER_NAME}
          </h2>
          <p className="truncate text-[12px] text-white/75">Your GLP-1 match helper</p>
        </div>
        <button
          type="button"
          onClick={restart}
          aria-label="Start over"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/85 hover:bg-white/10"
        >
          <RotateCcw className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${HELPER_NAME}`}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/85 hover:bg-white/10"
        >
          <X className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>

      {/* Conversation */}
      <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain bg-[#F6F8FA] px-3.5 py-4" aria-live="polite">
        {msgs.map((m) =>
          m.from === "bot" ? (
            <div key={m.id} className="flex items-end gap-2">
              <HelperAvatar className="h-7 w-7 shrink-0" />
              <div className="max-w-[86%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-gray-800 shadow-sm">
                {m.text ?? m.node}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[#0C4B75] px-3.5 py-2.5 text-[14px] leading-relaxed text-white">
                {m.text}
              </div>
            </div>
          ),
        )}
        {typing && (
          <div className="flex items-end gap-2" aria-label={`${HELPER_NAME} is typing`}>
            <HelperAvatar className="h-7 w-7 shrink-0" />
            <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-3.5 py-3 shadow-sm">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Answer buttons */}
      {!typing && (
        <div className="border-t border-gray-100 bg-white px-3.5 pb-[calc(10px+env(safe-area-inset-bottom))] pt-3">
          <div className="flex flex-wrap justify-end gap-2">
            {(stage === "intro" || stage === "browse") && (
              <>
                <Choice onClick={startMatch} primary>Yes, find my match</Choice>
                {stage === "intro" && <Choice onClick={justBrowsing}>I&rsquo;m just looking around</Choice>}
              </>
            )}
            {stage === "experience" && EXPERIENCE_OPTIONS.map((o) => <Choice key={o.value} onClick={() => pickExperience(o)}>{o.label}</Choice>)}
            {stage === "med" && (
              <>
                {MED_OPTIONS.map((o) => <Choice key={o.value} onClick={() => pickMed(o)}>{o.label}</Choice>)}
                {!explained && <Choice onClick={explainMeds} subtle>What&rsquo;s the difference?</Choice>}
              </>
            )}
            {stage === "priority" && PRIORITY_OPTIONS.map((o) => <Choice key={o.value} onClick={() => pickPriority(o)}>{o.label}</Choice>)}
            {stage === "result" && (
              <>
                <Choice onClick={restart} subtle>Start over</Choice>
                <Link
                  href="/compare"
                  onClick={onClose}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#0C4B75] px-4 text-[14px] font-semibold text-[#0C4B75] hover:bg-[#0C4B75]/5"
                >
                  Compare all providers <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
              </>
            )}
          </div>
          <p className="mt-2.5 text-center text-[11px] leading-snug text-gray-400">
            Matches use our verified prices and reviews. We may earn a commission. Not medical advice: a licensed clinician decides if a GLP-1 is right for you.
          </p>
        </div>
      )}
    </div>
  );
}

function Choice({
  children,
  onClick,
  primary,
  subtle,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  subtle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[44px] rounded-full px-4 text-left text-[14px] font-semibold transition-colors ${
        primary
          ? "bg-[#0C4B75] text-white hover:bg-[#093d61]"
          : subtle
            ? "text-[#0C4B75] underline-offset-2 hover:underline"
            : "border border-[#0C4B75]/30 bg-white text-[#0C4B75] hover:border-[#0C4B75] hover:bg-[#0C4B75]/5"
      }`}
    >
      {children}
    </button>
  );
}

function PanelLink({ href, children, onClose }: { href: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <Link href={href} onClick={onClose} className="inline-flex items-center gap-1 font-semibold text-[#0C4B75] hover:underline">
      {children} <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
    </Link>
  );
}

function PartnerCard({ partner, med, best }: { partner: HelperPartner; med: Med; best?: boolean }) {
  const priceLines: string[] = [];
  if (partner.brandNames) {
    const names = med === "sema" ? [partner.brandNames.sema] : med === "tirz" ? [partner.brandNames.tirz] : [partner.brandNames.sema, partner.brandNames.tirz];
    priceLines.push(`Brand-name ${names.filter(Boolean).join(" or ")}`);
  } else {
    if ((med === "sema" || med === "unsure") && partner.prices.sema) priceLines.push(`Semaglutide ${partner.prices.sema}`);
    if ((med === "tirz" || med === "unsure") && partner.prices.tirz) priceLines.push(`Tirzepatide ${partner.prices.tirz}`);
  }
  return (
    <div className="w-full min-w-[230px]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex h-7 w-[96px] items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={partner.logo} alt={`${partner.name} logo`} className="max-h-full max-w-full object-contain object-left" />
        </div>
        {best && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">Best match</span>
        )}
      </div>
      {partner.rating && (
        <p className="mb-1.5 flex items-center gap-1 text-[12.5px] text-gray-500">
          <Star className="h-3.5 w-3.5 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
          <span className="font-semibold text-gray-700">{partner.rating}</span> on Trustpilot
          {partner.reviewCount && <span>({partner.reviewCount} reviews)</span>}
        </p>
      )}
      {priceLines.length > 0 && (
        <p className="text-[15px] font-bold text-[#191919]">{priceLines.join(" · ")}</p>
      )}
      {partner.priceNote && <p className="mb-2 text-[12px] text-gray-500">{partner.priceNote}</p>}
      <ul className="mb-2 space-y-1">
        {partner.points.map((pt) => (
          <li key={pt} className="flex gap-1.5 text-[13px] leading-snug text-gray-700">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />
            {pt}
          </li>
        ))}
      </ul>
      {(partner.caveat || partner.compounded) && (
        <p className="mb-2.5 text-[11.5px] leading-snug text-gray-500">
          {partner.caveat ? `${partner.caveat} ` : ""}
          {partner.compounded ? "Compounded medications are not FDA-approved." : ""}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <a
          href={partner.affiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          onClick={() => gtagEvent("helper_click", { provider: partner.id, type: best ? "best" : "alt" })}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#0C4B75] px-4 text-[13.5px] font-bold text-white hover:bg-[#093d61]"
        >
          Visit {partner.name} <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </a>
        <Link href={partner.reviewHref} className="text-[13px] font-semibold text-[#0C4B75] hover:underline">
          Read our review
        </Link>
      </div>
    </div>
  );
}
