"use client";

import { useEffect, useState } from "react";

export default function Component() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        Loading profile…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white p-6 space-y-6">

      <div className="flex items-center gap-4">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-neutral-700" />
        )}

        <div>
          <p className="text-2xl font-semibold">{profile.name}</p>
          {profile.bio && (
            <p className="text-neutral-400 mt-1">{profile.bio}</p>
          )}
        </div>
      </div>

      <a
        href="/profile/edit"
        className="inline-block px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition"
      >
        Edit Profile
      </a>
    </div>
  );
}
