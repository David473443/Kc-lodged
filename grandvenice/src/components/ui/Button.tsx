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
    "bg-gold text-white border border-gold font-semibold hover:bg-gold-light hover:border-gold-light hover:shadow-[0_8px_28px_rgba(184,134,11,0.35)] hover:-translate-y-px active:translate-y-0",
  emerald:
    "bg-sky-700 text-white border border-sky-700 font-semibold hover:bg-sky-500 hover:border-sky-500 hover:shadow-[0_8px_28px_rgba(26,111,168,0.40)] hover:-translate-y-px active:translate-y-0",
  sky:
    "bg-sky-700 text-white border border-sky-700 font-semibold hover:bg-sky-500 hover:border-sky-500 hover:shadow-[0_8px_28px_rgba(26,111,168,0.40)] hover:-translate-y-px active:translate-y-0",
  navy:
    "bg-navy text-white border border-navy font-semibold hover:bg-navy/85 hover:shadow-[0_8px_28px_rgba(15,43,64,0.40)] hover:-translate-y-px active:translate-y-0",
  "ghost-white":
    "bg-transparent text-white border border-white/60 font-medium hover:bg-white/12 hover:border-white hover:-translate-y-px active:translate-y-0",
  "ghost-sky":
    "bg-transparent text-sky-700 border border-sky-500 font-medium hover:bg-sky-700 hover:text-white hover:border-sky-700 hover:-translate-y-px active:translate-y-0",
  "ghost-emerald":
    "bg-transparent text-sky-700 border border-sky-500 font-medium hover:bg-sky-700 hover:text-white hover:border-sky-700 hover:-translate-y-px active:translate-y-0",
  outline:
    "bg-transparent text-navy border border-navy font-medium hover:bg-navy hover:text-white hover:-translate-y-px active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[11px] tracking-[0.2em]",
  md: "px-8 py-3.5 text-[11px] tracking-[0.25em]",
  lg: "px-12 py-4.5 text-[11px] tracking-[0.28em]",
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
