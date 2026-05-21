"use client";

import { useEffect, useState } from "react";

interface EditProfilePageProps {
  params: { id: string };
}

export default function EditProfilePage({ params }: EditProfilePageProps) {
  const [form, setForm] = useState({
    username: "",
    screenName: "",
    avatarUrl: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) {
          setError("Failed to load profile.");
          setAllowed(false);
          setLoading(false);
          return;
        }

        const data = await res.json();

        // Optional: enforce only editing own profile
        if (data.id && data.id !== params.id) {
          setAllowed(false);
          setLoading(false);
          return;
        }

        setForm({
          username: data.username || "",
          screenName: data.screenName || "",
          avatarUrl: data.avatarUrl || "",
          bio: data.bio || "",
        });

        setLoading(false);
      } catch {
        setError("Failed to load profile.");
        setAllowed(false);
        setLoading(false);
      }
    }

    load();
  }, [params.id]);

  async function save() {
    if (saving) return;
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      const res = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Error saving profile.");
        setSaving(false);
        return;
      }

      setSaving(false);
      setSaved(true);
    } catch {
      setError("Error saving profile.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading…
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="p-6 text-white">
        You can only edit your own profile.
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-2xl font-semibold">Edit Profile</div>

      <div className="space-y-4">
        <div>
          <div className="text-sm mb-1">Username</div>
          <input
            className="w-full px-3 py-2 rounded bg-white/10 text-white"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="New username"
          />
        </div>

        <div>
          <div className="text-sm mb-1">Avatar URL</div>
          <input
            className="w-full px-3 py-2 rounded bg-white/10 text-white"
            value={form.avatarUrl}
            onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
            placeholder="https://example.com/avatar.png"
          />
        </div>

        <div>
          <div className="text-sm mb-1">Bio</div>
          <textarea
            className="w-full px-3 py-2 rounded bg-white/10 text-white"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
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

      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}
    </div>
  );
}
