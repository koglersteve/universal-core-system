"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data?.user || null);
    }
    load();
  }, []);

  return (
    <AppShell title="My Profile">
      {!user ? (
        <div className="text-white/60 text-sm">Loading…</div>
      ) : (
        <div className="p-6 text-white space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatarUrl || "/default-avatar.png"}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{user.username}</div>
              <div className="text-gray-400">@{user.id}</div>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`/user/${user.id}`}
              className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
            >
              View Public Profile
            </a>

            <a
              href="/settings"
              className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
            >
              Settings
            </a>
          </div>
        </div>
      )}
    </AppShell>
  );
}

