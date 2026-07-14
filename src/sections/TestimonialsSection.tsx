import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionOverline from "@/components/SectionOverline";
import TestimonialCard from "@/components/TestimonialCard";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "I can see why a fund ranks: expense, consistency, and category returns. No one is pushing a product.",
    name: "Meera Krishnan",
    detail: "SIP investor · Bengaluru",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote:
      "I manage SIPs and STPs in one place. The portfolio statement is what I share with my CA.",
    name: "Rohan Sethi",
    detail: "Goal-based investing · Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote:
      "Regular plans, clear details, and a chat that will not give advice when I ask for it.",
    name: "Ananya Rao",
    detail: "First-time MF investor · Hyderabad",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full bg-paper-deep section-y"
    >
      <div className="content-container">
        <div ref={headingRef} className="mx-auto mb-10 w-full max-w-2xl text-center sm:mb-12">
          <div className="opacity-0">
            <SectionOverline text="Investor feedback" align="center" />
          </div>
          <h2 className="mt-4 font-display text-h1 text-h1-mobile md:text-h1 text-ink opacity-0">
            What investors notice.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <div key={t.name} className="h-full opacity-0">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
