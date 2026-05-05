// src/app/notifications/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { Notification } from "@/types/os";

export default function NotificationsPage() {
  const { identity } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    if (!identity) return;

    fetch(`/api/notifications?userId=${identity.id}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [identity]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>

      <div className="flex flex-col gap-4">
        {items.map((n) => (
          <div
            key={n.id}
            className="p-4 rounded bg-gray-800 border border-gray-700"
          >
            <p className="text-white font-semibold">{n.title}</p>
            <p className="text-white text-sm mt-1">{n.message}</p>
            <p className="text-white/60 text-xs mt-2">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
