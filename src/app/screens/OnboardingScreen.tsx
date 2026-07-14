import { useNavigate } from "react-router";
import { Compass, PieChart, Shield, Wallet } from "lucide-react";
import { useAppState } from "../AppState";

const STEPS = [
  {
    icon: Compass,
    title: "Discover with criteria",
    body: "Browse and rank Regular-plan funds by expense, consistency, and category-relative returns, not personalised advice.",
  },
  {
    icon: Wallet,
    title: "Invest & automate",
    body: "Place lumpsum or SIP, and manage STP / SWP from holdings. Every order carries ARN + EUIN (demo).",
  },
  {
    icon: PieChart,
    title: "Track with clarity",
    body: "Portfolio insights stay factual: concentration, holding pulse vs peers, and demo related context.",
  },
  {
    icon: Shield,
    title: "Compliance first",
    body: "AMFI-registered Mutual Fund Distributor. Regular plans only. SID/KIM consent before first invest per scheme.",
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAppState();

  return (
    <div className="n-page" style={{ paddingTop: 48, maxWidth: 560, margin: "0 auto" }}>
      <div className="n-chip brand" style={{ marginBottom: 10 }}>
        Welcome to Nivya
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
        Discover confidently. Invest transparently.
      </h2>
      <p className="n-muted" style={{ fontSize: 13.5, marginTop: 8 }}>
        You choose the fund. Nivya executes as your AMFI-registered distributor.
      </p>

      <div className="n-col" style={{ gap: 12, marginTop: 20 }}>
        {STEPS.map((step) => (
          <div key={step.title} className="n-card" style={{ display: "flex", gap: 12 }}>
            <span className="n-plan-icon">
              <step.icon size={17} />
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13.5 }}>{step.title}</div>
              <div className="n-muted" style={{ fontSize: 12, marginTop: 4, lineHeight: 1.45 }}>
                {step.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="n-btn n-btn-primary block"
        style={{ marginTop: 20 }}
        onClick={() => {
          completeOnboarding();
          navigate("/app", { replace: true });
        }}
      >
        Enter the app
      </button>
      <p className="n-disclosure" style={{ marginTop: 12, textAlign: "center" }}>
        Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.
      </p>
    </div>
  );
}
