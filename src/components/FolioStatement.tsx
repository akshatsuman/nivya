import { ArrowUpRight } from "lucide-react";

/* ── Compounding curve (the signature) ───────────────────────────────
   Two series on a warm statement: what you put in vs. what time builds.
   Hand-built SVG so the line, fill and milestones match the paper stock. */

const VALUE = [6, 11, 17, 24, 33, 45, 58, 73, 91, 113, 139, 169, 205];
const INVESTED = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78];

const VW = 372;
const VH = 138;
const PAD_X = 6;
const PAD_T = 10;
const PAD_B = 8;
const MAX = 210;

function toPoints(series: number[]) {
  const innerW = VW - PAD_X * 2;
  const innerH = VH - PAD_T - PAD_B;
  return series.map((v, i) => {
    const x = PAD_X + (i / (series.length - 1)) * innerW;
    const y = PAD_T + innerH - (v / MAX) * innerH;
    return [x, y] as const;
  });
}

function smooth(points: ReadonlyArray<readonly [number, number]>) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 > points.length - 1 ? points.length - 1 : i + 2];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const valuePts = toPoints(VALUE);
const investedPts = toPoints(INVESTED);
const valuePath = smooth(valuePts);
const investedPath = smooth(investedPts);
const areaPath = `${valuePath} L ${valuePts[valuePts.length - 1][0]},${
  VH - PAD_B
} L ${valuePts[0][0]},${VH - PAD_B} Z`;
const endPt = valuePts[valuePts.length - 1];

const ledger = [
  { date: "01 Jun", desc: "SIP instalment", amt: "+ ₹15,000", credit: true },
  { date: "01 Jun", desc: "Units allotted", amt: "142.318", credit: false },
  { date: "31 May", desc: "NAV applied", amt: "₹105.41", credit: false },
];

export default function FolioStatement() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="statement relative overflow-hidden rounded-xl2 shadow-statement">
        {/* Letterhead */}
        <div className="flex items-start justify-between px-6 pt-6">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="" className="h-7 w-auto" />
            <div className="leading-tight">
              <p className="font-display text-[17px] font-600 text-ink">Nivya</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                Folio statement
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-right leading-tight">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-mute">
              <span className="inline-block h-1 w-1 rounded-full bg-gold" />
              Sample · Coming soon
            </span>
            <p className="font-mono text-[12px] font-500 text-ink">NV-48207</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
              as on 19 Jun
            </p>
          </div>
        </div>

        <div className="mt-4 px-6">
          <div className="rule" />
        </div>

        {/* Corpus */}
        <div className="px-6 pt-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">
            Current value
          </p>
          <div className="mt-1.5 flex items-end gap-3">
            <span className="font-mono text-[32px] font-600 leading-none text-ink">
              ₹24,86,400
            </span>
            <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-evergreen/10 px-2 py-0.5 font-mono text-[11.5px] font-600 text-evergreen">
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              16.4% / yr
            </span>
          </div>
        </div>

        {/* Compounding chart */}
        <div className="mt-4 px-5">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-mute">
              Compounding · 12 yrs
            </span>
            <span className="flex items-center gap-3 font-mono text-[10.5px]">
              <span className="flex items-center gap-1.5 text-ink-soft">
                <span className="inline-block h-[2px] w-3 rounded bg-ink-mute" />
                Invested
              </span>
              <span className="flex items-center gap-1.5 text-evergreen">
                <span className="inline-block h-[2px] w-3 rounded bg-evergreen" />
                Value
              </span>
            </span>
          </div>

          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="mt-2 w-full"
            role="img"
            aria-label="Projected value compounding above amount invested over twelve years"
          >
            <defs>
              <linearGradient id="valFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F6E5E" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#0F6E5E" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ledger ruling */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1={PAD_X}
                x2={VW - PAD_X}
                y1={PAD_T + (i * (VH - PAD_T - PAD_B)) / 3}
                y2={PAD_T + (i * (VH - PAD_T - PAD_B)) / 3}
                stroke="#14233B"
                strokeOpacity="0.05"
              />
            ))}

            <path d={areaPath} fill="url(#valFill)" />
            <path
              d={investedPath}
              fill="none"
              stroke="#A99F88"
              strokeWidth="1.75"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
            <path
              d={valuePath}
              fill="none"
              stroke="#0F6E5E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={endPt[0]} cy={endPt[1]} r="4.5" fill="#0F6E5E" />
            <circle cx={endPt[0]} cy={endPt[1]} r="8" fill="#0F6E5E" fillOpacity="0.16" />
          </svg>
        </div>

        {/* Passbook ledger */}
        <div className="mt-3 px-6">
          <div className="perf" />
        </div>
        <div className="px-6 pb-6 pt-3.5">
          <div className="space-y-2.5">
            {ledger.map((row) => (
              <div
                key={row.desc}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tabular-nums text-ink-mute">
                    {row.date}
                  </span>
                  <span className="font-sans text-[13.5px] text-ink-soft">
                    {row.desc}
                  </span>
                </div>
                <span
                  className={`font-mono text-[13px] font-500 ${
                    row.credit ? "text-evergreen" : "text-ink"
                  }`}
                >
                  {row.amt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* One accessory: a quiet 'on track' goal ribbon */}
      <div className="absolute -bottom-6 -left-4 hidden w-[212px] rounded-large border border-line bg-paper-raised p-4 shadow-chip animate-float-soft sm:block">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[13px] font-600 text-ink">
            Retirement · 2048
          </p>
          <span className="font-mono text-[11px] font-600 text-evergreen">
            On track
          </span>
        </div>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full"
            style={{
              width: "64%",
              background: "linear-gradient(90deg,#0F6E5E,#1AA08C)",
            }}
          />
        </div>
        <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-mute">
          64% funded
        </p>
      </div>
    </div>
  );
}
