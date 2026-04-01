"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();
  const { role, token, loading } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!token || !role) {
      router.push("/auth/login");
      return;
    }

    if (!allowedRoles.includes(role)) {
      router.push("/home");
      return;
    }

    setAuthorized(true);
  }, [loading, role, token]);

  if (!authorized) return null;

  return <>{children}</>;
}
