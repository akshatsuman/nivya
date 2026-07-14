import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeCheck, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const badges = [
  {
    icon: BadgeCheck,
    label: "Regular mutual fund plans only",
  },
  {
    icon: Handshake,
    label: "You choose the fund, we place the order",
  },
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
          className="rounded-large border border-line bg-paper-raised px-5 py-6 md:px-10 md:py-7"
        >
          <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:flex-wrap md:items-center md:gap-x-10 md:gap-y-4">
            {badges.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className="trust-badge flex items-start gap-2.5 opacity-0 md:items-center"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="mr-1 hidden h-4 w-px bg-line-strong lg:inline-block"
                  />
                )}
                <Icon
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-evergreen md:mt-0"
                  strokeWidth={1.75}
                />
                <span className="font-sans text-[14px] font-500 leading-snug text-ink-soft">
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
