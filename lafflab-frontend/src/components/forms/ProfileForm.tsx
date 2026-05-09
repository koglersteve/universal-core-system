"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function ProfileForm({
  initial,
  onSubmit,
}: {
  initial?: { name?: string; bio?: string };
  onSubmit?: (data: { name: string; bio: string }) => Promise<void> | void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ name, bio });
      toast("Profile updated. Looking sharp.", "success");
    } catch {
      toast("Try again, champ.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Your bio"
        className="w-full p-3 rounded bg-white/10 border border-white/20"
        rows={3}
      />

      <button
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving…" : "Save Profile"}
      </button>
    </form>
  );
}
