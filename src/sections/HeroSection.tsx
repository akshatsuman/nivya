import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ShieldCheck } from "lucide-react";
import PhoneUspShowcase from "@/components/PhoneUspShowcase";

export default function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLFormElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0,
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" },
          0.12,
        );
      }

      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.55,
      );
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.7,
      );
      tl.fromTo(
        trustRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.9,
      );
      tl.fromTo(
        panelRef.current,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 1.0, ease: "expo.out" },
        0.3,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const head = [
    { t: "Clarity", em: true },
    { t: "before", em: false },
    { t: "every", em: false },
    { t: "investment.", em: false },
  ];

  const digits = phone.replace(/\D/g, "").slice(0, 10);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    navigate("/login", { state: { phone: digits } });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative w-full overflow-hidden bg-paper">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(48% 42% at 82% 24%, rgba(26,160,140,0.10) 0%, transparent 72%)," +
            "radial-gradient(40% 40% at 12% 8%, rgba(180,146,90,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-[68px]" aria-hidden="true">
        <div className="content-container">
          <div className="rule opacity-60" />
        </div>
      </div>

      <div className="content-container relative z-10">
        <div className="grid items-center gap-10 pt-28 pb-16 sm:gap-12 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:grid-cols-2 lg:gap-10 lg:pt-40 lg:pb-28">
          <div className="w-full min-w-0 max-w-xl lg:max-w-none">
            <div ref={eyebrowRef} className="opacity-0">
              <span className="eyebrow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
                AMFI-registered · Mutual funds &amp; SIPs
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="mt-5 font-display text-[clamp(2.35rem,6vw,4.75rem)] font-500 leading-[1.02] tracking-[-0.02em] text-ink"
            >
              {head.map((w, i) => (
                <span
                  key={i}
                  className={
                    "word inline-block opacity-0 " +
                    (w.em ? "italic text-evergreen pr-[0.26em]" : "pr-[0.26em]")
                  }
                >
                  {w.t}
                </span>
              ))}
            </h1>

            <p
              ref={subheadRef}
              className="mt-5 max-w-lg font-sans text-[clamp(15px,2.2vw,17px)] leading-relaxed text-ink-soft opacity-0 sm:mt-6"
            >
              Explore Mutual Funds with transparent data, easy comparisons, and insights designed to
              help you invest with confidence.
              <br />
              You choose, we execute.
            </p>

            <form
              id="hero-signin"
              ref={ctaRef}
              onSubmit={handleSignIn}
              className="mt-8 max-w-md opacity-0 sm:mt-9"
            >
              <label htmlFor="hero-phone" className="sr-only">
                Mobile number
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="flex min-w-0 flex-1 items-center rounded-full border border-line-strong bg-paper-raised px-4 shadow-xs focus-within:border-evergreen focus-within:ring-2 focus-within:ring-evergreen/20">
                  <span className="shrink-0 font-mono text-[13px] font-medium text-ink-mute">
                    +91
                  </span>
                  <span className="mx-2.5 h-5 w-px shrink-0 bg-line-strong" aria-hidden="true" />
                  <input
                    id="hero-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="Enter mobile number"
                    value={digits}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      if (error) setError("");
                    }}
                    className="h-12 w-full min-w-0 bg-transparent font-sans text-[15px] text-ink outline-none placeholder:text-ink-mute"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary h-12 shrink-0 px-7 py-0 sm:min-w-[132px]"
                >
                  Sign in
                </button>
              </div>
              {error ? (
                <p className="mt-2.5 font-sans text-[13px] font-medium text-[#c0362c]">{error}</p>
              ) : null}
            </form>

            <div
              ref={trustRef}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 opacity-0 sm:mt-11"
            >
              <div className="flex items-center gap-2 text-ink-soft">
                <ShieldCheck className="h-4 w-4 text-evergreen" strokeWidth={2} />
                <span className="font-sans text-[13px] sm:text-[13.5px]">
                  Paperless KYC · Start the same day
                </span>
              </div>
            </div>
          </div>

          <div ref={panelRef} className="w-full min-w-0 opacity-0">
            <PhoneUspShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
