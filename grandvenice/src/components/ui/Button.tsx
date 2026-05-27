import { cn } from "@/lib/utils";
import Link from "next/link";

type Variant =
  | "gold"
  | "gold-outline"
  | "ivory"
  | "dark"
  | "emerald"
  | "sky"
  | "navy"
  | "ghost-white"
  | "ghost-sky"
  | "ghost-emerald"
  | "outline";
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
  /** Primary: antique gold fill — on dark backgrounds */
  gold:
    "bg-[#C9A64A] text-[#0E0C0A] border border-[#C9A64A] font-semibold hover:bg-[#E8D4A2] hover:border-[#E8D4A2] hover:shadow-[0_8px_32px_rgba(201,166,74,0.40)] hover:-translate-y-px active:translate-y-0",
  /** Outline gold — on dark backgrounds */
  "gold-outline":
    "bg-transparent text-[#C9A64A] border border-[#C9A64A] font-medium hover:bg-[#C9A64A] hover:text-[#0E0C0A] hover:shadow-[0_8px_32px_rgba(201,166,74,0.30)] hover:-translate-y-px active:translate-y-0",
  /** Ghost ivory — on dark backgrounds */
  ivory:
    "bg-transparent text-[#F7F3EC] border border-[#F7F3EC]/50 font-medium hover:bg-[#F7F3EC]/10 hover:border-[#F7F3EC] hover:-translate-y-px active:translate-y-0",
  /** Dark fill — on ivory/light backgrounds */
  dark:
    "bg-[#141210] text-[#E8E3DB] border border-[#141210] font-semibold hover:bg-[#1E1A17] hover:shadow-[0_8px_28px_rgba(0,0,0,0.40)] hover:-translate-y-px active:translate-y-0",
  /** Legacy aliases → gold */
  emerald:
    "bg-[#C9A64A] text-[#0E0C0A] border border-[#C9A64A] font-semibold hover:bg-[#E8D4A2] hover:border-[#E8D4A2] hover:shadow-[0_8px_32px_rgba(201,166,74,0.40)] hover:-translate-y-px active:translate-y-0",
  sky:
    "bg-[#C9A64A] text-[#0E0C0A] border border-[#C9A64A] font-semibold hover:bg-[#E8D4A2] hover:border-[#E8D4A2] hover:shadow-[0_8px_32px_rgba(201,166,74,0.40)] hover:-translate-y-px active:translate-y-0",
  navy:
    "bg-[#060C18] text-[#E8E3DB] border border-[#060C18] font-semibold hover:bg-[#0E0C0A] hover:shadow-[0_8px_28px_rgba(0,0,0,0.45)] hover:-translate-y-px active:translate-y-0",
  "ghost-white":
    "bg-transparent text-white border border-white/60 font-medium hover:bg-white/12 hover:border-white hover:-translate-y-px active:translate-y-0",
  "ghost-sky":
    "bg-transparent text-[#C9A64A] border border-[#C9A64A] font-medium hover:bg-[#C9A64A] hover:text-[#0E0C0A] hover:border-[#C9A64A] hover:-translate-y-px active:translate-y-0",
  "ghost-emerald":
    "bg-transparent text-[#C9A64A] border border-[#C9A64A] font-medium hover:bg-[#C9A64A] hover:text-[#0E0C0A] hover:border-[#C9A64A] hover:-translate-y-px active:translate-y-0",
  outline:
    "bg-transparent text-[#1A1614] border border-[#1A1614] font-medium hover:bg-[#1A1614] hover:text-[#F7F3EC] hover:-translate-y-px active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[11px] tracking-[0.2em]",
  md: "px-8 py-3.5 text-[11px] tracking-[0.25em]",
  lg: "px-12 py-4.5 text-[11px] tracking-[0.28em]",
};

export function Button({
  variant = "gold",
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
