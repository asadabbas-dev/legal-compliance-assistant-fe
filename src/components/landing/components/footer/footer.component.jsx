"use client";

import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="page-container mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold !text-white">
              Compliance Assistant
            </Link>
            <p className="mt-3 max-w-sm text-slate-200 font-medium text-sm">
              Legal Compliance Knowledge AI. Ask questions about your policies
              and contracts. Get cited answers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider !text-white">
              Product
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.Product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="!text-slate-200 font-medium transition hover:!text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider !text-white">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.Legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="!text-slate-200 font-medium transition hover:!text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/20 pt-8 sm:flex-row">
          <p className="text-sm text-slate-300 font-medium">
            © {new Date().getFullYear()} Compliance Assistant. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-sm font-medium">
            <Link
              href="/login"
              className="!text-slate-200 font-medium transition hover:!text-white"
            >
              Sign in
            </Link>
            <Link
              href="/app"
              className="!text-slate-200 font-medium transition hover:!text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
