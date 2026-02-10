"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StraightInclinedDivider } from "./SectionDivider";

export function MarketingCTA() {
  return (
    <section className="relative overflow-visible bg-gradient-to-br from-black via-[#ffe58f] to-[#ffe58f] pb-14 pt-10 sm:pb-14 sm:pt-14">
      <div className="page-container mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-3 text-2xl font-bold tracking-tight !text-slate-900 sm:text-3xl lg:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mb-6 max-w-xl !text-slate-800 font-medium">
            Upload your documents and start asking questions in minutes. No credit card required.
          </p>
          <motion.div
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
          >
            <Link
              href="/app"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-10 py-4 text-lg font-bold !text-white shadow-xl ring-2 ring-slate-700 transition-all duration-200 hover:bg-slate-800 hover:shadow-2xl"
            >
              Get Started Free
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <StraightInclinedDivider fill="#000000" />
    </section>
  );
}
