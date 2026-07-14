import { useNavigate } from "react-router";
import { AlertTriangle, CheckCircle2, ChevronRight, Compass, Sparkles } from "lucide-react";
import { useAppState } from "../AppState";

const ICONS = {
  order: CheckCircle2,
  alert: AlertTriangle,
  kyc: AlertTriangle,
  info: Sparkles,
};

export default function InsightRail() {
  const navigate = useNavigate();
  const { notifications, dnaResults, markAllNotificationsRead } = useAppState();
  const alerts = notifications.filter((n) => !n.read).slice(0, 3);
  const topRanked = dnaResults.slice(0, 2);

  return (
    <aside className="n-rail n-rail-right n-rail-compact">
      <div className="n-rail-head">
        <div>
          <div className="n-rail-kicker">Alerts</div>
          <div className="n-rail-title">Smart alerts</div>
        </div>
        <button
          type="button"
          className="n-section-link"
          onClick={() => navigate("/app/notifications")}
        >
          All <ChevronRight size={13} />
        </button>
      </div>

      <div className="n-rail-stack n-alert-compact-stack">
        {alerts.length === 0 ? (
          <p className="n-rail-empty">No open alerts.</p>
        ) : (
          alerts.map((alert) => {
            const Icon = ICONS[alert.kind] ?? Sparkles;
            return (
              <button
                key={alert.id}
                type="button"
                className={`n-alert-compact ${alert.tone}`}
                onClick={() => {
                  if (alert.kind === "kyc") navigate("/app/profile");
                  else if (alert.kind === "order" || alert.kind === "alert") navigate("/app/plans");
                  else navigate("/app/notifications");
                }}
              >
                <span className="n-alert-compact-icon">
                  <Icon size={13} />
                </span>
                <span className="n-alert-compact-text">
                  <span className="n-alert-compact-title">{alert.title}</span>
                  <span className="n-alert-compact-body">{alert.body}</span>
                </span>
              </button>
            );
          })
        )}
        {alerts.length > 0 && (
          <button type="button" className="n-text-btn" onClick={markAllNotificationsRead}>
            Mark all read
          </button>
        )}
      </div>

      <div className="n-rail-block">
        <button
          type="button"
          className="n-dna-card n-dna-compact"
          onClick={() => navigate("/app/explore", { state: { segment: "rank" } })}
        >
          <span className="n-dna-icon">
            <Compass size={16} />
          </span>
          <div>
            <div className="n-dna-title">
              {topRanked.length > 0 ? "Your DNA ranks" : "Investment DNA"}
            </div>
            <div className="n-dna-sub">Criteria-based ranking</div>
          </div>
          <ChevronRight size={15} className="n-dna-chevron" />
        </button>
        {topRanked.length > 0 && (
          <div className="n-rail-stack" style={{ marginTop: 8 }}>
            {topRanked.map((r, i) => (
              <button
                key={r.fund.id}
                type="button"
                className="n-rail-fund"
                onClick={() => navigate(`/app/fund/${r.fund.id}`)}
              >
                <span className="n-score-badge sm">{i + 1}</span>
                <div className="n-rail-fund-body">
                  <div className="n-rail-fund-name">{r.fund.name}</div>
                  <div className="n-rail-fund-meta">Score {r.score}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
