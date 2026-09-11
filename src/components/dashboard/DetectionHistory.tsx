import { useEffect, useState } from "react";
import { BusFront, MoreVertical, Radio, Signal } from "lucide-react";

import { listenToUserDetections } from "../../services/detectionService";

import type { Detection } from "../../types";

import LostItemForm from "../LostItemForm";

interface DetectionHistoryProps {
  bleId: string;
  passengerId: string;
}

export default function DetectionHistory({
  bleId,
  passengerId,
}: DetectionHistoryProps) {
  const [detections, setDetections] = useState<Detection[]>([]);

  const [selectedRide, setSelectedRide] = useState<Detection | null>(null);

  useEffect(() => {
    if (!bleId) {
      return;
    }

    const unsubscribe = listenToUserDetections(bleId, (data) => {
      setDetections(data);
    });

    return unsubscribe;
  }, [bleId]);

  return (
    <>
      <section>
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />

            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35">
              RECENT DETECTIONS
            </p>
          </div>

          <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
            Your journey history
          </h2>

          <p className="mt-1.5 text-sm text-white/35">
            A record of vehicles that detected your BLE identity.
          </p>
        </div>

        {detections.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {detections.map((detection) => (
              <DetectionItem
                key={detection.id}
                detection={detection}
                onReportLost={() => setSelectedRide(detection)}
              />
            ))}
          </div>
        )}
      </section>

      {/* LOST ITEM FORM */}

      {selectedRide && (
        <>
          <pre className="text-white">
            {JSON.stringify(selectedRide, null, 2)}
          </pre>

          <LostItemForm
            ride={selectedRide}
            passengerId={passengerId}
            onClose={() => setSelectedRide(null)}
          />
        </>
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[26px]
        border border-white/[0.08]
        bg-white/[0.02]
        px-6 py-14
        text-center
        sm:py-16
      "
    >
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-0
          h-32 w-32
          -translate-x-1/2
          rounded-full
          bg-[#FFD400]/[0.025]
          blur-3xl
        "
      />

      <div
        className="
          relative mx-auto
          flex h-12 w-12
          items-center justify-center
          rounded-2xl
          border border-white/[0.09]
          bg-white/[0.025]
        "
      >
        <Radio size={20} strokeWidth={1.8} className="text-white/25" />
      </div>

      <h3 className="relative mt-5 text-base font-semibold text-white/80">
        No detections yet
      </h3>

      <p className="relative mx-auto mt-2 max-w-sm text-sm leading-6 text-white/30">
        When an AutoTracky scanner detects your BLE ID during your journey, your
        detection history will appear here.
      </p>

      <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />

        <span className="text-[10px] font-medium tracking-[0.12em] text-white/25">
          WAITING FOR DETECTION
        </span>
      </div>
    </div>
  );
}

function DetectionItem({
  detection,
  onReportLost,
}: {
  detection: Detection;
  onReportLost: () => void;
}) {
  const date = new Date(detection.timestamp);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="
        group
        relative overflow-visible
        rounded-[22px]
        border border-white/[0.08]
        bg-white/[0.02]
        p-4
        transition-all duration-200 ease-out

        hover:border-white/[0.13]
        hover:bg-white/[0.035]

        sm:p-5
      "
    >
      {/* Left accent */}

      <div
        className="
          absolute left-0 top-5 bottom-5
          w-0.5
          rounded-r-full
          bg-[#FFD400]/20
          transition-colors duration-200
          group-hover:bg-[#FFD400]/50
        "
      />

      {/* Main row */}

      <div className="flex items-start justify-between gap-3 sm:gap-5">
        {/* Vehicle */}

        <div className="flex min-w-0 items-center gap-3.5 sm:gap-4">
          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl
              border border-[#FFD400]/10
              bg-[#FFD400]/[0.055]
              transition-colors duration-200
              group-hover:bg-[#FFD400]/[0.08]
            "
          >
            <BusFront size={19} strokeWidth={1.9} className="text-[#FFD400]" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white/85 sm:text-[15px]">
              {detection.vehicleId}
            </p>

            <p className="mt-1 truncate text-xs text-white/30">
              Scanner · {detection.esp32Id}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex shrink-0 items-start gap-3">
          {/* Time */}

          <div className="text-right">
            <p className="text-[11px] font-medium text-white/40 sm:text-xs">
              {formatDate(date)}
            </p>

            <p className="mt-1 hidden text-[10px] text-white/20 sm:block">
              DETECTED
            </p>
          </div>

          {/* MENU */}

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label="Ride options"
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                border border-white/[0.07]
                bg-white/[0.02]
                text-white/35
                transition

                hover:border-white/[0.12]
                hover:bg-white/[0.05]
                hover:text-white/70
              "
            >
              <MoreVertical size={17} />
            </button>

            {menuOpen && (
              <>
                {/* Close menu when clicking outside */}

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="fixed inset-0 z-30 h-full w-full cursor-default"
                />

                <div
                  className="
                    absolute right-0 top-10 z-40
                    w-48
                    overflow-hidden
                    rounded-xl
                    border border-white/10
                    bg-[#101010]
                    p-1
                    shadow-2xl
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onReportLost();
                    }}
                    className="
                      flex w-full items-center
                      rounded-lg
                      px-3 py-2.5
                      text-left
                      text-xs font-medium
                      text-white/65
                      transition

                      hover:bg-[#FFD400]/[0.08]
                      hover:text-[#FFD400]
                    "
                  >
                    Report Lost Item
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Details */}

      <div
        className="
          mt-4
          flex flex-wrap
          gap-2
          border-t border-white/[0.07]
          pt-4
        "
      >
        {/* RSSI */}

        <div
          className="
            inline-flex items-center gap-2
            rounded-lg
            border border-white/[0.06]
            bg-white/[0.025]
            px-3 py-2
          "
        >
          <Signal size={13} strokeWidth={2} className="text-white/30" />

          <span className="text-[11px] text-white/35">RSSI</span>

          <span className="font-mono text-[11px] font-medium text-white/70">
            {detection.rssi} dBm
          </span>
        </div>

        {/* BLE */}

        <div
          className="
            inline-flex items-center gap-2
            rounded-lg
            border border-white/[0.06]
            bg-white/[0.025]
            px-3 py-2
          "
        >
          <Radio size={13} strokeWidth={2} className="text-[#FFD400]/60" />

          <span className="text-[11px] text-white/35">BLE</span>

          <span className="text-[11px] font-medium text-white/65">
            Detected
          </span>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
