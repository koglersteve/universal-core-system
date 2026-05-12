"use client";

import { useState, useEffect } from "react";

export default function Component() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        setName(data.name || "");
        setBio(data.bio || "");
        setAvatarUrl(data.avatarUrl || "");
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, avatarUrl }),
      });
      window.location.href = "/profile";
    } catch (err) {
      console.error("Failed to save profile", err);
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white p-6 space-y-6">

      <h1 className="text-2xl font-semibold">Edit Profile</h1>

      <div className="space-y-4">

        <div>
          <label className="block mb-1 text-neutral-400">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-neutral-400">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white h-24"
          />
        </div>

        <div>
          <label className="block mb-1 text-neutral-400">Avatar URL</label>
          <input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white"
          />
        </div>

        {avatarUrl && (
          <div className="mt-4">
            <img
              src={avatarUrl}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      <a
        href="/profile"
        className="block mt-4 text-neutral-400 hover:text-white transition"
      >
        Cancel
      </a>
    </div>
  );
}
