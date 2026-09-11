import { useEffect, useState } from "react";

import { CheckCircle2, Clock3, PackageCheck, Search } from "lucide-react";

import { listenToPassengerLostRequests } from "../firebase/lostAndFoundService";

import type { LostAndFoundRequest } from "../types";

interface LostAndFoundStatusProps {
  passengerId: string;
}

export default function LostAndFoundStatus({
  passengerId,
}: LostAndFoundStatusProps) {
  const [requests, setRequests] = useState<LostAndFoundRequest[]>([]);

  useEffect(() => {
    if (!passengerId) {
      return;
    }

    const unsubscribe = listenToPassengerLostRequests(passengerId, setRequests);

    return () => {
      unsubscribe();
    };
  }, [passengerId]);

  if (requests.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />

          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35">
            LOST & FOUND
          </p>
        </div>

        <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
          Your reports
        </h2>

        <p className="mt-1.5 text-sm text-white/35">
          Track the status of items reported after your rides.
        </p>
      </div>

      <div className="space-y-3">
        {requests.map((request) => (
          <LostRequestCard key={request.id} request={request} />
        ))}
      </div>
    </section>
  );
}

function LostRequestCard({ request }: { request: LostAndFoundRequest }) {
  const statusInfo = getStatusInfo(request.status);

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FFD400]/10 bg-[#FFD400]/[0.04] text-[#FFD400]">
            <PackageCheck size={18} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white/80">
              {request.itemName}
            </p>

            <p className="mt-1 text-xs text-white/30">Auto {request.autoId}</p>
          </div>
        </div>

        <div
          className={`
            flex shrink-0 items-center gap-2
            rounded-full
            border px-3 py-1.5
            text-xs
            ${statusInfo.className}
          `}
        >
          {statusInfo.icon}

          {statusInfo.label}
        </div>
      </div>

      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <p className="text-xs leading-5 text-white/40">{request.description}</p>
      </div>

      <div className="mt-5 border-t border-white/[0.07] pt-5">
        <StatusTimeline status={request.status} />
      </div>

      {request.driverResponse && (
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.025] p-4">
          <p className="text-[10px] font-medium tracking-[0.15em] text-white/30">
            DRIVER RESPONSE
          </p>

          <p className="mt-2 text-sm leading-6 text-white/60">
            {request.driverResponse}
          </p>
        </div>
      )}

      <p className="mt-4 text-[11px] text-white/20">
        Reported {new Date(request.createdAt).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

function StatusTimeline({ status }: { status: LostAndFoundRequest["status"] }) {
  const steps = [
    {
      key: "pending",
      label: "Report submitted",
    },
    {
      key: "accepted",
      label: "Driver reviewing",
    },
    {
      key: "found",
      label: "Item found",
    },
    {
      key: "returned",
      label: "Item returned",
    },
  ];

  const statusOrder: Record<LostAndFoundRequest["status"], number> = {
    pending: 0,
    accepted: 1,
    found: 2,
    not_found: 1,
    returned: 3,
  };

  const currentIndex = statusOrder[status];

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const completed = index <= currentIndex;

        const active = index === currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-3">
            <div
              className={`
                flex h-7 w-7 shrink-0
                items-center justify-center
                rounded-full border

                ${
                  completed
                    ? "border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]"
                    : "border-white/10 bg-white/[0.02] text-white/20"
                }
              `}
            >
              {completed ? <CheckCircle2 size={14} /> : <Clock3 size={14} />}
            </div>

            <span
              className={`
                text-xs

                ${
                  active
                    ? "font-medium text-white/70"
                    : completed
                      ? "text-white/45"
                      : "text-white/20"
                }
              `}
            >
              {step.label}
            </span>
          </div>
        );
      })}

      {status === "not_found" && (
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-red-400/10 bg-red-400/[0.04] text-red-400">
            <Search size={14} />
          </div>

          <span className="text-xs font-medium text-red-400">
            Driver could not find the item
          </span>
        </div>
      )}
    </div>
  );
}

function getStatusInfo(status: LostAndFoundRequest["status"]) {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        icon: <Clock3 size={13} />,
        className: "border-yellow-400/10 bg-yellow-400/[0.04] text-yellow-400",
      };

    case "accepted":
      return {
        label: "Reviewing",
        icon: <Search size={13} />,
        className: "border-blue-400/10 bg-blue-400/[0.04] text-blue-400",
      };

    case "found":
      return {
        label: "Found",
        icon: <PackageCheck size={13} />,
        className: "border-[#FFD400]/10 bg-[#FFD400]/[0.04] text-[#FFD400]",
      };

    case "returned":
      return {
        label: "Returned",
        icon: <CheckCircle2 size={13} />,
        className: "border-green-400/10 bg-green-400/[0.04] text-green-400",
      };

    case "not_found":
      return {
        label: "Not found",
        icon: <Search size={13} />,
        className: "border-red-400/10 bg-red-400/[0.04] text-red-400",
      };

    default:
      return {
        label: "Pending",
        icon: <Clock3 size={13} />,
        className: "border-yellow-400/10 bg-yellow-400/[0.04] text-yellow-400",
      };
  }
}
