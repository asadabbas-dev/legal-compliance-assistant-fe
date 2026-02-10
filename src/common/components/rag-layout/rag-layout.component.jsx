"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/admin/upload", label: "Documents" },
  { href: "/chat", label: "Chat" },
];

export default function RagLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background-secondary">
      <header className="border-b border-neutral-200 bg-white">
        <div className="page-container mx-auto flex h-14 max-w-7xl items-center justify-between">
          <Link href="/" className="typography-section-title">
            Compliance Assistant
          </Link>
          <nav className="flex gap-6">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`typography-label ${
                  pathname === href || (href !== "/" && pathname.startsWith(href))
                    ? "font-medium text-primary-600"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="page-container mx-auto max-w-7xl py-8">{children}</main>
    </div>
  );
}

RagLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
