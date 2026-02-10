"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Product mockup with 3D tilt on hover. Non-copyable.
 */
const MOCK_DATA = {
  documents: ["Policy.pdf", "Contract.pdf", "Handbook.pdf"],
  question: "What is the vacation policy?",
  answer:
    "Based on Policy.pdf, page 12: Employees receive 15 days of paid vacation per year.",
};

export function ProductMockup() {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const maxTilt = 8;
    const tiltX = (mouseY / (rect.height / 2)) * -maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt;
    x.set(tiltY);
    y.set(tiltX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => setIsHovering(true);

  return (
    <motion.div
      ref={cardRef}
      role="img"
      aria-label="Product preview: workspace with documents and AI chat"
      className="relative select-none [&_*]:select-none"
      style={{
        WebkitUserSelect: "none",
        userSelect: "none",
        perspective: 1000,
      }}
      onDragStart={(e) => e.preventDefault()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transform: isHovering ? "translateZ(10px)" : "translateZ(0px)",
        }}
        className="overflow-hidden rounded-xl bg-white transition-shadow duration-300"
      >
        {/* Fake browser chrome */}
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400 sm:h-2.5 sm:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-amber-400 sm:h-2.5 sm:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
          </div>
          <div className="ml-2 flex min-w-0 flex-1 items-center justify-center rounded-lg border border-neutral-200 bg-white px-2 py-1 sm:ml-4 sm:px-4 sm:py-1.5">
            <span className="truncate text-[10px] text-neutral-400 sm:text-[11px]">
              app.compliance-assistant.com/workspace
            </span>
          </div>
        </div>

        <div className="flex min-h-[260px] flex-col sm:min-h-[300px] md:min-h-[320px] md:flex-row">
          <aside className="flex shrink-0 flex-row gap-2 border-b border-neutral-200 bg-neutral-50/80 p-2 md:w-44 md:flex-col md:border-b-0 md:border-r md:gap-0 md:p-3">
            <p className="hidden text-[10px] font-medium uppercase tracking-wider text-neutral-400 md:mb-2 md:block">
              Documents
            </p>
            <div className="flex gap-2 md:flex-col md:space-y-2 md:gap-0">
              {MOCK_DATA.documents.map((f, i) => (
                <div
                  key={i}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2 py-1.5 md:min-w-0 md:flex-initial md:px-2.5 md:py-2"
                >
                  <div className="h-4 w-4 shrink-0 rounded bg-amber-100 sm:h-5 sm:w-5" />
                  <span className="truncate text-[10px] text-neutral-600 sm:text-xs">{f}</span>
                </div>
              ))}
            </div>
          </aside>

          <main className="min-w-0 flex-1 p-3 sm:p-5">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 sm:p-3">
              <p className="mb-1 text-[10px] font-medium text-neutral-500 sm:text-[11px]">
                Question
              </p>
              <p className="text-xs text-neutral-800 sm:text-sm">{MOCK_DATA.question}</p>
            </div>
            <motion.div
              className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5 sm:mt-3 sm:p-3"
              animate={{ opacity: [0.95, 1, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                className="mb-1 inline-block rounded-full bg-amber-200 px-1.5 py-0.5 text-[10px] font-medium text-amber-900 sm:mb-1.5 sm:px-2 sm:text-[11px]"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Cited
              </motion.span>
              <p className="text-xs leading-snug text-neutral-800 sm:text-sm">
                {MOCK_DATA.answer}
              </p>
            </motion.div>
          </main>
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 100%)",
        }}
        aria-hidden
      />
    </motion.div>
  );
}
