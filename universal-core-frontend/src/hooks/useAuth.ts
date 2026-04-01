"use client";

import { useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  const { role, token, user, login, logout, loading } = useAuthContext();

  const isLoggedIn = !!token;

  return {
    // raw values
    role,
    token,
    user,
    loading,

    // actions
    login,
    logout,

    // derived state
    isLoggedIn,
    isFounder: role === "founder",
    isAdmin: role === "admin",
    isAdvertiser: role === "advertiser",
    isVendor: role === "vendor",
    isUser: role === "user",

    // future‑proof helpers
    hasRole: (r: string) => role === r,
    isElevated: role === "founder" || role === "admin"
  };
}

