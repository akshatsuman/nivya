import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Compass,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import { useAppState } from "../AppState";
import { useAuth } from "../Auth";
import { getFund, PORTFOLIO_TREND } from "../data";

type Range = "3M" | "6M" | "1Y";

const RANGE_POINTS: Record<Range, number> = { "3M": 3, "6M": 6, "1Y": 12 };

export default function HomeScreen() {
  const { session } = useAuth();
  useShellAppBar(
    {
      title: `Good morning, ${session?.name?.split(" ")[0] ?? "Investor"}`,
      subtitle: "Portfolio overview",
    },
    [session?.name],
  );
  const navigate = useNavigate();
  const {
    holdings,
    totalInvested,
    totalCurrentValue,
    totalGainValue,
    totalGainPct,
    plans,
    kycStatus,
    notifications,
  } = useAppState();
  const [range, setRange] = useState<Range>("1Y");
  const [hoveredFund, setHoveredFund] = useState<string | null>(null);

  const chartData = useMemo(() => PORTFOLIO_TREND.slice(-RANGE_POINTS[range]), [range]);
  const topHoldings = holdings.slice(0, 6);
  const activePlans = plans.filter((p) => p.status === "Active").length;
  const unread = notifications.filter((n) => !n.read).length;
  const isPositive = totalGainValue >= 0;

  const fmt = (n: number) =>
    n.toLocaleString("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" });

  return (
    <div className="n-page n-home-desk">
      {kycStatus !== "verified" && (
        <button type="button" className="n-banner-kyc" onClick={() => navigate("/app/profile")}>
          <Sparkles size={16} />
          <span>KYC still pending. Complete it to place orders without interruption.</span>
          <ChevronRight size={16} />
        </button>
      )}

      <section className="n-hero-board">
        <div className="n-hero-main">
          <div className="n-hero-top">
            <div>
              <div className="n-metric-label">Current portfolio value</div>
              <div className="n-hero-value">{fmt(totalCurrentValue)}</div>
              <div className={`n-hero-delta ${isPositive ? "pos" : "neg"}`}>
                {isPositive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                {isPositive ? "+" : ""}
                {fmt(totalGainValue)} ({isPositive ? "+" : ""}
                {totalGainPct.toFixed(2)}%) overall
              </div>
            </div>
            <div className="n-range-pills" role="tablist" aria-label="Chart range">
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

          <div className="n-hero-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="homeTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1AA08C" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#1AA08C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis hide domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 10,
                    border: "1px solid #E7DECC",
                    background: "#FCFAF4",
                    boxShadow: "0 12px 28px -16px rgba(20,35,59,0.35)",
                  }}
                  labelStyle={{ color: "#5B6573", fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0F6E5E"
                  strokeWidth={2.4}
                  fill="url(#homeTrend)"
                  animationDuration={650}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="n-hero-stats">
          <button type="button" className="n-stat-tile" onClick={() => navigate("/app/portfolio")}>
            <span className="n-metric-label">Invested</span>
            <span className="n-stat-value">{fmt(totalInvested)}</span>
            <span className="n-stat-hint">View portfolio →</span>
          </button>
          <button type="button" className="n-stat-tile" onClick={() => navigate("/app/plans")}>
            <span className="n-metric-label">Active plans</span>
            <span className="n-stat-value">
              {activePlans}
              <Wallet size={16} className="n-stat-icon" />
            </span>
            <span className="n-stat-hint">SIP · STP · SWP →</span>
          </button>
          <button
            type="button"
            className="n-stat-tile"
            onClick={() => navigate("/app/notifications")}
          >
            <span className="n-metric-label">Open alerts</span>
            <span className="n-stat-value">{unread}</span>
            <span className="n-stat-hint">Review activity →</span>
          </button>
          <button
            type="button"
            className="n-stat-cta"
            onClick={() => navigate("/app/explore", { state: { segment: "rank" } })}
          >
            <Compass size={18} />
            Rank funds by your criteria
          </button>
        </div>
      </section>

      <section className="n-card n-plans-strip">
        <div className="n-section-head">
          <div>
            <span className="n-section-title">Active plans</span>
            <p className="n-section-sub">{activePlans} running · Regular plan book</p>
          </div>
          <button type="button" className="n-section-link" onClick={() => navigate("/app/plans")}>
            Manage <ChevronRight size={13} />
          </button>
        </div>
        <div className="n-plans-strip-row">
          {plans
            .filter((p) => p.status === "Active")
            .slice(0, 4)
            .map((p) => {
              const fund = getFund(p.fundId);
              return (
                <button
                  key={p.id}
                  type="button"
                  className="n-plan-chip"
                  onClick={() => navigate("/app/plans")}
                >
                  <span className={`n-plan-chip-type ${p.type}`}>{p.type}</span>
                  <span className="n-plan-chip-name">{fund?.name ?? p.fundId}</span>
                  <span className="n-plan-chip-amt">
                    ₹{p.amount.toLocaleString("en-IN")} · {p.nextDate}
                  </span>
                </button>
              );
            })}
        </div>
      </section>

      <section className="n-card n-holdings-table-card">
        <div className="n-section-head">
          <div>
            <span className="n-section-title">Holdings</span>
            <p className="n-section-sub">{holdings.length} Regular-plan schemes</p>
          </div>
          <button
            type="button"
            className="n-section-link"
            onClick={() => navigate("/app/portfolio")}
          >
            Full portfolio <ChevronRight size={13} />
          </button>
        </div>
        <div className="n-table-wrap">
          <table className="n-table">
            <thead>
              <tr>
                <th>Scheme</th>
                <th>Category</th>
                <th>Invested</th>
                <th>Current</th>
                <th>P&amp;L</th>
                <th>Weight</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {topHoldings.map((h) => (
                <tr
                  key={h.fundId}
                  className={hoveredFund === h.fundId ? "hot" : ""}
                  onMouseEnter={() => setHoveredFund(h.fundId)}
                  onMouseLeave={() => setHoveredFund(null)}
                  onClick={() => navigate(`/app/fund/${h.fundId}`)}
                >
                  <td>
                    <div className="n-table-fund">
                      <span className="n-fund-avatar sm">{h.fund.amc.slice(0, 1)}</span>
                      <div>
                        <div className="n-fund-name">{h.fund.name}</div>
                        <div className="n-fund-meta">{h.units.toFixed(2)} units</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="n-cat-chip">{h.fund.category}</span>
                  </td>
                  <td>{fmt(h.investedValue)}</td>
                  <td>{fmt(h.currentValue)}</td>
                  <td>
                    <span className={`n-fund-change ${h.gainPct >= 0 ? "pos" : "neg"}`}>
                      {h.gainPct >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {Math.abs(h.gainPct).toFixed(1)}%
                    </span>
                  </td>
                  <td>
                    <div className="n-weight-cell">
                      <div className="n-weight-bar">
                        <span style={{ width: `${Math.min(100, h.portionOfPortfolioPct)}%` }} />
                      </div>
                      {h.portionOfPortfolioPct.toFixed(0)}%
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="n-row-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/fund/${h.fundId}`);
                      }}
                    >
                      Invest
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
