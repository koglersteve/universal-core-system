import React, { useState } from "react";

type PostType = "text" | "image" | "video" | "audio";

type Props = {
  onPostCreated?: () => void;
};

export const PostComposer: React.FC<Props> = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState<PostType>("text");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaDurationSeconds, setMediaDurationSeconds] = useState<number | "">(
    ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = text.trim().length > 0 && text.trim().length <= 150;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError(null);

    const payload: any = {
      text: text.trim(),
      type,
    };

    if (type !== "text") {
      if (mediaUrl.trim()) payload.mediaUrl = mediaUrl.trim();
      if ((type === "video" || type === "audio") && mediaDurationSeconds) {
        payload.mediaDurationSeconds = Number(mediaDurationSeconds);
      }
    }

    try {
      const res = await fetch("/core/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create post");
      } else {
        setText("");
        setMediaUrl("");
        setMediaDurationSeconds("");
        setType("text");
        onPostCreated?.();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <h3 style={{ marginBottom: 8 }}>Create a post</h3>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength={150}
        rows={3}
        placeholder="What's funny, weird, or real?"
        style={{ width: "100%", marginBottom: 8 }}
      />

      <div style={{ marginBottom: 8 }}>
        <label style={{ marginRight: 8 }}>Type:</label>
        <select
          value={type}
          onChange={e => setType(e.target.value as PostType)}
        >
          <option value="text">Text</option>
          <option value="image">Image (URL)</option>
          <option value="video">Video (URL, ≤30s)</option>
          <option value="audio">Audio (URL, ≤30s)</option>
        </select>
      </div>

      {type !== "text" && (
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            value={mediaUrl}
            onChange={e => setMediaUrl(e.target.value)}
            placeholder="Media URL"
            style={{ width: "100%", marginBottom: 4 }}
          />

          {(type === "video" || type === "audio") && (
            <input
              type="number"
              value={mediaDurationSeconds}
              onChange={e =>
                setMediaDurationSeconds(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Duration in seconds (≤30)"
              style={{ width: "100%" }}
            />
          )}
        </div>
      )}

      {error && (
        <div style={{ color: "red", marginBottom: 8 }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={!canSubmit || submitting}>
        {submitting ? "Posting..." : "Post"}
      </button>
    </form>
  );
};
