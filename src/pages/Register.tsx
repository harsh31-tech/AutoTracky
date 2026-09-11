import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, UserPlus } from "lucide-react";

import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { registerUser } from "../services/authService";
import { createUserProfile } from "../services/userService";
import { generateBleId } from "../utils/generateBleId";

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
    } catch (err: any) {
      console.error("Registration error:", err);

      console.log("Firebase error code:", err?.code);
      console.log("Firebase error message:", err?.message);

      if (err?.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err?.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err?.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (err?.code === "auth/operation-not-allowed") {
        setError("Email/Password authentication is not enabled in Firebase.");
      } else if (err?.code === "PERMISSION_DENIED") {
        setError(
          "Firebase Database permission denied. Check your database rules.",
        );
      } else {
        setError(err?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        {/* Register */}
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <UserPlus size={21} className="text-[#FFD400]" />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-white/40">
                Start tracking your journey with AutoTracky.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <form onSubmit={handleRegister} className="space-y-5">
                <Input
                  label="Full name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />

                <Input
                  label="Mobile number"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  autoComplete="tel"
                />

                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />

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
                    className="absolute bottom-3.5 right-4 text-white/30 transition hover:text-white/70"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-white/40">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#FFD400] hover:text-[#FFE04A]"
                >
                  Login
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-white/25">
              Your account is securely managed by Firebase Authentication.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
