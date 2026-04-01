"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AuthContextType = {
  role: string | null;
  token: string | null;
  loading: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth from cookies/localStorage
  useEffect(() => {
    const cookieRole = document.cookie
      .split("; ")
      .find(r => r.startsWith("role="))
      ?.split("=")[1];

    const storedToken = localStorage.getItem("token");

    setRole(cookieRole || null);
    setToken(storedToken || null);
    setLoading(false);
  }, []);

  function login(token: string, role: string) {
    document.cookie = `role=${role}; path=/`;
    localStorage.setItem("token", token);

    setRole(role);
    setToken(token);
  }

  function logout() {
    document.cookie = "role=; Max-Age=0; path=/";
    localStorage.removeItem("token");

    setRole(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ role, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
