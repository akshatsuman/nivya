const MARQUEE_ITEMS = [
  "AMFI-registered Mutual Fund Distributor",
  "Regular plans only. Direct plans not distributed",
  "ARN-XXXXXX · EUIN-XXXXXX (demo)",
  "Mutual fund investments are subject to market risks",
  "Read all scheme-related documents carefully",
  "SID / KIM / SAI consent logged before first invest per scheme",
  "Criteria-based discovery, not SEBI RIA personalised advice",
  "Past performance is not indicative of future results",
  "Lumpsum · SIP · STP · SWP · Switch · Redeem",
  "Every order carries ARN + EUIN",
  "Explore Rank: expense · consistency · category-relative returns",
  "Portfolio insights are factual context, not buy/sell guidance",
  "Ask Nivya for fund facts. Advice-seeking questions are declined",
  "Trail commission on Regular-plan AUM",
  "Grievance: support@nivya.app (demo) · SEBI SCORES escalation",
  "Data handled under DPDP-aligned privacy practices (demo)",
];

function MarqueeTrack() {
  return (
    <div className="n-marquee-track" aria-hidden="true">
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="n-marquee-item">
          <span className="n-strip-dot" />
          {item}
        </span>
      ))}
    </div>
  );
}

export default function ComplianceMarquee() {
  return (
    <div className="n-compliance-strip n-marquee" role="region" aria-label="Platform disclosures">
      <div className="n-marquee-viewport">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
      {/* Accessible static summary for screen readers */}
      <p className="n-sr-only">{MARQUEE_ITEMS.join(". ")}</p>
    </div>
  );
}
