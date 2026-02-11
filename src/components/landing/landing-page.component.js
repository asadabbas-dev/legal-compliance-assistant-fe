"use client";

import Cta from "@/components/landing/components/cta/cta.component";
import Faq from "@/components/landing/components/faq/faq.component";
import Features from "@/components/landing/components/features/features.component";
import Footer from "@/components/landing/components/footer/footer.component";
import Header from "@/components/landing/components/header/header.component";
import Hero from "@/components/landing/components/hero/hero.component";
import HowItWorks from "@/components/landing/components/how-it-works/how-it-works.component";
import ProblemSolutionSection from "@/components/landing/components/problem-solution-section/problem-solution-section.component";
import Trust from "@/components/landing/components/trust/trust.component";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black font-sans antialiased">
      <Header />
      <main className="-mt-14 sm:-mt-16">
        <Hero />
        <ProblemSolutionSection />
        <Features />
        <HowItWorks />
        <Trust />
        <Cta />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}
