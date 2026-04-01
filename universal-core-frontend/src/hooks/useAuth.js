"use client";

import { useState, useEffect, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse auth data:", err);
      localStorage.removeItem("auth");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setUser(data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth");
    setUser(null);
  }, []);

  return { user, login, logout, loading };
}
