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
        "overflow-hidden rounded-[10px] bg-paper-deep/70 transition-colors duration-300",
        isOpen && "bg-paper-deep",
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:px-6 sm:py-[18px]"
      >
        <span className="font-sans text-[15px] font-600 leading-snug text-ink sm:text-[15.5px]">
          {question}
        </span>
        <Plus
          className={cn(
            "h-[18px] w-[18px] shrink-0 text-ink transition-transform duration-300",
            isOpen && "rotate-45 text-evergreen",
          )}
          strokeWidth={1.75}
        />
      </button>
      <div
        ref={contentRef}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 sm:px-6 sm:pb-5">
            <p className="font-sans text-[14.5px] leading-relaxed text-ink-soft">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
