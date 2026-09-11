import { useEffect, useState } from "react";
import { Activity, CircleCheck, LoaderCircle, UserRound } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import BleCard from "../components/dashboard/BleCard";
import DetectionHistory from "../components/dashboard/DetectionHistory";
import LostAndFoundStatus from "../components/LostAndFoundStatus";
import RideDetector from "../components/RideDetector";

import { auth } from "../firebase/config";
import { getUserProfile } from "../services/userService";

interface UserProfile {
  name?: string;
  email?: string;
  bleId?: string;
  deviceName?: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = auth.currentUser;

        if (!user) {
          setLoading(false);
          return;
        }

        const userProfile = await getUserProfile(user.uid);

        setProfile(userProfile);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-white/40">
            <LoaderCircle size={20} className="animate-spin text-[#FFD400]" />

            <span className="text-sm">Loading dashboard...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <UserRound size={28} className="mx-auto text-white/30" />

            <p className="mt-3 text-sm text-white/50">
              Unable to load your profile.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <section>
          <p className="text-[11px] font-medium tracking-[0.18em] text-white/35">
            DASHBOARD
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-white/35">
            Monitor your AutoTracky ride detection.
          </p>
        </section>

        {/* ================================================= */}
        {/* OVERVIEW */}
        {/* ================================================= */}

        <section>
          <div className="mb-4 flex items-center gap-3">
            <Activity size={17} className="text-[#FFD400]" />

            <h2 className="text-sm font-medium text-white/70">Overview</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* BLE DEVICE */}

            {profile.bleId ? (
              <BleCard bleId={profile.bleId} />
            ) : (
              <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
                <p className="text-sm text-white/40">BLE ID not assigned.</p>
              </div>
            )}

            {/* RIDE DETECTION */}

            {profile.deviceName ? (
              <RideDetector deviceName={profile.deviceName} />
            ) : (
              <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-white/30" />

                  <div>
                    <p className="text-sm font-medium text-white/70">
                      Ride detection unavailable
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      Assign a device name to enable ride detection.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================================================= */}
        {/* STATUS STRIP */}
        {/* ================================================= */}

        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* BLE STATUS */}

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.15em] text-white/30">
                    BLE STATUS
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/70">
                    {profile.bleId ? "Configured" : "Not configured"}
                  </p>
                </div>

                <CircleCheck
                  size={18}
                  className={profile.bleId ? "text-[#FFD400]" : "text-white/20"}
                />
              </div>
            </div>

            {/* DETECTION STATUS */}

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.15em] text-white/30">
                    DETECTION
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/70">
                    Monitoring
                  </p>
                </div>

                <Activity size={18} className="text-[#FFD400]" />
              </div>
            </div>

            {/* ACCOUNT STATUS */}

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.15em] text-white/30">
                    ACCOUNT
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/70">
                    Active
                  </p>
                </div>

                <UserRound size={18} className="text-[#FFD400]" />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* DETECTION HISTORY */}
        {/* ================================================= */}

        <section>
          <div className="mb-4">
            <p className="text-[11px] font-medium tracking-[0.18em] text-white/35">
              DETECTION HISTORY
            </p>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Recent activity
            </h2>
          </div>

          {profile.bleId ? (
            <DetectionHistory
              bleId={profile.bleId}
              passengerId={auth.currentUser?.uid ?? ""}
            />
          ) : (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
              <p className="text-sm text-white/35">
                Detection history will appear once a BLE ID is assigned.
              </p>
            </div>
          )}
        </section>

        {/* ================================================= */}
        {/* LOST & FOUND */}
        {/* ================================================= */}

        <LostAndFoundStatus passengerId={auth.currentUser?.uid ?? ""} />
      </div>
    </DashboardLayout>
  );
}
