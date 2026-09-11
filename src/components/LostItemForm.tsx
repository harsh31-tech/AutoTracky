import { useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

import { createLostAndFoundRequest } from "../firebase/lostAndFoundService";

import type { Detection } from "../types";

interface LostItemFormProps {
  ride: Detection;
  passengerId: string;
  onClose: () => void;
  onSubmitted?: () => void;
}

export default function LostItemForm({
  ride,
  passengerId,
  onClose,
  onSubmitted,
}: LostItemFormProps) {
  const [itemName, setItemName] = useState("");

  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!itemName.trim()) {
      setError("Please enter the lost item.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe the lost item.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await createLostAndFoundRequest({
        rideId: ride.id,

        bleId: ride.bleId,

        deviceName: ride.deviceName,

        // vehicleId is your Auto ID
        autoId: ride.vehicleId,

        passengerId,

        itemName: itemName.trim(),

        description: description.trim(),
      });

      setSubmitted(true);

      onSubmitted?.();
    } catch (error) {
      console.error("FAILED TO SUBMIT LOST ITEM REQUEST:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to submit the request.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * SUCCESS SCREEN
   */
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0A0A0A] p-7">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]">
              <CheckCircle2 size={26} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Report submitted
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
              Your lost item request has been sent to the driver with high
              priority.
            </p>

            <div className="mt-5 w-full rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left">
              <div className="flex justify-between gap-4">
                <span className="text-xs text-white/35">Auto ID</span>

                <span className="text-sm font-medium text-white/70">
                  {ride.vehicleId}
                </span>
              </div>

              <div className="mt-3 flex justify-between gap-4">
                <span className="text-xs text-white/35">Item</span>

                <span className="text-right text-sm font-medium text-white/70">
                  {itemName}
                </span>
              </div>

              <div className="mt-3 flex justify-between gap-4">
                <span className="text-xs text-white/35">Status</span>

                <span className="text-sm font-medium text-[#FFD400]">
                  Pending
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-[#FFD400] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FFD400]/90"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * FORM
   */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] border border-white/10 bg-[#0A0A0A] p-6 sm:p-7">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#FFD400]/70">
              LOST & FOUND
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              Report a lost item
            </h2>

            <p className="mt-1 text-sm text-white/35">
              Tell the driver what you may have left behind.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* RIDE INFORMATION */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <p className="text-[10px] font-medium tracking-[0.16em] text-white/30">
            RIDE INFORMATION
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-white/30">Auto ID</p>

              <p className="mt-1 text-sm font-medium text-white/80">
                {ride.vehicleId}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/30">Device</p>

              <p className="mt-1 truncate text-sm font-medium text-white/80">
                {ride.deviceName}
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* ITEM */}

          <div>
            <label
              htmlFor="lost-item"
              className="text-sm font-medium text-white/70"
            >
              What did you lose?
            </label>

            <input
              id="lost-item"
              type="text"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
              placeholder="e.g. AirPods, wallet, phone"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#FFD400]/30"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="mt-5">
            <label
              htmlFor="lost-description"
              className="text-sm font-medium text-white/70"
            >
              Describe the item
            </label>

            <textarea
              id="lost-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Mention color, brand, size, unique marks, where you think you left it, etc."
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-[#FFD400]/30"
            />
          </div>

          {/* PRIORITY */}

          <div className="mt-5 flex gap-3 rounded-xl border border-[#FFD400]/10 bg-[#FFD400]/[0.03] p-4">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-[#FFD400]" />

            <div>
              <p className="text-sm font-medium text-white/70">
                High priority request
              </p>

              <p className="mt-1 text-xs leading-5 text-white/35">
                Your report will be sent to the driver for quick review.
              </p>
            </div>
          </div>

          {/* ERROR */}

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          {/* BUTTONS */}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/50 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-xl bg-[#FFD400] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#FFD400]/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
