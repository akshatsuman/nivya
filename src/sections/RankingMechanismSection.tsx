import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionOverline from "@/components/SectionOverline";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { title: "Goal", detail: "Horizon & risk, once" },
  { title: "Score", detail: "Personal fit for you" },
  { title: "Fit", detail: "What drove the rank" },
];

const FUNDS = [
  {
    rank: 1,
    name: "Parag Parikh Flexi Cap",
    cat: "Flexi Cap · Regular",
    score: 94,
    tags: ["Returns", "Consistency", "Cost"],
    bars: [
      { label: "Horizon", v: 96 },
      { label: "Risk", v: 91 },
      { label: "Cost", v: 88 },
    ],
  },
  {
    rank: 2,
    name: "Mirae Asset Large Cap",
    cat: "Large Cap · Regular",
    score: 88,
    tags: ["Stability", "Peers"],
    bars: [
      { label: "Horizon", v: 84 },
      { label: "Risk", v: 90 },
      { label: "Cost", v: 79 },
    ],
  },
  {
    rank: 3,
    name: "UTI Nifty 50 Index",
    cat: "Index · Regular",
    score: 81,
    tags: ["Cost", "Tracking"],
    bars: [
      { label: "Horizon", v: 80 },
      { label: "Risk", v: 86 },
      { label: "Cost", v: 95 },
    ],
  },
];

export default function RankingMechanismSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        boardRef.current?.children || [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: boardRef.current, start: "top 88%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ranking"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,110,94,0.04) 0%, transparent 28%)," +
            "radial-gradient(50% 40% at 100% 0%, rgba(180,146,90,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="content-container relative z-10">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <div className="opacity-0">
            <SectionOverline text="Ranking mechanism" align="center" />
          </div>
          <h2 className="mt-4 font-display text-h1 text-h1-mobile md:text-h1 text-ink opacity-0">
            Find funds according to your goals.
          </h2>
        </div>

        <div ref={boardRef} className="mt-10 w-full sm:mt-12">
          <ol className="flex flex-col items-center gap-5 opacity-0 sm:flex-row sm:items-start sm:justify-center sm:gap-0">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex items-center sm:flex-1">
                <div className="min-w-0 text-center sm:w-full">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-evergreen">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-sans text-[15px] font-600 text-ink">{step.title}</p>
                  <p className="mt-0.5 font-sans text-[13.5px] text-ink-soft">{step.detail}</p>
                </div>
                {i < STEPS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="mx-4 hidden h-px flex-1 bg-line-strong sm:block"
                  />
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-y border-line py-4 opacity-0">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
              Filters
            </span>
            {["Goal: Growth", "10y horizon", "Moderate risk", "Regular"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-line-strong bg-transparent px-3 py-1 font-mono text-[11px] text-ink"
              >
                {chip}
              </span>
            ))}
            <span className="font-mono text-[11px] font-semibold text-evergreen sm:ml-2">
              12 matched
            </span>
          </div>

          <div className="mt-2 divide-y divide-line border-b border-line opacity-0">
            {FUNDS.map((fund) => (
              <div
                key={fund.name}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:gap-6 sm:py-6 md:grid-cols-[4.5rem_1fr_minmax(0,14rem)_auto]"
              >
                <span className="font-display text-[40px] font-500 leading-none tracking-[-0.03em] text-gold/80 sm:text-[48px]">
                  {String(fund.rank).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <p className="truncate font-sans text-[16px] font-600 text-ink sm:text-[17px]">
                    {fund.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                    {fund.cat}
                  </p>
                  <p className="mt-2 font-sans text-[12.5px] text-ink-soft md:hidden">
                    <span className="text-ink-mute">Fit · </span>
                    {fund.tags.join(" · ")}
                  </p>
                </div>

                <div className="hidden min-w-0 md:block">
                  <div className="grid grid-cols-3 gap-3">
                    {fund.bars.map((b) => (
                      <div key={b.label}>
                        <div className="mb-1 flex justify-between gap-1">
                          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-mute">
                            {b.label}
                          </span>
                          <span className="font-mono text-[9px] text-ink">{b.v}</span>
                        </div>
                        <div className="h-[3px] overflow-hidden rounded-full bg-line">
                          <div
                            className="h-full rounded-full bg-evergreen"
                            style={{ width: `${b.v}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2.5 font-sans text-[12.5px] text-ink-soft">
                    <span className="text-ink-mute">Fit · </span>
                    {fund.tags.join(" · ")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-display text-[28px] font-500 leading-none text-evergreen sm:text-[32px]">
                    {fund.score}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">
                    score
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
