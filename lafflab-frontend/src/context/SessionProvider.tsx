"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/profile/me");
      const data = await res.json();
      setUser(data.user ?? null);
    }
    load();
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
