import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const INTERVAL_MS = 4200;
const COUNT = 3;

const slides = [
  { id: "rank", title: "Goal ranking" },
  { id: "ask-niv", title: "Ask Niv" },
  { id: "insights", title: "Live folio" },
] as const;

function ScreenRank() {
  const funds = [
    {
      name: "Parag Parikh Flexi Cap",
      cat: "Flexi Cap",
      score: 94,
      tags: ["Returns", "Consistency", "Cost"],
      bars: [
        { label: "Horizon", v: 96 },
        { label: "Risk", v: 91 },
        { label: "Cost", v: 88 },
      ],
    },
    {
      name: "Mirae Asset Large Cap",
      cat: "Large Cap",
      score: 88,
      tags: ["Stability", "Peers"],
      bars: [
        { label: "Horizon", v: 84 },
        { label: "Risk", v: 90 },
        { label: "Cost", v: 79 },
      ],
    },
    {
      name: "UTI Nifty 50 Index",
      cat: "Index",
      score: 81,
      tags: ["Cost", "Tracking"],
      bars: [
        { label: "Horizon", v: 80 },
        { label: "Risk", v: 86 },
        { label: "Cost", v: 95 },
      ],
    },
    {
      name: "HDFC Flexi Cap",
      cat: "Flexi Cap",
      score: 76,
      tags: ["Consistency"],
      bars: [
        { label: "Horizon", v: 74 },
        { label: "Risk", v: 78 },
        { label: "Cost", v: 72 },
      ],
    },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#F4EFE4]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 50% at 100% 0%, rgba(15,110,94,0.10), transparent 55%)," +
            "linear-gradient(180deg, #FBF8F0 0%, #F4EFE4 100%)",
        }}
      />
      <div className="relative flex h-full flex-col px-3 pb-3 pt-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8C8676]">
              Ranking engine
            </p>
            <h4 className="mt-0.5 font-display text-[15px] font-medium leading-tight tracking-[-0.02em] text-[#14233B]">
              Ranked for your goals
            </h4>
          </div>
          <span className="shrink-0 rounded-full bg-[#0F6E5E]/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-[#0F6E5E]">
            12 matched
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {["Goal: Growth", "10y horizon", "Moderate risk", "Regular"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[#E7DECC] bg-[#FCFAF4] px-1.5 py-0.5 font-mono text-[7.5px] text-[#5B6573]"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-2 min-h-0 flex-1 space-y-1.5 overflow-hidden">
          {funds.map((fund, i) => (
            <div
              key={fund.name}
              className="rounded-[10px] bg-[#FCFAF4] p-2 ring-1 ring-[#E7DECC]/90"
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[8px] text-[#8C8676]">#{i + 1}</span>
                    <p className="truncate font-sans text-[10.5px] font-semibold text-[#14233B]">
                      {fund.name}
                    </p>
                  </div>
                  <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-[#8C8676]">
                    {fund.cat} · Regular
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-[16px] font-medium leading-none text-[#0F6E5E]">
                    {fund.score}
                  </p>
                  <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-[#8C8676]">
                    score
                  </p>
                </div>
              </div>
              <div className="mt-1.5 grid grid-cols-3 gap-1">
                {fund.bars.map((b) => (
                  <div key={b.label}>
                    <div className="mb-0.5 flex justify-between">
                      <span className="font-mono text-[6.5px] uppercase text-[#8C8676]">{b.label}</span>
                      <span className="font-mono text-[6.5px] text-[#14233B]">{b.v}</span>
                    </div>
                    <div className="h-[2px] overflow-hidden rounded-full bg-[#E7DECC]">
                      <div
                        className="h-full rounded-full bg-[#0F6E5E]"
                        style={{ width: `${b.v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-0.5">
                {fund.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#0F6E5E]/8 px-1.5 py-0.5 font-mono text-[7px] text-[#0F6E5E]"
                  >
                    why · {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenAskNiv() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#F4EFE4]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 40% at 0% 100%, rgba(180,146,90,0.12), transparent 50%)," +
            "linear-gradient(180deg, #FBF8F0 0%, #F4EFE4 100%)",
        }}
      />
      <div className="relative border-b border-[#E7DECC]/70 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8C8676]">
              AI fund assistant
            </p>
            <h4 className="mt-0.5 font-display text-[15px] font-medium tracking-[-0.015em] text-[#14233B]">
              Ask Niv
            </h4>
          </div>
          <span className="rounded-full bg-[#0F6E5E]/10 px-2 py-0.5 font-mono text-[7.5px] font-semibold text-[#0F6E5E]">
            Online
          </span>
        </div>
        <div className="mt-1.5 flex gap-1 overflow-hidden">
          {["Returns", "Expense ratio", "Peers", "Category"].map((q) => (
            <span
              key={q}
              className="shrink-0 rounded-full border border-[#E7DECC] bg-[#FCFAF4] px-1.5 py-0.5 font-mono text-[7px] text-[#5B6573]"
            >
              {q}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3 py-2.5">
        <div className="ml-4 rounded-2xl rounded-br-md bg-[#0F6E5E] px-2.5 py-2">
          <p className="font-sans text-[10px] leading-snug text-[#FCFAF4]">
            How does this fund compare on 5Y returns and expense ratio vs peers?
          </p>
        </div>

        <div className="mr-2 rounded-2xl rounded-bl-md bg-[#FCFAF4] px-2.5 py-2 ring-1 ring-[#E7DECC]">
          <p className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-[#0F6E5E]">
            Niv · data-backed
          </p>
          <p className="mt-1 font-sans text-[10px] leading-snug text-[#14233B]">
            5Y CAGR <span className="font-semibold">14.2%</span> vs category{" "}
            <span className="font-semibold">12.1%</span>. Expense ratio{" "}
            <span className="font-semibold">1.28%</span>, lower than 72% of peers.
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1 border-t border-[#E7DECC]/80 pt-1.5">
            {[
              { k: "Returns", v: "+2.1pp" },
              { k: "Cost", v: "−17bps" },
              { k: "Category", v: "Flexi" },
            ].map((m) => (
              <div key={m.k} className="rounded-md bg-[#F4EFE4] px-1 py-1 text-center">
                <p className="font-mono text-[6.5px] uppercase tracking-[0.06em] text-[#8C8676]">
                  {m.k}
                </p>
                <p className="mt-0.5 font-mono text-[9px] font-semibold text-[#14233B]">{m.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ml-4 rounded-2xl rounded-br-md bg-[#0F6E5E] px-2.5 py-2">
          <p className="font-sans text-[10px] leading-snug text-[#FCFAF4]">
            And volatility vs the category median?
          </p>
        </div>

        <div className="mr-2 rounded-2xl rounded-bl-md bg-[#FCFAF4] px-2.5 py-2 ring-1 ring-[#E7DECC]">
          <p className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-[#0F6E5E]">
            Niv · factual
          </p>
          <p className="mt-1 font-sans text-[10px] leading-snug text-[#14233B]">
            Std. deviation <span className="font-semibold">12.8%</span> vs median{" "}
            <span className="font-semibold">14.1%</span>. Lower volatility than 61% of peers.
          </p>
          <div className="mt-2 space-y-1 border-t border-[#E7DECC]/80 pt-1.5">
            {[
              { label: "This fund", pct: 64, tone: "#0F6E5E" },
              { label: "Category", pct: 78, tone: "#B4925A" },
            ].map((r) => (
              <div key={r.label}>
                <div className="mb-0.5 flex justify-between">
                  <span className="font-mono text-[7px] text-[#8C8676]">{r.label}</span>
                  <span className="font-mono text-[7px] text-[#14233B]">{r.pct}%</span>
                </div>
                <div className="h-[2px] overflow-hidden rounded-full bg-[#E7DECC]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${r.pct}%`, background: r.tone }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto rounded-full border border-[#E7DECC] bg-[#FCFAF4] px-2.5 py-1.5">
          <p className="font-sans text-[9px] text-[#8C8676]">Ask about any fund…</p>
        </div>
      </div>
    </div>
  );
}

function ScreenInsights() {
  const pts = "2,38 14,34 26,36 38,30 50,32 62,24 74,26 86,18 98,20 110,14 122,16";
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#F4EFE4]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 55% at 50% 0%, rgba(15,110,94,0.11), transparent 60%)," +
            "linear-gradient(180deg, #FBF8F0 0%, #F4EFE4 100%)",
        }}
      />
      <div className="relative flex h-full flex-col px-3 pb-3 pt-2.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8C8676]">
              Portfolio insights
            </p>
            <h4 className="mt-0.5 font-display text-[15px] font-medium leading-tight tracking-[-0.02em] text-[#14233B]">
              Decoded at a glance
            </h4>
          </div>
          <div className="text-right">
            <p className="font-display text-[18px] font-medium leading-none text-[#14233B]">₹24.8L</p>
            <p className="mt-0.5 inline-flex items-center gap-0.5 font-mono text-[8px] font-semibold text-[#0F6E5E]">
              <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2.5} />
              16.4% / yr
            </p>
          </div>
        </div>

        <div className="mt-2 rounded-[10px] bg-[#FCFAF4] p-2 ring-1 ring-[#E7DECC]/90">
          <div className="mb-1 flex items-center justify-between">
            <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-[#8C8676]">
              12-month pulse
            </p>
            <p className="font-mono text-[7.5px] text-[#8C8676]">Illustrative</p>
          </div>
          <svg viewBox="0 0 124 42" className="w-full" aria-hidden="true">
            <defs>
              <linearGradient id="uspMiniFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F6E5E" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0F6E5E" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`${pts} 122,42 2,42`} fill="url(#uspMiniFill)" />
            <polyline
              points={pts}
              fill="none"
              stroke="#0F6E5E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {[
            { label: "Concentration", value: "38%", sub: "Top holding" },
            { label: "Changed", value: "+4%", sub: "Equity q/q", up: true },
            { label: "Peer pulse", value: "2/3", sub: "Ahead" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-[10px] bg-[#FCFAF4] p-1.5 ring-1 ring-[#E7DECC]/90"
            >
              <p className="font-mono text-[6.5px] uppercase tracking-[0.08em] text-[#8C8676]">
                {m.label}
              </p>
              <p
                className={`mt-0.5 font-display text-[14px] font-medium leading-none ${
                  m.up ? "text-[#0F6E5E]" : "text-[#14233B]"
                }`}
              >
                {m.value}
              </p>
              <p className="mt-0.5 font-sans text-[8px] text-[#5B6573]">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-1.5 min-h-0 flex-1 rounded-[10px] bg-[#FCFAF4] p-2 ring-1 ring-[#E7DECC]/90">
          <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-[#8C8676]">
            Holdings vs peers
          </p>
          <div className="mt-1.5 space-y-1.5">
            {[
              { name: "Flexi Cap A", vs: "+2.4%", pos: true, bar: 38 },
              { name: "Large Cap B", vs: "−0.8%", pos: false, bar: 24 },
              { name: "Index C", vs: "+1.1%", pos: true, bar: 18 },
              { name: "Short Debt D", vs: "+0.3%", pos: true, bar: 20 },
            ].map((row) => (
              <div key={row.name}>
                <div className="mb-0.5 flex items-center justify-between gap-1">
                  <span className="truncate font-sans text-[9.5px] text-[#14233B]">{row.name}</span>
                  <span
                    className={`shrink-0 font-mono text-[9px] font-semibold ${
                      row.pos ? "text-[#0F6E5E]" : "text-[#8C8676]"
                    }`}
                  >
                    {row.vs}
                  </span>
                </div>
                <div className="h-[2.5px] overflow-hidden rounded-full bg-[#E7DECC]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${row.bar}%`,
                      background: row.pos ? "#0F6E5E" : "#B4925A",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const screens = [ScreenRank, ScreenAskNiv, ScreenInsights];

type Slot = "prev" | "active" | "next";

function slotFor(index: number, active: number): Slot {
  if (index === active) return "active";
  if (index === (active - 1 + COUNT) % COUNT) return "prev";
  return "next";
}

/**
 * Horizontal stack:
 * - prev (left) faces outwards southwest
 * - active faces south (straight on)
 * - next (right) faces outwards southeast
 * Transforms live in CSS (.usp-slot-*) so they scale with viewport.
 */
const SLOT_CLASS: Record<Slot, string> = {
  prev: "usp-slot usp-slot-prev",
  active: "usp-slot usp-slot-active",
  next: "usp-slot usp-slot-next",
};

function PhoneFrame({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -bottom-5 left-[10%] right-[10%] h-7 rounded-[100%] transition-opacity duration-700"
        style={{
          opacity: active ? 0.5 : 0.18,
          background:
            "radial-gradient(ellipse at center, rgba(20,35,59,0.4) 0%, transparent 70%)",
          filter: "blur(5px)",
        }}
      />

      <div
        className="relative h-full w-full overflow-hidden rounded-[2.05rem]"
        style={{
          background:
            "linear-gradient(145deg, #2A3548 0%, #14233B 42%, #0C1524 78%, #1A2436 100%)",
          boxShadow: active
            ? "0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.35) inset, 0 36px 64px -28px rgba(20,35,59,0.55)"
            : "0 1px 0 rgba(255,255,255,0.08) inset, 0 16px 36px -24px rgba(20,35,59,0.45)",
          padding: "1.5px",
        }}
      >
        <div
          className="h-full w-full overflow-hidden rounded-[1.95rem]"
          style={{
            background:
              "linear-gradient(160deg, rgba(203,176,126,0.55) 0%, rgba(180,146,90,0.15) 28%, rgba(20,35,59,0.9) 55%, rgba(203,176,126,0.35) 100%)",
            padding: "1px",
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-[#0A1018]">
            <div className="absolute inset-[5px] overflow-hidden rounded-[1.55rem] bg-[#F4EFE4]">
              <div className="relative z-10 flex h-7 items-center justify-between px-4">
                <span className="font-sans text-[10px] font-semibold tracking-tight text-[#14233B]/70">
                  9:41
                </span>
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[7px] h-[13px] w-[58px] -translate-x-1/2 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, #1A2436 0%, #0A1018 100%)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset",
                  }}
                />
                <div className="flex items-center gap-1 opacity-60" aria-hidden="true">
                  <span className="block h-[6px] w-[14px] rounded-[2px] border border-[#14233B]/50">
                    <span className="ml-[1px] mt-[1px] block h-[3px] w-[9px] rounded-[1px] bg-[#14233B]/55" />
                  </span>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 top-7">{children}</div>

              {active && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <div
                    className="usp-sheen absolute -left-1/4 top-0 h-full w-[55%]"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.14) 48%, transparent 62%)",
                      mixBlendMode: "soft-light",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhoneUspShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useRef(false);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + COUNT) % COUNT);
  }, []);

  const bumpAutoplay = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 5000);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion.current) return;
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, goNext]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,42rem)] lg:max-w-[min(100%,40rem)] xl:max-w-[42rem]">
      <style>{`
        .usp-sheen {
          animation: uspSheen 5.5s ease-in-out infinite;
        }
        @keyframes uspSheen {
          0%, 100% { transform: translateX(-30%); opacity: 0; }
          20% { opacity: 1; }
          55% { transform: translateX(140%); opacity: 0.7; }
          56%, 100% { opacity: 0; }
        }
        .usp-stage {
          --usp-phone-w: clamp(168px, 42vw, 286px);
          --usp-phone-h: clamp(300px, 74vw, 540px);
          --usp-offset: clamp(52px, 14vw, 122px);
          --usp-angle: 28deg;
          height: clamp(340px, 88vw, 620px);
          perspective: 1200px;
          perspective-origin: 50% 45%;
        }
        .usp-slot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--usp-phone-w);
          height: var(--usp-phone-h);
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.7s ease, filter 0.7s ease;
          pointer-events: none;
        }
        .usp-slot-prev {
          transform: translate3d(calc(-50% - var(--usp-offset)), -50%, -24px)
            rotateY(calc(var(--usp-angle) * -1)) rotateX(4deg) scale(0.9);
          z-index: 1;
          opacity: 0.86;
          filter: brightness(0.97) saturate(0.96);
        }
        .usp-slot-active {
          transform: translate3d(-50%, -50%, 56px) rotateY(0deg) rotateX(0deg) scale(1);
          z-index: 4;
          opacity: 1;
          filter: none;
        }
        .usp-slot-next {
          transform: translate3d(calc(-50% + var(--usp-offset)), -50%, -24px)
            rotateY(var(--usp-angle)) rotateX(4deg) scale(0.9);
          z-index: 1;
          opacity: 0.86;
          filter: brightness(0.97) saturate(0.96);
        }
        @media (max-width: 640px) {
          .usp-stage {
            --usp-angle: 22deg;
            --usp-offset: clamp(44px, 16vw, 72px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .usp-sheen { animation: none !important; opacity: 0; }
          .usp-slot { transition: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[72%] h-[18%] w-[84%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15,110,94,0.16) 0%, rgba(180,146,90,0.07) 45%, transparent 72%)",
          filter: "blur(8px)",
        }}
      />

      <div
        className="usp-stage relative mx-auto w-full select-none"
        aria-roledescription="carousel"
        aria-label="Product USP phone screens"
      >
        {slides.map((slide, i) => {
          const slot = slotFor(i, active);
          const Screen = screens[i];
          const isActive = slot === "active";

          return (
            <div
              key={slide.id}
              className={SLOT_CLASS[slot]}
              aria-hidden={!isActive}
            >
              <PhoneFrame active={isActive}>
                <Screen />
              </PhoneFrame>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Show previous screen"
          className="absolute inset-y-0 left-0 z-20 w-1/2 cursor-w-resize bg-transparent"
          onClick={() => {
            goPrev();
            bumpAutoplay();
          }}
        />
        <button
          type="button"
          aria-label="Show next screen"
          className="absolute inset-y-0 right-0 z-20 w-1/2 cursor-e-resize bg-transparent"
          onClick={() => {
            goNext();
            bumpAutoplay();
          }}
        />
      </div>

      <div className="relative z-10 mt-1 px-2 text-center sm:-mt-1">
        <h3 className="font-display text-[clamp(1.15rem,3.5vw,1.5rem)] font-medium leading-tight tracking-[-0.01em] text-[#14233B]">
          {slides[active].title}
        </h3>
      </div>
    </div>
  );
}
