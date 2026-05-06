// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

type Identity = {
  id: string;
  email: string | null;
  avatarUrl: string | null;
  displayName: string | null;
  createdAt: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  identity: Identity | null;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  identity: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        const u = data.session.user;
        setIdentity({
          id: u.id,
          email: u.email ?? null,
          avatarUrl: u.user_metadata?.avatar_url ?? null,
          displayName: u.user_metadata?.full_name ?? null,
          createdAt: u.created_at,
        });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          const u = newSession.user;
          setIdentity({
            id: u.id,
            email: u.email ?? null,
            avatarUrl: u.user_metadata?.avatar_url ?? null,
            displayName: u.user_metadata?.full_name ?? null,
            createdAt: u.created_at,
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
    <AuthContext.Provider value={{ user, session, identity }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
