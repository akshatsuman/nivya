import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  large?: boolean;
  accent?: "evergreen" | "gold";
  children?: React.ReactNode;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  large = false,
  accent = "evergreen",
  children,
}: FeatureCardProps) {
  const chip =
    accent === "gold"
      ? "bg-gold/10 text-gold ring-gold/20"
      : "bg-evergreen/8 text-evergreen ring-evergreen/14";

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-large border border-line bg-paper-raised p-7 md:p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-line-strong",
        large && "md:p-10",
        className
      )}
    >
      <div
        className={cn(
          "mb-6 flex h-12 w-12 items-center justify-center rounded-medium ring-1 transition-transform duration-300 group-hover:scale-105",
          chip,
          large && "h-14 w-14"
        )}
      >
        <Icon className={large ? "h-7 w-7" : "h-6 w-6"} strokeWidth={1.6} />
      </div>

      <h3
        className={cn(
          "mb-2.5 text-ink",
          large
            ? "font-display text-[27px] font-500 leading-tight"
            : "font-sans text-h3 font-600"
        )}
      >
        {title}
      </h3>
      <p className="font-sans text-[14.5px] leading-relaxed text-ink-soft">
        {description}
      </p>
      {children}
    </div>
  );
}
