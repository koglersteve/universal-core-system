"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = Record<string, any> | null;

type SessionContextValue = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  loading: boolean;
  isAuthenticated: boolean;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/profile/me");
        const data = await res.json();
        setUser(data?.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
}
