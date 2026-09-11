import type { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../ui/Logo";
import { logoutUser } from "../../services/authService";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navbar */}
      <header
        className="
          sticky top-0 z-50
          border-b border-white/[0.07]
          bg-[#050505]/85
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto flex h-[68px] max-w-6xl
            items-center justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <Logo />

          <button
            onClick={handleLogout}
            className="
              group
              inline-flex items-center justify-center
              gap-2
              rounded-xl
              border border-white/[0.09]
              bg-white/[0.025]
              px-3.5 py-2
              text-sm font-medium
              text-white/45

              transition-all duration-200 ease-out

              hover:border-white/[0.15]
              hover:bg-white/[0.06]
              hover:text-white/85

              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#FFD400]/30

              active:scale-[0.98]
            "
          >
            <LogOut
              size={15}
              strokeWidth={2}
              className="
                transition-transform duration-200
                group-hover:translate-x-0.5
              "
            />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main
        className="
          mx-auto
          w-full
          max-w-6xl
          px-4
          py-8
          sm:px-6
          sm:py-10
          lg:px-8
          lg:py-12
        "
      >
        {children}
      </main>
    </div>
  );
}