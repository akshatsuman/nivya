import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Bell, Star } from "lucide-react";
import { useAppState } from "../AppState";

interface AppBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showWatchlist?: boolean;
  showNotifications?: boolean;
  right?: ReactNode;
}

export default function AppBar({
  title,
  subtitle,
  showBack = false,
  onBack,
  showWatchlist = true,
  showNotifications = true,
  right,
}: AppBarProps) {
  const navigate = useNavigate();
  const { unreadCount } = useAppState();

  return (
    <header className="n-appbar">
      <div className="n-appbar-lead">
        {showBack ? (
          <button
            type="button"
            className="n-appbar-icon-btn"
            aria-label="Go back"
            onClick={() => (onBack ? onBack() : navigate(-1))}
          >
            <ArrowLeft size={17} />
          </button>
        ) : (
          <span className="n-appbar-logo">N</span>
        )}
        <div className="n-appbar-title-block">
          <span className="n-appbar-title">{title}</span>
          {subtitle ? <span className="n-appbar-subtitle">{subtitle}</span> : null}
        </div>
      </div>

      <div className="n-appbar-actions">
        {right}
        {showWatchlist && (
          <button
            type="button"
            className="n-appbar-icon-btn"
            aria-label="Watchlist"
            onClick={() => navigate("/app/watchlist")}
          >
            <Star size={16} />
          </button>
        )}
        {showNotifications && (
          <button
            type="button"
            className="n-appbar-icon-btn n-icon-badge"
            aria-label="Notifications"
            onClick={() => navigate("/app/notifications")}
          >
            <Bell size={16} />
            {unreadCount > 0 && <span className="n-icon-badge-dot" />}
          </button>
        )}
      </div>
    </header>
  );
}
