"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: string;
  userId: string;
  type: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/notifications?userId=${userId}`);
      const json = await res.json();
      setNotifications(json.notifications || []);
      setLoading(false);
    }
    load();
  }, [userId]);

  return { notifications, loading };
}
