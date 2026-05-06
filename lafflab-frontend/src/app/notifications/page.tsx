// src/app/notifications/page.tsx
"export const dynamic = "force-dynamic";

use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AppShell from "@/components/AppShell";

type SimpleNotification = {
  id: string;
  message: string;
};

export default function NotificationsPage() {
  const { identity } = useAuth();
  const [items, setItems] = useState<SimpleNotification[]>([]);

  useEffect(() => {
    setItems([]);
  }, [identity]);

  return (
    <AppShell title="Notifications">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>

        {items.length === 0 && (
          <p className="text-gray-500">No notifications.</p>
        )}

        {items.map((n) => (
          <div key={n.id} className="border p-3 rounded mb-2">
            {n.message}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
