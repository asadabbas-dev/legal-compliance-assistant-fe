"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Features", href: "/#features" },
    { label: "FAQ", href: "/#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-black/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 min-h-0 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-base font-bold tracking-tight !text-white drop-shadow-sm sm:text-lg"
          onClick={closeMobile}
        >
          Compliance Assistant
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex lg:gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold !text-white/90 transition hover:!text-white"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-sm font-semibold !text-white/90 transition hover:!text-white"
          >
            Sign in
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold !text-slate-900 shadow-lg transition-all duration-200 hover:bg-amber-300 hover:shadow-xl active:scale-[0.98]"
          >
            Get Started
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg !text-white transition hover:bg-white/10 focus:outline-none lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={2} />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 top-14 z-40 bg-black transition-all duration-300 ease-out sm:top-16 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        style={{ backgroundColor: "#000" }}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="flex flex-col gap-1 bg-black px-4 py-6 sm:px-6"
          style={{ backgroundColor: "#000" }}
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobile}
              className="rounded-lg px-4 py-3 text-base font-semibold !text-white transition hover:bg-white/10"
              style={{ color: "#fff" }}
            >
              {label}
            </Link>
          ))}
          <div className="my-2 border-t border-white/20" />
          <Link
            href="/login"
            onClick={closeMobile}
            className="rounded-lg px-4 py-3 text-base font-semibold !text-white transition hover:bg-white/10"
            style={{ color: "#fff" }}
          >
            Sign in
          </Link>
          <Link
            href="/app"
            onClick={closeMobile}
            className="mx-4 mt-2 inline-flex items-center justify-center rounded-lg bg-amber-400 px-4 py-3 text-base font-bold !text-slate-900 shadow-lg transition-all duration-200 hover:bg-amber-300 active:scale-[0.98]"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
