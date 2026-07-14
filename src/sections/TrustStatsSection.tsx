import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Users, CalendarClock, Building2 } from "lucide-react";
import SectionOverline from "@/components/SectionOverline";
import StatCard from "@/components/StatCard";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: TrendingUp,
    prefix: "\u20B9",
    suffix: " Cr+",
    numericValue: 1840,
    label: "Invested through Nivya",
    sublabel: "Across Regular-plan mutual funds",
  },
  {
    icon: Users,
    prefix: "",
    suffix: "+",
    numericValue: 128000,
    label: "Investors on board",
    sublabel: "Families building long-term wealth",
  },
  {
    icon: CalendarClock,
    prefix: "",
    suffix: "+",
    numericValue: 920000,
    label: "SIP instalments processed",
    sublabel: "Automated monthly investing",
  },
  {
    icon: Building2,
    prefix: "",
    suffix: "+",
    numericValue: 38,
    label: "Fund houses, one account",
    sublabel: "Access to every major AMC",
  },
];

export default function TrustStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        },
      );
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-paper section-y">
      <div className="content-container">
        <div ref={headingRef} className="mx-auto w-full max-w-2xl text-center">
          <div className="opacity-0">
            <SectionOverline text="By the numbers" align="center" />
          </div>
          <h2 className="mt-4 font-display text-h1 md:text-h1 text-h1-mobile text-ink opacity-0">
            Built for aware investors.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 md:gap-6 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div key={i} className="h-full opacity-0">
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
