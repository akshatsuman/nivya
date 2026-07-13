import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Landmark, BadgeCheck, ScrollText, UserCheck, Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { icon: Landmark, label: "SEBI-registered" },
  { icon: BadgeCheck, label: "AMFI ARN holder" },
  { icon: ScrollText, label: "BSE StarMF settled" },
  { icon: UserCheck, label: "Units held in your name" },
  { icon: Lock, label: "Bank-grade encryption" },
];

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current?.querySelectorAll(".trust-badge") || [],
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-paper pt-6 pb-2">
      <div className="content-container">
        <div
          ref={ref}
          className="rounded-large border border-line bg-paper-raised px-6 py-7 md:px-10"
        >
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
            Regulated, settled and held in your name
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="trust-badge flex items-center gap-2.5 opacity-0">
                <Icon className="h-[18px] w-[18px] text-evergreen" strokeWidth={1.75} />
                <span className="font-sans text-[14px] font-500 text-ink-soft">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
