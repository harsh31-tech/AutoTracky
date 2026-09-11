import { useState } from "react";
import {
  Bluetooth,
  Check,
  Copy,
  Power,
} from "lucide-react";

interface BleCardProps {
  bleId: string;
}

export default function BleCard({
  bleId,
}: BleCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bleId);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }

  function handleActivate() {
    setIsActive((previous) => !previous);
  }

  return (
    <div
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-white/[0.09]
        bg-white/[0.025]
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        sm:p-7
      "
    >
      {/* Subtle BLE accent */}
      <div
        className="
          pointer-events-none absolute
          -right-20 -top-20
          h-48 w-48
          rounded-full
          bg-[#FFD400]/[0.045]
          blur-3xl
        "
      />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />

            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35">
              YOUR BLE ID
            </p>
          </div>

          {/* BLE ID */}
          <div
            className="
              mt-5
              flex min-w-0 items-center gap-3
              rounded-2xl
              border border-white/[0.08]
              bg-black/20
              px-4 py-3.5
            "
          >
            <Bluetooth
              size={18}
              strokeWidth={2}
              className="shrink-0 text-[#FFD400]"
            />

            <span
              className="
                min-w-0
                truncate
                font-mono
                text-base
                font-medium
                tracking-[0.08em]
                text-white
                sm:text-lg
              "
            >
              {bleId}
            </span>
          </div>
        </div>

        {/* Bluetooth icon */}
        <div
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-xl
            border border-[#FFD400]/10
            bg-[#FFD400]/[0.06]
          "
        >
          <Bluetooth
            size={19}
            strokeWidth={2}
            className="text-[#FFD400]"
          />
        </div>
      </div>

      {/* Copy */}
      <button
        onClick={handleCopy}
        className="
          group mt-4
          inline-flex items-center gap-2
          rounded-lg
          px-1 py-1
          text-xs font-medium
          text-white/35
          transition-all duration-200
          hover:text-white/80
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#FFD400]/30
        "
      >
        {copied ? (
          <>
            <Check
              size={14}
              className="text-[#FFD400]"
            />
            <span className="text-[#FFD400]">
              Copied
            </span>
          </>
        ) : (
          <>
            <Copy
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-px"
            />
            Copy BLE ID
          </>
        )}
      </button>

      {/* Divider */}
      <div className="my-6 h-px bg-white/[0.07]" />

      {/* Status */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-white/35">
            BLE advertising
          </p>

          <div className="mt-2 flex items-center gap-2.5">
            <span
              className={`
                relative flex h-2 w-2
                rounded-full
                ${
                  isActive
                    ? "bg-emerald-400"
                    : "bg-white/20"
                }
              `}
            >
              {isActive && (
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
              )}
            </span>

            <span className="text-sm font-medium text-white/80">
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Activate button */}
        <button
          onClick={handleActivate}
          className={`
            inline-flex
            items-center justify-center
            gap-2
            rounded-xl
            px-4 py-2.5
            text-sm font-semibold
            transition-all duration-200
            ease-out
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#FFD400]/40
            active:scale-[0.98]

            ${
              isActive
                ? `
                  border border-white/[0.10]
                  bg-white/[0.035]
                  text-white/70
                  hover:border-white/[0.16]
                  hover:bg-white/[0.07]
                  hover:text-white
                `
                : `
                  bg-[#FFD400]
                  text-black
                  shadow-[0_4px_18px_rgba(255,212,0,0.08)]
                  hover:bg-[#FFE04A]
                  hover:shadow-[0_6px_24px_rgba(255,212,0,0.14)]
                `
            }
          `}
        >
          <Power size={15} strokeWidth={2.3} />

          {isActive ? "Deactivate" : "Activate BLE"}
        </button>
      </div>
    </div>
  );
}