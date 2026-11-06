"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { HELPER_NAME, type HelperPartner } from "@/lib/helper-bot";
import { gtagEvent } from "@/components/google-analytics";
import { HelperAvatar } from "./helper-avatar";

// The panel's code downloads only when the reader taps the bubble, so the
// helper adds almost nothing to page weight. The panel never opens by itself.
const HelperPanel = dynamic(() => import("./helper-bot-panel").then((m) => m.HelperPanel), { ssr: false });

// ── Hello bubble rules (usual chat-widget practice) ──
// - Appears after 10 s, or earlier once the reader scrolls 40% of the page,
//   but never in the first 5 s.
// - Once per visit (sessionStorage): if it was shown or closed, it does not
//   come back while the reader keeps browsing.
// - Never after the reader has opened the helper in this visit.
// - Waits while any other popup or dialog is on screen.
const HELLO_DELAY_MS = 10_000;
const HELLO_MIN_MS = 5_000;
const HELLO_SCROLL = 0.4;
const KEY_SHOWN = "helperHelloShown";
const KEY_OPENED = "helperOpened";

const store = {
  get: (k: string) => {
    try {
      return window.sessionStorage.getItem(k) === "1";
    } catch {
      return false;
    }
  },
  set: (k: string) => {
    try {
      window.sessionStorage.setItem(k, "1");
    } catch {
      /* storage blocked: the rules still hold for this page view */
    }
  },
};

/** True when another popup, modal or dialog is visible (not the helper). */
function otherOverlayOpen(): boolean {
  const candidates = document.querySelectorAll<HTMLElement>('[role="dialog"], [aria-modal="true"], .fixed.inset-0');
  for (const el of candidates) {
    if (el.closest("[data-helper]")) continue;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && Number(cs.opacity) > 0) return true;
  }
  return false;
}

export function HelperBot({ partners }: { partners: HelperPartner[] }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hello, setHello] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (store.get(KEY_SHOWN) || store.get(KEY_OPENED)) return;
    const start = Date.now();
    let wanted = false;
    let poll: number | undefined;

    const tryShow = () => {
      if (done.current || store.get(KEY_OPENED)) return cleanup();
      if (otherOverlayOpen()) return; // wait; the poll retries
      done.current = true;
      store.set(KEY_SHOWN);
      setHello(true);
      gtagEvent("helper_hello_shown", { helper: HELPER_NAME });
      cleanup();
    };
    const want = () => {
      if (wanted) return;
      wanted = true;
      tryShow();
      if (!done.current) poll = window.setInterval(tryShow, 1000);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= HELLO_SCROLL && Date.now() - start >= HELLO_MIN_MS) want();
      else if (max > 0 && window.scrollY / max >= HELLO_SCROLL) earlyTimer ??= window.setTimeout(want, HELLO_MIN_MS - (Date.now() - start));
    };
    let earlyTimer: number | undefined;
    const timer = window.setTimeout(want, HELLO_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    function cleanup() {
      window.clearTimeout(timer);
      if (earlyTimer) window.clearTimeout(earlyTimer);
      if (poll) window.clearInterval(poll);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  const openPanel = (from: "bubble" | "hello") => {
    store.set(KEY_OPENED);
    done.current = true;
    setHello(false);
    setLoaded(true);
    setOpen(true);
    gtagEvent("helper_open", { helper: HELPER_NAME, from });
  };

  const closeHello = () => {
    setHello(false);
    gtagEvent("helper_hello_closed", { helper: HELPER_NAME });
  };

  return (
    <div data-helper>
      {!open && (
        <div className="helper-bubble fixed bottom-[calc(16px+env(safe-area-inset-bottom))] right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
          {hello && (
            <div className="relative w-[min(260px,calc(100vw-32px))] rounded-2xl rounded-br-md border border-gray-100 bg-white p-3.5 pr-9 shadow-[0_8px_28px_rgba(12,75,117,0.18)] motion-safe:animate-[helperIn_.3s_ease-out]">
              <button
                type="button"
                onClick={closeHello}
                aria-label="Close message"
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <button type="button" onClick={() => openPanel("hello")} className="text-left">
                <span className="block text-[14px] font-bold text-[#191919]">Hi, I&rsquo;m {HELPER_NAME} 😊</span>
                <span className="mt-0.5 block text-[13.5px] leading-snug text-gray-600">
                  Looking for a GLP-1 provider? I can match you in 3 quick questions.
                </span>
                <span className="mt-1.5 block text-[13px] font-semibold text-[#0C4B75]">Find my match &rarr;</span>
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => openPanel("bubble")}
            onPointerEnter={() => setLoaded(true)}
            aria-label={`Chat with ${HELPER_NAME}: find your GLP-1 provider`}
            className="flex items-center gap-2 rounded-full border border-gray-100 bg-white p-1 text-[#0C4B75] shadow-[0_8px_28px_rgba(12,75,117,0.22)] transition-transform hover:scale-[1.03] active:scale-95 sm:pr-4"
          >
            <HelperAvatar className="h-14 w-14" />
            <span className="hidden text-[14px] font-semibold sm:inline">Find my GLP-1 match</span>
          </button>
        </div>
      )}
      {loaded && <HelperPanel open={open} onClose={() => setOpen(false)} partners={partners} />}
    </div>
  );
}
