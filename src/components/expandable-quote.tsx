"use client";

import { useState } from "react";

// Collapses long quoted text (Reddit threads) to a fixed height with a fade
// and a "Read more" toggle. The full text is always in the HTML, so crawlers
// and screen readers get all of it; only the visual height is capped.
export function ExpandableQuote({
  collapsible,
  children,
  maxHeightClass = "max-h-[148px]",
}: {
  collapsible: boolean;
  children: React.ReactNode;
  maxHeightClass?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!collapsible) return <>{children}</>;
  return (
    <div>
      <div className={`relative ${open ? "" : `${maxHeightClass} overflow-hidden`}`}>
        {children}
        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FCFCFC] to-transparent" />
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="mt-1.5 min-h-[32px] text-[13px] font-semibold text-[#0C4B75] hover:underline"
      >
        {open ? "Show less" : "… Read more"}
      </button>
    </div>
  );
}
