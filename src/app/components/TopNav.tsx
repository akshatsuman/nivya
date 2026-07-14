import { NavLink, useNavigate } from "react-router";
import { Bell, Compass, Home, PieChart, Search, Star, Wallet } from "lucide-react";
import { useAppState } from "../AppState";
import { useAuth } from "../Auth";

const TABS = [
  { to: "/app", label: "Home", end: true, icon: Home },
  { to: "/app/explore", label: "Explore", end: false, icon: Compass },
  { to: "/app/plans", label: "Plans", end: false, icon: Wallet },
  { to: "/app/portfolio", label: "Portfolio", end: false, icon: PieChart },
  { to: "/app/watchlist", label: "Watchlist", end: false, icon: Star },
];

export default function TopNav() {
  const navigate = useNavigate();
  const { unreadCount, watchlist } = useAppState();
  const { session } = useAuth();
  const initials = (session?.name ?? "IN")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="n-topnav">
      <div className="n-topnav-inner">
        <button type="button" className="n-topnav-brand" onClick={() => navigate("/app")}>
          <img
            src={`${import.meta.env.BASE_URL}assets/logo.png`}
            alt="Nivya"
            className="n-topnav-logo"
          />
          <span className="n-topnav-wordmark">Nivya</span>
        </button>

        <nav className="n-topnav-tabs" aria-label="Primary">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) => `n-topnav-tab${isActive ? " active" : ""}`}
            >
              <tab.icon size={15} strokeWidth={2.2} />
              {tab.label}
              {tab.to === "/app/watchlist" && watchlist.length > 0 && (
                <span className="n-tab-count">{watchlist.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="n-topnav-actions">
          <button
            type="button"
            className="n-topnav-search"
            onClick={() => navigate("/app/explore")}
          >
            <Search size={15} />
            <span>Search Regular funds</span>
          </button>
          <button
            type="button"
            className="n-icon-btn n-icon-badge"
            aria-label="Notifications"
            onClick={() => navigate("/app/notifications")}
          >
            <Bell size={17} />
            {unreadCount > 0 && <span className="n-icon-badge-dot" />}
          </button>
          <button
            type="button"
            className="n-topnav-avatar"
            onClick={() => navigate("/app/profile")}
            aria-label="Profile"
          >
            {initials}
          </button>
        </div>
      </div>
    </header>
  );
}
