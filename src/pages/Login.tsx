import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";

import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);

      if (
        err?.code === "auth/invalid-credential" ||
        err?.code === "auth/wrong-password" ||
        err?.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password.");
      } else if (err?.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400]/[0.035] blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_0,transparent_45%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-7">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="rounded-xl transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>

          <Link
            to="/"
            className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/40 transition hover:bg-white/[0.04] hover:text-white"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            <span>Back</span>
          </Link>
        </header>

        {/* Main */}
        <div className="flex flex-1 items-center justify-center py-12 sm:py-16">
          <div className="w-full max-w-[420px]">
            {/* Heading */}
            <div className="mb-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                <LogIn size={22} strokeWidth={2} className="text-[#FFD400]" />
              </div>

              <h1 className="mt-6 text-[30px] font-semibold tracking-[-0.035em] text-white sm:text-[34px]">
                Welcome back
              </h1>

              <p className="mx-auto mt-2.5 max-w-sm text-sm leading-6 text-white/40">
                Sign in to continue tracking your AutoTracky identity.
              </p>
            </div>

            {/* Form Card */}
            <div className="rounded-[28px] border border-white/[0.09] bg-white/[0.025] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] sm:p-7">
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />

                {/* Password */}
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute bottom-3.5 right-4 flex items-center justify-center rounded-lg p-1 text-white/25 transition hover:bg-white/[0.05] hover:text-white/70"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-400/15 bg-red-400/[0.06] px-4 py-3 text-sm leading-5 text-red-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />

                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.07]" />

                <span className="text-[10px] font-medium tracking-[0.15em] text-white/20">
                  AUTOTRACKY
                </span>

                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>

              {/* Register */}
              <p className="text-center text-sm text-white/35">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#FFD400] transition hover:text-[#FFE04A]"
                >
                  Create one
                </Link>
              </p>
            </div>

            {/* Security note */}
            <div className="mt-5 flex items-center justify-center gap-2 text-center">
              <ShieldCheck size={14} className="text-white/20" />

              <p className="text-[11px] leading-5 text-white/25">
                Secure authentication powered by Firebase
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center pb-2">
          <p className="text-[10px] tracking-[0.18em] text-white/15">
            SMART BLE TRACKING
          </p>
        </footer>
      </div>
    </main>
  );
}
