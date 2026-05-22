"use client";

import { create } from "zustand";

export type NotificationItem = {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type NotificationStore = {
  inbox: NotificationItem[];
  add: (n: NotificationItem) => void;
  markRead: (id: string) => void;
  clear: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  inbox: [],

  add: (n) =>
    set((state) => ({
      inbox: [n, ...state.inbox],
    })),

  markRead: (id) =>
    set((state) => ({
      inbox: state.inbox.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  clear: () => set({ inbox: [] }),
}));
