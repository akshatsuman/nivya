import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import SectionOverline from "@/components/SectionOverline";

gsap.registerPlugin(ScrollTrigger);

function formatCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}
function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

const sipPresets = [5000, 10000, 25000, 50000, 100000];
const durationPresets = [5, 10, 15, 20, 25];
const returnPresets = [8, 10, 12, 14, 16];

export default function CalculatorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [duration, setDuration] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const { totalInvested, estimatedReturns, finalCorpus, chartData } = useMemo(() => {
    // Geometric monthly rate so 12 months compound to the annual figure.
    const monthlyRate = Math.pow(1 + expectedReturn / 100, 1 / 12) - 1;
    const months = duration * 12;
    const invested = monthlySIP * months;

    const data: { year: number; corpus: number; invested: number; returns: number }[] = [];
    for (let year = 1; year <= duration; year++) {
      const yearMonths = year * 12;
      const corpus =
        monthlySIP *
        ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) *
        (1 + monthlyRate);
      const investedTillYear = monthlySIP * yearMonths;
      data.push({
        year,
        corpus: Math.round(corpus),
        invested: investedTillYear,
        returns: Math.round(corpus - investedTillYear),
      });
    }
    const last = data[data.length - 1];
    return {
      totalInvested: invested,
      estimatedReturns: last.corpus - invested,
      finalCorpus: last.corpus,
      chartData: data,
    };
  }, [monthlySIP, duration, expectedReturn]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.18,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const presetBtn = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-500 transition-all cursor-pointer ${
      active
        ? "bg-evergreen text-paper-raised"
        : "bg-paper-raised border border-line text-ink-soft hover:border-ink"
    }`;

  return (
    <section id="calculator" ref={sectionRef} className="w-full bg-paper py-section md:py-section">
      <div className="content-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          {/* Left — controls */}
          <div ref={leftRef} className="opacity-0">
            <SectionOverline text="SIP calculator" align="left" />
            <h2 className="mt-3 font-display text-h1 text-h1-mobile md:text-h1 text-ink">
              See what patience can build
            </h2>
            <p className="mt-4 font-sans text-body text-ink-soft">
              Move the sliders to picture the corpus a steady monthly SIP can
              grow into. Returns are illustrative, not a promise.
            </p>

            {/* Monthly SIP */}
            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <label className="font-sans text-[15px] font-600 text-ink">Monthly investment</label>
                <span className="font-mono text-xl font-600 text-ink md:text-2xl">{formatINR(monthlySIP)}</span>
              </div>
              <input type="range" min={500} max={100000} step={500} value={monthlySIP} onChange={(e) => setMonthlySIP(Number(e.target.value))} className="w-full" />
              <div className="mt-3 flex flex-wrap gap-2">
                {sipPresets.map((p) => (
                  <button key={p} onClick={() => setMonthlySIP(p)} className={presetBtn(monthlySIP === p)}>
                    {p >= 1000 ? `₹${p / 1000}K` : `₹${p}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <label className="font-sans text-[15px] font-600 text-ink">Years invested</label>
                <span className="font-mono text-xl font-600 text-ink md:text-2xl">{duration} yrs</span>
              </div>
              <input type="range" min={1} max={30} step={1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full" />
              <div className="mt-3 flex flex-wrap gap-2">
                {durationPresets.map((p) => (
                  <button key={p} onClick={() => setDuration(p)} className={presetBtn(duration === p)}>
                    {p}Y
                  </button>
                ))}
              </div>
            </div>

            {/* Expected return */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <label className="font-sans text-[15px] font-600 text-ink">Expected annual return</label>
                <span className="font-mono text-xl font-600 text-ink md:text-2xl">{expectedReturn}%</span>
              </div>
              <input type="range" min={6} max={18} step={0.5} value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full" />
              <p className="mt-2 font-sans text-[13px] text-ink-mute">
                Roughly the long-run average of diversified equity funds.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {returnPresets.map((p) => (
                  <button key={p} onClick={() => setExpectedReturn(p)} className={presetBtn(expectedReturn === p)}>
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-10 rounded-medium border border-line bg-paper-raised p-6 shadow-card">
              <div className="flex items-center justify-between border-b border-line py-3">
                <span className="font-sans text-[14px] text-ink-soft">You invest</span>
                <span className="font-mono text-lg text-ink">{formatINR(totalInvested)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-line py-3">
                <span className="font-sans text-[14px] text-ink-soft">Time adds</span>
                <span className="font-mono text-lg text-evergreen">{formatINR(estimatedReturns)}</span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="font-sans text-[15px] font-600 text-ink">Projected corpus</span>
                <span className="font-mono text-2xl font-600 text-ink md:text-3xl">{formatCurrency(finalCorpus)}</span>
              </div>
            </div>
          </div>

          {/* Right — chart */}
          <div ref={rightRef} className="min-h-[350px] opacity-0 md:min-h-[400px]">
            <div className="h-full rounded-large border border-line bg-paper-raised p-4 shadow-card md:p-6">
              <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="corpusGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0F6E5E" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0F6E5E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="returnsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1AA08C" stopOpacity={0.22} />
                      <stop offset="100%" stopColor="#1AA08C" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#B4925A" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#B4925A" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 4" stroke="#E7DECC" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#5B6573" }}
                    axisLine={{ stroke: "#E7DECC" }}
                    tickLine={false}
                    label={{ value: "Years", position: "insideBottom", offset: -5, style: { fill: "#8C8676", fontSize: 12 } }}
                  />
                  <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 11, fill: "#5B6573" }} axisLine={false} tickLine={false} width={70} />

                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="min-w-[220px] rounded-medium border border-line bg-paper-raised p-4 shadow-card">
                          <p className="mb-3 font-sans font-600 text-ink">Year {data.year}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gold">Invested</span>
                              <span className="font-mono text-ink">{formatINR(data.invested)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-teal">Returns</span>
                              <span className="font-mono text-ink">{formatINR(data.returns)}</span>
                            </div>
                            <div className="flex justify-between border-t border-line pt-2">
                              <span className="font-600 text-evergreen">Total value</span>
                              <span className="font-mono font-600 text-ink">{formatINR(data.corpus)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="line" />

                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#B4925A" strokeWidth={2} fill="url(#investedGradient)" dot={false} />
                  <Area type="monotone" dataKey="returns" name="Returns" stroke="#1AA08C" strokeWidth={2} fill="url(#returnsGradient)" dot={false} />
                  <Area type="monotone" dataKey="corpus" name="Total value" stroke="#0F6E5E" strokeWidth={3} fill="url(#corpusGradient)" dot={false} activeDot={{ r: 6, fill: "#0F6E5E", stroke: "#FCFAF4", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
