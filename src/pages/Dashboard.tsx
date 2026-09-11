import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import BleCard from "../components/dashboard/BleCard";
import DetectionHistory from "../components/dashboard/DetectionHistory";

import { auth } from "../firebase/auth";
import { getUserProfile } from "../services/userService";

import type { UserProfile } from "../types";

export default function Dashboard() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

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

        const userProfile =
          await getUserProfile(user.uid);

        if (!userProfile) {
          setError("User profile not found.");
          return;
        }

        setProfile(userProfile);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        setError(
          "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <LoaderCircle
          size={24}
          className="animate-spin text-[#FFD400]"
        />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 text-white">
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-white/40">
            {error || "Profile could not be loaded."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <section>
        <p className="text-xs font-medium tracking-[0.2em] text-[#FFD400]">
          DASHBOARD
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome back, {profile.name.split(" ")[0]}.
        </h1>

        <p className="mt-2 text-sm text-white/40 sm:text-base">
          Here's your AutoTracky journey overview.
        </p>
      </section>

      {/* Cards */}
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <BleCard bleId={profile.bleId} />

        {/* Profile card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
          <p className="text-xs font-medium tracking-[0.16em] text-white/40">
            YOUR PROFILE
          </p>

          <div className="mt-6 space-y-5">
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

      {/* Detection History */}
      <div className="mt-10">
        <DetectionHistory />
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
    <div className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-white/35">
        {label}
      </span>

      <span className="break-all text-sm text-white/80 sm:text-right">
        {value}
      </span>
    </div>
  );
}