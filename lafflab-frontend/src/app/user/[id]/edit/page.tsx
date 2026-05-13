"use client";

import { useState } from "react";

export default function EditProfilePage({ params }) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    if (saving) return;
    setSaving(true);

    await fetch("/api/user/update", {
      method: "POST",
      body: JSON.stringify({
        id: params.id,
        username,
        avatarUrl,
        bio,
      }),
    });

    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-2xl font-semibold">Edit Profile</div>

      <div className="space-y-4">
        <div>
          <div className="text-sm mb-1">Username</div>
          <input
            className="w-full px-3 py-2 rounded bg-white/10 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="New username"
          />
        </div>

        <div>
          <div className="text-sm mb-1">Avatar URL</div>
          <input
            className="w-full px-3 py-2 rounded bg-white/10 text-white"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.png"
          />
        </div>

        <div>
          <div className="text-sm mb-1">Bio</div>
          <textarea
            className="w-full px-3 py-2 rounded bg-white/10 text-white"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell the world about yourself"
          />
        </div>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>

      {saved && (
        <div className="text-green-400 text-sm">Profile updated.</div>
      )}
    </div>
  );
}
