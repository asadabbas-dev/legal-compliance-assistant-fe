"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Clock,
  FileText,
  HelpCircle,
  Lock,
  Search,
} from "lucide-react";
import { StraightInclinedDivider } from "@/components/landing/components/section-divider/section-divider.component";
import TiltCard from "@/components/landing/components/tilt-card/tilt-card.component";

const problems = [
  { icon: FileText, text: "Policies buried in PDFs, impossible to search" },
  { icon: Clock, text: "Hours spent hunting for the right clause" },
  { icon: HelpCircle, text: "No way to verify where answers came from" },
];

const solutions = [
  { icon: Search, text: "Ask in plain language, get instant answers" },
  { icon: Bookmark, text: "Every answer cites the exact page" },
  { icon: Lock, text: "Your documents stay private and secure" },
];

export default function ProblemSolutionSection() {
  return (
    <section className="relative overflow-visible bg-gradient-to-br from-black via-[#ffe58f] to-black pb-14 pt-10 sm:pb-14 sm:pt-14">
      <div className="page-container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-2xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Stop searching. Start asking.
          </h2>
          <p className="text-black font-medium">The old way vs. the better way</p>
        </motion.div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <TiltCard maxTilt={6} scale={1.02} className="h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full rounded-xl bg-black/90 p-6 shadow-xl"
            >
              <h3 className="mb-4 text-lg font-semibold text-white">The problem</h3>
              <ul className="space-y-3">
                {problems.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <Icon className="h-4 w-4 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-white leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </TiltCard>

          <TiltCard maxTilt={6} scale={1.02} className="h-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full rounded-xl bg-white p-6 shadow-xl"
            >
              <h3 className="mb-4 text-lg font-semibold text-black">The solution</h3>
              <ul className="space-y-3">
                {solutions.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                      <Icon className="h-4 w-4 text-amber-600" strokeWidth={2} />
                    </div>
                    <span className="text-black leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </TiltCard>
        </div>
      </div>
      <StraightInclinedDivider fill="#000000" />
    </section>
  );
}
