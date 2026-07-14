import { useNavigate } from "react-router";
import { AlertTriangle, Bell, CheckCircle2, Sparkles } from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import { useAppState } from "../AppState";

const ICONS = {
  order: CheckCircle2,
  alert: AlertTriangle,
  kyc: AlertTriangle,
  info: Sparkles,
};

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { notifications, markAllNotificationsRead } = useAppState();

  useShellAppBar(
    {
      title: "Notifications",
      showBack: true,
      onBack: () => navigate(-1),
      showNotifications: false,
      right: (
        <button
          type="button"
          className="n-appbar-icon-btn"
          style={{ width: "auto", padding: "0 8px", fontSize: 11 }}
          onClick={markAllNotificationsRead}
        >
          Mark all read
        </button>
      ),
    },
    [],
  );

  return (
    <div className="n-page">
      {notifications.length === 0 ? (
        <div className="n-empty">
          <span className="n-empty-icon">
            <Bell size={22} />
          </span>
          <span className="n-empty-title">You're all caught up</span>
        </div>
      ) : (
        <div className="n-col" style={{ gap: 10 }}>
          {notifications.map((n) => {
            const Icon = ICONS[n.kind] ?? Sparkles;
            return (
              <div
                key={n.id}
                className={`n-alert ${n.tone}`}
                style={{ opacity: n.read ? 0.72 : 1 }}
              >
                <span className="n-alert-icon">
                  <Icon size={14} />
                </span>
                <span className="n-alert-title">{n.title}</span>
                <span className="n-alert-body">{n.body}</span>
                <span className="n-muted" style={{ fontSize: 10.5, gridColumn: "2 / -1" }}>
                  {n.date}
                  {!n.read ? " · Unread" : ""}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
