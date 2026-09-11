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
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-white/40">
            YOUR BLE ID
          </p>

          <div className="mt-4 flex items-center gap-2">
            <Bluetooth
              size={18}
              className="text-[#FFD400]"
            />

            <span className="font-mono text-lg font-medium tracking-wide">
              {bleId}
            </span>
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD400]/10">
          <Bluetooth
            size={19}
            className="text-[#FFD400]"
          />
        </div>
      </div>

      {/* Copy */}
      <button
        onClick={handleCopy}
        className="mt-6 flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
      >
        {copied ? (
          <>
            <Check size={15} />
            Copied
          </>
        ) : (
          <>
            <Copy size={15} />
            Copy BLE ID
          </>
        )}
      </button>

      {/* Divider */}
      <div className="my-6 h-px bg-white/10" />

      {/* Status */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/40">
            BLE advertising
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isActive
                  ? "bg-green-400"
                  : "bg-white/20"
              }`}
            />

            <span className="text-sm font-medium">
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <button
          onClick={handleActivate}
          className={`
            flex items-center gap-2 rounded-xl px-4 py-2.5
            text-sm font-medium transition
            ${
              isActive
                ? "border border-white/10 bg-white/[0.05] text-white/70 hover:bg-white/[0.08]"
                : "bg-[#FFD400] text-black hover:bg-[#FFE04A]"
            }
          `}
        >
          <Power size={15} />

          {isActive ? "Deactivate" : "Activate BLE"}
        </button>
      </div>
    </div>
  );
}