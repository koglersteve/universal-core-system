"use client";

import { create } from "zustand";

type AuthState = {
  role: string | null;
  token: string | null;
  loading: boolean;

  login: (token: string, role: string) => void;
  logout: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  token: null,
  loading: true,

  hydrate: () => {
    const cookieRole = document.cookie
      .split("; ")
      .find((r) => r.startsWith("role="))
      ?.split("=")[1];

    const storedToken = localStorage.getItem("token");

    set({
      role: cookieRole || null,
      token: storedToken || null,
      loading: false,
    });
  },

  login: (token, role) => {
    document.cookie = `role=${role}; path=/`;
    localStorage.setItem("token", token);

    set({ role, token });
  },

  logout: () => {
    document.cookie = "role=; Max-Age=0; path=/";
    localStorage.removeItem("token");

    set({ role: null, token: null });
  },
}));
