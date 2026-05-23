import { cn } from "@/lib/utils";
import Link from "next/link";

type Variant = "gold" | "emerald" | "sky" | "navy" | "ghost-white" | "ghost-sky" | "ghost-emerald" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  gold:
    "bg-gold text-white hover:bg-gold-light border border-gold font-semibold",
  emerald:
    "bg-sky-700 text-white hover:bg-sky-500 border border-sky-700 font-semibold",
  sky:
    "bg-sky-700 text-white hover:bg-sky-500 border border-sky-700 font-semibold",
  navy:
    "bg-navy text-white hover:bg-navy/80 border border-navy font-semibold",
  "ghost-white":
    "bg-transparent text-white hover:bg-white/10 border border-white/60 font-medium",
  "ghost-sky":
    "bg-transparent text-sky-700 hover:bg-sky-50 border border-sky-500 font-medium",
  "ghost-emerald":
    "bg-transparent text-sky-700 hover:bg-sky-50 border border-sky-500 font-medium",
  outline:
    "bg-transparent text-navy hover:bg-navy hover:text-white border border-navy font-medium",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-sm tracking-wide",
  md: "px-8 py-3 text-sm tracking-widest",
  lg: "px-10 py-4 text-base tracking-widest",
};

export function Button({
  variant = "sky",
  size = "md",
  href,
  external,
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-none uppercase transition-all duration-300",
    "cursor-pointer select-none",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
