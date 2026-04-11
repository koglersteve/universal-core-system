"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/state/useAuthStore";

export function useAuth() {
  const role = useAuthStore((s) => s.role);
  const token = useAuthStore((s) => s.token);
  const loading = useAuthStore((s) => s.loading);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    role,
    token,
    loading,
    login,
    logout,

    isLoggedIn: !!token,
    isFounder: role === "founder",
    isAdmin: role === "admin",
    isAdvertiser: role === "advertiser",
    isVendor: role === "vendor",
    isUser: role === "user",

    hasRole: (r: string) => role === r,
    isElevated: role === "founder" || role === "admin",
  };
}

