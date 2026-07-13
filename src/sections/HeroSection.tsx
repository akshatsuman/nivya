import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ShieldCheck } from "lucide-react";
import PillButton from "@/components/PillButton";
import FolioStatement from "@/components/FolioStatement";

export default function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(words, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" }, 0.12);
      }

      tl.fromTo(subheadRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.55);
      tl.fromTo(ctaRef.current?.children || [], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 0.7);
      tl.fromTo(trustRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.9);
      tl.fromTo(panelRef.current, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1.0, ease: "expo.out" }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Headline as a thesis: long-term, anti-timing. "tended" carries the weight.
  const head = [
    { t: "Wealth", em: false },
    { t: "is", em: false },
    { t: "tended,", em: true },
    { t: "not", em: false },
    { t: "timed.", em: false },
  ];

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-paper">
      {/* warm atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(48% 42% at 82% 24%, rgba(26,160,140,0.10) 0%, transparent 72%)," +
            "radial-gradient(40% 40% at 12% 8%, rgba(180,146,90,0.10) 0%, transparent 70%)",
        }}
      />
      {/* faint top hairline framing the page */}
      <div className="pointer-events-none absolute inset-x-0 top-[68px] mx-auto max-w-content px-8" aria-hidden="true">
        <div className="rule opacity-60" />
      </div>

      <div className="content-container relative z-10">
        <div className="grid items-center gap-14 pt-32 pb-20 md:pt-36 md:pb-24 lg:grid-cols-[1.04fr_1fr] lg:gap-12 lg:pt-40 lg:pb-28">
          {/* Left — copy */}
          <div className="max-w-[600px]">
            <div ref={eyebrowRef} className="opacity-0">
              <span className="eyebrow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
                SEBI-registered · Mutual funds &amp; SIPs
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="mt-5 font-display text-[clamp(2.6rem,6.4vw,4.75rem)] font-500 leading-[1.02] tracking-[-0.02em] text-ink"
            >
              {head.map((w, i) => (
                <span
                  key={i}
                  className={
                    "word inline-block opacity-0 " +
                    (w.em ? "italic text-evergreen pr-[0.26em]" : "pr-[0.26em]")
                  }
                >
                  {w.t}
                </span>
              ))}
            </h1>

            <p
              ref={subheadRef}
              className="mt-6 max-w-[486px] font-sans text-[17px] leading-relaxed text-ink-soft opacity-0"
            >
              Nivya helps you choose sound mutual funds, automate your SIPs and
              hold the course — with plain guidance, direct plans, and fees you
              can actually see.
            </p>

            <div ref={ctaRef} className="mt-9 flex flex-wrap gap-3.5">
              <PillButton
                variant="primary"
                onClick={() => navigate("/login")}
              >
                Login
              </PillButton>
              <PillButton
                variant="secondary"
                onClick={() => document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore returns
              </PillButton>
            </div>

            {/* Trust row — honest while we're pre-launch */}
            <div ref={trustRef} className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4 opacity-0">
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                <p className="font-sans text-[13.5px] text-ink-soft">
                  0 investors so far — we open at launch
                </p>
              </div>

              <div className="hidden h-9 w-px bg-line-strong sm:block" />

              <div className="flex items-center gap-2 text-ink-soft">
                <ShieldCheck className="h-4 w-4 text-evergreen" strokeWidth={2} />
                <span className="font-sans text-[13.5px]">Advisers registered with SEBI</span>
              </div>
            </div>
          </div>

          {/* Right — folio statement */}
          <div ref={panelRef} className="opacity-0 lg:pl-4">
            <FolioStatement />
          </div>
        </div>
      </div>
    </section>
  );
}
