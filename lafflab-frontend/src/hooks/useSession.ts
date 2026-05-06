// src/hooks/useSession.ts

import { useAuth } from "@/context/AuthContext";

export function useSession() {
  const { identity, session } = useAuth();

  const loading = !identity && !session;

  return {
    identity,
    session,
    loading,
    isAuthenticated: !!identity,
  };
}
