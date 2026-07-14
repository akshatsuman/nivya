// Demo data for the Nivya investor app module.
// All funds are Regular Plan (AMFI ARN distribution). Nivya does not sell Direct plans
// and does not provide SEBI RIA personalised advice. Discovery here is criteria-based.

export type FundCategory =
  | "Large Cap"
  | "Flexi Cap"
  | "Mid Cap"
  | "Small Cap"
  | "Large & Mid Cap"
  | "Multi Cap"
  | "Focused Equity"
  | "ELSS"
  | "Hybrid Aggressive"
  | "Hybrid Conservative"
  | "Corporate Bond"
  | "Banking & PSU Debt"
  | "Liquid"
  | "Index";

export type RiskLevel =
  | "Low"
  | "Low to Moderate"
  | "Moderate"
  | "Moderately High"
  | "High"
  | "Very High";

export interface Fund {
  id: string;
  name: string;
  amc: string;
  category: FundCategory;
  plan: "Regular";
  riskLevel: RiskLevel;
  nav: number;
  navChangePct: number;
  aumCr: number;
  expenseRatio: number;
  categoryAvgExpenseRatio: number;
  returns: { y1: number; y3: number; y5: number };
  categoryAvgReturns: { y1: number; y3: number; y5: number };
  rollingConsistencyPct: number;
  minSip: number;
  minLumpsum: number;
  exitLoad: string;
  benchmark: string;
  fundManager: string;
  launchDate: string;
  isin: string;
  rating: number;
  tags: string[];
}

export interface Holding {
  fundId: string;
  units: number;
  avgNav: number;
}

export type PlanType = "SIP" | "STP" | "SWP";
export type PlanStatus = "Active" | "Paused" | "Cancelled";

export interface InvestmentPlan {
  id: string;
  type: PlanType;
  fundId: string;
  fromFundId?: string;
  amount: number;
  frequency: "Monthly" | "Weekly" | "Quarterly";
  dayOfMonth: number;
  nextDate: string;
  startDate: string;
  status: PlanStatus;
  installmentsCompleted: number;
}

export type NotificationTone = "teal" | "amber";
export type NotificationKind = "order" | "alert" | "kyc" | "info";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  tone: NotificationTone;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

export const FUNDS: Fund[] = [
  {
    id: "meridian-bluechip",
    name: "Meridian Bluechip Fund",
    amc: "Meridian Mutual Fund",
    category: "Large Cap",
    plan: "Regular",
    riskLevel: "Moderately High",
    nav: 84.32,
    navChangePct: 0.42,
    aumCr: 18420,
    expenseRatio: 1.68,
    categoryAvgExpenseRatio: 1.9,
    returns: { y1: 14.2, y3: 13.8, y5: 15.1 },
    categoryAvgReturns: { y1: 12.6, y3: 12.1, y5: 13.4 },
    rollingConsistencyPct: 82,
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "Nifty 100 TRI",
    fundManager: "R. Krishnan",
    launchDate: "Mar 2009",
    isin: "INF204K01EA5",
    rating: 4,
    tags: ["Below-median expense ratio", "High rolling consistency", "Large, established AMC"],
  },
  {
    id: "alder-flexicap",
    name: "Alder Flexi Cap Fund",
    amc: "Alder Capital AMC",
    category: "Flexi Cap",
    plan: "Regular",
    riskLevel: "High",
    nav: 61.75,
    navChangePct: -0.18,
    aumCr: 9260,
    expenseRatio: 1.82,
    categoryAvgExpenseRatio: 1.95,
    returns: { y1: 17.4, y3: 16.2, y5: 16.8 },
    categoryAvgReturns: { y1: 14.8, y3: 13.9, y5: 14.6 },
    rollingConsistencyPct: 76,
    minSip: 1000,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "Nifty 500 TRI",
    fundManager: "S. Iyer",
    launchDate: "Jul 2015",
    isin: "INF209K01FB6",
    rating: 4,
    tags: ["Top-quartile 3Y rolling consistency", "Diversified across market caps"],
  },
  {
    id: "northwind-midcap",
    name: "Northwind Midcap Growth Fund",
    amc: "Northwind AMC",
    category: "Mid Cap",
    plan: "Regular",
    riskLevel: "Very High",
    nav: 112.4,
    navChangePct: 0.91,
    aumCr: 6540,
    expenseRatio: 1.95,
    categoryAvgExpenseRatio: 2.02,
    returns: { y1: 22.6, y3: 19.4, y5: 18.9 },
    categoryAvgReturns: { y1: 19.1, y3: 17.2, y5: 16.8 },
    rollingConsistencyPct: 71,
    minSip: 1000,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "Nifty Midcap 150 TRI",
    fundManager: "A. Bhatt",
    launchDate: "Jan 2012",
    isin: "INF301K01GC2",
    rating: 5,
    tags: ["Above-category 3Y & 5Y returns", "Strong AUM growth trend"],
  },
  {
    id: "cascade-emerging",
    name: "Cascade Emerging Equity Fund",
    amc: "Cascade Asset Management",
    category: "Small Cap",
    plan: "Regular",
    riskLevel: "Very High",
    nav: 43.18,
    navChangePct: 1.34,
    aumCr: 4120,
    expenseRatio: 2.05,
    categoryAvgExpenseRatio: 2.1,
    returns: { y1: 26.8, y3: 21.7, y5: 20.3 },
    categoryAvgReturns: { y1: 23.4, y3: 19.8, y5: 18.5 },
    rollingConsistencyPct: 64,
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "Nifty Smallcap 250 TRI",
    fundManager: "P. Nair",
    launchDate: "Sep 2016",
    isin: "INF412K01HD7",
    rating: 4,
    tags: ["High growth category", "Higher volatility, long horizon suited"],
  },
  {
    id: "stonebridge-taxsaver",
    name: "Stonebridge Tax Saver Fund",
    amc: "Stonebridge Mutual Fund",
    category: "ELSS",
    plan: "Regular",
    riskLevel: "Moderately High",
    nav: 96.02,
    navChangePct: 0.27,
    aumCr: 7830,
    expenseRatio: 1.74,
    categoryAvgExpenseRatio: 1.88,
    returns: { y1: 15.6, y3: 14.9, y5: 15.7 },
    categoryAvgReturns: { y1: 13.9, y3: 13.2, y5: 14.1 },
    rollingConsistencyPct: 79,
    minSip: 500,
    minLumpsum: 500,
    exitLoad: "Nil (3-year lock-in under Section 80C)",
    benchmark: "Nifty 500 TRI",
    fundManager: "M. Chandra",
    launchDate: "Feb 2010",
    isin: "INF556K01IE8",
    rating: 4,
    tags: ["Section 80C eligible", "Below-median expense ratio"],
  },
  {
    id: "harbor-balanced",
    name: "Harbor Balanced Advantage Fund",
    amc: "Harbor AMC",
    category: "Hybrid Aggressive",
    plan: "Regular",
    riskLevel: "Moderate",
    nav: 38.64,
    navChangePct: 0.15,
    aumCr: 5290,
    expenseRatio: 1.55,
    categoryAvgExpenseRatio: 1.7,
    returns: { y1: 12.1, y3: 11.6, y5: 12.4 },
    categoryAvgReturns: { y1: 11.2, y3: 10.8, y5: 11.5 },
    rollingConsistencyPct: 74,
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "CRISIL Hybrid 35+65 Aggressive Index",
    fundManager: "V. Rao",
    launchDate: "Nov 2013",
    isin: "INF667K01JF9",
    rating: 3,
    tags: ["Lower volatility than pure equity", "Dynamic equity-debt mix"],
  },
  {
    id: "anchorpoint-corpbond",
    name: "Anchorpoint Corporate Bond Fund",
    amc: "Anchorpoint Mutual Fund",
    category: "Corporate Bond",
    plan: "Regular",
    riskLevel: "Low to Moderate",
    nav: 28.91,
    navChangePct: 0.04,
    aumCr: 11200,
    expenseRatio: 0.68,
    categoryAvgExpenseRatio: 0.82,
    returns: { y1: 7.4, y3: 6.9, y5: 7.2 },
    categoryAvgReturns: { y1: 7.1, y3: 6.7, y5: 7.0 },
    rollingConsistencyPct: 88,
    minSip: 1000,
    minLumpsum: 5000,
    exitLoad: "Nil",
    benchmark: "CRISIL Corporate Bond Index",
    fundManager: "K. Suri",
    launchDate: "Jun 2011",
    isin: "INF778K01KG0",
    rating: 4,
    tags: ["Below-median expense ratio", "High rolling consistency"],
  },
  {
    id: "beacon-bankingpsu",
    name: "Beacon Banking & PSU Debt Fund",
    amc: "Beacon AMC",
    category: "Banking & PSU Debt",
    plan: "Regular",
    riskLevel: "Low",
    nav: 21.47,
    navChangePct: 0.02,
    aumCr: 6870,
    expenseRatio: 0.58,
    categoryAvgExpenseRatio: 0.71,
    returns: { y1: 6.9, y3: 6.4, y5: 6.7 },
    categoryAvgReturns: { y1: 6.8, y3: 6.3, y5: 6.6 },
    rollingConsistencyPct: 85,
    minSip: 1000,
    minLumpsum: 5000,
    exitLoad: "Nil",
    benchmark: "CRISIL Banking & PSU Debt Index",
    fundManager: "N. Desai",
    launchDate: "Apr 2014",
    isin: "INF889K01LH1",
    rating: 4,
    tags: ["Capital-preservation oriented", "Below-median expense ratio"],
  },
  {
    id: "summit-nifty50-index",
    name: "Summit Nifty 50 Index Fund",
    amc: "Summit Mutual Fund",
    category: "Index",
    plan: "Regular",
    riskLevel: "Moderately High",
    nav: 32.06,
    navChangePct: 0.38,
    aumCr: 3980,
    expenseRatio: 0.42,
    categoryAvgExpenseRatio: 0.5,
    returns: { y1: 13.1, y3: 12.4, y5: 13.6 },
    categoryAvgReturns: { y1: 13.0, y3: 12.3, y5: 13.5 },
    rollingConsistencyPct: 91,
    minSip: 500,
    minLumpsum: 1000,
    exitLoad: "Nil",
    benchmark: "Nifty 50 TRI",
    fundManager: "Passive, Index Desk",
    launchDate: "Aug 2017",
    isin: "INF991K01MI2",
    rating: 4,
    tags: ["Lowest-cost tracking", "High rolling consistency vs benchmark"],
  },
  {
    id: "riverstone-largemid",
    name: "Riverstone Large & Midcap Fund",
    amc: "Riverstone AMC",
    category: "Large & Mid Cap",
    plan: "Regular",
    riskLevel: "High",
    nav: 55.29,
    navChangePct: 0.61,
    aumCr: 4710,
    expenseRatio: 1.78,
    categoryAvgExpenseRatio: 1.91,
    returns: { y1: 18.2, y3: 16.9, y5: 17.1 },
    categoryAvgReturns: { y1: 16.4, y3: 15.1, y5: 15.6 },
    rollingConsistencyPct: 73,
    minSip: 1000,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "Nifty Large Midcap 250 TRI",
    fundManager: "D. Shah",
    launchDate: "Oct 2014",
    isin: "INF102K01NJ3",
    rating: 4,
    tags: ["Balanced large + mid exposure", "Below-median expense ratio"],
  },
  {
    id: "vantage-focused",
    name: "Vantage Focused Equity Fund",
    amc: "Vantage Mutual Fund",
    category: "Focused Equity",
    plan: "Regular",
    riskLevel: "High",
    nav: 47.83,
    navChangePct: -0.34,
    aumCr: 2980,
    expenseRatio: 1.89,
    categoryAvgExpenseRatio: 1.93,
    returns: { y1: 16.7, y3: 15.4, y5: 15.9 },
    categoryAvgReturns: { y1: 15.9, y3: 14.6, y5: 15.0 },
    rollingConsistencyPct: 68,
    minSip: 1000,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "Nifty 200 TRI",
    fundManager: "T. Menon",
    launchDate: "May 2018",
    isin: "INF334K01OK4",
    rating: 3,
    tags: ["Concentrated, high-conviction book"],
  },
  {
    id: "palisade-conservative",
    name: "Palisade Conservative Hybrid Fund",
    amc: "Palisade AMC",
    category: "Hybrid Conservative",
    plan: "Regular",
    riskLevel: "Low to Moderate",
    nav: 24.55,
    navChangePct: 0.09,
    aumCr: 3340,
    expenseRatio: 1.12,
    categoryAvgExpenseRatio: 1.25,
    returns: { y1: 9.8, y3: 9.1, y5: 9.6 },
    categoryAvgReturns: { y1: 9.3, y3: 8.7, y5: 9.1 },
    rollingConsistencyPct: 81,
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "CRISIL Hybrid 85+15 Conservative Index",
    fundManager: "H. Kapoor",
    launchDate: "Dec 2012",
    isin: "INF445K01PL5",
    rating: 4,
    tags: ["Debt-heavy, income-oriented", "Suited for regular withdrawals"],
  },
  {
    id: "everline-multicap",
    name: "Everline Multi Cap Fund",
    amc: "Everline AMC",
    category: "Multi Cap",
    plan: "Regular",
    riskLevel: "High",
    nav: 39.71,
    navChangePct: 0.52,
    aumCr: 2410,
    expenseRatio: 1.86,
    categoryAvgExpenseRatio: 1.9,
    returns: { y1: 19.3, y3: 17.6, y5: 17.0 },
    categoryAvgReturns: { y1: 17.8, y3: 16.2, y5: 15.9 },
    rollingConsistencyPct: 70,
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 365 days",
    benchmark: "Nifty 500 Multicap 50:25:25 TRI",
    fundManager: "J. Varghese",
    launchDate: "Feb 2020",
    isin: "INF556L01QM6",
    rating: 3,
    tags: ["Equal-weighted large/mid/small mandate"],
  },
  {
    id: "coastal-liquid",
    name: "Coastal Liquid Fund",
    amc: "Coastal AMC",
    category: "Liquid",
    plan: "Regular",
    riskLevel: "Low",
    nav: 2841.6,
    navChangePct: 0.01,
    aumCr: 15680,
    expenseRatio: 0.29,
    categoryAvgExpenseRatio: 0.34,
    returns: { y1: 7.0, y3: 6.5, y5: 6.1 },
    categoryAvgReturns: { y1: 6.9, y3: 6.4, y5: 6.0 },
    rollingConsistencyPct: 93,
    minSip: 1000,
    minLumpsum: 1000,
    exitLoad: "Graded exit load within 7 days",
    benchmark: "CRISIL Liquid Fund Index",
    fundManager: "Passive, Cash Desk",
    launchDate: "Jan 2008",
    isin: "INF667L01RN7",
    rating: 4,
    tags: ["Parking / short-term liquidity"],
  },
];

export function getFund(id: string): Fund | undefined {
  return FUNDS.find((f) => f.id === id);
}

// Deterministic pseudo-series generator so charts stay stable across re-renders.
function seededSeries(seed: string, points: number, base: number, driftPct: number, volPct: number): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const series: number[] = [];
  let value = base * (1 - driftPct);
  for (let i = 0; i < points; i++) {
    hash = (hash * 1103515245 + 12345) >>> 0;
    const noise = ((hash % 1000) / 1000 - 0.5) * 2 * volPct;
    const trend = (i / points) * driftPct;
    value = base * (1 - driftPct + trend) * (1 + noise);
    series.push(Math.round(value * 100) / 100);
  }
  series[series.length - 1] = base;
  return series;
}

export function getNavHistory(fund: Fund, months = 12): { label: string; value: number }[] {
  const values = seededSeries(fund.id, months, fund.nav, fund.returns.y1 / 100, 0.02);
  const now = new Date();
  return values.map((value, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    return { label: d.toLocaleDateString("en-IN", { month: "short" }), value };
  });
}

export const PORTFOLIO_TREND = seededSeries("nivya-portfolio-trend", 12, 1, 0.14, 0.015).map((v, i, arr) => ({
  label: new Date(new Date().getFullYear(), new Date().getMonth() - (arr.length - 1 - i), 1).toLocaleDateString(
    "en-IN",
    { month: "short" }
  ),
  value: v,
}));

export const HOLDINGS: Holding[] = [
  { fundId: "meridian-bluechip", units: 812.4, avgNav: 71.2 },
  { fundId: "alder-flexicap", units: 540.8, avgNav: 52.9 },
  { fundId: "anchorpoint-corpbond", units: 3120.0, avgNav: 27.4 },
  { fundId: "summit-nifty50-index", units: 980.6, avgNav: 27.9 },
  { fundId: "cascade-emerging", units: 210.3, avgNav: 39.6 },
  { fundId: "palisade-conservative", units: 640.0, avgNav: 22.8 },
];

export const INITIAL_PLANS: InvestmentPlan[] = [
  {
    id: "plan-sip-01",
    type: "SIP",
    fundId: "meridian-bluechip",
    amount: 5000,
    frequency: "Monthly",
    dayOfMonth: 5,
    nextDate: "5 Aug",
    startDate: "5 Mar 2022",
    status: "Active",
    installmentsCompleted: 29,
  },
  {
    id: "plan-sip-02",
    type: "SIP",
    fundId: "alder-flexicap",
    amount: 3000,
    frequency: "Monthly",
    dayOfMonth: 10,
    nextDate: "10 Aug",
    startDate: "10 Jul 2023",
    status: "Active",
    installmentsCompleted: 13,
  },
  {
    id: "plan-sip-03",
    type: "SIP",
    fundId: "cascade-emerging",
    amount: 2000,
    frequency: "Monthly",
    dayOfMonth: 18,
    nextDate: "18 Aug",
    startDate: "18 Jan 2024",
    status: "Paused",
    installmentsCompleted: 7,
  },
  {
    id: "plan-sip-04",
    type: "SIP",
    fundId: "coastal-liquid",
    amount: 1000,
    frequency: "Monthly",
    dayOfMonth: 1,
    nextDate: "-",
    startDate: "1 Feb 2021",
    status: "Cancelled",
    installmentsCompleted: 18,
  },
  {
    id: "plan-stp-01",
    type: "STP",
    fromFundId: "anchorpoint-corpbond",
    fundId: "meridian-bluechip",
    amount: 2000,
    frequency: "Monthly",
    dayOfMonth: 12,
    nextDate: "12 Aug",
    startDate: "12 Feb 2024",
    status: "Active",
    installmentsCompleted: 6,
  },
  {
    id: "plan-swp-01",
    type: "SWP",
    fundId: "palisade-conservative",
    amount: 1500,
    frequency: "Monthly",
    dayOfMonth: 3,
    nextDate: "3 Aug",
    startDate: "3 Apr 2023",
    status: "Active",
    installmentsCompleted: 16,
  },
];

export const INITIAL_WATCHLIST: string[] = ["northwind-midcap", "vantage-focused", "riverstone-largemid"];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    kind: "order",
    tone: "teal",
    title: "SIP processed",
    body: "Your ₹5,000 SIP in Meridian Bluechip Fund was processed successfully.",
    date: "Today, 9:02 AM",
    read: false,
  },
  {
    id: "n2",
    kind: "alert",
    tone: "amber",
    title: "SIP due in 2 days",
    body: "₹3,000 SIP for Alder Flexi Cap Fund is scheduled for 10 Aug.",
    date: "Today, 8:00 AM",
    read: false,
  },
  {
    id: "n3",
    kind: "alert",
    tone: "amber",
    title: "SIP payment failed",
    body: "Your SIP for Cascade Emerging Equity Fund could not be processed. Mandate limit reached.",
    date: "Yesterday",
    read: false,
  },
  {
    id: "n4",
    kind: "kyc",
    tone: "amber",
    title: "Re-KYC pending",
    body: "Complete your re-KYC to keep transactions running without interruption.",
    date: "2 days ago",
    read: false,
  },
  {
    id: "n5",
    kind: "order",
    tone: "teal",
    title: "STP installment completed",
    body: "₹2,000 moved from Anchorpoint Corporate Bond Fund to Meridian Bluechip Fund.",
    date: "3 days ago",
    read: true,
  },
  {
    id: "n6",
    kind: "alert",
    tone: "amber",
    title: "Concentration alert",
    body: "Equity now makes up over 65% of your portfolio value.",
    date: "4 days ago",
    read: true,
  },
  {
    id: "n7",
    kind: "info",
    tone: "teal",
    title: "NAVs updated",
    body: "NAVs for all schemes have been refreshed for the previous business day.",
    date: "5 days ago",
    read: true,
  },
  {
    id: "n8",
    kind: "info",
    tone: "teal",
    title: "New fund on Explore",
    body: "Riverstone Large & Midcap Fund is now available to browse and compare.",
    date: "1 week ago",
    read: true,
  },
];

// ── Investment DNA wizard ────────────────────────────────────────────────

export type DnaGoal = "Long-term wealth growth" | "Tax saving (80C)" | "Short-term parking" | "Regular income";
export type DnaHorizon = "<1 year" | "1-3 years" | "3-5 years" | "5+ years";
export type DnaRisk = "Conservative" | "Moderate" | "Aggressive";
export type DnaPriority = "Lower cost" | "Consistency across cycles" | "Large, established AMC";

export interface DnaPrefs {
  goal: DnaGoal;
  horizon: DnaHorizon;
  risk: DnaRisk;
  priority: DnaPriority;
}

export const DNA_GOALS: DnaGoal[] = [
  "Long-term wealth growth",
  "Tax saving (80C)",
  "Short-term parking",
  "Regular income",
];
export const DNA_HORIZONS: DnaHorizon[] = ["<1 year", "1-3 years", "3-5 years", "5+ years"];
export const DNA_RISKS: DnaRisk[] = ["Conservative", "Moderate", "Aggressive"];
export const DNA_PRIORITIES: DnaPriority[] = ["Lower cost", "Consistency across cycles", "Large, established AMC"];

export interface RankedFund {
  fund: Fund;
  score: number;
  whyTags: string[];
}

const GOAL_CATEGORIES: Record<DnaGoal, FundCategory[]> = {
  "Long-term wealth growth": [
    "Flexi Cap",
    "Large Cap",
    "Mid Cap",
    "Multi Cap",
    "Large & Mid Cap",
    "Focused Equity",
    "Small Cap",
    "Index",
  ],
  "Tax saving (80C)": ["ELSS"],
  "Short-term parking": ["Liquid", "Banking & PSU Debt"],
  "Regular income": ["Hybrid Conservative", "Corporate Bond", "Banking & PSU Debt"],
};

const RISK_CATEGORIES: Record<DnaRisk, RiskLevel[]> = {
  Conservative: ["Low", "Low to Moderate", "Moderate"],
  Moderate: ["Low to Moderate", "Moderate", "Moderately High"],
  Aggressive: ["Moderately High", "High", "Very High"],
};

const HORIZON_MIN_YEARS: Record<DnaHorizon, number> = {
  "<1 year": 0,
  "1-3 years": 1,
  "3-5 years": 3,
  "5+ years": 5,
};

export function runDnaRanking(prefs: DnaPrefs): RankedFund[] {
  const eligibleCategories = GOAL_CATEGORIES[prefs.goal];
  const eligibleRisk = RISK_CATEGORIES[prefs.risk];
  const minYears = HORIZON_MIN_YEARS[prefs.horizon];

  const candidates = FUNDS.filter((f) => eligibleCategories.includes(f.category));

  const scored: RankedFund[] = candidates.map((fund) => {
    let score = 40;
    const whyTags: string[] = [];

    if (eligibleRisk.includes(fund.riskLevel)) {
      score += 14;
      whyTags.push(`Risk profile matches your "${prefs.risk}" appetite`);
    }

    const expenseDelta = fund.categoryAvgExpenseRatio - fund.expenseRatio;
    if (expenseDelta > 0) {
      score += Math.min(12, expenseDelta * 10);
      whyTags.push("Expense ratio below category average");
    }

    if (fund.rollingConsistencyPct >= 80) {
      score += 12;
      whyTags.push("Top-quartile rolling consistency vs category");
    } else if (fund.rollingConsistencyPct >= 70) {
      score += 6;
      whyTags.push("Above-average rolling consistency vs category");
    }

    const y5Delta = fund.returns.y5 - fund.categoryAvgReturns.y5;
    if (y5Delta > 0) {
      score += Math.min(10, y5Delta * 2);
      whyTags.push("5Y category-relative return above average");
    }

    if (minYears >= 5 && fund.category !== "Liquid") {
      whyTags.push("Suited to your 5+ year horizon");
      score += 4;
    } else if (minYears === 0 && ["Liquid", "Banking & PSU Debt"].includes(fund.category)) {
      whyTags.push("Suited to short holding periods");
      score += 8;
    }

    if (prefs.priority === "Lower cost" && expenseDelta > 0) score += 8;
    if (prefs.priority === "Consistency across cycles" && fund.rollingConsistencyPct >= 78) score += 8;
    if (prefs.priority === "Large, established AMC" && fund.aumCr >= 6000) {
      score += 8;
      whyTags.push("Large, established AMC by AUM");
    }

    return { fund, score: Math.round(Math.min(99, score)), whyTags: Array.from(new Set(whyTags)).slice(0, 3) };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 8);
}

// ── Fund Q&A chatbot (mock, criteria-based only, refuses advice-style asks) ─

const ADVICE_PATTERNS: RegExp[] = [
  /should i (buy|invest|sell|redeem)/i,
  /is (this|it) (a )?good (for me|investment)?/i,
  /will (it|this|the fund) (go up|grow|increase|double|perform)/i,
  /best fund for me/i,
  /buy or sell/i,
  /guarantee/i,
  /sure[- ]?shot/i,
  /tip(s)? for (today|this week)/i,
  /recommend.*for me/i,
  /which fund should i/i,
  /is it (the )?right time/i,
];

export function isAdviceSeeking(question: string): boolean {
  return ADVICE_PATTERNS.some((re) => re.test(question));
}

export const GUARDRAIL_MESSAGE =
  "I can share fund facts, criteria, and comparisons, but I can't give personalised buy, sell, or hold advice. That needs SEBI RIA registration, and Nivya operates as an AMFI-registered distributor. Try asking about NAV, expense ratio, category returns, risk level, or portfolio concentration instead.";

export function answerFundQuestion(fund: Fund | undefined, question: string): string {
  const q = question.toLowerCase();

  if (!fund) {
    if (q.includes("regular") && q.includes("direct")) {
      return "Nivya distributes Regular Plans only. Regular Plan NAV includes the distributor commission Nivya earns for service and execution support; Direct Plan NAV excludes it. Returns shown for each fund are for the Regular Plan.";
    }
    if (q.includes("arn") || q.includes("euin")) {
      return "Nivya operates under an AMFI-registered ARN as a Mutual Fund Distributor. Every order carries an ARN and, where applicable, an EUIN reference for the executing individual, shown on the order confirmation screen.";
    }
    return "I can answer fund-specific questions (NAV, expense ratio, category returns, risk level) once you open a fund's detail page, or ask me general questions about how Nivya works as a distributor.";
  }

  if (q.includes("expense")) {
    const delta = (fund.categoryAvgExpenseRatio - fund.expenseRatio).toFixed(2);
    return `${fund.name}'s expense ratio is ${fund.expenseRatio}% (Regular Plan), vs a category average of ${fund.categoryAvgExpenseRatio}%. That's ${delta}% lower than peers.`;
  }
  if (q.includes("return") || q.includes("perform")) {
    return `${fund.name} returns (Regular Plan, trailing): 1Y ${fund.returns.y1}%, 3Y ${fund.returns.y3}% (annualised), 5Y ${fund.returns.y5}% (annualised). Category averages were ${fund.categoryAvgReturns.y1}% / ${fund.categoryAvgReturns.y3}% / ${fund.categoryAvgReturns.y5}% for the same periods. Past performance doesn't indicate future returns.`;
  }
  if (q.includes("risk")) {
    return `${fund.name} is labelled "${fund.riskLevel}" risk on the SEBI riskometer, in the ${fund.category} category. Its rolling consistency vs category over the tracked periods is ${fund.rollingConsistencyPct}%.`;
  }
  if (q.includes("nav")) {
    return `${fund.name}'s latest NAV (Regular Plan) is ₹${fund.nav.toFixed(2)}, ${fund.navChangePct >= 0 ? "up" : "down"} ${Math.abs(fund.navChangePct).toFixed(2)}% from the previous business day.`;
  }
  if (q.includes("exit") || q.includes("load")) {
    return `Exit load for ${fund.name}: ${fund.exitLoad}.`;
  }
  if (q.includes("minimum") || q.includes("min sip") || q.includes("lumpsum")) {
    return `Minimum SIP for ${fund.name} is ₹${fund.minSip}/month, and minimum lumpsum is ₹${fund.minLumpsum}.`;
  }
  if (q.includes("manager")) {
    return `${fund.name} is managed by ${fund.fundManager}, benchmarked against ${fund.benchmark}.`;
  }
  return `Here's what I can tell you about ${fund.name} (Regular Plan): category ${fund.category}, risk ${fund.riskLevel}, expense ratio ${fund.expenseRatio}%, 3Y return ${fund.returns.y3}% vs category average ${fund.categoryAvgReturns.y3}%. Ask me about NAV, returns, expense ratio, risk, exit load, or minimums for more detail.`;
}

export const CHAT_SUGGESTIONS = [
  "What's the expense ratio vs category average?",
  "How has it performed over 3 and 5 years?",
  "What's the risk level and consistency?",
  "What's the minimum SIP amount?",
  "Is this fund good for me?",
];
