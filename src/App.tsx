import { Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import { AuthProvider, RequireAuth } from "@/app/Auth";
import { AppStateProvider, useAppState } from "@/app/AppState";
import InvestorShell from "@/app/InvestorShell";
import HomeScreen from "@/app/screens/HomeScreen";
import ExploreScreen from "@/app/screens/ExploreScreen";
import PlansScreen from "@/app/screens/PlansScreen";
import PortfolioScreen from "@/app/screens/PortfolioScreen";
import ProfileScreen from "@/app/screens/ProfileScreen";
import FundDetailScreen from "@/app/screens/FundDetailScreen";
import ChatScreen from "@/app/screens/ChatScreen";
import WatchlistScreen from "@/app/screens/WatchlistScreen";
import NotificationsScreen from "@/app/screens/NotificationsScreen";
import OnboardingScreen from "@/app/screens/OnboardingScreen";
import "@/app/app.css";
import "@/app/desktop-shell.css";

function OnboardingGate() {
  const { onboardingDone } = useAppState();
  const location = useLocation();
  const onOnboarding = location.pathname.endsWith("/onboarding");

  if (!onboardingDone && !onOnboarding) {
    return <Navigate to="/app/onboarding" replace />;
  }
  if (onboardingDone && onOnboarding) {
    return <Navigate to="/app" replace />;
  }
  return <Outlet />;
}

function InvestorApp() {
  return (
    <div className="nivya-app">
      <AppStateProvider>
        <Routes>
          <Route element={<OnboardingGate />}>
            <Route path="onboarding" element={<OnboardingScreen />} />
            <Route element={<InvestorShell />}>
              <Route index element={<HomeScreen />} />
              <Route path="explore" element={<ExploreScreen />} />
              <Route path="plans" element={<PlansScreen />} />
              <Route path="portfolio" element={<PortfolioScreen />} />
              <Route path="profile" element={<ProfileScreen />} />
              <Route path="fund/:fundId" element={<FundDetailScreen />} />
              <Route path="chat" element={<ChatScreen />} />
              <Route path="watchlist" element={<WatchlistScreen />} />
              <Route path="notifications" element={<NotificationsScreen />} />
            </Route>
          </Route>
        </Routes>
      </AppStateProvider>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/app/*"
          element={
            <RequireAuth>
              <InvestorApp />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
