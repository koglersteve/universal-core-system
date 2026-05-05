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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        setIdentity({
          id: data.session.user.id,
          email: data.session.user.email,
          avatarUrl: data.session.user.user_metadata?.avatar_url ?? null,
          displayName: data.session.user.user_metadata?.full_name ?? null,
          createdAt: data.session.user.created_at,
        });
      }

      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null);
        setUser(session?.user ?? null);

        if (session?.user) {
          setIdentity({
            id: session.user.id,
            email: session.user.email,
            avatarUrl: session.user.user_metadata?.avatar_url ?? null,
            displayName: session.user.user_metadata?.full_name ?? null,
            createdAt: session.user.created_at,
          });
        } else {
          setIdentity(null);
        }
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
