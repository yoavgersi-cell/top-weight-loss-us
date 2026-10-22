"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function DisclosureBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-[#f0f4f8] border-b-[1.5px] border-[#cdd7e1] px-4 py-1.5 sm:py-2 text-center text-[10px] sm:text-[13px] leading-tight sm:leading-normal text-gray-600">
        We may earn a commission from providers listed here, which can affect where they appear but never our ratings or reviews.{" "}
        <button
          onClick={() => setIsOpen(true)}
          className="font-bold text-[#191919] underline underline-offset-2 hover:text-[#0C4B75]"
        >
          Advertising Disclosure
        </button>
      </div>

      {/* Popup overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setIsOpen(false)}>
          <div
            className="relative mx-4 max-h-[80vh] w-full max-w-[600px] overflow-y-auto rounded-lg bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <h2 className="mb-5 text-[20px] font-bold text-[#191919]">Advertising Disclosure</h2>

            <div className="space-y-4 text-[14px] leading-[1.7] text-gray-600">
              <p>
                Top Weight Loss compares online GLP-1 and medical weight loss programs in the US. We look up each provider&rsquo;s published prices, plans and policies, read what customers report, and set the results side by side so you can choose faster.
              </p>
              <p>
                Everything here is general information, not medical advice. We work to keep each page current, but offers, prices and availability change, and we cannot promise that every provider or plan on the market is listed or that every detail is up to date.
              </p>
              <p>
                We earn a commission from some providers when you click through to their site or sign up. Those partnerships can affect which providers appear and where they sit on a page. They do not change what we write about a provider or how we score it.
              </p>
              <p>
                Brand names, logos and trademarks belong to their owners. Showing them here does not mean a provider endorses us, partners with us or sponsors this site unless we say so.
              </p>
              <p>
                Rankings draw on our own research, the providers&rsquo; published information, price, which medications are offered, and the customer experience. Not every company in this market is covered.
              </p>
              <p>
                Using this site means you accept our Terms of Use and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
