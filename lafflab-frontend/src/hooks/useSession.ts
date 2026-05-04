"use client";

import { useAuth } from "@/context/AuthContext";

export function useSession() {
  const { identity, session, loading } = useAuth();
  return { identity, session, loading, isAuthenticated: !!identity };
}
