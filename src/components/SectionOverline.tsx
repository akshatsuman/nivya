import { cn } from "@/lib/utils";

interface SectionOverlineProps {
  text: string;
  light?: boolean;
  align?: "left" | "center";
}

export default function SectionOverline({
  text,
  light = false,
  align = "center",
}: SectionOverlineProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        align === "center" ? "justify-center" : "justify-start"
      )}
    >
      <span className="inline-block h-[6px] w-[6px] rotate-45 bg-gold" />
      <span
        className={cn(
          "font-mono text-[11.5px] uppercase tracking-[0.18em]",
          light ? "text-gold-soft" : "text-ink-mute"
        )}
      >
        {text}
      </span>
    </div>
  );
}
