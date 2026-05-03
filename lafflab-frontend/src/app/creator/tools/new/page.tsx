"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import { useRouter } from "next/navigation";

export default function NewPostEditor() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  async function handlePublish() {
    if (!text.trim()) return;

    setSaving(true);

    try {
      // Minimal POST to your existing backend
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          mediaUrl: null,
          mediaType: null,
        }),
      });

      if (!res.ok) throw new Error("Failed to publish");

      const { post } = await res.json();

      // Redirect to the new post
      router.push(`/post/${post.id}`);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  return (
    <AppShell title="New Post">
      <div className="space-y-[var(--space-6)]">
        <div className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your post..."
            className="w-full h-48 bg-transparent text-white text-[var(--text-md)] outline-none resize-none"
          />
        </div>

        <div className="flex justify-end gap-[var(--space-3)]">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-white/10 text-white rounded-lg text-[var(--text-sm)]"
          >
            Cancel
          </button>

          <button
            onClick={handlePublish}
            disabled={!text.trim() || saving}
            className="px-4 py-2 bg-white/20 text-white rounded-lg text-[var(--text-sm)] disabled:opacity-40"
          >
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
