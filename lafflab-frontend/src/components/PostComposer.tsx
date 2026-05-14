"use client";

import { useState } from "react";

export default function PostComposer({
  onPostCreated,
}: {
  onPostCreated?: () => void;
}) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);

  async function handleImage(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const res = await fetch("/api/post/upload-url");
    const { uploadUrl, fileUrl } = await res.json();

    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    setImageUrl(fileUrl);
    setUploading(false);
  }

  async function handlePost() {
    if (!content.trim()) return;

    setPosting(true);

    await fetch("/api/post/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        imageUrl,
      }),
    });

    setPosting(false);
    setContent("");
    setImageUrl(null);
    onPostCreated?.();
  }

  return (
    <div className="border border-white/10 rounded-lg p-4 bg-black text-white space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full bg-transparent border border-white/20 rounded-md p-2 text-sm resize-none h-24"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm text-white/70 cursor-pointer">
            <span className="underline">Add image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
          {uploading && (
            <span className="text-xs text-white/50">Uploading…</span>
          )}
        </div>

        <button
          onClick={handlePost}
          disabled={posting || !content.trim()}
          className="px-4 py-2 bg-blue-600 rounded-md text-sm disabled:opacity-50"
        >
          {posting ? "Posting…" : "Post"}
        </button>
      </div>

      {imageUrl && (
        <div className="mt-2">
          <img
            src={imageUrl}
            className="max-h-64 rounded-md border border-white/10 object-cover"
          />
        </div>
      )}
    </div>
  );
}
