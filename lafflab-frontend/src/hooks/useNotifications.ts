"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

export type Notification = {
  id: string;
  userId: string;
  message: string;
  createdAt: number;
  read: boolean;
};

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    let active = true;

    async function poll() {
      try {
        const data = await LaffLabApi.getNotificationInbox();
        if (active) setNotifications(data ?? []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }

      if (active) setTimeout(poll, 1500);
    }

    poll();
    return () => {
      active = false;
    };
  }, [userId]);

  return notifications;
}
