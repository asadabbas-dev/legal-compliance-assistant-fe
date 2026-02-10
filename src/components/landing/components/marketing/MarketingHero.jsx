"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  BookMarked,
  FileCheck,
  Scale,
  Search,
  Gavel,
  CheckCircle,
} from "lucide-react";
import { ProductMockup } from "../ProductMockup";
import { StraightInclinedDivider } from "./SectionDivider";

const HERO_DESCRIPTION =
  "Upload your documents, ask in plain language, and get answers with page-level citations. Built for legal and compliance teams.";

function FloatingLegalIcons() {
  const icons = [
    {
      Icon: FileText,
      x: "5%",
      y: "15%",
      duration: 12,
      delay: 0,
      path: "x",
      rotate: true,
    },
    {
      Icon: FileCheck,
      x: "90%",
      y: "25%",
      duration: 15,
      delay: 2,
      path: "y",
      rotate: false,
    },
    {
      Icon: Scale,
      x: "15%",
      y: "70%",
      duration: 14,
      delay: 1,
      path: "xy",
      rotate: true,
    },
    {
      Icon: Shield,
      x: "80%",
      y: "60%",
      duration: 11,
      delay: 0.5,
      path: "x",
      rotate: false,
    },
    {
      Icon: BookMarked,
      x: "70%",
      y: "15%",
      duration: 13,
      delay: 1.5,
      path: "y",
      rotate: true,
    },
    {
      Icon: Search,
      x: "25%",
      y: "85%",
      duration: 10,
      delay: 0,
      path: "xy",
      rotate: false,
    },
    {
      Icon: Gavel,
      x: "85%",
      y: "80%",
      duration: 16,
      delay: 3,
      path: "x",
      rotate: true,
    },
    {
      Icon: CheckCircle,
      x: "45%",
      y: "10%",
      duration: 9,
      delay: 2,
      path: "y",
      rotate: false,
    },
    {
      Icon: FileText,
      x: "55%",
      y: "90%",
      duration: 14,
      delay: 1,
      path: "x",
      rotate: true,
    },
    {
      Icon: Shield,
      x: "10%",
      y: "45%",
      duration: 11,
      delay: 0.5,
      path: "xy",
      rotate: false,
    },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {icons.map((item, i) => {
        const { Icon, x, y, duration, delay, path, rotate } = item;
        const baseAnimate =
          path === "x"
            ? { x: [-24, 24, -24] }
            : path === "y"
              ? { y: [-18, 18, -18] }
              : { x: [-16, 16, -16], y: [-12, 12, -12] };
        const animate = rotate
          ? { ...baseAnimate, rotate: [-5, 5, -5] }
          : baseAnimate;
        return (
          <motion.div
            key={i}
            className="absolute text-amber-400/50"
            style={{ left: x, top: y }}
            animate={animate}
            transition={{
              duration: duration / 3,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2} />
          </motion.div>
        );
      })}
    </div>
  );
}

function FloatingOrbs() {
  const orbs = [
    { size: 120, x: "10%", y: "20%", delay: 0, duration: 8 },
    { size: 80, x: "85%", y: "30%", delay: 1, duration: 10 },
    { size: 60, x: "70%", y: "70%", delay: 2, duration: 7 },
    { size: 100, x: "20%", y: "75%", delay: 0.5, duration: 9 },
    { size: 50, x: "50%", y: "50%", delay: 1.5, duration: 6 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400/10 blur-2xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TypingText({ text, startPercent = 75, speed = 40 }) {
  const splitIndex = Math.floor((text.length * startPercent) / 100);
  const staticPart = text.slice(0, splitIndex);
  const typingPart = text.slice(splitIndex);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= typingPart.length) return;
    const timer = setTimeout(() => {
      setDisplayed(typingPart.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, typingPart, speed]);

  return (
    <>
      {staticPart}
      <span>{displayed}</span>
      {displayed.length < typingPart.length && (
        <span className="animate-pulse">|</span>
      )}
    </>
  );
}

const TRUST_ITEMS = [
  { text: "Answers from your documents only", icon: FileText },
  { text: "Page-level citations", icon: BookMarked },
  { text: "Private & secure", icon: Shield },
];

export function MarketingHero() {
  return (
    <section className="relative overflow-visible bg-gradient-to-br from-black via-black to-[#ffe58f] pb-14 pt-20 sm:pb-14 sm:pt-24">
      <FloatingOrbs />
      <FloatingLegalIcons />
      <div className="page-container relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="order-1 min-w-0 space-y-4 sm:space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block rounded-full bg-amber-400/20 px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-amber-300"
            >
              <motion.span
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Legal Compliance Knowledge AI
              </motion.span>
            </motion.p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-tight lg:text-5xl xl:text-6xl lg:leading-[1.1]">
              {["Your policies.", "Your questions.", "Cited answers."].map(
                (phrase, i) => (
                  <motion.span
                    key={phrase}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.2,
                      ease: "easeOut",
                    }}
                    className={`inline-block ${i === 2 ? "text-amber-400" : ""}`}
                  >
                    {i === 2 ? (
                      <motion.span
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(251,191,36,0.3)",
                            "0 0 40px rgba(251,191,36,0.5)",
                            "0 0 20px rgba(251,191,36,0.3)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {phrase}
                      </motion.span>
                    ) : (
                      phrase
                    )}
                    {i < 2 ? " " : ""}
                  </motion.span>
                ),
              )}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              <TypingText
                text={HERO_DESCRIPTION}
                startPercent={75}
                speed={35}
              />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4"
            >
              <motion.div
                className="h-full min-h-[42px] w-full sm:min-h-[48px]"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(251,191,36,0.4)",
                    "0 0 0 12px rgba(251,191,36,0)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <Link
                  href="/app"
                  className="flex h-full min-h-[42px] w-full items-center justify-center rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold !text-slate-900 shadow-lg ring-2 ring-amber-300/50 transition-all duration-200 hover:bg-amber-300 hover:shadow-xl active:scale-[0.98] sm:min-h-[48px] sm:px-6 sm:py-3 sm:text-base lg:px-8 lg:py-3.5"
                >
                  Get Started
                </Link>
              </motion.div>
              <Link
                href="#how-it-works"
                className="flex h-full min-h-[42px] w-full items-center justify-center rounded-lg border-2 border-white bg-white/10 px-4 py-2.5 text-sm font-bold !text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/80 active:scale-[0.98] sm:min-h-[48px] sm:px-6 sm:py-3 sm:text-base lg:px-8 lg:py-3.5"
              >
                See how it works
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="flex flex-wrap gap-x-8 gap-y-3"
            >
              {TRUST_ITEMS.map(({ text, icon: Icon }, i) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-2"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="h-4 w-4 text-amber-400" strokeWidth={2} />
                  <span className="text-sm font-medium text-slate-300">
                    {text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
              rotateY: -12,
              rotateX: 5,
            }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1200, transformStyle: "preserve-3d" }}
            className="relative order-2"
          >
            <div className="">
              <ProductMockup />
            </div>
          </motion.div>
        </div>
      </div>
      <StraightInclinedDivider fill="#000000" />
    </section>
  );
}
