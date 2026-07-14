import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, MessageSquareText, ChartPie } from "lucide-react";
import SectionOverline from "@/components/SectionOverline";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const usps: {
  icon: LucideIcon;
  accent: "evergreen" | "gold";
  title: string;
  description: string;
}[] = [
  {
    icon: Target,
    accent: "evergreen",
    title: "Find funds that fit your goals",
    description: "A shortlist based on what you want, not a generic leaderboard.",
  },
  {
    icon: MessageSquareText,
    accent: "gold",
    title: "Ask Niv",
    description: "A chat for fund facts when you need a quick check.",
  },
  {
    icon: ChartPie,
    accent: "evergreen",
    title: "Portfolio insights",
    description: "One place to follow value, peers, and concentration.",
  },
];

export default function FeatureHighlightsSection() {
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
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper-deep section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 42% at 8% 12%, rgba(15,110,94,0.07) 0%, transparent 70%)," +
            "radial-gradient(40% 38% at 92% 88%, rgba(180,146,90,0.08) 0%, transparent 72%)",
        }}
      />

      <div className="content-container relative z-10">
        <div ref={headingRef} className="mx-auto max-w-[720px] text-center">
          <div className="opacity-0">
            <SectionOverline text="Why Nivya" align="center" />
          </div>
          <h2 className="mt-4 whitespace-nowrap font-display text-[clamp(1.45rem,4.8vw,3rem)] font-500 leading-[1.08] tracking-[-0.015em] text-ink opacity-0">
            Find. Understand. Track.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {usps.map((usp, i) => {
            const Icon = usp.icon;
            const chip =
              usp.accent === "gold"
                ? "bg-gold/10 text-gold ring-gold/20"
                : "bg-evergreen/8 text-evergreen ring-evergreen/14";
            const num =
              usp.accent === "gold" ? "text-gold/35" : "text-evergreen/30";

            return (
              <article
                key={usp.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-large border border-line bg-paper-raised p-7 shadow-card opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card-hover md:p-8"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-1 -top-3 font-display text-[72px] font-500 leading-none ${num} transition-opacity duration-300 group-hover:opacity-80`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-medium ring-1 transition-transform duration-300 group-hover:scale-105 ${chip}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </div>

                <h3 className="relative pr-10 font-sans text-[18px] font-600 leading-snug text-ink md:text-[19px]">
                  {usp.title}
                </h3>
                <p className="relative mt-3 font-sans text-[14.5px] leading-relaxed text-ink-soft">
                  {usp.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
