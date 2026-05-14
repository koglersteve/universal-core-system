"use client";

import { useState } from "react";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    username: "",
    screenName: "",
    avatarUrl: "",
    bio: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/profile/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setSaving(false);
      setMessage("Error saving profile");
      return;
    }

    setSaving(false);
    setMessage("Profile updated");
  }

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-xl font-semibold">Edit Profile</h1>

      <input
        className="w-full p-2 bg-black/20 border border-white/10 rounded"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        className="w-full p-2 bg-black/20 border border-white/10 rounded"
        placeholder="Screen Name"
        value={form.screenName}
        onChange={(e) => setForm({ ...form, screenName: e.target.value })}
      />

      <input
        className="w-full p-2 bg-black/20 border border-white/10 rounded"
        placeholder="Avatar URL"
        value={form.avatarUrl}
        onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
      />

      <textarea
        className="w-full p-2 bg-black/20 border border-white/10 rounded"
        placeholder="Bio"
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>

      {message && <div className="text-sm text-green-400">{message}</div>}
    </div>
  );
}
