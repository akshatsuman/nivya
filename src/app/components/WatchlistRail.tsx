import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowDownRight, ArrowUpRight, Search, Star } from "lucide-react";
import { useAppState } from "../AppState";
import { FUNDS, getFund } from "../data";

export default function WatchlistRail() {
  const navigate = useNavigate();
  const { watchlist, toggleWatchlist } = useAppState();
  const [query, setQuery] = useState("");

  const watched = useMemo(() => watchlist.map((id) => getFund(id)).filter(Boolean), [watchlist]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FUNDS.filter((f) => !watchlist.includes(f.id)).slice(0, 4);
    return FUNDS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.amc.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query, watchlist]);

  return (
    <aside className="n-rail n-rail-left">
      <div className="n-rail-head">
        <div>
          <div className="n-rail-kicker">Watchlist</div>
          <div className="n-rail-title">Funds you follow</div>
        </div>
        <button type="button" className="n-section-link" onClick={() => navigate("/app/watchlist")}>
          Open
        </button>
      </div>

      <label className="n-rail-search">
        <Search size={14} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search schemes…"
        />
      </label>

      <div className="n-rail-scroll">
        {watched.length === 0 && !query && (
          <p className="n-rail-empty">Star funds from Explore to pin them here.</p>
        )}

        {(query ? suggestions : watched).map((fund) =>
          fund ? (
            <button
              key={fund.id}
              type="button"
              className="n-rail-fund"
              onClick={() => navigate(`/app/fund/${fund.id}`)}
            >
              <span className={`n-rail-stripe ${fund.navChangePct >= 0 ? "pos" : "neg"}`} />
              <div className="n-rail-fund-body">
                <div className="n-rail-fund-name">{fund.name}</div>
                <div className="n-rail-fund-meta">{fund.category} · Regular</div>
              </div>
              <div className="n-rail-fund-side">
                <div className="n-rail-fund-nav">₹{fund.nav.toFixed(2)}</div>
                <div className={`n-fund-change ${fund.navChangePct >= 0 ? "pos" : "neg"}`}>
                  {fund.navChangePct >= 0 ? (
                    <ArrowUpRight size={11} />
                  ) : (
                    <ArrowDownRight size={11} />
                  )}
                  {Math.abs(fund.navChangePct).toFixed(2)}%
                </div>
              </div>
              <span
                className={`n-rail-star ${watchlist.includes(fund.id) ? "on" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(fund.id);
                }}
                role="presentation"
              >
                <Star size={13} fill={watchlist.includes(fund.id) ? "currentColor" : "none"} />
              </span>
            </button>
          ) : null,
        )}
      </div>
    </aside>
  );
}
