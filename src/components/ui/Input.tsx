import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-white/70">
        {label}
      </label>

      <input
        className={`
          w-full rounded-xl
          border border-white/10
          bg-white/[0.04]
          px-4 py-3
          text-sm text-white
          outline-none
          placeholder:text-white/30
          transition
          focus:border-[#FFD400]/50
          focus:bg-white/[0.06]
          ${className}
        `}
        {...props}
      />
    </div>
  );
}