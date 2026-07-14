import { useNavigate } from "react-router";
import { ArrowDownRight, ArrowUpRight, Star } from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import { useAppState } from "../AppState";
import { getFund } from "../data";

export default function WatchlistScreen() {
  const navigate = useNavigate();
  const { watchlist, toggleWatchlist } = useAppState();

  useShellAppBar(
    {
      title: "Watchlist",
      subtitle: `${watchlist.length} funds`,
      showBack: true,
      onBack: () => navigate(-1),
      showWatchlist: false,
    },
    [watchlist.length],
  );

  const funds = watchlist.map((id) => getFund(id)).filter(Boolean);

  return (
    <div className="n-page">
      {funds.length === 0 ? (
        <div className="n-empty">
          <span className="n-empty-icon">
            <Star size={22} />
          </span>
          <span className="n-empty-title">No funds watched yet</span>
          <span className="n-empty-body">Star funds from Explore to keep them here.</span>
          <button
            type="button"
            className="n-btn n-btn-primary sm"
            onClick={() => navigate("/app/explore")}
          >
            Browse funds
          </button>
        </div>
      ) : (
        <div className="n-col" style={{ gap: 10 }}>
          {funds.map((fund) =>
            fund ? (
              <div
                key={fund.id}
                className="n-fund-card"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/app/fund/${fund.id}`)}
              >
                <span className="n-fund-avatar">{fund.amc.slice(0, 1)}</span>
                <div className="n-fund-info">
                  <div className="n-fund-name">{fund.name}</div>
                  <div className="n-fund-meta">
                    {fund.category} · Regular · Exp {fund.expenseRatio}%
                  </div>
                </div>
                <div className="n-fund-side">
                  <div className="n-fund-nav">₹{fund.nav.toFixed(2)}</div>
                  <div className={`n-fund-change ${fund.navChangePct >= 0 ? "pos" : "neg"}`}>
                    {fund.navChangePct >= 0 ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}
                    {Math.abs(fund.navChangePct).toFixed(2)}%
                  </div>
                </div>
                <button
                  type="button"
                  className="n-star-btn active"
                  aria-label="Remove from watchlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWatchlist(fund.id);
                  }}
                >
                  <Star size={17} fill="currentColor" />
                </button>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
