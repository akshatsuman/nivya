import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  numericValue: number;
  label: string;
  sublabel?: string;
}

export default function StatCard({
  icon: Icon,
  prefix = "",
  suffix = "",
  numericValue,
  label,
  sublabel,
}: StatCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1700;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericValue));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, numericValue]);

  const displayValue = `${prefix}${(hasAnimated ? count : 0).toLocaleString("en-IN")}${suffix}`;

  return (
    <div
      ref={ref}
      className="group relative h-full overflow-hidden rounded-large border border-line bg-paper-raised p-6 md:p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-line-strong"
    >
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-evergreen to-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-medium bg-evergreen/8 ring-1 ring-evergreen/12">
        <Icon className="text-evergreen" strokeWidth={1.6} size={21} />
      </div>

      <span className="block whitespace-nowrap font-mono text-[31px] md:text-[35px] font-600 leading-none text-ink">
        {displayValue}
      </span>
      <span className="mt-3 block font-sans text-[15px] font-600 text-ink">{label}</span>
      {sublabel && (
        <span className="mt-1 block font-sans text-[13.5px] text-ink-mute">{sublabel}</span>
      )}
    </div>
  );
}
