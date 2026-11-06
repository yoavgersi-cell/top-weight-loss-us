"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { HELPER_NAME, type HelperPartner } from "@/lib/helper-bot";
import { gtagEvent } from "@/components/google-analytics";
import { HelperAvatar } from "./helper-avatar";

// The panel's code downloads only when the reader taps the bubble, so the
// helper adds almost nothing to page weight. It never opens by itself.
const HelperPanel = dynamic(() => import("./helper-bot-panel").then((m) => m.HelperPanel), { ssr: false });

export function HelperBot({ partners }: { partners: HelperPartner[] }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const openPanel = () => {
    setLoaded(true);
    setOpen(true);
    gtagEvent("helper_open", { helper: HELPER_NAME });
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={openPanel}
          onPointerEnter={() => setLoaded(true)}
          aria-label={`Chat with ${HELPER_NAME}: find your GLP-1 provider`}
          className="helper-bubble fixed bottom-[calc(16px+env(safe-area-inset-bottom))] right-4 z-50 flex items-center gap-2 rounded-full border border-gray-100 bg-white p-1 text-[#0C4B75] shadow-[0_8px_28px_rgba(12,75,117,0.22)] transition-transform hover:scale-[1.03] active:scale-95 sm:bottom-6 sm:right-6 sm:pr-4"
        >
          <HelperAvatar className="h-14 w-14" />
          <span className="hidden text-[14px] font-semibold sm:inline">Find my GLP-1 match</span>
        </button>
      )}
      {loaded && <HelperPanel open={open} onClose={() => setOpen(false)} partners={partners} />}
    </>
  );
}
