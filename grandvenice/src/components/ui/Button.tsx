import { cn } from "@/lib/utils";
import Link from "next/link";

type Variant = "gold" | "emerald" | "ghost-white" | "ghost-emerald" | "outline";
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
    "bg-gold text-emerald-dark hover:bg-gold-light border border-gold font-semibold",
  emerald:
    "bg-emerald text-white hover:bg-emerald-dark border border-emerald font-semibold",
  "ghost-white":
    "bg-transparent text-white hover:bg-white/10 border border-white/60 font-medium",
  "ghost-emerald":
    "bg-transparent text-emerald hover:bg-emerald/5 border border-emerald font-medium",
  outline:
    "bg-transparent text-emerald-dark hover:bg-emerald-dark hover:text-white border border-emerald-dark font-medium",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-sm tracking-wide",
  md: "px-8 py-3 text-sm tracking-widest",
  lg: "px-10 py-4 text-base tracking-widest",
};

export function Button({
  variant = "emerald",
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
