"use client";

import { motion } from "framer-motion";
import { Upload, MessageCircle, BookmarkCheck } from "lucide-react";
import { StraightInclinedDivider } from "./SectionDivider";
import { TiltCard } from "./TiltCard";

const STEPS = [
  {
    step: 1,
    title: "Upload documents",
    description: "Add your PDF policies, contracts, and internal knowledge base. No setup required.",
    icon: Upload,
  },
  {
    step: 2,
    title: "Ask questions",
    description: "Plain language. No training required. Instant search across all documents.",
    icon: MessageCircle,
  },
  {
    step: 3,
    title: "Get cited answers",
    description: "Every answer includes page-level source references for verification.",
    icon: BookmarkCheck,
  },
];

export function MarketingHowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-visible bg-gradient-to-br from-black via-[#ffe58f] to-black pb-14 pt-10 sm:pb-14 sm:pt-14">
      <div className="page-container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
            How it works
          </h2>
          <p className="text-black font-medium">
            Three steps to cited answers from your documents
          </p>
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-rows-1 items-stretch gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isBlack = i % 2 === 0;
            return (
              <TiltCard key={s.step} maxTilt={6} scale={1.02} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                  className={`flex h-full min-h-[280px] flex-col rounded-xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl sm:min-h-[300px] ${
                    isBlack ? "bg-black" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-400 text-2xl font-bold text-black">
                      {s.step}
                    </div>
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        isBlack ? "bg-white/10" : "bg-amber-50"
                      }`}
                    >
                      <Icon
                        className={`h-7 w-7 ${isBlack ? "text-amber-400" : "text-amber-600"}`}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                  <h3
                    className={`mt-5 text-xl font-bold ${
                      isBlack ? "text-white" : "text-black"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`mt-3 text-[15px] leading-relaxed ${
                      isBlack ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    {s.description}
                  </p>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
      <StraightInclinedDivider fill="#000000" />
    </section>
  );
}
