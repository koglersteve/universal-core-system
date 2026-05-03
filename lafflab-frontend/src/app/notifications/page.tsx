"use client";

import AppShell from "@/components/AppShell";
import { useNotifications } from "@/hooks/useNotifications";

const USER_ID = "user-123"; // replace with real auth later

export default function NotificationsPage() {
  const { notifications, loading } = useNotifications(USER_ID);

  return (
    <AppShell title="Notifications">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          System-generated emotional notifications based on your posts and reactions.
        </p>

        {loading && (
          <p className="text-white/60 text-[var(--text-sm)]">
            Loading notifications…
          </p>
        )}

        {!loading && notifications.length === 0 && (
          <p className="text-white/60 text-[var(--text-sm)]">
            No notifications yet. Once your posts start getting emotional spikes,
            they’ll show up here.
          </p>
        )}

        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-[var(--space-3)] bg-white/5 border border-white/10 rounded-lg"
            >
              <p className="text-white text-[var(--text-sm)]">
                {n.message}
              </p>
              <p className="text-white/60 text-[var(--text-xs)] mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
