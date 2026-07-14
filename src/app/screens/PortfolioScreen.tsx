import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Info,
  Newspaper,
  TrendingUp,
} from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import { useAppState, type HoldingView } from "../AppState";
import { PORTFOLIO_TREND } from "../data";

type Tab = "Overview" | "Holdings" | "Insights";
type Range = "3M" | "6M" | "1Y";

const RANGE_POINTS: Record<Range, number> = { "3M": 3, "6M": 6, "1Y": 12 };
const DONUT_COLORS = ["#0f6e5e", "#14233b", "#b4925a", "#1aa08c", "#c0362c", "#5b6573", "#8c8676"];

const PULSE_LABEL: Record<string, { label: string; cls: string }> = {
  ahead_of_peers_past: { label: "Ahead of peers (past 1Y)", cls: "ahead" },
  trailing_peers_past: { label: "Trailing peers (past 1Y)", cls: "trailing" },
  near_category_median_past: { label: "Near category median (past 1Y)", cls: "near" },
};

function pulseFor(h: HoldingView): keyof typeof PULSE_LABEL {
  const delta = h.fund.returns.y1 - h.fund.categoryAvgReturns.y1;
  if (delta > 1.2) return "ahead_of_peers_past";
  if (delta < -1.2) return "trailing_peers_past";
  return "near_category_median_past";
}

const DEMO_HEADLINES = [
  { category: "Large Cap", text: "Large-cap category flows stayed steady this quarter, per demo AMFI-style data." },
  { category: "Mid Cap", text: "Mid-cap category volatility ticked up slightly over the past month (demo)." },
  { category: "Corporate Bond", text: "Corporate bond spreads held range-bound over the past quarter (demo)." },
  { category: "Small Cap", text: "Small-cap category saw higher-than-usual dispersion across funds (demo)." },
];

export default function PortfolioScreen() {
  useShellAppBar({ title: "Portfolio", subtitle: "Statement · holdings · insights" }, []);
  const navigate = useNavigate();
  const { holdings, totalInvested, totalCurrentValue, totalGainValue, totalGainPct, plans } = useAppState();
  const [tab, setTab] = useState<Tab>("Overview");
  const [range, setRange] = useState<Range>("1Y");

  const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
  const isPositive = totalGainValue >= 0;

  const chartData = useMemo(
    () => PORTFOLIO_TREND.slice(-RANGE_POINTS[range]),
    [range]
  );

  const categoryAllocation = useMemo(() => {
    const map = new Map<string, number>();
    holdings.forEach((h) => map.set(h.fund.category, (map.get(h.fund.category) ?? 0) + h.currentValue));
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [holdings]);

  const equityPct = useMemo(() => {
    const equityCats = [
      "Large Cap",
      "Flexi Cap",
      "Mid Cap",
      "Small Cap",
      "Large & Mid Cap",
      "Multi Cap",
      "Focused Equity",
      "ELSS",
      "Index",
    ];
    const equity = holdings
      .filter((h) => equityCats.includes(h.fund.category))
      .reduce((s, h) => s + h.currentValue, 0);
    return totalCurrentValue > 0 ? (equity / totalCurrentValue) * 100 : 0;
  }, [holdings, totalCurrentValue]);

  const debtPct = 100 - equityPct;
  const activePlans = plans.filter((p) => p.status === "Active").length;
  const best = [...holdings].sort((a, b) => b.gainPct - a.gainPct)[0];
  const worst = [...holdings].sort((a, b) => a.gainPct - b.gainPct)[0];

  return (
    <div className="n-page n-portfolio-desk">
      <div className="n-tabs grow">
        {(["Overview", "Holdings", "Insights"] as Tab[]).map((t) => (
          <button key={t} type="button" className={`n-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="n-col" style={{ gap: 16 }}>
          <div className="n-statement-board">
            <div className="n-statement-hero">
              <div className="n-statement-hero-top">
                <div>
                  <div className="n-metric-label">Portfolio statement · current value</div>
                  <div className="n-hero-value">{fmt(totalCurrentValue)}</div>
                  <div className={`n-hero-delta ${isPositive ? "pos" : "neg"}`}>
                    {isPositive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                    {isPositive ? "+" : "−"}
                    {fmt(Math.abs(totalGainValue))} ({isPositive ? "+" : ""}
                    {totalGainPct.toFixed(2)}%) vs invested {fmt(totalInvested)}
                  </div>
                </div>
                <div className="n-range-pills" role="tablist" aria-label="Statement range">
                  {(["3M", "6M", "1Y"] as Range[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      role="tab"
                      aria-selected={range === r}
                      className={`n-range-pill${range === r ? " active" : ""}`}
                      onClick={() => setRange(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="n-statement-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="portfolioStatement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1AA08C" stopOpacity={0.38} />
                        <stop offset="100%" stopColor="#1AA08C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: "#8C8676" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{
                        fontSize: 12,
                        borderRadius: 10,
                        border: "1px solid #E7DECC",
                        background: "#FCFAF4",
                      }}
                      formatter={(v: number) => [fmt(v * (totalCurrentValue / (PORTFOLIO_TREND.at(-1)?.value || 1))), "Illustrative value"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0F6E5E"
                      strokeWidth={2.4}
                      fill="url(#portfolioStatement)"
                      animationDuration={650}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="n-statement-note">
                Illustrative NAV path for statement view, not a live market feed. Past performance ≠ future results.
              </p>
            </div>

            <div className="n-statement-side">
              <div className="n-stat-tile static">
                <span className="n-metric-label">Invested capital</span>
                <span className="n-stat-value">{fmt(totalInvested)}</span>
              </div>
              <div className="n-stat-tile static">
                <span className="n-metric-label">Equity / debt mix</span>
                <span className="n-stat-value">{equityPct.toFixed(0)}% / {debtPct.toFixed(0)}%</span>
              </div>
              <div className="n-stat-tile static">
                <span className="n-metric-label">Schemes · active plans</span>
                <span className="n-stat-value">
                  {holdings.length} · {activePlans}
                </span>
              </div>
              {best && (
                <div className="n-stat-tile static">
                  <span className="n-metric-label">Best holding (P&amp;L %)</span>
                  <span className="n-stat-value pos-text">{best.gainPct.toFixed(1)}%</span>
                  <span className="n-stat-hint">{best.fund.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="n-portfolio-split">
            <div className="n-card">
              <div className="n-section-title" style={{ marginBottom: 8 }}>
                Allocation by category
              </div>
              <div className="n-alloc-row">
                <div className="n-alloc-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryAllocation}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={52}
                        outerRadius={78}
                        paddingAngle={2}
                      >
                        {categoryAllocation.map((_, i) => (
                          <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number, name: string) => [
                          `${fmt(v)} (${((v / totalCurrentValue) * 100).toFixed(0)}%)`,
                          name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="n-alloc-legend">
                  {categoryAllocation.map((c, i) => (
                    <div key={c.name} className="n-alloc-legend-row">
                      <span
                        className="n-alloc-dot"
                        style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }}
                      />
                      <span className="n-alloc-name">{c.name}</span>
                      <span className="n-alloc-pct">{((c.value / totalCurrentValue) * 100).toFixed(0)}%</span>
                      <span className="n-alloc-val">{fmt(c.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="n-card">
              <div className="n-section-head" style={{ marginBottom: 8 }}>
                <span className="n-section-title">Top movers</span>
              </div>
              <div className="n-col" style={{ gap: 10 }}>
                {best && (
                  <button
                    type="button"
                    className="n-mover"
                    onClick={() => navigate(`/app/fund/${best.fundId}`)}
                  >
                    <span className="n-mover-label pos">Best</span>
                    <div className="n-mover-body">
                      <div className="n-fund-name">{best.fund.name}</div>
                      <div className="n-fund-meta">{best.fund.category}</div>
                    </div>
                    <span className="n-fund-change pos">+{best.gainPct.toFixed(1)}%</span>
                  </button>
                )}
                {worst && worst.fundId !== best?.fundId && (
                  <button
                    type="button"
                    className="n-mover"
                    onClick={() => navigate(`/app/fund/${worst.fundId}`)}
                  >
                    <span className="n-mover-label neg">Softest</span>
                    <div className="n-mover-body">
                      <div className="n-fund-name">{worst.fund.name}</div>
                      <div className="n-fund-meta">{worst.fund.category}</div>
                    </div>
                    <span className={`n-fund-change ${worst.gainPct >= 0 ? "pos" : "neg"}`}>
                      {worst.gainPct >= 0 ? "+" : ""}
                      {worst.gainPct.toFixed(1)}%
                    </span>
                  </button>
                )}
                <div className="n-illustrative-note">
                  <Info size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                  Ranking by your holding P&amp;L only, not a recommendation to buy or sell.
                </div>
              </div>
            </div>
          </div>

          <div className="n-card n-holdings-table-card">
            <div className="n-section-head">
              <span className="n-section-title">Holdings snapshot</span>
              <button type="button" className="n-section-link" onClick={() => setTab("Holdings")}>
                Full list
              </button>
            </div>
            <div className="n-table-wrap">
              <table className="n-table">
                <thead>
                  <tr>
                    <th>Scheme</th>
                    <th>Category</th>
                    <th>Current</th>
                    <th>P&amp;L</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.slice(0, 5).map((h) => (
                    <tr key={h.fundId} onClick={() => navigate(`/app/fund/${h.fundId}`)}>
                      <td>
                        <div className="n-table-fund">
                          <span className="n-fund-avatar sm">{h.fund.amc.slice(0, 1)}</span>
                          <div className="n-fund-name">{h.fund.name}</div>
                        </div>
                      </td>
                      <td>
                        <span className="n-cat-chip">{h.fund.category}</span>
                      </td>
                      <td>{fmt(h.currentValue)}</td>
                      <td>
                        <span className={`n-fund-change ${h.gainPct >= 0 ? "pos" : "neg"}`}>
                          {h.gainPct >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {Math.abs(h.gainPct).toFixed(1)}%
                        </span>
                      </td>
                      <td>{h.portionOfPortfolioPct.toFixed(0)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "Holdings" && (
        <div className="n-card" style={{ padding: "4px 16px" }}>
          {holdings.map((h) => (
            <div
              key={h.fundId}
              className="n-holding-row"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/app/fund/${h.fundId}`)}
            >
              <span className="n-fund-avatar">{h.fund.amc.slice(0, 1)}</span>
              <div className="n-fund-info">
                <div className="n-fund-name">{h.fund.name}</div>
                <div className="n-fund-meta">
                  {h.units.toFixed(2)} units · Avg NAV ₹{h.avgNav.toFixed(2)} · XIRR ~{h.xirr}%
                </div>
                <div className="n-holding-bar">
                  <div className="n-holding-bar-fill" style={{ width: `${Math.min(100, h.portionOfPortfolioPct)}%` }} />
                </div>
              </div>
              <div className="n-fund-side">
                <div className="n-fund-nav">{fmt(h.currentValue)}</div>
                <div className={`n-fund-change ${h.gainPct >= 0 ? "pos" : "neg"}`}>
                  {h.gainPct >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(h.gainPct).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Insights" && (
        <div className="n-col" style={{ gap: 16 }}>
          <div className="n-card">
            <div className="n-row" style={{ marginBottom: 8 }}>
              <TrendingUp size={15} color="var(--brand-ink)" />
              <span style={{ fontWeight: 800, fontSize: 14 }}>Concentration</span>
            </div>
            {holdings.map((h) => (
              <div key={h.fundId} style={{ marginBottom: 10 }}>
                <div className="n-row between" style={{ fontSize: 12 }}>
                  <span>{h.fund.name}</span>
                  <span style={{ fontWeight: 700 }}>{h.portionOfPortfolioPct.toFixed(0)}%</span>
                </div>
                <div className="n-holding-bar">
                  <div className="n-holding-bar-fill" style={{ width: `${Math.min(100, h.portionOfPortfolioPct)}%` }} />
                </div>
              </div>
            ))}
            {holdings.some((h) => h.portionOfPortfolioPct > 30) && (
              <div className="n-illustrative-note" style={{ marginTop: 4 }}>
                <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 1 }} color="var(--amber-ink)" />
                <span>
                  One or more holdings make up over 30% of your portfolio. Consider whether this concentration matches
                  your intent.
                </span>
              </div>
            )}
          </div>

          <div className="n-card">
            <div className="n-row" style={{ marginBottom: 8 }}>
              <TrendingUp size={15} color="var(--brand-ink)" />
              <span style={{ fontWeight: 800, fontSize: 14 }}>Holding pulse</span>
            </div>
            <div className="n-col" style={{ gap: 10 }}>
              {holdings.map((h) => {
                const pulseKey = pulseFor(h);
                const pulse = PULSE_LABEL[pulseKey];
                return (
                  <button
                    key={h.fundId}
                    type="button"
                    className="n-row between"
                    style={{ background: "none", border: "none", padding: 0 }}
                    onClick={() => navigate(`/app/fund/${h.fundId}`)}
                  >
                    <span style={{ fontSize: 12.5, fontWeight: 600 }}>{h.fund.name}</span>
                    <span className={`n-pulse-tag ${pulse.cls}`}>{pulse.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="n-col" style={{ gap: 10 }}>
            <div className="n-row between">
              <span className="n-section-title">Related context</span>
              <span className="n-chip demo">
                <Newspaper size={11} /> Demo headlines
              </span>
            </div>
            {DEMO_HEADLINES.filter((h) => holdings.some((hd) => hd.fund.category === h.category)).map((h) => (
              <div key={h.category} className="n-headline-card">
                <span className="n-chip">{h.category}</span>
                <span style={{ fontSize: 12.5 }}>{h.text}</span>
              </div>
            ))}
          </div>

          <div className="n-illustrative-note">
            <Info size={13} style={{ flexShrink: 0, marginTop: 1 }} />
            Headlines and holding pulse are factual, past-tense, category-relative context, not predictions or
            personalised advice on what to buy, sell, or hold.
          </div>
        </div>
      )}
    </div>
  );
}
