import { useRef } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-medium border bg-paper-raised transition-all duration-300",
        isOpen ? "border-line-strong" : "border-line hover:border-line-strong"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between rounded-medium px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <span className="pr-4 font-sans text-[16px] font-600 text-ink">{question}</span>
        <Plus
          className={cn(
            "h-5 w-5 flex-shrink-0 text-evergreen transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        />
      </button>
      <div
        ref={contentRef}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-0">
            <div className="border-t border-line pt-4">
              <p className="font-sans text-[15px] leading-relaxed text-ink-soft">{answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
