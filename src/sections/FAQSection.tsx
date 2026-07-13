import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionOverline from "@/components/SectionOverline";
import FAQItem from "@/components/FAQItem";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Does Nivya offer direct or regular plans?",
    answer:
      "Only direct plans. Fund houses pay us no commission, so your expense ratio stays low. We charge a flat platform fee instead — shown in full before you invest.",
  },
  {
    question: "Where does my money actually sit?",
    answer:
      "With the fund house, never with Nivya. Orders settle through BSE StarMF and units are allotted in your own name. The same holdings appear in your Consolidated Account Statement from CAMS and KFintech.",
  },
  {
    question: "What does Nivya cost me?",
    answer:
      "A flat platform fee, billed transparently — never a slice of your returns and never a fund commission. You'll see the exact figure before confirming anything.",
  },
  {
    question: "Can I bring my existing funds in?",
    answer:
      "Yes. Import holdings from other platforms to see everything in one folio view, track an honest XIRR, and pull a single consolidated statement. Your running SIPs carry on uninterrupted.",
  },
  {
    question: "Is there a real person I can ask?",
    answer:
      "Always. Every investor can reach SEBI-registered advisers over chat or a scheduled call. They answer your questions — they don't push products at you.",
  },
  {
    question: "What can I do besides start a SIP?",
    answer:
      "Invest a lump sum, pause or step up an SIP, switch schemes, redeem units, or set up STPs and SWPs — all from the same dashboard.",
  },
  {
    question: "How quickly can I start?",
    answer:
      "KYC is paperless via Aadhaar and PAN and usually takes a few minutes. Once you're verified, your first SIP or lump sum can go in the same day.",
  },
  {
    question: "Are returns guaranteed?",
    answer:
      "No. Mutual funds carry market risk and returns vary from year to year. The calculators here are illustrations, not promises — which is exactly why we lean on long horizons and steady contributions.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: listRef.current, start: "top 85%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="w-full bg-paper py-section md:py-section">
      <div className="mx-auto max-w-[800px] px-6">
        <div ref={headingRef} className="mb-14 text-center">
          <div className="flex justify-center opacity-0">
            <SectionOverline text="Common questions" />
          </div>
          <h2 className="mt-3 font-display text-h1 text-h1-mobile md:text-h1 text-ink opacity-0">
            The things people ask first
          </h2>
        </div>

        <div ref={listRef} className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="opacity-0">
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
