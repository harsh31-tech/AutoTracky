import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]/50 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-[#FFD400] text-black shadow-[0_4px_18px_rgba(255,212,0,0.08)] hover:bg-[#FFE04A] hover:shadow-[0_6px_24px_rgba(255,212,0,0.14)] active:scale-[0.98]",

    secondary:
      "border border-white/[0.10] bg-white/[0.035] text-white/80 hover:border-white/[0.16] hover:bg-white/[0.07] hover:text-white active:scale-[0.98]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}