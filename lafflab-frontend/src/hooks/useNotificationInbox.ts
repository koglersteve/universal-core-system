"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";

export function useNotificationInbox(userId: string) {
  const { inbox, add, clear } = useNotificationStore();

  useEffect(() => {
    async function load() {
      clear();

      const res = await fetch(`/api/notifications?userId=${userId}`);
      const data = await res.json();

      data.forEach((n: any) => {
        add({
          id: n.id,
          message: n.message,
          read: n.read ?? false,
          createdAt: n.createdAt,
        });
      });
    }

    load();
  }, [userId, add, clear]);

  return inbox;
}
