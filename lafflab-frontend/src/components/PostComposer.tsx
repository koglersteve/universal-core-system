"use client";

import { useState } from "react";

export default function PostComposer({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit() {
    if (!content.trim() && !file) return;

    setUploading(true);

    let mediaUrl = null;

    if (file) {
      const res = await fetch("/api/upload/post", {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const { uploadUrl, publicUrl } = await res.json();

      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      mediaUrl = publicUrl;
    }

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        content,
        media: mediaUrl,
      }),
    });

    setContent("");
    setFile(null);
    setUploading(false);

    onPostCreated?.();
  }

  return (
    <div className="space-y-3">

      <textarea
        value={content}
        onChange={(e) => {
          if (e.target.value.length <= 150) {
            setContent(e.target.value);
          }
        }}
        placeholder="What's on your mind?"
        className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white resize-none"
        rows={4}
      />

      <div className="text-right text-xs text-white/60">
        {content.length}/150
      </div>

      <input
        type="file"
        accept="image/*,video/*,audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-sm text-white/70"
      />

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="w-full bg-white text-black py-2 rounded-lg font-semibold disabled:opacity-50"
      >
        {uploading ? "Posting…" : "Post"}
      </button>
    </div>
  );
}
