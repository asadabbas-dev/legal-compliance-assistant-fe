"use client";

import {
  MarketingHeader,
  MarketingHero,
  ProblemSolutionSection,
  MarketingFeatures,
  MarketingHowItWorks,
  MarketingTrust,
  MarketingCTA,
  MarketingFAQ,
  MarketingFooter,
} from "./components/marketing";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans antialiased bg-black">
      <MarketingHeader />
      <main className="-mt-14 sm:-mt-16">
        <MarketingHero />
        <ProblemSolutionSection />
        <MarketingFeatures />
        <MarketingHowItWorks />
        <MarketingTrust />
        <MarketingCTA />
        <MarketingFAQ />
        <MarketingFooter />
      </main>
    </div>
  );
}
