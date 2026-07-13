import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionOverline from "@/components/SectionOverline";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 34 },
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
        panelRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full bg-paper-deep py-section md:py-section"
    >
      <div className="content-container">
        <div ref={headingRef} className="mb-12 max-w-[620px]">
          <div className="opacity-0">
            <SectionOverline text="In their words" align="left" />
          </div>
          <h2 className="mt-4 font-display text-h1 text-h1-mobile md:text-h1 text-ink opacity-0">
            Stories worth waiting for
          </h2>
          <p className="mt-4 font-sans text-body text-ink-soft opacity-0">
            We could write glowing quotes and put names to them. We'd rather not.
            Once people are genuinely investing with Nivya, their real words will
            live here.
          </p>
        </div>

        <div
          ref={panelRef}
          className="relative overflow-hidden rounded-large border border-line bg-paper-raised p-10 shadow-card opacity-0 md:p-14"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-8 top-2 select-none font-display text-[120px] leading-none text-gold/15"
          >
            &rdquo;
          </span>

          <div className="relative z-10 flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              Coming soon
            </span>
            <p className="max-w-[640px] font-display text-[22px] font-500 leading-snug text-ink md:text-[26px]">
              Real investor stories will appear here after launch — no invented
              quotes, no borrowed faces.
            </p>
            <p className="max-w-[560px] font-sans text-[15px] leading-relaxed text-ink-soft">
              Honesty is the whole point of Nivya. When our first investors have
              something to say, you'll hear it from them, in their own words.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
