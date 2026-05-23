import React, { useState } from "react";

export const EmotionalLinkPanel: React.FC<{ jokeId: string }> = ({ jokeId }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendReaction = (reaction: string) => {
    setLoading(true);

    fetch("/lafflab/emotion-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jokeId,
        reaction,
        moodBefore: "unknown" // MoodCheck can override later
      })
    })
      .then(r => r.json())
      .then(res => {
        setMessage(res.message);
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 8, fontWeight: 600 }}>How did that feel?</div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => sendReaction("lol")}
          style={{
            fontSize: 22,
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          😂
        </button>

        <button
          onClick={() => sendReaction("soft_smile")}
          style={{
            fontSize: 22,
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          🙂
        </button>

        <button
          onClick={() => sendReaction("meh")}
          style={{
            fontSize: 22,
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          😐
        </button>

        <button
          onClick={() => sendReaction("too_real")}
          style={{
            fontSize: 22,
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          😬
        </button>
      </div>

      {loading && (
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.7 }}>
          Thinking…
        </div>
      )}

      {message && (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            background: "#f0f0f0",
            borderRadius: 6,
            fontSize: 14,
            lineHeight: 1.4
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

