import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQItem from "@/components/FAQItem";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Does Nivya offer Direct or Regular plans?",
    answer: "Regular plans only. Fees are shown clearly before you invest.",
  },
  {
    question: "Where does my money sit?",
    answer:
      "With the fund house, not with Nivya. Orders go through BSE StarMF and units are allotted in your name. You can also see them in your CAS from CAMS or KFintech.",
  },
  {
    question: "What does Nivya cost?",
    answer: "A flat platform fee. You see the exact amount before you confirm.",
  },
  {
    question: "Can I bring my existing funds in?",
    answer:
      "Yes. Import holdings from other platforms to view them together, track XIRR, and download one statement. Running SIPs continue as usual.",
  },
  {
    question: "Can I talk to a real person?",
    answer: "Yes. You can chat or book a call. They answer questions and do not push products.",
  },
  {
    question: "What else can I do besides start a SIP?",
    answer:
      "Invest a lump sum, pause or step up an SIP, switch schemes, redeem units, or set up STPs and SWPs from the same dashboard.",
  },
  {
    question: "How quickly can I start?",
    answer:
      "KYC uses Aadhaar and PAN and usually takes a few minutes. After that, you can start a SIP or lump sum the same day.",
  },
  {
    question: "Are returns guaranteed?",
    answer: "No. Mutual funds carry market risk. Numbers on this site are examples, not promises.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
        },
      );
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: listRef.current, start: "top 85%", once: true },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="w-full bg-paper section-y">
      <div className="content-container">
        <div ref={headingRef} className="mb-10 text-center sm:mb-12">
          <h2 className="font-display text-h1 text-h1-mobile md:text-h1 text-ink opacity-0">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-[420px] font-sans text-[15.5px] text-ink-soft opacity-0">
            Your mutual fund queries, answered.
          </p>
        </div>

        <div ref={listRef} className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="h-fit opacity-0">
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
