"use client";

import { useNotificationStore } from "@/store/notificationStore";

export default function NotificationBubble() {
  const { inbox } = useNotificationStore();
  const unread = inbox.filter((n) => !n.read).length;

  if (unread === 0) return null;

  return (
    <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 shadow-lg" />
  );
}
