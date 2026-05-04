"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import type { UserIdentity } from "@/types/os";

type AuthContextValue = {
  user: User | null;
  identity: UserIdentity | null;
  session: Session | null;
  loading: boolean;
};

function mapToIdentity(user: User | null): UserIdentity | null {
  if (!user) return null;
  return {
    id: user.id,
    displayName: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
    email: user.email ?? null,
    avatarUrl: user.user_metadata?.avatar_url ?? null,
  };
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  identity: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(session ?? null);
      setLoading(false);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const user = session?.user ?? null;

  const value: AuthContextValue = {
    user,
    identity: mapToIdentity(user),
    session,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
