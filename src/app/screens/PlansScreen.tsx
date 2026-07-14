import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, CalendarClock, Pause, Play, Repeat, Wallet, X } from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import { useAppState } from "../AppState";
import { getFund, type InvestmentPlan, type PlanType } from "../data";

type Tab = "All" | PlanType;

const PLAN_ICON: Record<PlanType, typeof Wallet> = {
  SIP: Wallet,
  STP: Repeat,
  SWP: CalendarClock,
};

export default function PlansScreen() {
  useShellAppBar({ title: "Plans", subtitle: "SIP · STP · SWP" }, []);
  const navigate = useNavigate();
  const { plans, updatePlanStatus, removePlan } = useAppState();
  const [tab, setTab] = useState<Tab>("All");
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);

  const filtered = useMemo(
    () => (tab === "All" ? plans : plans.filter((p) => p.type === tab)),
    [plans, tab],
  );

  const active = filtered.filter((p) => p.status !== "Cancelled");
  const past = filtered.filter((p) => p.status === "Cancelled");

  return (
    <div className="n-page">
      <div className="n-tabs grow">
        {(["All", "SIP", "STP", "SWP"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            className={`n-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="n-empty">
          <span className="n-empty-icon">
            <Wallet size={22} />
          </span>
          <span className="n-empty-title">No {tab === "All" ? "" : tab} plans yet</span>
          <span className="n-empty-body">
            Set up a SIP, STP or SWP from any fund's detail page to see it here.
          </span>
          <button
            type="button"
            className="n-btn n-btn-primary sm"
            style={{ marginTop: 8 }}
            onClick={() => navigate("/app/explore")}
          >
            Explore funds <ArrowRight size={13} />
          </button>
        </div>
      ) : (
        <div className="n-col" style={{ gap: 12 }}>
          {active.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onPause={() => updatePlanStatus(plan.id, "Paused")}
              onResume={() => updatePlanStatus(plan.id, "Active")}
              onCancel={() => setConfirmCancel(plan.id)}
              onOpenFund={(id) => navigate(`/app/fund/${id}`)}
            />
          ))}

          {past.length > 0 && (
            <>
              <div className="n-section-title" style={{ marginTop: 6 }}>
                Past plans
              </div>
              {past.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onPause={() => {}}
                  onResume={() => updatePlanStatus(plan.id, "Active")}
                  onCancel={() => {}}
                  onOpenFund={(id) => navigate(`/app/fund/${id}`)}
                  readonly
                />
              ))}
            </>
          )}
        </div>
      )}

      {confirmCancel && (
        <div className="n-sheet-overlay" onClick={() => setConfirmCancel(null)}>
          <div
            className="n-sheet"
            style={{ maxHeight: "50%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="n-sheet-handle" />
            <div className="n-sheet-head">
              <span className="n-sheet-title">Cancel this plan?</span>
              <button type="button" className="n-back-btn" onClick={() => setConfirmCancel(null)}>
                <X size={18} />
              </button>
            </div>
            <p className="n-muted" style={{ fontSize: 13 }}>
              Future installments will stop. This won't affect units you already hold.
            </p>
            <div className="n-row">
              <button
                type="button"
                className="n-btn n-btn-outline block"
                onClick={() => setConfirmCancel(null)}
              >
                Keep plan
              </button>
              <button
                type="button"
                className="n-btn n-btn-danger block"
                onClick={() => {
                  removePlan(confirmCancel);
                  setConfirmCancel(null);
                }}
              >
                Cancel plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlanCard({
  plan,
  onPause,
  onResume,
  onCancel,
  onOpenFund,
  readonly,
}: {
  plan: InvestmentPlan;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  onOpenFund: (fundId: string) => void;
  readonly?: boolean;
}) {
  const targetFund = getFund(plan.fundId);
  const fromFund = plan.fromFundId ? getFund(plan.fromFundId) : undefined;
  const Icon = PLAN_ICON[plan.type];

  return (
    <div className="n-plan-card">
      <div className="n-plan-head">
        <span className="n-plan-icon">
          <Icon size={17} />
        </span>
        <div
          style={{ flex: 1, minWidth: 0 }}
          onClick={() => targetFund && onOpenFund(targetFund.id)}
        >
          <div className="n-row between">
            <span className="n-fund-name">{plan.type}</span>
            <span className={`n-plan-status ${plan.status}`}>{plan.status}</span>
          </div>
          <div className="n-fund-meta">
            {fromFund ? `${fromFund.name} → ${targetFund?.name}` : targetFund?.name}
          </div>
        </div>
      </div>

      <div className="n-row between">
        <div>
          <div className="n-label">Amount</div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>
            ₹{plan.amount.toLocaleString("en-IN")}
          </div>
        </div>
        <div>
          <div className="n-label">Frequency</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{plan.frequency}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="n-label">Next date</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{plan.nextDate}</div>
        </div>
      </div>

      {!readonly && plan.status !== "Cancelled" && (
        <div className="n-plan-actions">
          {plan.status === "Active" ? (
            <button type="button" className="n-btn n-btn-secondary sm" onClick={onPause}>
              <Pause size={13} /> Pause
            </button>
          ) : (
            <button type="button" className="n-btn n-btn-secondary sm" onClick={onResume}>
              <Play size={13} /> Resume
            </button>
          )}
          <button
            type="button"
            className="n-btn n-btn-outline sm"
            onClick={() => targetFund && onOpenFund(targetFund.id)}
          >
            Modify
          </button>
          <button type="button" className="n-btn n-btn-danger sm" onClick={onCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
