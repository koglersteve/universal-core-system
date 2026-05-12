"use client";

import { useSession } from "@/hooks/useSession";
import { useState } from "react";

export default function Component() {
  const { user, updateProfile } = useSession();

  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit() {
    setSaving(true);

    let avatarUrl = user?.avatarUrl;

    if (avatar) {
      const form = new FormData();
      form.append("file", avatar);

      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      avatarUrl = data.url;
    }

    await updateProfile({ username, avatarUrl });
    setSaving(false);
  }

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Edit Profile</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-xl font-semibold">Edit Profile</div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-300">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-300">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            className="w-full text-gray-300"
          />
        </div>

        <button
          onClick={submit}
          disabled={saving}
          className="px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
