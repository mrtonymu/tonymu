"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { type Dictionary } from "@/app/[lang]/dictionaries";
import { localeNames, type Locale } from "@/lib/i18n";

export function Navbar({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: dict.nav.about },
    { href: "#services", label: dict.nav.services },
    { href: "#portfolio", label: dict.nav.portfolio },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${lang}`}
          className="text-lg font-semibold tracking-tight"
        >
          Tony Mu
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-1 ml-4 border-l border-border pl-4">
            {(Object.entries(localeNames) as [Locale, string][]).map(
              ([locale, name]) => (
                <Link
                  key={locale}
                  href={`/${locale}`}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    lang === locale
                      ? "bg-foreground text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {name}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              {(Object.entries(localeNames) as [Locale, string][]).map(
                ([locale, name]) => (
                  <Link
                    key={locale}
                    href={`/${locale}`}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${
                      lang === locale
                        ? "bg-foreground text-white"
                        : "text-muted hover:text-foreground border border-border"
                    }`}
                  >
                    {name}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
