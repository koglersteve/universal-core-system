"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { LaffLabApi } from "@/lib/api";

export function useNotificationInbox(userId: string) {
  const { inbox, setInbox } = useNotificationStore();

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getNotificationInbox();
      setInbox(data ?? []);
    }
    load();
  }, [userId, setInbox]);

  return { inbox };
}
