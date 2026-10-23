"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useNavPrefix, navHref } from "@/lib/nav-prefix";
import { HubLogo } from "@/components/hub-logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const prefix = useNavPrefix();
  const nav = [
    { label: "Best Providers", href: navHref(prefix, "/") },
    { label: "Reviews", href: navHref(prefix, "/reviews") },
    { label: "Comparisons", href: navHref(prefix, "/compare") },
    { label: "Guides", href: navHref(prefix, "/articles") },
    { label: "Find My Match", href: navHref(prefix, "/find-your-match") },
  ];

  return (
    <header className="border-b-2 border-[#D5D5D5] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={navHref(prefix, "/")} className="flex items-center" aria-label="Top Weight Loss home">
          <HubLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-7 text-[14px] font-medium text-[#191919]">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-[#0C4B75] transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger - only when there are links to show */}
        {nav.length > 0 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-[#191919]"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isOpen && nav.length > 0 && (
        <nav className="sm:hidden border-t border-[#E5E5E5] bg-white px-4 py-3 space-y-3">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-[15px] font-medium text-[#191919] hover:text-[#0C4B75]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
