import { useEffect, useState } from "react";
import {
  BusFront,
  Radio,
  Signal,
} from "lucide-react";

import { listenToUserDetections } from "../../services/detectionService";

import type { Detection } from "../../types";

interface DetectionHistoryProps {
  bleId: string;
}

export default function DetectionHistory({
  bleId,
}: DetectionHistoryProps) {
  const [detections, setDetections] = useState<
    Detection[]
  >([]);

  useEffect(() => {
    const unsubscribe =
      listenToUserDetections(
        bleId,
        (data) => {
          setDetections(data);
        }
      );

    return unsubscribe;
  }, [bleId]);

  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-medium tracking-[0.16em] text-white/40">
          RECENT DETECTIONS
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          Your journey history
        </h2>
      </div>

      {detections.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {detections.map((detection) => (
            <DetectionItem
              key={detection.id}
              detection={detection}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
        <Radio
          size={20}
          className="text-white/30"
        />
      </div>

      <h3 className="mt-5 text-base font-medium">
        No detections yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/35">
        When an AutoTracky scanner detects your BLE ID
        during your journey, your detection history will
        appear here.
      </p>
    </div>
  );
}

function DetectionItem({
  detection,
}: {
  detection: Detection;
}) {
  const date = new Date(detection.timestamp);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        {/* Vehicle */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFD400]/10">
            <BusFront
              size={19}
              className="text-[#FFD400]"
            />
          </div>

          <div>
            <p className="font-medium">
              {detection.vehicleId}
            </p>

            <p className="mt-1 text-xs text-white/35">
              ESP32: {detection.esp32Id}
            </p>
          </div>
        </div>

        {/* Time */}
        <p className="shrink-0 text-xs text-white/35">
          {formatDate(date)}
        </p>
      </div>

      {/* Details */}
      <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
          <Signal
            size={14}
            className="text-white/40"
          />

          <span className="text-xs text-white/50">
            RSSI
          </span>

          <span className="font-mono text-xs text-white/80">
            {detection.rssi} dBm
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
          <Radio
            size={14}
            className="text-white/40"
          />

          <span className="text-xs text-white/50">
            BLE
          </span>

          <span className="font-mono text-xs text-white/80">
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