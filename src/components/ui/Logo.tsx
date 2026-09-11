import { Radio } from "lucide-react";

interface LogoProps {
  showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps) {
  return (
    <div className="group flex items-center gap-2.5">
      <div
        className="
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-xl
          border border-[#FFD400]/20
          bg-[#FFD400]
          text-black
          shadow-[0_4px_18px_rgba(255,212,0,0.10)]
          transition-all duration-200 ease-out
          group-hover:shadow-[0_5px_22px_rgba(255,212,0,0.16)]
          group-hover:scale-[1.03]
        "
      >
        <Radio
          size={19}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:rotate-[-6deg]"
        />
      </div>

      {showText && (
        <span
          className="
            text-[17px]
            font-semibold
            tracking-[-0.02em]
            text-white
            transition-colors duration-200
            group-hover:text-white/90
          "
        >
          AutoTracky
        </span>
      )}
    </div>
  );
}