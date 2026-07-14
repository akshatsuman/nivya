import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, FileText, MessageCircle, Star } from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import { useAppState, type OrderMode } from "../AppState";
import { FUNDS, getFund, getNavHistory } from "../data";
import OrderSheet from "./OrderSheet";

export default function FundDetailScreen() {
  const { fundId = "" } = useParams();
  const navigate = useNavigate();
  const fund = getFund(fundId);
  const { holdings, isWatchlisted, toggleWatchlist } = useAppState();
  const [orderMode, setOrderMode] = useState<OrderMode | null>(null);

  const holding = holdings.find((h) => h.fundId === fundId);
  const history = useMemo(() => (fund ? getNavHistory(fund, 12) : []), [fund]);

  useShellAppBar(
    {
      title: fund?.name ?? "Fund",
      subtitle: fund ? `${fund.category} · Regular` : undefined,
      showBack: true,
      onBack: () => navigate(-1),
      showWatchlist: false,
      right: fund ? (
        <button
          type="button"
          className="n-appbar-icon-btn"
          aria-label="Toggle watchlist"
          onClick={() => toggleWatchlist(fund.id)}
        >
          <Star size={16} fill={isWatchlisted(fund.id) ? "currentColor" : "none"} />
        </button>
      ) : undefined,
    },
    [fund?.id, fund?.name, isWatchlisted(fundId)],
  );

  if (!fund) {
    return (
      <div className="n-page">
        <div className="n-empty">
          <span className="n-empty-title">Fund not found</span>
          <button
            type="button"
            className="n-btn n-btn-primary sm"
            onClick={() => navigate("/app/explore")}
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const pos = fund.navChangePct >= 0;

  return (
    <div className="n-page n-fund-detail">
      <div className="n-card">
        <div className="n-row between">
          <div>
            <div className="n-label">NAV · Regular Plan</div>
            <div style={{ fontWeight: 800, fontSize: 26 }}>₹{fund.nav.toFixed(2)}</div>
          </div>
          <div className={`n-fund-change ${pos ? "pos" : "neg"}`} style={{ fontSize: 14 }}>
            {pos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(fund.navChangePct).toFixed(2)}%
          </div>
        </div>

        <div style={{ height: 140, marginTop: 12 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="fundNav" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0fa8a0" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0fa8a0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #e6e9f0" }}
                formatter={(v: number) => [`₹${v.toFixed(2)}`, "NAV"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0fa8a0"
                strokeWidth={2}
                fill="url(#fundNav)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="n-card">
        <div className="n-section-title" style={{ marginBottom: 10 }}>
          Returns (trailing)
        </div>
        <div className="n-row between" style={{ gap: 8 }}>
          {[
            { label: "1Y", value: fund.returns.y1 },
            { label: "3Y", value: fund.returns.y3 },
            { label: "5Y", value: fund.returns.y5 },
          ].map((r) => (
            <div key={r.label} style={{ flex: 1, textAlign: "center" }}>
              <div className="n-label">{r.label}</div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{r.value}%</div>
              <div className="n-muted" style={{ fontSize: 10.5 }}>
                Cat{" "}
                {fund.categoryAvgReturns[r.label === "1Y" ? "y1" : r.label === "3Y" ? "y3" : "y5"]}%
              </div>
            </div>
          ))}
        </div>
        <p className="n-disclosure" style={{ marginTop: 10 }}>
          Past performance is not indicative of future results.
        </p>
      </div>

      <div className="n-card">
        <div className="n-section-title" style={{ marginBottom: 10 }}>
          Key facts
        </div>
        <div className="n-col" style={{ gap: 8, fontSize: 12.5 }}>
          {[
            ["Risk", fund.riskLevel],
            ["Expense ratio", `${fund.expenseRatio}% (cat avg ${fund.categoryAvgExpenseRatio}%)`],
            ["AUM", `₹${fund.aumCr.toLocaleString("en-IN")} Cr`],
            ["Min SIP / lumpsum", `₹${fund.minSip} / ₹${fund.minLumpsum}`],
            ["Exit load", fund.exitLoad],
            ["Benchmark", fund.benchmark],
            ["Fund manager", fund.fundManager],
            ["AMC", fund.amc],
          ].map(([k, v]) => (
            <div key={k} className="n-row between">
              <span className="n-muted">{k}</span>
              <span style={{ fontWeight: 700, textAlign: "right", maxWidth: "58%" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {holding && (
        <div
          className="n-card"
          style={{ background: "var(--teal-bg)", border: "1px solid var(--teal-border)" }}
        >
          <div className="n-label" style={{ color: "var(--teal-ink)" }}>
            Your holding
          </div>
          <div className="n-row between" style={{ marginTop: 6 }}>
            <div>
              <div style={{ fontWeight: 800 }}>{holding.units.toFixed(3)} units</div>
              <div className="n-muted" style={{ fontSize: 11.5 }}>
                Avg NAV ₹{holding.avgNav.toFixed(2)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800 }}>
                ₹{Math.round(holding.currentValue).toLocaleString("en-IN")}
              </div>
              <div
                className={`n-fund-change ${holding.gainPct >= 0 ? "pos" : "neg"}`}
                style={{ justifyContent: "flex-end" }}
              >
                {holding.gainPct >= 0 ? "+" : ""}
                {holding.gainPct.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="n-card">
        <div className="n-row between">
          <div className="n-row">
            <FileText size={15} color="var(--brand-ink)" />
            <span style={{ fontWeight: 700, fontSize: 13 }}>Scheme documents</span>
          </div>
          <span className="n-chip">SID · KIM · SAI</span>
        </div>
        <p className="n-disclosure" style={{ marginTop: 8 }}>
          Consent to SID/KIM is logged before your first investment in each scheme (demo ARN + EUIN
          on confirm).
        </p>
      </div>

      <button
        type="button"
        className="n-btn n-btn-outline block"
        onClick={() => navigate("/app/chat", { state: { fundId: fund.id } })}
      >
        <MessageCircle size={15} /> Ask about this fund
      </button>

      <div style={{ height: holding ? 150 : 90 }} />

      <div className="n-tradebar">
        {holding ? (
          <>
            <div className="n-row" style={{ gap: 8, width: "100%" }}>
              <button
                type="button"
                className="n-btn n-btn-outline block"
                onClick={() => setOrderMode("REDEEM")}
              >
                Redeem
              </button>
              <button
                type="button"
                className="n-btn n-btn-outline block"
                onClick={() => setOrderMode("SWITCH")}
              >
                Switch
              </button>
              <button
                type="button"
                className="n-btn n-btn-primary block"
                onClick={() => setOrderMode("LUMPSUM")}
              >
                Invest
              </button>
            </div>
            <div className="n-row" style={{ gap: 8, width: "100%", marginTop: 8 }}>
              <button
                type="button"
                className="n-btn n-btn-secondary block"
                onClick={() => setOrderMode("SIP")}
              >
                SIP
              </button>
              <button
                type="button"
                className="n-btn n-btn-secondary block"
                onClick={() => setOrderMode("STP")}
              >
                STP
              </button>
              <button
                type="button"
                className="n-btn n-btn-secondary block"
                onClick={() => setOrderMode("SWP")}
              >
                SWP
              </button>
            </div>
          </>
        ) : (
          <div className="n-row" style={{ gap: 8, width: "100%" }}>
            <button
              type="button"
              className="n-btn n-btn-outline block"
              onClick={() => setOrderMode("SIP")}
            >
              Start SIP
            </button>
            <button
              type="button"
              className="n-btn n-btn-primary block"
              onClick={() => setOrderMode("LUMPSUM")}
            >
              Invest
            </button>
          </div>
        )}
      </div>

      {orderMode && (
        <OrderSheet
          fundId={fund.id}
          mode={orderMode}
          destinations={FUNDS.filter((f) => f.id !== fund.id)}
          onClose={() => setOrderMode(null)}
        />
      )}
    </div>
  );
}
