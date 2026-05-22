"use client";

import { useNotificationStore } from "@/store/useNotificationStore";

export default function NotificationBubble() {
  const { inbox } = useNotificationStore();

  const unread = inbox.filter((n) => !n.read).length;

  if (unread === 0) return null;

  return (
    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      {unread}
    </div>
  );
}
