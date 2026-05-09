"use client";

import { create } from "zustand";

type Tone = "neutral" | "playful" | "urgent" | "celebratory";

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  url?: string;
  tone: Tone;
  read?: boolean;
};

type NotificationState = {
  inbox: NotificationItem[];
  setInbox: (items: NotificationItem[]) => void;
  markRead: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  inbox: [],

  setInbox: (items) => set({ inbox: items }),

  markRead: (id) =>
    set((state) => ({
      inbox: state.inbox.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));
