import { Radio } from "lucide-react";

export default function DetectionHistory() {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-medium tracking-[0.16em] text-white/40">
          RECENT DETECTIONS
        </p>

        <h2 className="mt-2 text-xl font-semibold">Your journey history</h2>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-14 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
          <Radio size={20} className="text-white/30" />
        </div>

        <h3 className="mt-5 text-base font-medium">No detections yet</h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/35">
          When an AutoTracky scanner detects your BLE ID during your journey,
          your detection history will appear here.
        </p>
      </div>
    </section>
  );
}
