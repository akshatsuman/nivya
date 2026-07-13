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
    numericValue: 0,
    label: "Invested through Nivya",
    sublabel: "We open for investments at launch",
  },
  {
    icon: Users,
    prefix: "",
    suffix: "+",
    numericValue: 0,
    label: "Investors on board",
    sublabel: "Onboarding begins at launch",
  },
  {
    icon: CalendarClock,
    prefix: "",
    suffix: "+",
    numericValue: 0,
    label: "SIP instalments processed",
    sublabel: "Your first instalment, once we go live",
  },
  {
    icon: Building2,
    prefix: "",
    suffix: "+",
    numericValue: 38,
    label: "Fund houses, one account",
    sublabel: "Access to every major AMC, ready at launch",
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
        }
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
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-paper py-20 md:py-28">
      <div className="content-container">
        <div ref={headingRef} className="max-w-[640px]">
          <div className="opacity-0">
            <SectionOverline text="Where we are today" align="left" />
          </div>
          <h2 className="mt-4 font-display text-h1 md:text-h1 text-h1-mobile text-ink opacity-0">
            We're just getting started
          </h2>
          <p className="mt-4 font-sans text-body text-ink-soft opacity-0">
            Nivya hasn't opened to investors yet, so our numbers start where they
            should — at zero. What's already built is the foundation: access to
            every major fund house, the day we go live.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4"
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
