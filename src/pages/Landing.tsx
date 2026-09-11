import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Radio } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/register", { replace: true });
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400]/[0.06] blur-[100px]" />

      {/* Splash content */}
      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Logo */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD400] text-black shadow-[0_0_40px_rgba(255,212,0,0.12)]">
          <Radio size={30} strokeWidth={2.2} />
        </div>

        {/* Brand */}
        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          AutoTracky
        </h1>

        {/* Tagline */}
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/40 sm:text-base">
          Your belongings. Your journey.{" "}
          <span className="text-white/65">Always trackable.</span>
        </p>

        {/* Loading indicator */}
        <div className="mt-10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFD400]" />
          <span className="text-[11px] font-medium tracking-[0.18em] text-white/30">
            INITIALIZING
          </span>
        </div>
      </div>

      
    </main>
  );
}