import { useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useAppState, type OrderMode } from "../AppState";
import { getFund, type Fund } from "../data";

interface OrderSheetProps {
  fundId: string;
  mode: OrderMode;
  destinations: Fund[];
  onClose: () => void;
}

const MODE_LABEL: Record<OrderMode, string> = {
  LUMPSUM: "Invest lumpsum",
  SIP: "Start SIP",
  REDEEM: "Redeem",
  SWITCH: "Switch",
  STP: "Start STP",
  SWP: "Start SWP",
};

const NEEDS_CONSENT: OrderMode[] = ["LUMPSUM", "SIP", "SWITCH", "STP"];

export default function OrderSheet({ fundId, mode, destinations, onClose }: OrderSheetProps) {
  const { placeOrder, kycStatus, holdings } = useAppState();
  const fund = getFund(fundId);
  const holding = holdings.find((h) => h.fundId === fundId);

  const [amount, setAmount] = useState(
    mode === "SIP" ? String(fund?.minSip ?? 5000) : String(fund?.minLumpsum ?? 5000)
  );
  const [day, setDay] = useState(5);
  const [toFundId, setToFundId] = useState(destinations[0]?.id ?? "");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState<{ ok: boolean; message: string } | null>(null);

  const needsDest = mode === "SWITCH" || mode === "STP";
  const amountNum = Number(amount) || 0;

  const canSubmit = useMemo(() => {
    if (kycStatus !== "verified") return false;
    if (amountNum <= 0) return false;
    if (needsDest && !toFundId) return false;
    if (NEEDS_CONSENT.includes(mode) && !consent) return false;
    if ((mode === "REDEEM" || mode === "SWP" || mode === "SWITCH" || mode === "STP") && !holding) return false;
    return true;
  }, [amountNum, consent, holding, kycStatus, mode, needsDest, toFundId]);

  if (!fund) return null;

  if (done) {
    return (
      <div className="n-sheet-overlay" onClick={onClose}>
        <div className="n-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="n-sheet-handle" />
          <div className="n-order-success">
            <span className="n-order-success-icon">
              <CheckCircle2 size={28} />
            </span>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{done.ok ? "Order placed" : "Could not place"}</div>
            <p className="n-muted" style={{ fontSize: 13, textAlign: "center" }}>
              {done.message}
            </p>
            <p className="n-disclosure" style={{ textAlign: "center" }}>
              Demo order · ARN-XXXXXX · EUIN-XXXXXX · Regular Plan only
            </p>
            <button type="button" className="n-btn n-btn-primary block" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="n-sheet-overlay" onClick={onClose}>
      <div className="n-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="n-sheet-handle" />
        <div className="n-sheet-head">
          <span className="n-sheet-title">{MODE_LABEL[mode]}</span>
          <button type="button" className="n-back-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <p className="n-muted" style={{ fontSize: 12.5, marginTop: -4 }}>
          {fund.name} · Regular Plan
        </p>

        {kycStatus !== "verified" && (
          <div className="n-illustrative-note" style={{ marginTop: 10 }}>
            Complete KYC from Profile before placing orders (demo gate).
          </div>
        )}

        <div className="n-field" style={{ marginTop: 14 }}>
          <label className="n-label" htmlFor="order-amount">
            Amount (₹)
          </label>
          <input
            id="order-amount"
            className="n-input"
            type="number"
            min={100}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {(mode === "SIP" || mode === "STP" || mode === "SWP") && (
          <div className="n-field">
            <label className="n-label" htmlFor="order-day">
              Debit / transfer day
            </label>
            <select id="order-day" className="n-input" value={day} onChange={(e) => setDay(Number(e.target.value))}>
              {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        )}

        {needsDest && (
          <div className="n-field">
            <label className="n-label" htmlFor="order-dest">
              Destination fund (Regular)
            </label>
            <select
              id="order-dest"
              className="n-input"
              value={toFundId}
              onChange={(e) => setToFundId(e.target.value)}
            >
              {destinations.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {NEEDS_CONSENT.includes(mode) && (
          <label className="n-row" style={{ alignItems: "flex-start", gap: 10, marginTop: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: 3 }} />
            <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.45 }}>
              I have read the SID/KIM/SAI for this scheme. I understand mutual fund investments are subject to market
              risks. This is an execution instruction to Nivya as AMFI-registered distributor, not personalised advice.
            </span>
          </label>
        )}

        <button
          type="button"
          className="n-btn n-btn-primary block"
          style={{ marginTop: 16 }}
          disabled={!canSubmit}
          onClick={() => {
            const result = placeOrder({
              mode,
              fundId,
              toFundId: needsDest ? toFundId : undefined,
              amount: amountNum,
              frequency: "Monthly",
              dayOfMonth: day,
            });
            setDone(result);
          }}
        >
          Confirm {MODE_LABEL[mode]}
        </button>
      </div>
    </div>
  );
}
