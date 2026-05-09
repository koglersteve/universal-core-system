import { useAuth } from "@/context/AuthContext";

export function useSession() {
  const { user, session, loading } = useAuth();

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
  };
}
