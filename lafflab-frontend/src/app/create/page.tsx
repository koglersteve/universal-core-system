"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [type, setType] = useState<"text" | "image" | "meme" | "video" | "audio">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("type", type);
      if (text) form.append("text", text);
      if (file) form.append("file", file);

      const res = await fetch("/api/posts", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Upload failed");

      setMessage("Post created successfully");
      setText("");
      setFile(null);
    } catch (err) {
      setMessage("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Create Post</h1>

      <div className="space-y-3">
        <label className="block text-sm text-white/70">Post Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="bg-white/10 border border-white/20 rounded p-2 text-white"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="meme">Meme</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
      </div>

      {(type === "text" || type === "meme") && (
        <div className="space-y-3">
          <label className="block text-sm text-white/70">Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={150}
            className="w-full h-32 bg-white/10 border border-white/20 rounded p-2 text-white"
          />
        </div>
      )}

      {type !== "text" && (
        <div className="space-y-3">
          <label className="block text-sm text-white/70">Upload File</label>
          <input
            type="file"
            accept={
              type === "image" || type === "meme"
                ? "image/*"
                : type === "video"
                ? "video/*"
                : "audio/*"
            }
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-white"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        {loading ? "Uploading..." : "Create Post"}
      </button>

      {message && <p className="text-sm text-white/60">{message}</p>}
    </div>
  );
}
