"use client";

import { useSession } from "@/hooks/useSession";
import Link from "next/link";

export default function Component() {
  const { user } = useSession();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Profile</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-xl font-semibold">Profile</div>

      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-semibold">{user.username}</div>
          <div className="text-gray-400">{user.email}</div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/profile/edit"
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          Edit Profile
        </Link>

        <Link
          href="/favorites"
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          Favorites
        </Link>

        <Link
          href="/history"
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          History
        </Link>

        <Link
          href="/settings"
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
