"use client";

import Link from "next/link";

/**
 * Shared header layout for landing and app.
 * Theme: black background, white text, amber accents.
 */
export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm">
      <div className="page-container mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Compliance Assistant
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            href="/#how-it-works"
            className="text-sm text-white/80 transition hover:text-white"
          >
            How it works
          </Link>
          <Link
            href="/#features"
            className="text-sm text-white/80 transition hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/#faq"
            className="text-sm text-white/80 transition hover:text-white"
          >
            FAQ
          </Link>
          <Link
            href="/login"
            className="text-sm text-white/80 transition hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-black shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-amber-300 hover:shadow-md active:scale-[0.98]"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
