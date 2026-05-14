"use client";

import { useState } from "react";

export default function PostComposer({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleMediaDuration(file: File) {
    return new Promise<number>((resolve) => {
      const url = URL.createObjectURL(file);
      const media = document.createElement(
        file.type.startsWith("audio") ? "audio" : "video"
      );
      media.src = url;
      media.addEventListener("loadedmetadata", () => {
        resolve(media.duration);
      });
    });
  }

  async function handleSubmit() {
    if (!content.trim() && !imageFile) return;

    setUploading(true);

    let imageUrl = null;

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
        onChange={async (e) => {
          const file = e.target.files?.[0] || null;
          if (!file) return;

          if (file.type.startsWith("video") || file.type.startsWith("audio")) {
            const duration = await handleMediaDuration(file);
            if (duration > 30) {
              alert("Video and audio posts must be 30 seconds or less.");
              return;
            }
          }

          setImageFile(file);
        }}
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
