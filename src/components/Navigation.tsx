import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Why Nivya", href: "#why" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Questions", href: "#faq" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [showNavSignIn, setShowNavSignIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      start: 60,
      onUpdate: (self) => setScrolled(self.scroll() > 60),
    });

    // Show nav Sign in as the hero Sign in form scrolls up under the nav
    const signInTrigger = ScrollTrigger.create({
      trigger: "#hero-signin",
      start: "top 68px",
      onEnter: () => setShowNavSignIn(true),
      onLeaveBack: () => setShowNavSignIn(false),
    });

    return () => {
      scrollTrigger.kill();
      signInTrigger.kill();
    };
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll(".mobile-link");
      gsap.fromTo(
        links,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] h-[68px] transition-all duration-300",
          scrolled
            ? "bg-paper/85 backdrop-blur-xl border-b border-line shadow-nav"
            : "bg-transparent",
        )}
      >
        <div className="content-container h-full flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              alt="Nivya"
              className="h-8 w-auto"
            />
            <span className="font-display text-[22px] font-600 leading-none text-ink tracking-[-0.01em]">
              Nivya
            </span>
          </a>

          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="group relative font-sans text-[14.5px] font-medium text-ink-soft transition-colors duration-200 hover:text-ink cursor-pointer"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className={cn(
                "hidden md:inline-flex items-center justify-center rounded-full bg-evergreen px-5 py-2.5 font-sans text-[14px] font-semibold text-paper-raised shadow-[0_8px_20px_-12px_rgba(15,110,94,0.8)] transition-all duration-300 hover:bg-evergreen-deep",
                showNavSignIn
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0",
              )}
              tabIndex={showNavSignIn ? 0 : -1}
              aria-hidden={!showNavSignIn}
            >
              Sign in
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 cursor-pointer text-ink"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[999] bg-paper flex flex-col items-center justify-center gap-8"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="mobile-link font-display text-[30px] font-500 text-ink hover:text-evergreen transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          {showNavSignIn ? (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mobile-link mt-4 rounded-full bg-evergreen px-8 py-3.5 font-sans font-semibold text-paper-raised cursor-pointer"
            >
              Sign in
            </Link>
          ) : null}
        </div>
      )}
    </>
  );
}
