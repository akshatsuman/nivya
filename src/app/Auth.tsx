/* eslint-disable react-refresh/only-export-components -- context module exports provider + hook */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

const AUTH_KEY = "nivya-auth-session";

export interface AuthSession {
  token: string;
  phone: string;
  name: string;
}

interface AuthShape {
  session: AuthSession | null;
  isAuthenticated: boolean;
  loginWithOtp: (phone: string, otp: string) => { ok: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthShape | null>(null);

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function displayNameFromPhone(digits: string) {
  const last = digits.slice(-2);
  const names = ["Rahul Mehta", "Ananya Iyer", "Vikram Shah", "Priya Nair", "Arjun Desai"];
  return names[Number(last) % names.length];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readSession());

  const loginWithOtp = useCallback((phone: string, otp: string) => {
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (digits.length !== 10) {
      return { ok: false, message: "Enter a valid 10-digit mobile number." };
    }
    if (!/^\d{6}$/.test(otp)) {
      return { ok: false, message: "Enter the 6-digit OTP sent to your phone." };
    }
    const next: AuthSession = {
      token: `session-${digits}-${Date.now()}`,
      phone: digits,
      name: displayNameFromPhone(digits),
    };
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    setSession(next);
    return { ok: true, message: "Signed in." };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.token),
      loginWithOtp,
      logout,
    }),
    [session, loginWithOtp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthShape {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
