import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "user" | "agent";

const COPY: Record<
  Mode,
  {
    kicker: string;
    heading: string;
    sub: string;
    userLabel: string;
    userHint: string;
    cta: string;
    footPrompt: string;
    footAction: string;
  }
> = {
  user: {
    kicker: "Member sign in",
    heading: "Welcome back",
    sub: "Sign in to review your portfolio and keep your SIPs on course.",
    userLabel: "Email or phone",
    userHint: "Use the email or mobile linked to your folio.",
    cta: "Log in",
    footPrompt: "New to Nivya?",
    footAction: "Create an account",
  },
  agent: {
    kicker: "Advisor & partner sign in",
    heading: "Partner desk",
    sub: "Access client books, track SIP mandates, and manage referrals.",
    userLabel: "Agent ID or email",
    userHint: "Your ARN-linked agent ID or registered partner email.",
    cta: "Enter partner desk",
    footPrompt: "Want to distribute with Nivya?",
    footAction: "Apply to partner",
  },
};

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const c = COPY[mode];

  const handleSubmit = () => {
    if (submitting) return;
    setSubmitting(true);
    // Demo only — wire to your auth endpoint here.
    setTimeout(() => setSubmitting(false), 1600);
  };

  return (
    <div className="relative min-h-screen w-full bg-paper text-ink">
      {/* warm paper atmosphere — same grain as the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 40% at 86% 18%, rgba(26,160,140,0.10) 0%, transparent 70%)," +
            "radial-gradient(40% 40% at 8% 92%, rgba(180,146,90,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        {/* ───────────────── Brand pane (lg+) ───────────────── */}
        <aside className="relative hidden overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-between lg:p-14 xl:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 44% at 78% 14%, rgba(26,160,140,0.20) 0%, transparent 70%)," +
                "radial-gradient(42% 42% at 14% 88%, rgba(180,146,90,0.14) 0%, transparent 72%)",
            }}
          />
          {/* faint ledger ruling */}
          <div
            aria-hidden="true"
            className="ledger-lines pointer-events-none absolute inset-0 opacity-[0.5]"
          />

          {/* Top — wordmark */}
          <div className="relative flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-paper-raised shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)]">
              <img src="/assets/logo.png" alt="" className="h-6 w-auto" />
            </span>
            <span className="font-display text-[24px] font-600 leading-none tracking-[-0.01em] text-paper">
              Nivya
            </span>
          </div>

          {/* Middle — thesis */}
          <div className="relative max-w-[440px]">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.18em] text-gold-soft">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
              Patient money, tended well
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,3.4vw,3.1rem)] font-500 leading-[1.04] tracking-[-0.02em] text-paper">
              Wealth is{" "}
              <span className="italic text-teal">tended,</span> not timed.
            </h1>
            <p className="mt-5 max-w-[400px] font-sans text-[15.5px] leading-relaxed text-paper/65">
              Sign in to a calm, transparent place for your mutual funds —
              direct plans, automated SIPs, and fees you can actually see.
            </p>
          </div>

          {/* Bottom — trust */}
          <div className="relative flex flex-wrap items-center gap-x-7 gap-y-3">
            <span className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-paper/75">
              <ShieldCheck size={17} className="text-teal" />
              SEBI-registered
            </span>
            <span className="font-sans text-[13.5px] font-600 text-gold-soft">
              Wealth, made simple.
            </span>
          </div>
        </aside>

        {/* ───────────────── Form pane ───────────────── */}
        <main className="flex flex-col px-6 py-8 sm:px-10 md:py-10">
          {/* Top bar: mobile wordmark + back link */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 lg:invisible">
              <img src="/assets/logo.png" alt="Nivya" className="h-7 w-auto" />
              <span className="font-display text-[20px] font-600 leading-none tracking-[-0.01em] text-ink">
                Nivya
              </span>
            </Link>
            <Link
              to="/"
              className="group inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back to home
            </Link>
          </div>

          {/* Centered card */}
          <div className="flex flex-1 items-center justify-center py-10">
            <div
              className={cn(
                "statement w-full max-w-[438px] rounded-[18px] px-7 py-8 shadow-statement transition-all duration-700 ease-out sm:px-9 sm:py-10",
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              {/* eyebrow + heading */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
                  Secure access
                </span>
                <Lock size={15} className="text-ink-mute" />
              </div>

              <h2 className="mt-4 font-display text-[28px] font-500 leading-[1.1] tracking-[-0.01em] text-ink">
                {c.heading}
              </h2>
              <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-ink-soft">
                {c.sub}
              </p>

              {/* passbook perforation */}
              <div className="perf my-6" aria-hidden="true" />

              {/* ── Member / Agent toggle ── */}
              <div
                role="tablist"
                aria-label="Choose account type"
                className="relative grid grid-cols-2 rounded-full border border-line-strong bg-paper-deep p-1"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-evergreen shadow-[0_8px_18px_-10px_rgba(15,110,94,0.9)] transition-transform duration-300 ease-out",
                    mode === "agent" && "translate-x-[calc(100%)]"
                  )}
                />
                {(
                  [
                    { key: "user", label: "Member" },
                    { key: "agent", label: "Agent / advisor" },
                  ] as { key: Mode; label: string }[]
                ).map((opt) => {
                  const active = mode === opt.key;
                  return (
                    <button
                      key={opt.key}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      onClick={() => setMode(opt.key)}
                      className={cn(
                        "relative z-10 rounded-full py-2.5 font-sans text-[13.5px] font-semibold transition-colors duration-200",
                        active ? "text-paper-raised" : "text-ink-soft hover:text-ink"
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-mute">
                {c.kicker}
              </p>

              {/* ── Fields ── */}
              <div className="mt-6 space-y-7">
                {/* Username / agent id */}
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder=" "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="peer w-full border-0 border-b-[1.5px] border-line-strong bg-transparent pb-2 pt-1 font-sans text-[16px] text-ink outline-none transition-colors placeholder:text-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-evergreen transition-transform duration-300 peer-focus:scale-x-100"
                  />
                  <label
                    htmlFor="username"
                    className="pointer-events-none absolute -top-3 left-0 font-sans text-[12.5px] font-medium text-ink-soft transition-all duration-200 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-[15.5px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-ink-mute peer-focus:-top-3 peer-focus:text-[12.5px] peer-focus:font-medium peer-focus:text-evergreen"
                  >
                    {c.userLabel}
                  </label>
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full border-0 border-b-[1.5px] border-line-strong bg-transparent pb-2 pr-10 pt-1 font-sans text-[16px] text-ink outline-none transition-colors placeholder:text-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-evergreen transition-transform duration-300 peer-focus:scale-x-100"
                  />
                  <label
                    htmlFor="password"
                    className="pointer-events-none absolute -top-3 left-0 font-sans text-[12.5px] font-medium text-ink-soft transition-all duration-200 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-[15.5px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-ink-mute peer-focus:-top-3 peer-focus:text-[12.5px] peer-focus:font-medium peer-focus:text-evergreen"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute bottom-1.5 right-0 grid h-8 w-8 place-items-center rounded-full text-ink-mute transition-colors hover:text-ink"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <p className="mt-2.5 font-sans text-[12px] leading-snug text-ink-mute">
                {c.userHint}
              </p>

              {/* remember + forgot */}
              <div className="mt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setRemember((r) => !r)}
                  className="group inline-flex items-center gap-2.5 font-sans text-[13.5px] text-ink-soft transition-colors hover:text-ink"
                >
                  <span
                    className={cn(
                      "grid h-[18px] w-[18px] place-items-center rounded-[6px] border-[1.5px] transition-all duration-200",
                      remember
                        ? "border-evergreen bg-evergreen text-paper-raised"
                        : "border-line-strong bg-paper-raised text-transparent group-hover:border-ink-soft"
                    )}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Remember me
                </button>

                <a
                  href="#"
                  className="font-sans text-[13.5px] font-semibold text-evergreen underline-offset-4 transition-colors hover:text-evergreen-deep hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-evergreen py-4 font-sans text-[15.5px] font-semibold text-paper-raised shadow-[0_12px_28px_-12px_rgba(15,110,94,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-evergreen-deep hover:shadow-[0_18px_34px_-14px_rgba(15,110,94,0.8)] disabled:translate-y-0 disabled:opacity-80"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing you in…
                  </>
                ) : (
                  <>
                    {c.cta}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>

              {/* sign up */}
              <p className="mt-6 text-center font-sans text-[14px] text-ink-soft">
                {c.footPrompt}{" "}
                <a
                  href="#"
                  className="font-semibold text-evergreen underline-offset-4 transition-colors hover:text-evergreen-deep hover:underline"
                >
                  {c.footAction}
                </a>
              </p>
            </div>
          </div>

          {/* fine print */}
          <p className="mx-auto max-w-[440px] text-center font-sans text-[11.5px] leading-relaxed text-ink-mute">
            Nivya is currently in development and access is limited before
            launch. Mutual fund investments are subject to market risks. Read all
            scheme-related documents carefully.
          </p>
        </main>
      </div>
    </div>
  );
}
