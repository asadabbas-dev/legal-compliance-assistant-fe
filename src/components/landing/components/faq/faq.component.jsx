"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StraightInclinedDivider } from "@/components/landing/components/section-divider/section-divider.component";
import TiltCard from "@/components/landing/components/tilt-card/tilt-card.component";

const faqs = [
  {
    q: "How does it work?",
    a: "Upload your PDF documents, then ask questions in plain language. The AI searches your files and returns answers with page-level citations.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your documents stay in your environment. We do not train on your data or share it with third parties.",
  },
  {
    q: "What are the pricing options?",
    a: "Contact us for enterprise pricing. We offer flexible plans for teams of all sizes.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-visible bg-gradient-to-br from-black via-[#ffe58f] to-black pb-14 pt-10 sm:pb-14 sm:pt-14"
    >
      <div className="page-container mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="text-black font-medium">Everything you need to know</p>
        </motion.div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => {
            const isBlack = i % 2 === 0;
            return (
              <TiltCard key={i} maxTilt={4} scale={1.01} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    isBlack ? "bg-black" : "bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className={`flex w-full items-center justify-between px-5 py-4 text-left font-semibold transition-colors ${
                      isBlack
                        ? "text-white hover:bg-white/10"
                        : "text-black hover:bg-black/5"
                    }`}
                  >
                    {faq.q}
                    <span
                      className={`text-xl transition-transform duration-200 ${
                        isBlack ? "text-white/80" : "text-black/70"
                      } ${open === i ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`border-t px-5 py-4 ${
                            isBlack
                              ? "border-white/20 text-white/90"
                              : "border-black/10 text-black/80"
                          }`}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
