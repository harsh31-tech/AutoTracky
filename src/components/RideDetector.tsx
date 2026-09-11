import { useEffect, useState } from "react";
import { Activity, Bell, CircleCheck, LoaderCircle } from "lucide-react";

import { findRide, listenToRide, type Ride } from "../firebase/rideService";

interface RideDetectorProps {
  deviceName: string;
}

export default function RideDetector({ deviceName }: RideDetectorProps) {
  const [ride, setRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!deviceName) {
      setError("Device name not assigned.");
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    async function initializeRide() {
      try {
        setLoading(true);
        setError("");

        // Find the ride using the stable device name
        const result = await findRide(deviceName);

        if (!result) {
          setError("Ride device not found.");
          return;
        }

        setRide(result);

        // Start realtime Firebase listener
        unsubscribe = listenToRide(deviceName, (updatedRide) => {
          setRide(updatedRide);
        });
      } catch (error) {
        console.error("Failed to initialize ride:", error);

        setError("Unable to connect to ride detection.");
      } finally {
        setLoading(false);
      }
    }

    initializeRide();

    return () => {
      unsubscribe?.();
    };
  }, [deviceName]);

  // Loading
  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
        <LoaderCircle size={18} className="animate-spin text-[#FFD400]" />

        <span className="text-sm text-white/40">
          Checking ride detection...
        </span>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="rounded-[28px] border border-red-400/10 bg-red-400/[0.03] p-6">
        <div className="flex items-center gap-3">
          <Activity size={18} className="text-red-400" />

          <div>
            <p className="text-sm font-medium text-white/80">
              Detection unavailable
            </p>

            <p className="mt-1 text-xs text-white/35">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ride) {
    return null;
  }

  const detected = ride.detected === true;

  return (
    <div
      className={`
        relative overflow-hidden rounded-[28px]
        border p-6 sm:p-7
        ${
          detected
            ? "border-[#FFD400]/20 bg-[#FFD400]/[0.04]"
            : "border-white/10 bg-white/[0.025]"
        }
      `}
    >
      {/* Glow when ride is detected */}
      {detected && (
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#FFD400]/10 blur-3xl" />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl border
              ${
                detected
                  ? "border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]"
                  : "border-white/10 bg-white/[0.04] text-white/40"
              }
            `}
          >
            {detected ? <Bell size={19} /> : <Activity size={19} />}
          </div>

          {/* Text */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] text-white/35">
              RIDE DETECTION
            </p>

            <h2 className="mt-1.5 text-lg font-semibold text-white">
              {detected ? "Ride detected" : "Waiting for ride"}
            </h2>

            <p className="mt-1 text-sm text-white/35">{ride.deviceName}</p>
          </div>
        </div>

        {/* Status badge */}
        <div
          className={`
            flex items-center gap-2 rounded-full
            border px-3 py-1.5 text-xs
            ${
              detected
                ? "border-[#FFD400]/20 bg-[#FFD400]/5 text-[#FFD400]"
                : "border-white/10 bg-white/[0.03] text-white/35"
            }
          `}
        >
          <span
            className={`
              h-1.5 w-1.5 rounded-full
              ${detected ? "bg-[#FFD400]" : "bg-white/25"}
            `}
          />

          {detected ? "Detected" : "Waiting"}
        </div>
      </div>

      {/* Device status */}
      <div className="relative mt-6 border-t border-white/[0.07] pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/35">Device status</span>

          <div className="flex items-center gap-2">
            <CircleCheck
              size={15}
              className={detected ? "text-[#FFD400]" : "text-white/20"}
            />

            <span className="text-sm font-medium text-white/70">
              {detected ? "Nearby" : "Not detected"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
