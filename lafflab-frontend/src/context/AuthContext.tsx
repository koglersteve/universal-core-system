// src/context/AuthContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import type { UserIdentity } from "@/types/os";

type AuthContextValue = {
  user: User | null;
  identity: UserIdentity | null;
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  identity: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [identity, setIdentity] = useState<UserIdentity | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  function buildIdentity(u: User | null): UserIdentity | null {
    if (!u) return null;

    return {
      id: u.id,
      email: u.email ?? null,
      avatarUrl: u.user_metadata?.avatar_url ?? null,
      displayName: u.user_metadata?.full_name ?? null,
      createdAt: u.created_at ?? null,
    };
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session ?? null;
      const u = s?.user ?? null;

      setSession(s);
      setUser(u);
      setIdentity(buildIdentity(u));
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const u = session?.user ?? null;

        setSession(session ?? null);
        setUser(u);
        setIdentity(buildIdentity(u));
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        identity,
        session,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
