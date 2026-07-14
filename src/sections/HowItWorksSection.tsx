import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileCheck2, Target, CalendarCheck } from "lucide-react";
import SectionOverline from "@/components/SectionOverline";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    no: "01",
    icon: FileCheck2,
    title: "Finish KYC in minutes",
    body: "Verify with Aadhaar and PAN. It is paperless and usually takes a few minutes.",
  },
  {
    no: "02",
    icon: Target,
    title: "Pick a goal or a fund",
    body: "Match funds to a goal, or pick a scheme yourself.",
  },
  {
    no: "03",
    icon: CalendarCheck,
    title: "Set up and continue",
    body: "Choose the date and amount. We run the SIP and send statements.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        },
      );
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 84%", once: true },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={sectionRef} className="w-full bg-paper-deep section-y">
      <div className="content-container">
        <div ref={headingRef} className="mx-auto w-full max-w-2xl text-center">
          <div className="opacity-0">
            <SectionOverline text="How it works" align="center" />
          </div>
          <h2 className="mt-4 font-display text-h1 text-h1-mobile md:text-h1 text-ink opacity-0">
            Three steps to get started.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-large border border-line bg-line sm:mt-14 md:grid-cols-3"
        >
          {steps.map(({ no, icon: Icon, title, body }) => (
            <div key={no} className="bg-paper-raised p-8 md:p-9">
              <div className="flex items-center justify-between">
                <span className="font-display text-[40px] font-500 leading-none text-gold">
                  {no}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-medium bg-evergreen/8 ring-1 ring-evergreen/12">
                  <Icon className="h-5 w-5 text-evergreen" strokeWidth={1.6} />
                </span>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-500 text-ink">{title}</h3>
              <p className="mt-2.5 font-sans text-[14.5px] leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
