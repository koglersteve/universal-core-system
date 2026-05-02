// src/hooks/useAuth.ts

"use client";

import { useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  role: "viewer" | "creator" | "admin";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch("/api/me");
        if (!mounted) return;

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return {
    user,
    loading,
    isCreator: user?.role === "creator" || user?.role === "admin",
  };
}
