"use client";

import { useNotificationStore } from "@/store/notificationStore";
import Link from "next/link";

export default function NotificationTray() {
  const { inbox, markRead } = useNotificationStore();

  return (
    <div className="p-[var(--space-4)] space-y-[var(--space-3)]">
      {inbox.length === 0 ? (
        <p className="text-white/60 text-[var(--text-sm)]">
          No notifications yet.
        </p>
      ) : (
        inbox.map((n) => (
          <div
            key={n.id}
            className="p-[var(--space-3)] rounded-[var(--radius-md)] bg-white/5 border border-white/10 hover:bg-white/10 transition-soft"
          >
            <p className="text-[var(--text-base)] font-semibold">{n.title}</p>
            <p className="text-[var(--text-sm)] text-white/70 mt-[var(--space-1)]">
              {n.body}
            </p>

            {n.url && (
              <Link
                href={n.url}
                onClick={() => markRead(n.id)}
                className="text-[var(--text-xs)] text-white/60 underline mt-[var(--space-2)] inline-block"
              >
                View
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
}
