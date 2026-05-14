"use client";

import { useState, useEffect } from "react";
import AvatarUploader from "@/components/AvatarUploader";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    username: "",
    screenName: "",
    avatarUrl: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
"use client";

import { useState, useEffect } from "react";
import AvatarUploader from "@/components/AvatarUploader";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    username: "",
    screenName: "",
    avatarUrl: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setForm({
        username: data.username || "",
        screenName: data.screenName || "",
        avatarUrl: data.avatarUrl || "",
        bio: data.bio || "",
      });

      setLoading(false);
    }

    load();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>

      <div className="space-y-4">

        <div>
          <label className="block mb-1 text-neutral-400">Avatar</label>
          <AvatarUploader
            onUploaded={(url) => setForm({ ...form, avatarUrl: url })}
          />
          {form.avatarUrl && (
            <img
              src={form.avatarUrl}
              className="w-20 h-20 rounded-full mt-3 object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 text-neutral-400">Username</label>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-neutral-400">Screen Name</label>
          <input
            value={form.screenName}
            onChange={(e) => setForm({ ...form, screenName: e.target.value })}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-neutral-400">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white h-24"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>

      {message && (
        <div className="text-green-400 text-sm mt-2">{message}</div>
      )}

      <a
        href="/profile"
        className="block mt-4 text-neutral-400 hover:text-white transition"
      >
        Cancel
      </a>
    </div>
  );
}
