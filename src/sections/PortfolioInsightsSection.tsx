import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity, Layers3, Radar } from "lucide-react";
import SectionOverline from "@/components/SectionOverline";

gsap.registerPlugin(ScrollTrigger);

const TREND = [
  { m: "Jul", value: 18.4 },
  { m: "Aug", value: 18.9 },
  { m: "Sep", value: 19.2 },
  { m: "Oct", value: 20.1 },
  { m: "Nov", value: 20.8 },
  { m: "Dec", value: 21.4 },
  { m: "Jan", value: 22.0 },
  { m: "Feb", value: 22.6 },
  { m: "Mar", value: 23.1 },
  { m: "Apr", value: 23.8 },
  { m: "May", value: 24.2 },
  { m: "Jun", value: 24.8 },
];

const HOLDINGS = [
  {
    name: "Parag Parikh Flexi Cap",
    category: "Flexi Cap",
    weight: 38,
    vsPeer: 2.4,
    pulse: "Ahead of peers",
  },
  {
    name: "Mirae Asset Large Cap",
    category: "Large Cap",
    weight: 24,
    vsPeer: -0.8,
    pulse: "Slightly behind",
  },
  {
    name: "UTI Nifty 50 Index",
    category: "Index",
    weight: 18,
    vsPeer: 1.1,
    pulse: "Tracking cleanly",
  },
  {
    name: "HDFC Short Term Debt",
    category: "Debt",
    weight: 20,
    vsPeer: 0.3,
    pulse: "In line",
  },
];

function formatLakh(n: number) {
  return `₹${n.toFixed(1)}L`;
}

export default function PortfolioInsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const activeIdx = hoverIdx ?? TREND.length - 1;
  const displayValue = useMemo(() => TREND[activeIdx].value, [activeIdx]);
  const invested = 18.6;
  const gain = displayValue - invested;

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
        boardRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: boardRef.current, start: "top 85%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper-deep section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 38% at 88% 18%, rgba(15,110,94,0.08) 0%, transparent 70%)," +
            "radial-gradient(36% 34% at 8% 86%, rgba(180,146,90,0.08) 0%, transparent 72%)",
        }}
      />

      <div className="content-container relative z-10">
        <div ref={headingRef} className="mx-auto max-w-[640px] text-center">
          <div className="opacity-0">
            <SectionOverline text="Portfolio" align="center" />
          </div>
          <h2 className="mt-4 font-display text-h1 text-h1-mobile md:text-h1 text-ink opacity-0">
            See your folio clearly.
          </h2>
        </div>

        <div
          ref={boardRef}
          className="mt-10 grid w-full grid-cols-1 items-stretch gap-5 opacity-0 sm:mt-12 lg:grid-cols-2 lg:gap-6"
        >
          {/* Live folio statement */}
          <article className="statement relative flex flex-col overflow-hidden rounded-xl2 shadow-statement">
            <div className="flex items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
              <div className="flex items-center gap-2.5">
                <img
                  src={`${import.meta.env.BASE_URL}assets/logo.png`}
                  alt="Nivya"
                  className="h-7 w-auto"
                />
                <div className="leading-tight">
                  <p className="font-display text-[17px] font-medium text-ink">Nivya</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                    Folio statement
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/25 bg-evergreen/8 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-evergreen">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-evergreen opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-evergreen" />
                  </span>
                  Live folio
                </span>
                <p className="mt-1.5 font-mono text-[12px] font-medium text-ink">NV-48207</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
                  as on 19 Jun
                </p>
              </div>
            </div>

            <div className="mt-4 px-5 sm:px-6">
              <div className="rule" />
            </div>

            <div className="px-5 pt-4 sm:px-6">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">
                Current value · {TREND[activeIdx].m}
              </p>
              <div className="mt-1.5 flex flex-wrap items-end gap-3">
                <span className="font-display text-[36px] font-medium leading-none tracking-[-0.02em] text-ink sm:text-[40px]">
                  {formatLakh(displayValue)}
                </span>
                <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-evergreen/10 px-2 py-0.5 font-mono text-[11.5px] font-semibold text-evergreen">
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                  16.4% / yr
                </span>
              </div>
              <p className="mt-2 font-sans text-[13px] text-ink-soft">
                Invested {formatLakh(invested)} · Gain{" "}
                <span className="font-medium text-evergreen">+{formatLakh(gain)}</span>
              </p>
            </div>

            <div className="mt-3 flex-1 px-3 pb-2 sm:px-4">
              <p className="mb-1 px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
                12-month pulse · hover to explore
              </p>
              <div className="h-[180px] sm:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={TREND}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                    onMouseMove={(state) => {
                      if (typeof state?.activeTooltipIndex === "number") {
                        setHoverIdx(state.activeTooltipIndex);
                      }
                    }}
                    onMouseLeave={() => setHoverIdx(null)}
                  >
                    <defs>
                      <linearGradient id="liveFolioFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0F6E5E" stopOpacity={0.28} />
                        <stop offset="100%" stopColor="#0F6E5E" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
                    <Tooltip
                      content={() => null}
                      cursor={{ stroke: "#0F6E5E", strokeOpacity: 0.25, strokeDasharray: "4 4" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0F6E5E"
                      strokeWidth={2.4}
                      fill="url(#liveFolioFill)"
                      dot={false}
                      activeDot={{
                        r: 5,
                        fill: "#0F6E5E",
                        stroke: "#FCFAF4",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="px-5 sm:px-6">
              <div className="perf" />
            </div>
            <div className="grid grid-cols-3 gap-2 px-5 py-4 sm:px-6">
              {[
                { label: "Holdings", value: "4" },
                { label: "SIPs active", value: "3" },
                { label: "XIRR", value: "16.4%" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-medium bg-paper-deep/50 px-2.5 py-2 text-center"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">
                    {m.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[15px] font-semibold text-ink">{m.value}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Insights & analysis */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-large border border-line bg-paper-raised p-4 shadow-card">
                <div className="flex h-9 w-9 items-center justify-center rounded-medium bg-evergreen/8 text-evergreen ring-1 ring-evergreen/14">
                  <Radar className="h-4 w-4" strokeWidth={1.7} />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  Peer pulse
                </p>
                <p className="mt-1 font-sans text-[15px] font-semibold leading-snug text-ink">
                  2 of 3 equity funds ahead of category
                </p>
              </div>
              <div className="rounded-large border border-line bg-paper-raised p-4 shadow-card">
                <div className="flex h-9 w-9 items-center justify-center rounded-medium bg-gold/10 text-gold ring-1 ring-gold/20">
                  <Layers3 className="h-4 w-4" strokeWidth={1.7} />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  Concentration
                </p>
                <p className="mt-1 font-sans text-[15px] font-semibold leading-snug text-ink">
                  Top holding is 38% of folio
                </p>
              </div>
              <div className="rounded-large border border-line bg-paper-raised p-4 shadow-card">
                <div className="flex h-9 w-9 items-center justify-center rounded-medium bg-evergreen/8 text-evergreen ring-1 ring-evergreen/14">
                  <Activity className="h-4 w-4" strokeWidth={1.7} />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  What’s changed
                </p>
                <p className="mt-1 font-sans text-[15px] font-semibold leading-snug text-ink">
                  Equity share up 4.2% this quarter
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col rounded-large border border-line bg-paper-raised p-5 shadow-card">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                    In-depth analysis
                  </p>
                  <h3 className="mt-1 font-display text-[22px] font-medium tracking-[-0.015em] text-ink">
                    Holdings vs peers
                  </h3>
                </div>
                <p className="pb-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                  Illustrative
                </p>
              </div>

              <div className="mt-4 space-y-3.5">
                {HOLDINGS.map((h) => {
                  const ahead = h.vsPeer >= 0;
                  return (
                    <div key={h.name}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-sans text-[14px] font-semibold text-ink">
                            {h.name}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                            {h.category} · {h.weight}% of folio
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`inline-flex items-center gap-0.5 font-mono text-[13px] font-semibold ${
                              ahead ? "text-evergreen" : "text-ink-soft"
                            }`}
                          >
                            {ahead ? (
                              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                            ) : (
                              <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                            )}
                            {ahead ? "+" : ""}
                            {h.vsPeer}%
                          </p>
                          <p className="mt-0.5 font-sans text-[11px] text-ink-mute">{h.pulse}</p>
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${h.weight}%`,
                            background: ahead
                              ? "linear-gradient(90deg,#0F6E5E,#1AA08C)"
                              : "linear-gradient(90deg,#B4925A,#CBB07E)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-[640px] text-center font-sans text-[12.5px] leading-relaxed text-ink-mute">
          Sample folio for demonstration. This shows holding and peer data, not buy or sell advice.
        </p>
      </div>
    </section>
  );
}
