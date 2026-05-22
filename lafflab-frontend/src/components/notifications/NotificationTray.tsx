"use client";

import { useNotificationStore } from "@/store/useNotificationStore";

export default function NotificationTray() {
  const { inbox, markRead, clear } = useNotificationStore();

  if (inbox.length === 0) {
    return (
      <div className="p-4 text-white/60 text-center">
        No notifications
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {inbox.map((n) => (
        <div
          key={n.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          <p className="text-base font-semibold text-white">
            {n.message}
          </p>

          <p className="text-xs text-white/40 mt-1">
            {new Date(n.createdAt).toLocaleString()}
          </p>

          {!n.read && (
            <button
              onClick={() => markRead(n.id)}
              className="mt-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition"
            >
              Mark as read
            </button>
          )}
        </div>
      ))}

      <button
        onClick={clear}
        className="w-full mt-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
      >
        Clear All
      </button>
    </div>
  );
}
