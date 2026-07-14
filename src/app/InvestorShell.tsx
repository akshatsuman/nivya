/* eslint-disable react-refresh/only-export-components -- shell exports layout + app-bar hook */
import { useEffect, useState, type ReactNode } from "react";
import { Outlet, useLocation, useNavigate, useOutletContext } from "react-router";
import { ArrowLeft } from "lucide-react";
import TopNav from "./components/TopNav";
import InsightRail from "./components/InsightRail";
import ComplianceMarquee from "./components/ComplianceMarquee";

export interface AppBarConfig {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showWatchlist?: boolean;
  showNotifications?: boolean;
  right?: ReactNode;
}

interface ShellContext {
  setAppBarConfig: (config: AppBarConfig) => void;
}

const DEFAULT_CONFIG: AppBarConfig = { title: "Home" };

export default function InvestorShell() {
  const [appBarConfig, setAppBarConfig] = useState<AppBarConfig>(DEFAULT_CONFIG);
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState(location.pathname);

  if (path !== location.pathname) {
    setPath(location.pathname);
    setAppBarConfig(DEFAULT_CONFIG);
  }
  const isHome = path === "/app" || path === "/app/";
  const hideChrome = path.endsWith("/onboarding");
  const showInsightRail = isHome && !hideChrome;

  return (
    <div className="n-desk">
      {!hideChrome && <TopNav />}
      {!hideChrome && <ComplianceMarquee />}

      <div className={`n-desk-body${!showInsightRail ? " solo" : " with-right compact-alerts"}`}>
        <div className="n-desk-main">
          {!hideChrome && (
            <div className="n-page-head">
              <div className="n-page-head-lead">
                {appBarConfig.showBack && (
                  <button
                    type="button"
                    className="n-icon-btn"
                    aria-label="Go back"
                    onClick={() => (appBarConfig.onBack ? appBarConfig.onBack() : navigate(-1))}
                  >
                    <ArrowLeft size={17} />
                  </button>
                )}
                <div>
                  <h1 className="n-page-title">{appBarConfig.title}</h1>
                  {appBarConfig.subtitle ? (
                    <p className="n-page-subtitle">{appBarConfig.subtitle}</p>
                  ) : null}
                </div>
              </div>
              {appBarConfig.right ? (
                <div className="n-page-head-right">{appBarConfig.right}</div>
              ) : null}
            </div>
          )}

          <main className="n-content">
            <Outlet context={{ setAppBarConfig } satisfies ShellContext} />
          </main>
        </div>

        {showInsightRail && <InsightRail />}
      </div>
    </div>
  );
}

export function useShellAppBar(config: AppBarConfig, deps: unknown[] = []) {
  const { setAppBarConfig } = useOutletContext<ShellContext>();
  useEffect(() => {
    setAppBarConfig(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
