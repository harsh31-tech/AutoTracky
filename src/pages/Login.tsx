import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

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

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
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
        setError(
          err?.message || "Login failed. Please try again."
        );
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

        {/* Login */}
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <LogIn
                  size={21}
                  className="text-[#FFD400]"
                />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-white/40">
                Continue tracking your journey with AutoTracky.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >
                {/* Email */}
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                />

                {/* Password */}
                <div className="relative">
                  <Input
                    label="Password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    className="pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute bottom-3.5 right-4 text-white/30 transition hover:text-white/70"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full"
                >
                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </Button>
              </form>

              {/* Register */}
              <p className="mt-6 text-center text-sm text-white/40">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#FFD400] transition hover:text-[#FFE04A]"
                >
                  Create one
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-white/25">
              Your account is securely managed by Firebase
              Authentication.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}