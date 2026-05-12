"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUser, updateUserProfile } from "@/lib/server/user";

const Context = createContext(null as any);

export function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getUser();
    setUser(data?.user || null);
    setSession(data?.session || null);
    setLoading(false);
  }

  async function updateProfile(values: any) {
    const updated = await updateUserProfile(values);
    setUser(updated);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        session,
        loading,
        isAuthenticated: !!user,
        updateProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useSession() {
  return useContext(Context);
}
