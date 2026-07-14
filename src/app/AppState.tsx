/* eslint-disable react-refresh/only-export-components -- context module exports provider + hook */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  FUNDS,
  HOLDINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PLANS,
  INITIAL_WATCHLIST,
  getFund,
  runDnaRanking as computeDnaRanking,
  type AppNotification,
  type DnaPrefs,
  type Fund,
  type Holding,
  type InvestmentPlan,
  type PlanStatus,
  type PlanType,
  type RankedFund,
} from "./data";

export type KycStatus = "verified" | "pending" | "not_started";

export type OrderMode = "LUMPSUM" | "SIP" | "REDEEM" | "SWITCH" | "STP" | "SWP";

export interface OrderInput {
  mode: OrderMode;
  fundId: string;
  toFundId?: string;
  amount: number;
  frequency?: "Monthly" | "Weekly" | "Quarterly";
  dayOfMonth?: number;
}

export interface HoldingView extends Holding {
  fund: Fund;
  investedValue: number;
  currentValue: number;
  gainValue: number;
  gainPct: number;
  xirr: number;
  portionOfPortfolioPct: number;
}

interface AppStateShape {
  holdings: HoldingView[];
  totalInvested: number;
  totalCurrentValue: number;
  totalGainValue: number;
  totalGainPct: number;

  plans: InvestmentPlan[];
  updatePlanStatus: (planId: string, status: PlanStatus) => void;
  removePlan: (planId: string) => void;

  watchlist: string[];
  toggleWatchlist: (fundId: string) => void;
  isWatchlisted: (fundId: string) => boolean;

  notifications: AppNotification[];
  unreadCount: number;
  markAllNotificationsRead: () => void;
  pushNotification: (n: Omit<AppNotification, "id" | "date" | "read">) => void;

  dnaPrefs: DnaPrefs | null;
  dnaResults: RankedFund[];
  runDnaWizard: (prefs: DnaPrefs) => void;
  resetDnaWizard: () => void;

  selectedFundId: string | null;
  setSelectedFundId: (id: string | null) => void;

  kycStatus: KycStatus;
  completeKyc: () => void;

  onboardingDone: boolean;
  completeOnboarding: () => void;

  placeOrder: (input: OrderInput) => { ok: boolean; message: string };
}

const AppStateContext = createContext<AppStateShape | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [rawHoldings, setRawHoldings] = useState<Holding[]>(HOLDINGS);
  const [plans, setPlans] = useState<InvestmentPlan[]>(INITIAL_PLANS);
  const [watchlist, setWatchlist] = useState<string[]>(INITIAL_WATCHLIST);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [dnaPrefs, setDnaPrefs] = useState<DnaPrefs | null>(null);
  const [dnaResults, setDnaResults] = useState<RankedFund[]>([]);
  const [selectedFundId, setSelectedFundId] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<KycStatus>("pending");
  const [onboardingDone, setOnboardingDone] = useState<boolean>(
    () =>
      typeof window !== "undefined" && window.localStorage.getItem("nivya-onboarding-done") === "1",
  );

  const holdings: HoldingView[] = useMemo(() => {
    const totalCurrent = rawHoldings.reduce((sum, h) => {
      const fund = getFund(h.fundId);
      return sum + (fund ? fund.nav * h.units : 0);
    }, 0);
    return rawHoldings
      .map((h) => {
        const fund = getFund(h.fundId);
        if (!fund) return null;
        const investedValue = h.avgNav * h.units;
        const currentValue = fund.nav * h.units;
        const gainValue = currentValue - investedValue;
        const gainPct = investedValue > 0 ? (gainValue / investedValue) * 100 : 0;
        return {
          ...h,
          fund,
          investedValue,
          currentValue,
          gainValue,
          gainPct,
          xirr: Math.round((fund.returns.y1 * 0.7 + gainPct * 0.3) * 10) / 10,
          portionOfPortfolioPct: totalCurrent > 0 ? (currentValue / totalCurrent) * 100 : 0,
        };
      })
      .filter((h): h is HoldingView => h !== null)
      .sort((a, b) => b.currentValue - a.currentValue);
  }, [rawHoldings]);

  const totalInvested = useMemo(
    () => holdings.reduce((s, h) => s + h.investedValue, 0),
    [holdings],
  );
  const totalCurrentValue = useMemo(
    () => holdings.reduce((s, h) => s + h.currentValue, 0),
    [holdings],
  );
  const totalGainValue = totalCurrentValue - totalInvested;
  const totalGainPct = totalInvested > 0 ? (totalGainValue / totalInvested) * 100 : 0;

  const pushNotification = useCallback((n: Omit<AppNotification, "id" | "date" | "read">) => {
    setNotifications((prev) => [{ ...n, id: uid("n"), date: "Just now", read: false }, ...prev]);
  }, []);

  const updatePlanStatus = useCallback(
    (planId: string, status: PlanStatus) => {
      setPlans((prev) => prev.map((p) => (p.id === planId ? { ...p, status } : p)));
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        const fund = getFund(plan.fundId);
        pushNotification({
          kind: "order",
          tone: status === "Active" ? "teal" : "amber",
          title: `${plan.type} ${status.toLowerCase()}`,
          body: `Your ${plan.type} of ₹${plan.amount.toLocaleString("en-IN")} ${
            plan.type === "SIP" ? `in ${fund?.name ?? "fund"}` : ""
          } is now ${status.toLowerCase()}.`,
        });
      }
    },
    [plans, pushNotification],
  );

  const removePlan = useCallback((planId: string) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, status: "Cancelled" as PlanStatus } : p)),
    );
  }, []);

  const toggleWatchlist = useCallback((fundId: string) => {
    setWatchlist((prev) =>
      prev.includes(fundId) ? prev.filter((id) => id !== fundId) : [...prev, fundId],
    );
  }, []);

  const isWatchlisted = useCallback((fundId: string) => watchlist.includes(fundId), [watchlist]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const runDnaWizard = useCallback((prefs: DnaPrefs) => {
    setDnaPrefs(prefs);
    setDnaResults(computeDnaRanking(prefs));
  }, []);

  const resetDnaWizard = useCallback(() => {
    setDnaPrefs(null);
    setDnaResults([]);
  }, []);

  const completeKyc = useCallback(() => {
    setKycStatus("verified");
    pushNotification({
      kind: "kyc",
      tone: "teal",
      title: "KYC verified",
      body: "Your KYC has been verified. You're all set to transact without interruption.",
    });
  }, [pushNotification]);

  const completeOnboarding = useCallback(() => {
    setOnboardingDone(true);
    if (typeof window !== "undefined") window.localStorage.setItem("nivya-onboarding-done", "1");
  }, []);

  const placeOrder = useCallback(
    (input: OrderInput): { ok: boolean; message: string } => {
      const fund = getFund(input.fundId);
      if (!fund) return { ok: false, message: "Fund not found." };

      if (input.mode === "LUMPSUM" || input.mode === "SWITCH") {
        const units = Math.round((input.amount / fund.nav) * 1000) / 1000;
        setRawHoldings((prev) => {
          const existing = prev.find((h) => h.fundId === input.fundId);
          if (existing) {
            const newUnits = existing.units + units;
            const newAvgNav = (existing.avgNav * existing.units + fund.nav * units) / newUnits;
            return prev.map((h) =>
              h.fundId === input.fundId ? { ...h, units: newUnits, avgNav: newAvgNav } : h,
            );
          }
          return [...prev, { fundId: input.fundId, units, avgNav: fund.nav }];
        });

        if (input.mode === "SWITCH" && input.toFundId) {
          const toFund = getFund(input.toFundId);
          setRawHoldings((prev) =>
            prev
              .map((h) => {
                if (h.fundId !== input.fundId) return h;
                const remainingUnits = Math.max(0, h.units - units);
                return { ...h, units: remainingUnits };
              })
              .filter((h) => h.units > 0.001),
          );
          pushNotification({
            kind: "order",
            tone: "teal",
            title: "Switch placed",
            body: `₹${input.amount.toLocaleString("en-IN")} switched from ${fund.name} to ${toFund?.name ?? "fund"} (demo).`,
          });
          return { ok: true, message: "Switch order placed (demo)." };
        }

        pushNotification({
          kind: "order",
          tone: "teal",
          title: input.mode === "LUMPSUM" ? "Lumpsum invested" : "Order placed",
          body: `₹${input.amount.toLocaleString("en-IN")} invested in ${fund.name} (Regular Plan, demo).`,
        });
        return { ok: true, message: "Lumpsum order placed (demo)." };
      }

      if (input.mode === "REDEEM") {
        setRawHoldings((prev) =>
          prev
            .map((h) => {
              if (h.fundId !== input.fundId) return h;
              const units = Math.min(h.units, input.amount / fund.nav);
              return { ...h, units: Math.max(0, h.units - units) };
            })
            .filter((h) => h.units > 0.001),
        );
        pushNotification({
          kind: "order",
          tone: "teal",
          title: "Redemption placed",
          body: `Redemption of ₹${input.amount.toLocaleString("en-IN")} from ${fund.name} has been placed (demo).`,
        });
        return { ok: true, message: "Redemption placed (demo)." };
      }

      const planType: PlanType = input.mode as PlanType;
      const newPlan: InvestmentPlan = {
        id: uid("plan"),
        type: planType,
        fundId: planType === "STP" ? (input.toFundId ?? input.fundId) : input.fundId,
        fromFundId: planType === "STP" ? input.fundId : undefined,
        amount: input.amount,
        frequency: input.frequency ?? "Monthly",
        dayOfMonth: input.dayOfMonth ?? 5,
        nextDate: "Next cycle",
        startDate: "Today",
        status: "Active",
        installmentsCompleted: 0,
      };
      setPlans((prev) => [newPlan, ...prev]);
      pushNotification({
        kind: "order",
        tone: "teal",
        title: `${planType} started`,
        body: `A new ${planType} of ₹${input.amount.toLocaleString("en-IN")} has been set up (demo).`,
      });
      return { ok: true, message: `${planType} set up (demo).` };
    },
    [pushNotification],
  );

  const value: AppStateShape = {
    holdings,
    totalInvested,
    totalCurrentValue,
    totalGainValue,
    totalGainPct,
    plans,
    updatePlanStatus,
    removePlan,
    watchlist,
    toggleWatchlist,
    isWatchlisted,
    notifications,
    unreadCount,
    markAllNotificationsRead,
    pushNotification,
    dnaPrefs,
    dnaResults,
    runDnaWizard,
    resetDnaWizard,
    selectedFundId,
    setSelectedFundId,
    kycStatus,
    completeKyc,
    onboardingDone,
    completeOnboarding,
    placeOrder,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateShape {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

export { FUNDS };
