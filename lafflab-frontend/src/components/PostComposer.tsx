"use client";

import { useState } from "react";

export default function PostComposer({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit() {
    if (!content.trim() && !imageFile) return;

    setUploading(true);

    let imageUrl = null;

    // Upload image if present
    if (imageFile) {
      const uploadRes = await fetch("/api/post/upload-url", {
        method: "POST",
        body: JSON.stringify({
          fileName: imageFile.name,
          fileType: imageFile.type,
        }),
      });

      const { uploadUrl, publicUrl } = await uploadRes.json();

      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": imageFile.type },
        body: imageFile,
      });

      imageUrl = publicUrl;
    }

    // Create post
    await fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({
        content,
        imageUrl,
      }),
    });

    setContent("");
    setImageFile(null);
    setUploading(false);

    if (onPostCreated) onPostCreated();
  }

  return (
    <div className="space-y-3">
      {/* TEXT INPUT */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white resize-none"
        rows={4}
      />

      {/* IMAGE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="text-sm text-white/70"
      />

      {/* SUBMIT BUTTON */}
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
