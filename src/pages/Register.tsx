import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, ShieldCheck, UserPlus } from "lucide-react";

import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { registerUser } from "../services/authService";
import { createUserProfile } from "../services/userService";
import { generateBleId } from "../utils/generateBleId";

type AuthError = Error & { code?: string };

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name || !mobile || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Firebase Authentication account
      const user = await registerUser(email, password);

      // 2. Generate ONE unique BLE ID
      const bleId = generateBleId();

      // 3. Save user profile to Realtime Database
      await createUserProfile(user.uid, {
        name,
        mobile,
        email,
        bleId,
      });

      // 4. Go to dashboard
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as AuthError;
      console.error("Registration error:", error);

      console.log("Firebase error code:", error.code);
      console.log("Firebase error message:", error.message);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (error.code === "auth/operation-not-allowed") {
        setError("Email/Password authentication is not enabled in Firebase.");
      } else if (error.code === "PERMISSION_DENIED") {
        setError(
          "Firebase Database permission denied. Check your database rules.",
        );
      } else {
        setError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400]/[0.035] blur-[120px]" />

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

        {/* Register */}
        <div className="flex flex-1 items-center justify-center py-10 sm:py-14">
          <div className="w-full max-w-[440px]">
            {/* Heading */}
            <div className="mb-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                <UserPlus
                  size={22}
                  strokeWidth={2}
                  className="text-[#FFD400]"
                />
              </div>

              <h1 className="mt-6 text-[30px] font-semibold tracking-[-0.035em] text-white sm:text-[34px]">
                Create your account
              </h1>

              <p className="mx-auto mt-2.5 max-w-sm text-sm leading-6 text-white/40">
                Create your AutoTracky identity and start tracking your journey.
              </p>
            </div>

            {/* Form Card */}
            <div className="rounded-[28px] border border-white/[0.09] bg-white/[0.025] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] sm:p-7">
              <form onSubmit={handleRegister} className="space-y-5">
                {/* Name */}
                <Input
                  label="Full name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />

                {/* Mobile */}
                <Input
                  label="Mobile number"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  autoComplete="tel"
                />

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
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
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
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

              {/* Login */}
              <p className="text-center text-sm text-white/35">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#FFD400] transition hover:text-[#FFE04A]"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Security */}
            <div className="mt-5 flex items-center justify-center gap-2">
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
