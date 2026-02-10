"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

/**
 * Header for the app workspace. Minimal, chat-style.
 * Theme: black background, white text, amber accents.
 * Uses !important overrides to beat global link styles (text-primary-600).
 */
export default function WorkspaceHeader() {
  return (
    <header className="shrink-0 border-b border-white/15 bg-black/98 backdrop-blur-sm">
      <div className="flex h-12 min-h-0 items-center justify-between gap-2 px-3 sm:h-14 sm:px-4 lg:px-6">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 !text-white transition-colors hover:!text-amber-400"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/20">
            <FileText className="h-4 w-4 text-amber-400" />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight sm:text-base">
            Compliance Assistant
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-lg px-2 py-1.5 text-xs font-medium !text-white transition-colors hover:bg-white/10 hover:!text-amber-400 sm:px-3 sm:py-2 sm:text-sm"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-semibold !text-black transition-colors hover:bg-amber-300 sm:px-4 sm:py-2 sm:text-sm"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
