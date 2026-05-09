"use client";

import { useNotificationStore } from "@/store/notificationStore";
import Link from "next/link";

export default function NotificationTray() {
  const { inbox, markRead } = useNotificationStore();

  if (inbox.length === 0) {
    return (
      <p className="text-white/60 text-sm p-4">
        No notifications yet.
      </p>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {inbox.map((n) => (
        <div
          key={n.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          <p className="text-base font-semibold text-white">{n.title}</p>
          <p className="text-sm text-white/70 mt-1">{n.body}</p>

          {n.url && (
            <Link
              href={n.url}
              onClick={() => markRead(n.id)}
              className="text-xs text-white/60 underline mt-2 inline-block"
            >
              View
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
