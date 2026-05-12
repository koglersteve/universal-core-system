"use client";

import { useEffect, useState } from "react";
import { SessionContext } from "@/hooks/useSession";
import { getUser, updateUserProfile } from "@/lib/server/user";

export default function Component({ children }) {
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
    <SessionContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthenticated: !!user,
        updateProfile,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
