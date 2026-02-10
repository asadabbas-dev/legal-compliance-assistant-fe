"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { StraightInclinedDivider } from "./SectionDivider";
import { TiltCard } from "./TiltCard";

const STATS = [
  { value: "10x", label: "Faster than manual search" },
  { value: "100%", label: "Answers from your docs" },
  { value: "0", label: "Training required" },
];

const TESTIMONIALS = [
  {
    quote: "Saves hours every week. Answers are always cited and verifiable.",
    name: "Sarah M.",
    role: "Compliance Officer",
  },
  {
    quote: "Finally, a tool that understands our policies and contracts.",
    name: "James K.",
    role: "HR Director",
  },
  {
    quote: "Reduced our contract review time by 60%.",
    name: "David R.",
    role: "General Counsel",
  },
];

function StarRating() {
  return (
    <div className="mb-3 flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={2} />
      ))}
    </div>
  );
}

export function MarketingTrust() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      AutoScroll({
        speed: 1,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  return (
    <section className="relative overflow-visible bg-gradient-to-br from-black via-black to-[#ffe58f] pb-14 pt-10 sm:pb-14 sm:pt-14">
      <div className="page-container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Trusted by professionals
          </h2>
          <p className="text-white/80">
            See what compliance and legal teams are saying
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid gap-5 sm:grid-cols-3"
        >
          {STATS.map((stat, i) => {
            const isBlack = i % 2 === 0;
            return (
              <div
                key={stat.label}
                className={`rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                  isBlack ? "bg-black" : "bg-white"
                }`}
              >
                <p
                  className={`text-3xl font-bold ${
                    isBlack ? "text-amber-400" : "text-amber-600"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    isBlack ? "text-white/90" : "text-black/90"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>

        <div className="mt-8 overflow-hidden" data-lenis-prevent>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <TiltCard maxTilt={5} scale={1.02} className="h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="h-full min-h-[200px] rounded-xl bg-black p-6 transition-all duration-300"
                    >
                      <StarRating />
                      <p className="mb-4 text-base leading-relaxed text-white/90">
                        &quot;{t.quote}&quot;
                      </p>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-sm text-white/70">{t.role}</p>
                    </motion.div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <StraightInclinedDivider fill="#000000" />
    </section>
  );
}
