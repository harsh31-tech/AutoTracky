import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-medium text-white/55">
        {label}
      </label>

      <input
        className={`
          w-full
          rounded-xl
          border border-white/[0.10]
          bg-white/[0.035]
          px-4 py-3
          text-sm
          text-white
          outline-none
          placeholder:text-white/25
          shadow-[0_4px_20px_rgba(0,0,0,0.08)]
          transition-all duration-200 ease-out

          hover:border-white/[0.16]
          hover:bg-white/[0.045]

          focus:border-[#FFD400]/45
          focus:bg-white/[0.055]
          focus:ring-2
          focus:ring-[#FFD400]/[0.08]

          disabled:cursor-not-allowed
          disabled:opacity-50

          ${className}
        `}
        {...props}
      />
    </div>
  );
}