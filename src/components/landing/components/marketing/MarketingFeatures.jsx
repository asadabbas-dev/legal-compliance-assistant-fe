"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileCheck, Search, Users } from "lucide-react";
import { StraightInclinedDivider } from "./SectionDivider";
import { TiltCard } from "./TiltCard";

const FEATURES = [
  {
    title: "Contract review",
    description: "Find clauses and terms across all your agreements instantly.",
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    alt: "Contract review",
    icon: FileCheck,
  },
  {
    title: "Legal research",
    description: "Search policies and handbooks in plain language.",
    src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop",
    alt: "Legal research",
    icon: Search,
  },
  {
    title: "Team collaboration",
    description: "Share cited answers with stakeholders confidently.",
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    alt: "Team collaboration",
    icon: Users,
  },
];

function FeatureCard({ feature, index }) {
  const [error, setError] = useState(false);
  const Icon = feature.icon;

  return (
    <TiltCard maxTilt={6} scale={1.02} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
        className="group h-full overflow-hidden rounded-xl bg-slate-800 shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
      <div className="relative aspect-[4/3] overflow-hidden">
        {error ? (
          <div className="flex h-full items-center justify-center bg-slate-700">
            <Icon className="h-12 w-12 text-slate-400" strokeWidth={1.5} />
          </div>
        ) : (
          <Image
            src={feature.src}
            alt={feature.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
            onError={() => setError(true)}
          />
        )}
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
            <Icon className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="text-sm text-white/90">{feature.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
    </TiltCard>
  );
}

export function MarketingFeatures() {
  return (
    <section id="features" className="relative overflow-visible bg-gradient-to-br from-black via-black to-[#ffe58f] pb-14 pt-10 sm:pb-14 sm:pt-14">
      <div className="page-container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-2xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Built for legal and compliance teams
          </h2>
          <p className="text-slate-200">
            Contract review, policy search, and team collaboration
          </p>
        </motion.div>

        <div className="mx-auto mt-8 grid w-full max-w-6xl gap-5 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
      <StraightInclinedDivider fill="#000000" />
    </section>
  );
}

