import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import HeroSection from "@/sections/HeroSection";
import TrustStatsSection from "@/sections/TrustStatsSection";
import FeatureHighlightsSection from "@/sections/FeatureHighlightsSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import RankingMechanismSection from "@/sections/RankingMechanismSection";
import PortfolioInsightsSection from "@/sections/PortfolioInsightsSection";
import AskNivSection from "@/sections/AskNivSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import FAQSection from "@/sections/FAQSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <FeatureHighlightsSection />
        <TrustStatsSection />
        <HowItWorksSection />
        <RankingMechanismSection />
        <PortfolioInsightsSection />
        <AskNivSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
