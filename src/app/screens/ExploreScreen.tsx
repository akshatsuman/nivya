import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Star,
  Sparkles,
  RotateCcw,
  X,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import { useAppState } from "../AppState";
import {
  FUNDS,
  DNA_GOALS,
  DNA_HORIZONS,
  DNA_RISKS,
  DNA_PRIORITIES,
  type DnaGoal,
  type DnaHorizon,
  type DnaRisk,
  type DnaPriority,
  type FundCategory,
} from "../data";

type Segment = "browse" | "rank" | "compare" | "tools";

const CATEGORY_FILTERS: (FundCategory | "All")[] = [
  "All",
  "Large Cap",
  "Flexi Cap",
  "Mid Cap",
  "Small Cap",
  "ELSS",
  "Hybrid Aggressive",
  "Hybrid Conservative",
  "Corporate Bond",
  "Index",
  "Liquid",
];

export default function ExploreScreen() {
  useShellAppBar({ title: "Explore", subtitle: "Regular Plan funds" }, []);
  const location = useLocation();
  const initialSegment = (location.state as { segment?: Segment } | null)?.segment ?? "browse";
  const [segment, setSegment] = useState<Segment>(initialSegment);

  return (
    <div className="n-page">
      <div className="n-segmented">
        {(["browse", "rank", "compare", "tools"] as Segment[]).map((s) => (
          <button
            key={s}
            type="button"
            className={`n-segmented-item ${segment === s ? "active" : ""}`}
            onClick={() => setSegment(s)}
          >
            {s === "browse" && "Browse"}
            {s === "rank" && "Rank"}
            {s === "compare" && "Compare"}
            {s === "tools" && "Tools"}
          </button>
        ))}
      </div>

      {segment === "browse" && <BrowseSegment />}
      {segment === "rank" && <RankSegment />}
      {segment === "compare" && <CompareSegment />}
      {segment === "tools" && <ToolsSegment />}
    </div>
  );
}

function BrowseSegment() {
  const navigate = useNavigate();
  const { isWatchlisted, toggleWatchlist } = useAppState();
  const [category, setCategory] = useState<(typeof CATEGORY_FILTERS)[number]>("All");

  const funds = useMemo(
    () => (category === "All" ? FUNDS : FUNDS.filter((f) => f.category === category)),
    [category]
  );

  return (
    <>
      <div className="n-pillrow">
        {CATEGORY_FILTERS.map((c) => (
          <button
            key={c}
            type="button"
            className={`n-pill ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="n-col" style={{ gap: 10 }}>
        {funds.map((fund) => (
          <div key={fund.id} className="n-fund-card" style={{ cursor: "pointer" }} onClick={() => navigate(`/app/fund/${fund.id}`)}>
            <span className="n-fund-avatar">{fund.amc.slice(0, 1)}</span>
            <div className="n-fund-info">
              <div className="n-fund-name">{fund.name}</div>
              <div className="n-fund-meta">
                {fund.category} · Regular · Exp {fund.expenseRatio}%
              </div>
            </div>
            <div className="n-fund-side">
              <div className="n-fund-nav">₹{fund.nav.toFixed(2)}</div>
              <div className={`n-fund-change ${fund.returns.y3 >= 0 ? "pos" : "neg"}`}>3Y {fund.returns.y3}%</div>
            </div>
            <button
              type="button"
              className={`n-star-btn ${isWatchlisted(fund.id) ? "active" : ""}`}
              aria-label="Toggle watchlist"
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(fund.id);
              }}
            >
              <Star size={17} fill={isWatchlisted(fund.id) ? "currentColor" : "none"} />
            </button>
          </div>
        ))}
        {funds.length === 0 && (
          <div className="n-empty">
            <span className="n-empty-icon">
              <Sparkles size={22} />
            </span>
            <span className="n-empty-title">No funds in this category</span>
          </div>
        )}
      </div>
    </>
  );
}

function RankSegment() {
  const navigate = useNavigate();
  const { dnaPrefs, dnaResults, runDnaWizard, resetDnaWizard } = useAppState();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<DnaGoal | null>(null);
  const [horizon, setHorizon] = useState<DnaHorizon | null>(null);
  const [risk, setRisk] = useState<DnaRisk | null>(null);
  const [priority, setPriority] = useState<DnaPriority | null>(null);

  if (dnaPrefs && dnaResults.length > 0) {
    return (
      <div className="n-col" style={{ gap: 14 }}>
        <div className="n-card" style={{ background: "var(--teal-bg)", border: "1px solid var(--teal-border)" }}>
          <div className="n-row between">
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--teal-ink)" }}>Your Investment DNA</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>
                {dnaPrefs.goal} · {dnaPrefs.horizon} · {dnaPrefs.risk}
              </div>
            </div>
            <button type="button" className="n-btn n-btn-outline sm" onClick={() => { resetDnaWizard(); setStep(0); }}>
              <RotateCcw size={13} /> Retake
            </button>
          </div>
        </div>
        <div className="n-muted" style={{ fontSize: 11.5 }}>
          Ranked by transparent criteria: expense ratio, rolling consistency, and category-relative returns. This is
          not personalised investment advice.
        </div>
        <div className="n-col" style={{ gap: 10 }}>
          {dnaResults.map((r, i) => (
            <div
              key={r.fund.id}
              className="n-card"
              style={{ display: "flex", gap: 12, cursor: "pointer" }}
              onClick={() => navigate(`/app/fund/${r.fund.id}`)}
            >
              <span className="n-score-badge">{r.score}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="n-row between">
                  <span className="n-fund-name">
                    #{i + 1} {r.fund.name}
                  </span>
                </div>
                <div className="n-fund-meta">{r.fund.category} · Regular Plan</div>
                <div className="n-why-tags">
                  {r.whyTags.map((tag) => (
                    <span key={tag} className="n-chip brand">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const steps = [
    { label: "What's your goal?", options: DNA_GOALS, value: goal, set: setGoal },
    { label: "What's your investment horizon?", options: DNA_HORIZONS, value: horizon, set: setHorizon },
    { label: "What's your risk appetite?", options: DNA_RISKS, value: risk, set: setRisk },
    { label: "What matters most to you?", options: DNA_PRIORITIES, value: priority, set: setPriority },
  ] as const;

  const current = steps[step];
  const canNext = current.value !== null;

  return (
    <div className="n-wizard-step">
      <div className="n-wizard-progress">
        {steps.map((_, i) => (
          <span key={i} className={`n-wizard-progress-bar ${i <= step ? "done" : ""}`} />
        ))}
      </div>
      <div style={{ marginTop: 6 }}>
        <div className="n-chip brand" style={{ marginBottom: 8 }}>
          <Sparkles size={11} /> Investment DNA · Step {step + 1} of {steps.length}
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>{current.label}</h3>
      </div>
      <div className="n-col" style={{ gap: 8, marginTop: 4 }}>
        {current.options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`n-option-tile ${current.value === opt ? "selected" : ""}`}
            onClick={() => (current.set as (v: string) => void)(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="n-row" style={{ marginTop: 8 }}>
        {step > 0 && (
          <button type="button" className="n-btn n-btn-outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </button>
        )}
        <button
          type="button"
          className="n-btn n-btn-primary block"
          disabled={!canNext}
          onClick={() => {
            if (step < steps.length - 1) {
              setStep((s) => s + 1);
            } else if (goal && horizon && risk && priority) {
              runDnaWizard({ goal, horizon, risk, priority });
            }
          }}
        >
          {step < steps.length - 1 ? "Continue" : "See ranked funds"}
        </button>
      </div>
    </div>
  );
}

function CompareSegment() {
  const [selected, setSelected] = useState<string[]>([]);
  const compareFunds = FUNDS.filter((f) => selected.includes(f.id));

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const rows: { label: string; get: (f: (typeof FUNDS)[number]) => string }[] = [
    { label: "Category", get: (f) => f.category },
    { label: "Risk", get: (f) => f.riskLevel },
    { label: "NAV", get: (f) => `₹${f.nav.toFixed(2)}` },
    { label: "Expense ratio", get: (f) => `${f.expenseRatio}%` },
    { label: "1Y return", get: (f) => `${f.returns.y1}%` },
    { label: "3Y return", get: (f) => `${f.returns.y3}%` },
    { label: "5Y return", get: (f) => `${f.returns.y5}%` },
    { label: "AUM", get: (f) => `₹${f.aumCr.toLocaleString("en-IN")} Cr` },
    { label: "Min SIP", get: (f) => `₹${f.minSip}` },
  ];

  return (
    <div className="n-col" style={{ gap: 14 }}>
      <div className="n-muted" style={{ fontSize: 12 }}>Pick up to 3 Regular funds to compare side by side.</div>
      <div className="n-pillrow">
        {FUNDS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`n-pill ${selected.includes(f.id) ? "active" : ""}`}
            onClick={() => toggle(f.id)}
          >
            {f.name.split(" ").slice(0, 2).join(" ")}
          </button>
        ))}
      </div>

      {compareFunds.length === 0 ? (
        <div className="n-empty">
          <span className="n-empty-icon">
            <TrendingUp size={22} />
          </span>
          <span className="n-empty-title">Select funds to compare</span>
          <span className="n-empty-body">Choose from the chips above. Comparison updates instantly.</span>
        </div>
      ) : (
        <div className="n-card" style={{ overflowX: "auto", padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px 12px", color: "var(--muted)", fontWeight: 700 }}>
                  &nbsp;
                </th>
                {compareFunds.map((f) => (
                  <th key={f.id} style={{ textAlign: "left", padding: "12px 10px", minWidth: 118 }}>
                    <div style={{ fontWeight: 800, fontSize: 12 }}>{f.name}</div>
                    <div style={{ color: "var(--faint)", fontWeight: 500, fontSize: 10.5, marginTop: 2 }}>
                      {f.amc}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} style={{ borderTop: "1px solid var(--line)" }}>
                  <td style={{ padding: "10px 12px", color: "var(--muted)", fontWeight: 600 }}>{row.label}</td>
                  {compareFunds.map((f) => (
                    <td key={f.id} style={{ padding: "10px 10px", fontWeight: 700 }}>
                      {row.get(f)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ToolsSegment() {
  const [amount, setAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const futureValue = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    if (monthlyRate === 0) return amount * months;
    return amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }, [amount, years, rate]);

  const invested = amount * years * 12;

  return (
    <div className="n-col" style={{ gap: 16 }}>
      <div className="n-card">
        <div className="n-row" style={{ marginBottom: 4 }}>
          <Calculator size={16} color="var(--brand-ink)" />
          <span style={{ fontWeight: 800, fontSize: 14 }}>SIP growth calculator</span>
        </div>

        <div className="n-field" style={{ marginTop: 10 }}>
          <div className="n-row between">
            <span className="n-label">Monthly SIP</span>
            <span style={{ fontWeight: 800, fontSize: 13.5 }}>₹{amount.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min={500}
            max={50000}
            step={500}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="n-field">
          <div className="n-row between">
            <span className="n-label">Time horizon</span>
            <span style={{ fontWeight: 800, fontSize: 13.5 }}>{years} years</span>
          </div>
          <input type="range" min={1} max={30} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </div>

        <div className="n-field">
          <div className="n-row between">
            <span className="n-label">Assumed annual return</span>
            <span style={{ fontWeight: 800, fontSize: 13.5 }}>{rate}%</span>
          </div>
          <input type="range" min={4} max={18} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>

        <div className="n-divider" style={{ margin: "14px 0" }} />

        <div className="n-row between">
          <div>
            <div className="n-label">Invested</div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>₹{Math.round(invested).toLocaleString("en-IN")}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="n-label">Illustrative value</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "var(--brand-ink)" }}>
              ₹{Math.round(futureValue).toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="n-illustrative-note" style={{ marginTop: 12 }}>
          <X size={13} style={{ marginTop: 1, flexShrink: 0, transform: "rotate(45deg)" }} />
          Illustrative future value only, not a forecast or guarantee. Actual returns depend on market performance
          and the fund chosen.
        </div>
      </div>
    </div>
  );
}
