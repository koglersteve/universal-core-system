import { useAuth } from "@/context/AuthContext";

export function useSession() {
  const { identity, session } = useAuth();

  return {
    identity,
    session,
    loading: !identity && !session,
    isAuthenticated: !!identity,
  };
}
