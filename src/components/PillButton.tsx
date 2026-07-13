import { cn } from "@/lib/utils";

interface PillButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function PillButton({
  children,
  variant = "primary",
  onClick,
  className,
  href,
}: PillButtonProps) {
  const classes = cn(
    variant === "primary" ? "btn-primary" : "btn-ghost",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
