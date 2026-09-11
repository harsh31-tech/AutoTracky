import { Radio } from "lucide-react";

interface LogoProps {
  showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFD400] text-black">
        <Radio size={19} strokeWidth={2.5} />
      </div>

      {showText && (
        <span className="text-lg font-semibold tracking-tight text-white">
          AutoTracky
        </span>
      )}
    </div>
  );
}
