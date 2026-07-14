import { NavLink } from "react-router";
import { Home, Compass, Wallet, PieChart, User } from "lucide-react";

const TABS = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/explore", label: "Explore", icon: Compass, end: false },
  { to: "/app/plans", label: "Plans", icon: Wallet, end: false },
  { to: "/app/portfolio", label: "Portfolio", icon: PieChart, end: false },
  { to: "/app/profile", label: "Profile", icon: User, end: false },
];

export default function BottomNav() {
  return (
    <div className="n-bottomnav-wrap">
      <nav className="n-bottomnav" aria-label="Primary">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => `n-navitem${isActive ? " active" : ""}`}
          >
            <tab.icon size={20} strokeWidth={2.3} />
            {tab.label}
            <span className="n-navitem-dot" />
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
