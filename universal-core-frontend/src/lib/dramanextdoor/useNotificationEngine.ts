import { useState } from "react";
import { EmotionalNotification, createNotification } from "./notifications";

export function useNotificationEngine() {
  const [notifications, setNotifications] = useState<EmotionalNotification[]>([]);

  function pushNotification(
    title: string,
    message: string,
    moodEffect?: number,
    tensionEffect?: number
  ) {
    const n = createNotification(title, message, moodEffect, tensionEffect);
    setNotifications((prev) => [n, ...prev]);
  }

  return {
    notifications,
    pushNotification,
  };
}
