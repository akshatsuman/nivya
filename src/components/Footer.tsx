import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Twitter, Instagram, Facebook, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const investLinks = ["Mutual funds", "SIPs", "Goal planning", "Fund explorer", "SIP calculator", "Portfolio health check"];
const companyLinks = ["About Nivya", "How we make money", "Press", "Careers", "Contact"];
const legalLinks = ["Terms of use", "Privacy policy", "Regulatory disclosures", "Grievance redressal", "Scheme documents"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (columnsRef.current) {
        gsap.fromTo(
          columnsRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
          }
        );
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const linkClasses =
    "font-sans text-[14px] text-paper/55 hover:text-paper transition-all duration-200 hover:translate-x-1 inline-block cursor-pointer";

  return (
    <footer ref={footerRef} className="w-full bg-ink pt-20 pb-12 text-paper">
      <div className="content-container mb-16">
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, #B4925A 30%, #1AA08C 70%, transparent)" }}
        />
      </div>

      <div className="content-container">
        <div ref={columnsRef} className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="opacity-0 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-2 w-2 rotate-45 bg-gold" />
              <h3 className="font-display text-[26px] font-500 tracking-[-0.01em] text-paper">Nivya</h3>
            </div>
            <p className="mt-3 font-sans text-[14px] font-600 tracking-[0.01em] text-gold-soft">
              Wealth, made simple.
            </p>
            <p className="mt-4 max-w-[280px] font-sans text-[14.5px] leading-relaxed text-paper/55">
              A calmer, more transparent way to invest in mutual funds across
              India. Patient money, tended well.
            </p>
            <Link
              to="/login"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-evergreen px-6 py-3 font-sans text-[14px] font-semibold text-paper-raised transition-colors hover:bg-teal cursor-pointer"
            >
              Log in
            </Link>
          </div>

          {/* Invest */}
          <div className="opacity-0">
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-soft">Invest</h4>
            <ul className="space-y-3">
              {investLinks.map((l) => (
                <li key={l}><span className={linkClasses}>{l}</span></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="opacity-0">
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-soft">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l}><span className={linkClasses}>{l}</span></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="opacity-0">
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-soft">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <li key={l}><span className={linkClasses}>{l}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk disclaimer */}
        <div className="mt-16 rounded-medium border border-paper/10 bg-paper/[0.03] px-5 py-4">
          <p className="font-sans text-[12.5px] leading-relaxed text-paper/45">
            Mutual fund investments are subject to market risks. Read all
            scheme-related documents carefully before investing. Past performance
            is not indicative of future returns. Figures and projections shown on
            this page are illustrative only.
          </p>
        </div>

        {/* Pre-launch disclaimer (mandatory) */}
        <div className="mt-6 rounded-medium border border-gold/20 bg-gold/[0.04] px-5 py-4">
          <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-soft">
            Disclaimer
          </p>
          <p className="font-sans text-[12.5px] leading-relaxed text-paper/55">
            Nivya is currently in development. The content, designs, features,
            calculators, and product previews displayed on this website are
            intended for demonstration, visualisation, and experience purposes
            only. The complete product and services will be launched soon.
            Nothing on this website should be considered financial advice, an
            offer, or a commitment to provide financial products or services at
            this stage.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-paper/10 pt-8 md:flex-row">
          <p className="order-1 text-center font-sans text-[13px] text-paper/40 md:text-left">
            © 2026 Nivya Wealth Technologies Pvt. Ltd.
          </p>

          <div className="order-2 flex items-center gap-5">
            <a
              href="https://www.instagram.com/nivyanow/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nivya on Instagram"
              className="text-paper/50 transition-colors hover:text-paper"
            >
              <Instagram size={19} />
            </a>
            <a
              href="https://x.com/nivyanow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nivya on X (formerly Twitter)"
              className="text-paper/50 transition-colors hover:text-paper"
            >
              <Twitter size={19} />
            </a>
            <a
              href="https://www.linkedin.com/company/nivyanow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nivya on LinkedIn"
              className="text-paper/50 transition-colors hover:text-paper"
            >
              <Linkedin size={19} />
            </a>
            <a
              href="https://www.facebook.com/nivyanow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nivya on Facebook"
              className="text-paper/50 transition-colors hover:text-paper"
            >
              <Facebook size={19} />
            </a>
          </div>

          <div className="order-3 flex items-center gap-2">
            <ShieldCheck size={14} className="text-gold-soft" />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/40">
              AMFI ARN-218104
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
