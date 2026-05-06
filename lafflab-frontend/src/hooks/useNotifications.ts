// src/hooks/useNotifications.ts

import { useEffect, useState } from "react";

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
        const res = await fetch(`/api/notifications/inbox?userId=${userId}`);
        const data = await res.json();

        if (active) {
          setNotifications(data.notifications ?? []);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }

      if (active) {
        setTimeout(poll, 1500);
      }
    }

    poll();

    return () => {
      active = false;
    };
  }, [userId]);

  return notifications;
}
