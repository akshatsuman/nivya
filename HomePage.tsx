import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import HeroSection from "@/sections/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import TrustStatsSection from "@/sections/TrustStatsSection";
import FeatureHighlightsSection from "@/sections/FeatureHighlightsSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import CalculatorSection from "@/sections/CalculatorSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import FAQSection from "@/sections/FAQSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
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
        <TrustStrip />
        <TrustStatsSection />
        <FeatureHighlightsSection />
        <HowItWorksSection />
        <CalculatorSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
