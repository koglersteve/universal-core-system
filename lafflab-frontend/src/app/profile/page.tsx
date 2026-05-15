"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  async function loadProfile() {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setUser(data.user);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">

      <h1 className="text-2xl font-bold">Your Profile</h1>

      <div className="space-y-4">

        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl || "/default-avatar.png"}
            className="w-20 h-20 rounded-full object-cover border border-white/10"
          />
          <div>
            <div className="text-lg font-semibold">{user.screenName}</div>
            <div className="text-white/60">@{user.username}</div>
          </div>
        </div>

        <div className="border border-white/10 rounded-lg p-4 space-y-3">
          <div className="text-sm text-white/60">Screen Name</div>
          <div className="text-white">{user.screenName}</div>
        </div>

        <div className="border border-white/10 rounded-lg p-4 space-y-3">
          <div className="text-sm text-white/60">Username</div>
          <div className="text-white">@{user.username}</div>
        </div>

        <div className="border border-white/10 rounded-lg p-4 space-y-3">
          <div className="text-sm text-white/60">Email</div>
          <div className="text-white">{user.email}</div>
        </div>

      </div>
    </div>
  );
}

