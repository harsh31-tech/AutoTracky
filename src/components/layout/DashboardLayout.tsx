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
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 transition hover:bg-white/[0.07] hover:text-white"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {children}
      </main>
    </div>
  );
}