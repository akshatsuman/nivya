import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2, Lock, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/Auth";

const RESEND_SECONDS = 30;

export default function LoginPage() {
  const { isAuthenticated, loginWithOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/app";

  const incomingPhone =
    typeof (location.state as { phone?: string } | null)?.phone === "string"
      ? (location.state as { phone: string }).phone.replace(/\D/g, "").slice(0, 10)
      : "";

  const [step, setStep] = useState<"phone" | "otp">(incomingPhone.length === 10 ? "otp" : "phone");
  const [phone, setPhone] = useState(incomingPhone);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [resendIn, setResendIn] = useState(incomingPhone.length === 10 ? RESEND_SECONDS : 0);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = window.setInterval(() => {
      setResendIn((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [resendIn]);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const digits = phone.replace(/\D/g, "").slice(-10);

  const startResendTimer = () => setResendIn(RESEND_SECONDS);

  const requestOtp = () => {
    setError("");
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setOtp("");
    setStep("otp");
    startResendTimer();
  };

  const resendOtp = () => {
    if (resendIn > 0) return;
    setError("");
    setOtp("");
    startResendTimer();
  };

  const handleVerify = () => {
    if (submitting) return;
    setSubmitting(true);
    setError("");
    window.setTimeout(() => {
      const result = loginWithOtp(digits, otp.trim());
      setSubmitting(false);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      navigate(from, { replace: true });
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full bg-paper text-ink">
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
        <aside
          className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-14 xl:p-16"
          style={{
            background: "linear-gradient(165deg, #FFFDF8 0%, #F8F1E4 48%, #F3E9D8 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(56% 48% at 86% 8%, rgba(26,160,140,0.14) 0%, transparent 68%)," +
                "radial-gradient(48% 44% at 8% 92%, rgba(180,146,90,0.16) 0%, transparent 70%)," +
                "radial-gradient(40% 36% at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 75%)",
            }}
          />
          <div
            aria-hidden="true"
            className="ledger-lines pointer-events-none absolute inset-0 opacity-[0.22]"
          />

          <div className="relative flex items-center gap-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[13px] bg-white shadow-[0_8px_24px_-12px_rgba(20,35,59,0.28)] ring-1 ring-line">
              <img
                src={`${import.meta.env.BASE_URL}assets/logo.png`}
                alt=""
                className="h-[78%] w-[78%] object-cover"
              />
            </span>
            <span className="font-display text-[24px] font-600 leading-none tracking-[-0.01em] text-ink">
              Nivya
            </span>
          </div>

          <div className="relative max-w-[440px]">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-mute">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-evergreen" />
              Investor sign in
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,3.4vw,3.1rem)] font-500 leading-[1.04] tracking-[-0.02em] text-ink">
              Discover confidently.{" "}
              <span className="italic text-evergreen">Invest transparently.</span>
            </h1>
            <p className="mt-5 max-w-[400px] font-sans text-[15.5px] leading-relaxed text-ink-soft">
              Sign in with OTP to explore Regular mutual funds, manage SIPs, and track your
              portfolio.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-x-7 gap-y-3">
            <span className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium text-ink-soft">
              <ShieldCheck size={17} className="text-evergreen" />
              AMFI-registered Mutual Fund Distributor
            </span>
            <span className="font-sans text-[13.5px] font-600 text-evergreen">
              Regular plans only
            </span>
          </div>
        </aside>

        <main className="flex flex-col px-6 py-8 sm:px-10 md:py-10">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 lg:invisible">
              <img
                src={`${import.meta.env.BASE_URL}assets/logo.png`}
                alt="Nivya"
                className="h-7 w-auto"
              />
              <span className="font-display text-[20px] font-600 leading-none tracking-[-0.01em] text-ink">
                Nivya
              </span>
            </Link>
            <Link
              to="/"
              className="group inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            <div
              className={cn(
                "statement w-full max-w-[438px] rounded-[18px] px-7 py-8 shadow-statement transition-all duration-700 ease-out sm:px-9 sm:py-10",
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
                  Secure OTP access
                </span>
                <Lock size={15} className="text-ink-mute" />
              </div>

              <h2 className="mt-4 font-display text-[28px] font-500 leading-[1.1] tracking-[-0.01em] text-ink">
                {step === "phone" ? "Welcome back" : "Enter OTP"}
              </h2>
              <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-ink-soft">
                {step === "phone"
                  ? "Sign in with your mobile number to review your portfolio and keep SIPs on course."
                  : `We sent a 6-digit code to +91 ${digits}.`}
              </p>

              <div className="perf my-6" aria-hidden="true" />

              <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-mute">
                Investor login
              </p>

              {step === "phone" ? (
                <div className="mt-6 space-y-7">
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      maxLength={10}
                      placeholder=" "
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      onKeyDown={(e) => e.key === "Enter" && requestOtp()}
                      className="peer w-full border-0 border-b-[1.5px] border-line-strong bg-transparent pb-2 pt-1 font-sans text-[16px] text-ink outline-none transition-colors placeholder:text-transparent"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-evergreen transition-transform duration-300 peer-focus:scale-x-100"
                    />
                    <label
                      htmlFor="phone"
                      className="pointer-events-none absolute -top-3 left-0 font-sans text-[12.5px] font-medium text-ink-soft transition-all duration-200 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-[15.5px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-ink-mute peer-focus:-top-3 peer-focus:text-[12.5px] peer-focus:font-medium peer-focus:text-evergreen"
                    >
                      Mobile number
                    </label>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  <div className="relative">
                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder=" "
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                      className="peer w-full border-0 border-b-[1.5px] border-line-strong bg-transparent pb-2 pt-1 font-sans text-[16px] tracking-[0.35em] text-ink outline-none transition-colors placeholder:text-transparent"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-evergreen transition-transform duration-300 peer-focus:scale-x-100"
                    />
                    <label
                      htmlFor="otp"
                      className="pointer-events-none absolute -top-3 left-0 font-sans text-[12.5px] font-medium text-ink-soft transition-all duration-200 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-[15.5px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-ink-mute peer-focus:-top-3 peer-focus:text-[12.5px] peer-focus:font-medium peer-focus:text-evergreen"
                    >
                      6-digit OTP
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("phone");
                        setOtp("");
                        setError("");
                        setResendIn(0);
                      }}
                      className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-evergreen"
                    >
                      <Smartphone size={14} /> Change number
                    </button>

                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={resendIn > 0}
                      className="font-sans text-[13px] font-semibold text-evergreen disabled:cursor-not-allowed disabled:text-ink-mute"
                    >
                      {resendIn > 0 ? `Resend OTP in ${resendIn}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <p className="mt-4 font-sans text-[13px] font-medium text-[#c0362c]">{error}</p>
              )}

              <button
                type="button"
                onClick={step === "phone" ? requestOtp : handleVerify}
                disabled={submitting || (step === "otp" && otp.length < 6)}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-evergreen py-4 font-sans text-[15.5px] font-semibold text-paper-raised shadow-[0_12px_28px_-12px_rgba(15,110,94,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-evergreen-deep hover:shadow-[0_18px_34px_-14px_rgba(15,110,94,0.8)] disabled:translate-y-0 disabled:opacity-80"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying…
                  </>
                ) : (
                  <>
                    {step === "phone" ? "Send OTP" : "Verify & enter app"}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>

              <p className="mt-6 text-center font-sans text-[14px] text-ink-soft">
                New to Nivya?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setError("");
                  }}
                  className="font-semibold text-evergreen underline-offset-4 transition-colors hover:text-evergreen-deep hover:underline"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>

          <p className="mx-auto max-w-[440px] text-center font-sans text-[11.5px] leading-relaxed text-ink-mute">
            Mutual fund investments are subject to market risks. Read all scheme-related documents
            carefully. Nivya distributes Regular plans only.
          </p>
        </main>
      </div>
    </div>
  );
}
