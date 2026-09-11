import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";

import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">

        {/* Top */}
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

        {/* Form */}
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <UserPlus
                  size={21}
                  className="text-[#FFD400]"
                />
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

              <form className="space-y-5">

                {/* Name */}
                <Input
                  label="Full name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                />

                {/* Mobile */}
                <Input
                  label="Mobile number"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  autoComplete="tel"
                />

                {/* Email */}
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                {/* Password */}
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
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

                {/* Submit */}
                <Button
                  type="submit"
                  className="mt-2 w-full"
                >
                  Create Account
                </Button>
              </form>

              {/* Login */}
              <p className="mt-6 text-center text-sm text-white/40">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#FFD400] transition hover:text-[#FFE04A]"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Footer note */}
            <p className="mt-6 text-center text-xs leading-5 text-white/25">
              Your account will be securely managed by Firebase
              Authentication.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}