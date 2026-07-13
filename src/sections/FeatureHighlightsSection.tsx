import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  ReceiptText,
  Headset,
  Stethoscope,
  Layers,
  Umbrella,
  Home as HomeIcon,
  GraduationCap,
} from "lucide-react";
import SectionOverline from "@/components/SectionOverline";
import FeatureCard from "@/components/FeatureCard";

gsap.registerPlugin(ScrollTrigger);

const smallFeatures = [
  {
    icon: ReceiptText,
    accent: "evergreen" as const,
    title: "Direct plans, no commission",
    description:
      "We earn a flat platform fee, never fund commissions. Lower expense ratios mean more of every return stays in your folio.",
  },
  {
    icon: Headset,
    accent: "gold" as const,
    title: "An adviser when you want one",
    description:
      "Talk to SEBI-registered advisers over chat or a scheduled call. Help when you ask for it, and never a hard sell.",
  },
  {
    icon: Stethoscope,
    accent: "gold" as const,
    title: "A plain-language health check",
    description:
      "See fund overlap, concentration and expense drag across your holdings — explained without a wall of jargon.",
  },
  {
    icon: Layers,
    accent: "evergreen" as const,
    title: "Every folio in one view",
    description:
      "Bring in existing holdings, track XIRR honestly, and pull a consolidated statement whenever you need one.",
  },
];

// Suggested plan for the selected goal (the large card's living example)
const planFunds = [
  { name: "Nifty 50 Index Fund", cat: "Large cap", pct: 45 },
  { name: "Flexi Cap Fund", cat: "Diversified", pct: 35 },
  { name: "Short Duration Debt", cat: "Stability", pct: 20 },
];

const goalChips = [
  { icon: Umbrella, label: "Retirement", active: true },
  { icon: HomeIcon, label: "A home", active: false },
  { icon: GraduationCap, label: "Child", active: false },
];

export default function FeatureHighlightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const largeCardRef = useRef<HTMLDivElement>(null);
  const smallCardsRef = useRef<HTMLDivElement>(null);

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
      gsap.fromTo(
        largeCardRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: largeCardRef.current, start: "top 82%", once: true },
        }
      );
      if (smallCardsRef.current) {
        gsap.fromTo(
          smallCardsRef.current.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: smallCardsRef.current, start: "top 82%", once: true },
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
      className="relative w-full overflow-hidden bg-paper-deep py-20 md:py-28"
    >
      <div className="content-container relative z-10">
        <div ref={headingRef} className="max-w-[640px]">
          <div className="opacity-0">
            <SectionOverline text="Why Nivya" align="left" />
          </div>
          <h2 className="mt-4 font-display text-h1 text-h1-mobile md:text-h1 text-ink opacity-0">
            Everything a long-term investor needs
          </h2>
          <p className="mt-4 max-w-[560px] font-sans text-body text-ink-soft opacity-0">
            Sound funds, honest costs, and a calm system that keeps you invested
            through the noise. No leaderboards, no day-trading — just wealth,
            tended.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Large card — goal mapped to a fund plan */}
          <div ref={largeCardRef} className="opacity-0">
            <FeatureCard
              icon={Compass}
              title="Goals, mapped to the right funds"
              description="Tell Nivya what you're saving for. We suggest a sensible fund mix and a monthly amount, then keep it on course as markets move."
              large
              className="h-full"
            >
              {/* Preview marker — this planner goes live at launch */}
              <div className="mt-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
                  <span className="inline-block h-1 w-1 rounded-full bg-gold" />
                  Coming soon
                </span>
              </div>

              {/* Goal selector */}
              <div className="mt-5 flex flex-wrap gap-2">
                {goalChips.map(({ icon: GIcon, label, active }) => (
                  <span
                    key={label}
                    className={
                      "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[13px] font-500 " +
                      (active
                        ? "bg-evergreen text-paper-raised"
                        : "border border-line-strong text-ink-soft")
                    }
                  >
                    <GIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {label}
                  </span>
                ))}
              </div>

              {/* Suggested plan */}
              <div className="mt-6 rounded-medium border border-line bg-paper p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-mute">
                      Suggested monthly SIP
                    </p>
                    <p className="font-mono text-[22px] font-600 text-ink">₹15,000</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-mute">
                      Horizon
                    </p>
                    <p className="font-mono text-[22px] font-600 text-ink">22 yrs</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {planFunds.map((f) => (
                    <div key={f.name}>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[13.5px] text-ink">
                          {f.name}
                          <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-mute">
                            {f.cat}
                          </span>
                        </span>
                        <span className="font-mono text-[12.5px] font-600 text-ink-soft">
                          {f.pct}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${f.pct}%`,
                            background: "linear-gradient(90deg,#0F6E5E,#1AA08C)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="font-sans text-[13px] text-ink-soft">
                    Projected by 2048
                  </span>
                  <span className="font-mono text-[18px] font-600 text-evergreen">
                    ₹2.4 Cr
                  </span>
                </div>
              </div>
            </FeatureCard>
          </div>

          {/* Small cards */}
          <div ref={smallCardsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {smallFeatures.map((feature, i) => (
              <div key={i} className="h-full opacity-0">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  accent={feature.accent}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
