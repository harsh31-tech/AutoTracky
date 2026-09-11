import { useEffect, useState } from "react";
import {
  Activity,
  CircleCheck,
  LoaderCircle,
  UserRound,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import BleCard from "../components/dashboard/BleCard";
import DetectionHistory from "../components/dashboard/DetectionHistory";

import { auth } from "../firebase/auth";
import { getUserProfile } from "../services/userService";

import type { UserProfile } from "../types";

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = auth.currentUser;

        if (!user) {
          setError("You are not logged in.");
          return;
        }

        const userProfile = await getUserProfile(user.uid);

        if (!userProfile) {
          setError("User profile not found.");
          return;
        }

        setProfile(userProfile);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="flex items-center gap-3 text-sm text-white/40">
          <LoaderCircle
            size={20}
            className="animate-spin text-[#FFD400]"
          />
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 text-white">
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/5">
            <Activity size={20} className="text-red-400" />
          </div>

          <h1 className="mt-5 text-xl font-semibold">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/40">
            {error || "Profile could not be loaded."}
          </p>
        </div>
      </div>
    );
  }

  const firstName = profile.name.split(" ")[0];

  return (
    <DashboardLayout>
      <div className="space-y-10 sm:space-y-12">
        {/* Header */}
        <section>
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#FFD400]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
            DASHBOARD
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[42px]">
            Welcome back, {firstName}.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
            Keep your AutoTracky identity active and stay informed
            whenever your BLE ID is detected.
          </p>
        </section>

        {/* Overview */}
        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          {/* BLE Card */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
            {/* Subtle accent */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#FFD400]/5 blur-3xl" />

            <div className="relative">
              <BleCard bleId={profile.bleId} />
            </div>
          </div>

          {/* Profile Card */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] text-white/35">
                  YOUR PROFILE
                </p>

                <p className="mt-2 text-sm text-white/50">
                  Account information
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <UserRound size={17} className="text-white/50" />
              </div>
            </div>

            <div className="mt-7">
              <ProfileRow
                label="Name"
                value={profile.name}
              />

              <ProfileRow
                label="Email"
                value={profile.email}
              />

              <ProfileRow
                label="Mobile"
                value={profile.mobile}
              />
            </div>
          </div>
        </section>

        {/* Status strip */}
        <section className="grid gap-3 sm:grid-cols-3">
          <StatusCard
            icon={<CircleCheck size={17} />}
            label="TRACKING ID"
            value="Assigned"
          />

          <StatusCard
            icon={<Activity size={17} />}
            label="IDENTITY"
            value="BLE enabled"
          />

          <StatusCard
            icon={<Activity size={17} />}
            label="SYSTEM"
            value="Connected"
          />
        </section>

        {/* Detection History */}
        <section>
          <div className="mb-5">
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#FFD400]">
              ACTIVITY
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Recent detections
            </h2>

            <p className="mt-1.5 text-sm text-white/35">
              See where your AutoTracky identity was detected.
            </p>
          </div>

          <DetectionHistory bleId={profile.bleId} />
        </section>
      </div>
    </DashboardLayout>
  );
}

function ProfileRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-white/[0.07] py-4 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-sm text-white/35">
        {label}
      </span>

      <span className="break-all text-sm font-medium text-white/75 sm:text-right">
        {value}
      </span>
    </div>
  );
}

function StatusCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#FFD400]/10 bg-[#FFD400]/5 text-[#FFD400]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium tracking-[0.15em] text-white/30">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-white/75">
          {value}
        </p>
      </div>
    </div>
  );
}