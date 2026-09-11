import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { LoaderCircle, Radio } from "lucide-react";

import { auth } from "../../firebase/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const [user, setUser] = useState(auth.currentUser);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setCheckingAuth(false);
      }
    );

    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] text-white">
        {/* Subtle background glow */}
        <div
          className="
            pointer-events-none absolute
            left-1/2 top-1/2
            h-64 w-64
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#FFD400]/[0.035]
            blur-[90px]
          "
        />

        <div className="relative flex flex-col items-center">
          {/* Icon */}
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              border border-[#FFD400]/10
              bg-[#FFD400]/[0.055]
            "
          >
            <Radio
              size={20}
              strokeWidth={2}
              className="text-[#FFD400]"
            />
          </div>

          {/* Loader */}
          <div className="mt-5 flex items-center gap-2.5">
            <LoaderCircle
              size={15}
              strokeWidth={2}
              className="animate-spin text-white/30"
            />

            <span className="text-xs font-medium text-white/35">
              Checking authentication
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}