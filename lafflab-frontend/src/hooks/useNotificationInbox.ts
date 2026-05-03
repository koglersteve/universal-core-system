"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export function useNotificationInbox(userId: string) {
  const { inbox, setInbox } = useNotificationStore();

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/notifications/inbox?user=${userId}`);
      const data = await res.json();
      setInbox(data);
    }
    load();
  }, [userId, setInbox]);

  return { inbox };
}
