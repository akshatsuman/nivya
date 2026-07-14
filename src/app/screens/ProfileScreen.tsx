import { useNavigate } from "react-router";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  FileText,
  Landmark,
  LogOut,
  MessageCircle,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import { useAppState } from "../AppState";
import { useAuth } from "../Auth";

export default function ProfileScreen() {
  useShellAppBar({ title: "Profile", showWatchlist: true, showNotifications: true }, []);
  const navigate = useNavigate();
  const { kycStatus, completeKyc } = useAppState();
  const { logout, session } = useAuth();

  const menu = [
    { icon: User, label: "Personal details" },
    { icon: Landmark, label: "Bank accounts" },
    { icon: Users, label: "Nominee" },
    { icon: FileText, label: "Statements & documents" },
    { icon: Bell, label: "Notification preferences", onClick: () => navigate("/app/notifications") },
    { icon: MessageCircle, label: "Ask Nivya / Help", onClick: () => navigate("/app/chat") },
  ];

  return (
    <div className="n-page">
      <div className="n-card">
        <div className="n-profile-head">
          <span className="n-profile-avatar">
            {(session?.name ?? "IN")
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{session?.name ?? "Investor"}</div>
            <div className="n-muted" style={{ fontSize: 12.5 }}>
              +91 {session?.phone?.replace(/(\d{5})(\d{5})/, "$1 $2") ?? "-"}
            </div>
            <div style={{ marginTop: 6 }}>
              <span className={`n-kyc-badge ${kycStatus === "verified" ? "verified" : "pending"}`}>
                <BadgeCheck size={12} />
                {kycStatus === "verified" ? "KYC verified" : "KYC pending"}
              </span>
            </div>
          </div>
        </div>
        {kycStatus !== "verified" && (
          <button type="button" className="n-btn n-btn-primary block" style={{ marginTop: 14 }} onClick={completeKyc}>
            Complete KYC (demo)
          </button>
        )}
      </div>

      <div className="n-card" style={{ padding: "4px 16px" }}>
        {menu.map((item) => (
          <button key={item.label} type="button" className="n-menu-row" onClick={item.onClick}>
            <span className="n-menu-icon">
              <item.icon size={16} />
            </span>
            <span className="n-menu-label">{item.label}</span>
            <ChevronRight size={16} color="var(--faint)" />
          </button>
        ))}
      </div>

      <div className="n-card">
        <div className="n-row" style={{ marginBottom: 8 }}>
          <Shield size={15} color="var(--brand-ink)" />
          <span style={{ fontWeight: 800, fontSize: 13.5 }}>Disclosures</span>
        </div>
        <p className="n-disclosure">
          Nivya Wealth is an AMFI-registered Mutual Fund Distributor (ARN-192837, demo). We distribute Regular Plan
          schemes only and do not offer Direct Plans. Nivya does not provide personalised investment advice. Fund
          discovery on this app is based on transparent, criteria-based data (expense ratio, rolling consistency,
          category-relative returns), not on SEBI Registered Investment Adviser recommendations.
        </p>
        <p className="n-disclosure" style={{ marginTop: 6 }}>
          Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully
          before investing.
        </p>
      </div>

      <button
        type="button"
        className="n-btn n-btn-outline block"
        onClick={() => {
          logout();
          navigate("/", { replace: true });
        }}
        style={{ color: "#c0362c", borderColor: "#f3d2ce" }}
      >
        <LogOut size={15} /> Log out
      </button>
    </div>
  );
}
