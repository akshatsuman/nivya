import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionOverline from "@/components/SectionOverline";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const RULES = [
  "Plain-language questions",
  "Answers from fund data",
  "No buy or sell advice",
  "Works on funds & your folio",
];

const CAPABILITIES = [
  { title: "Compare peers", detail: "Returns, cost, volatility vs category" },
  { title: "Read your folio", detail: "Concentration, XIRR, monthly moves" },
  { title: "Import holdings", detail: "CAS from Groww, Zerodha & more" },
  { title: "Stay factual", detail: "Numbers only — never a buy or sell call" },
];

type DemoExchange = {
  id: string;
  question: string;
  label: string;
  body: ReactNode;
  metrics: { k: string; v: string }[];
  followUp?: string;
  followBody?: ReactNode;
};

const DEMO_EXCHANGES: DemoExchange[] = [
  {
    id: "returns-peers",
    question: "How does this fund compare on 5Y returns vs peers?",
    label: "Niv · data-backed",
    body: (
      <>
        5Y CAGR <span className="font-600">14.2%</span> vs category{" "}
        <span className="font-600">12.1%</span>. Ahead of{" "}
        <span className="font-600">78%</span> of peers in the same category.
      </>
    ),
    metrics: [
      { k: "Fund 5Y", v: "14.2%" },
      { k: "Category", v: "12.1%" },
      { k: "Peer rank", v: "Top 22%" },
    ],
    followUp: "Is that on a rolling basis?",
    followBody: (
      <>
        Yes — rolling 5Y win rate is <span className="font-600">71%</span> of monthly windows
        vs category median.
      </>
    ),
  },
  {
    id: "concentration",
    question: "Where is my portfolio most concentrated?",
    label: "Niv · portfolio",
    body: (
      <>
        Top weight is <span className="font-600">28%</span> in one flexi-cap holding. Your top{" "}
        <span className="font-600">3</span> funds make up <span className="font-600">61%</span> of
        the folio.
      </>
    ),
    metrics: [
      { k: "Top holding", v: "28%" },
      { k: "Top 3", v: "61%" },
      { k: "Funds", v: "9" },
    ],
    followUp: "How does that compare to last quarter?",
    followBody: (
      <>
        Top holding was <span className="font-600">24%</span> last quarter — concentration rose{" "}
        <span className="font-600">4pp</span> on market move, not new buys.
      </>
    ),
  },
  {
    id: "expense",
    question: "What is the expense ratio vs the category?",
    label: "Niv · data-backed",
    body: (
      <>
        Expense ratio is <span className="font-600">1.28%</span> vs category average{" "}
        <span className="font-600">1.45%</span> — about <span className="font-600">17 bps</span>{" "}
        lower, cheaper than <span className="font-600">72%</span> of peers.
      </>
    ),
    metrics: [
      { k: "Expense", v: "1.28%" },
      { k: "Category avg", v: "1.45%" },
      { k: "Cost", v: "−17bps" },
    ],
  },
  {
    id: "vs-category",
    question: "How am I doing vs the category average?",
    label: "Niv · portfolio",
    body: (
      <>
        Trailing 1Y folio return is <span className="font-600">13.6%</span> vs a blended category
        average of <span className="font-600">11.9%</span> — about{" "}
        <span className="font-600">+1.7pp</span> ahead on the same mix.
      </>
    ),
    metrics: [
      { k: "Folio 1Y", v: "13.6%" },
      { k: "Category", v: "11.9%" },
      { k: "Delta", v: "+1.7pp" },
    ],
  },
  {
    id: "migrate",
    question: "Can I bring holdings from Groww or Zerodha?",
    label: "Niv · migration",
    body: (
      <>
        Yes. Upload your CAS from CAMS or KFintech — holdings from Groww, Zerodha, and other apps
        show in one Nivya folio view. Units stay with the fund house.
      </>
    ),
    metrics: [
      { k: "Import", v: "CAS" },
      { k: "Sources", v: "Any RTA" },
      { k: "Custody", v: "AMC" },
    ],
    followUp: "Does import move my money?",
    followBody: (
      <>
        No. Import is a statement view only. Money and units remain with the AMC / RTA.
      </>
    ),
  },
  {
    id: "xirr-drag",
    question: "Which holding dragged XIRR this quarter?",
    label: "Niv · portfolio",
    body: (
      <>
        Mid-cap sleeve returned <span className="font-600">−2.4%</span> this quarter and pulled
        folio XIRR down by about <span className="font-600">0.6pp</span>. Large-cap and debt
        offsets kept overall XIRR at <span className="font-600">12.4%</span>.
      </>
    ),
    metrics: [
      { k: "Drag", v: "Mid cap" },
      { k: "Q return", v: "−2.4%" },
      { k: "XIRR", v: "12.4%" },
    ],
  },
  {
    id: "volatility",
    question: "How volatile is it against the median?",
    label: "Niv · factual",
    body: (
      <>
        Std. deviation <span className="font-600">12.8%</span> vs category median{" "}
        <span className="font-600">14.1%</span>. Lower volatility than{" "}
        <span className="font-600">61%</span> of peers over 3 years.
      </>
    ),
    metrics: [
      { k: "Fund σ", v: "12.8%" },
      { k: "Median", v: "14.1%" },
      { k: "Calmer than", v: "61%" },
    ],
  },
  {
    id: "overweight",
    question: "Am I overweight in one sector or AMC?",
    label: "Niv · portfolio",
    body: (
      <>
        Financials are <span className="font-600">34%</span> of equity exposure vs a{" "}
        <span className="font-600">22%</span> Nifty blend. One AMC accounts for{" "}
        <span className="font-600">41%</span> of total folio value.
      </>
    ),
    metrics: [
      { k: "Financials", v: "34%" },
      { k: "Nifty blend", v: "22%" },
      { k: "Top AMC", v: "41%" },
    ],
  },
  {
    id: "sips-import",
    question: "Will my existing SIPs keep running after I import?",
    label: "Niv · migration",
    body: (
      <>
        Yes. Import is view-only for existing SIPs — they keep debiting from the original platform
        until you stop them there and start fresh on Nivya.
      </>
    ),
    metrics: [
      { k: "SIPs", v: "Unchanged" },
      { k: "Import", v: "Holdings" },
      { k: "New SIP", v: "Optional" },
    ],
  },
  {
    id: "month-change",
    question: "What changed in my folio this month?",
    label: "Niv · portfolio",
    body: (
      <>
        Value moved <span className="font-600">+₹18,400</span> (
        <span className="font-600">+1.9%</span>). One SIP credit of{" "}
        <span className="font-600">₹10,000</span> landed; no redemptions.
      </>
    ),
    metrics: [
      { k: "Value Δ", v: "+1.9%" },
      { k: "SIP in", v: "₹10k" },
      { k: "Redeem", v: "None" },
    ],
  },
  {
    id: "benchmark",
    question: "How does this fund track its benchmark?",
    label: "Niv · data-backed",
    body: (
      <>
        Tracking difference is <span className="font-600">−0.42%</span> over 1Y vs the stated
        benchmark. Acceptable for an active flexi-cap; not an index fund.
      </>
    ),
    metrics: [
      { k: "TD 1Y", v: "−0.42%" },
      { k: "Style", v: "Active" },
      { k: "Benchmark", v: "Nifty 500" },
    ],
  },
  {
    id: "exit-load",
    question: "Is there an exit load if I redeem next month?",
    label: "Niv · factual",
    body: (
      <>
        Exit load is <span className="font-600">1%</span> if redeemed within{" "}
        <span className="font-600">365 days</span> of allotment. After that, nil on this scheme.
      </>
    ),
    metrics: [
      { k: "Load", v: "1%" },
      { k: "Window", v: "365d" },
      { k: "After", v: "Nil" },
    ],
  },
];

const LEFT_PROMPTS = DEMO_EXCHANGES.filter((_, i) => i % 2 === 0);
const RIGHT_PROMPTS = DEMO_EXCHANGES.filter((_, i) => i % 2 === 1);

function PromptRail({
  prompts,
  activeId,
  onPick,
}: {
  prompts: DemoExchange[];
  activeId: string;
  onPick: (id: string) => void;
}) {
  return (
    <ul className="flex h-full flex-col justify-between gap-2">
      {prompts.map((p) => {
        const active = activeId === p.id;
        return (
          <li key={p.id} className="w-full">
            <button
              type="button"
              onClick={() => onPick(p.id)}
              className={cn(
                "w-full cursor-pointer rounded-[14px] border px-4 py-3.5 text-left font-sans text-[14.5px] leading-snug transition-colors duration-200 sm:py-4 sm:text-[15px]",
                active
                  ? "border-evergreen/40 bg-evergreen/10 text-ink shadow-[0_8px_20px_-16px_rgba(15,110,94,0.55)]"
                  : "border-line bg-paper-raised text-ink-soft hover:border-line-strong hover:bg-paper-raised hover:text-ink"
              )}
            >
              {p.question}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function AskNivSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(DEMO_EXCHANGES[0].id);

  const active = DEMO_EXCHANGES.find((e) => e.id === activeId) ?? DEMO_EXCHANGES[0];

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
        }
      );
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: stageRef.current, start: "top 88%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!replyRef.current) return;
    gsap.fromTo(
      replyRef.current,
      { opacity: 0.35, y: 8 },
      { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
    );
  }, [activeId]);

  return (
    <section
      id="ask-niv"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(180,146,90,0.10) 0%, transparent 55%)," +
            "radial-gradient(40% 35% at 50% 100%, rgba(15,110,94,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="content-container relative z-10">
        <div
          ref={headingRef}
          className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left"
        >
          <div className="max-w-[560px] opacity-0">
            <div className="flex justify-center lg:justify-start">
              <SectionOverline text="Ask Niv" align="center" />
            </div>
            <h2 className="mt-3 font-display text-h1 text-h1-mobile md:text-h1 text-ink lg:mt-2">
              Your AI fund assistant.
            </h2>
            <p className="mt-2 font-sans text-[15.5px] leading-relaxed text-ink-soft lg:hidden">
              Tap a prompt — Niv answers from fund and folio data.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 opacity-0 lg:max-w-[520px] lg:justify-end">
            {RULES.map((rule) => (
              <span
                key={rule}
                className="rounded-full border border-gold/35 bg-gold/8 px-3 py-1.5 font-sans text-[12.5px] font-medium text-ink"
              >
                {rule}
              </span>
            ))}
          </div>
        </div>

        <div ref={stageRef} className="mt-7 opacity-0 sm:mt-8">
          <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)_minmax(0,1fr)] lg:gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,560px)_minmax(0,1.05fr)] xl:gap-5">
            <div className="hidden min-h-0 lg:block">
              <PromptRail prompts={LEFT_PROMPTS} activeId={activeId} onPick={setActiveId} />
            </div>

            <div
              className="relative flex min-h-[520px] w-full flex-col overflow-hidden rounded-[26px] border border-line-strong px-5 py-5 sm:min-h-[560px] sm:px-7 sm:py-6 lg:min-h-0"
              style={{
                background:
                  "linear-gradient(165deg, #FCFAF4 0%, #F7F3EA 55%, #F3EBD8 100%)",
                boxShadow: "0 28px 60px -36px rgba(20,35,59,0.35)",
              }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-evergreen opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-evergreen" />
                  </span>
                  <div>
                    <p className="font-display text-[22px] font-500 leading-none tracking-[-0.015em] text-ink">
                      Niv
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                      Fund & folio facts
                    </p>
                  </div>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-evergreen">
                  Online · factual
                </p>
              </div>

              <div ref={replyRef} className="mt-5 flex flex-1 flex-col justify-center space-y-3.5">
                <div className="ml-8 rounded-[18px] rounded-br-md bg-evergreen px-4 py-3.5 sm:ml-10">
                  <p className="font-sans text-[15px] leading-snug text-paper-raised">
                    {active.question}
                  </p>
                </div>

                <div className="mr-6 rounded-[18px] rounded-bl-md border border-line bg-paper-raised/95 px-4 py-4 sm:mr-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-evergreen">
                    {active.label}
                  </p>
                  <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink">{active.body}</p>
                  <div className="mt-3.5 flex flex-wrap gap-2 border-t border-line pt-3.5">
                    {active.metrics.map((m) => (
                      <span
                        key={`${active.id}-${m.k}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-paper-deep px-3 py-1.5 font-mono text-[12px] text-ink"
                      >
                        <span className="text-ink-mute">{m.k}</span>
                        <span className="font-600">{m.v}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {active.followUp && active.followBody ? (
                  <>
                    <div className="ml-8 rounded-[18px] rounded-br-md bg-evergreen/90 px-4 py-3 sm:ml-10">
                      <p className="font-sans text-[14.5px] leading-snug text-paper-raised">
                        {active.followUp}
                      </p>
                    </div>
                    <div className="mr-6 rounded-[18px] rounded-bl-md border border-line bg-paper-raised/90 px-4 py-3.5 sm:mr-8">
                      <p className="font-sans text-[14.5px] leading-snug text-ink">{active.followBody}</p>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-full border border-line bg-paper-raised px-4 py-3.5">
                <p className="flex-1 font-sans text-[14.5px] text-ink-mute">Ask about any fund…</p>
                <span className="rounded-full bg-evergreen px-3.5 py-1.5 font-sans text-[12.5px] font-semibold text-paper-raised">
                  Ask
                </span>
              </div>
            </div>

            <div className="hidden min-h-0 lg:block">
              <PromptRail prompts={RIGHT_PROMPTS} activeId={activeId} onPick={setActiveId} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:hidden">
            {DEMO_EXCHANGES.map((p) => {
              const activePrompt = activeId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  className={cn(
                    "w-full cursor-pointer rounded-[14px] border px-4 py-3.5 text-left font-sans text-[14px] leading-snug transition-colors duration-200",
                    activePrompt
                      ? "border-evergreen/40 bg-evergreen/10 text-ink"
                      : "border-line bg-paper-raised text-ink-soft hover:border-line-strong hover:text-ink"
                  )}
                >
                  {p.question}
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-4">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="bg-paper-raised px-4 py-4 sm:px-5 sm:py-5">
                <p className="font-sans text-[14.5px] font-600 text-ink">{cap.title}</p>
                <p className="mt-1 font-sans text-[13px] leading-snug text-ink-soft">{cap.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
