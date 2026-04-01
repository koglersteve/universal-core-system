"use client";

import { useState, useCallback, useRef } from "react";
import type { EmotionalNotification } from "@/types/notifications";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

export function useEmotionalNotifications() {
  const { canNotify } = useEmotionalGovernance();
  const [notifications, setNotifications] = useState<EmotionalNotification[]>([]);
  const timeouts = useRef<Record<string, NodeJS.Timeout>>({});

  const pushNotification = useCallback(
    (n: Omit<EmotionalNotification, "id" | "createdAt">) => {
      if (!canNotify()) return;

      const id = crypto.randomUUID();
      const newNotification: EmotionalNotification = {
        ...n,
        id,
        createdAt: Date.now()
      };

      setNotifications(prev => {
        // Optional: limit queue size
        const trimmed = prev.slice(-20);
        return [...trimmed, newNotification];
      });

      // Auto-remove after 6 seconds
      const timeout = setTimeout(() => {
        setNotifications(prev => prev.filter(x => x.id !== id));
        delete timeouts.current[id];
      }, 6000);

      timeouts.current[id] = timeout;
    },
    [canNotify]
  );

  return { notifications, pushNotification };
}
