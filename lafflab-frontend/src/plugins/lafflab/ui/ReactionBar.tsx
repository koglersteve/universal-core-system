import React, { useState } from "react";

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

const REACTIONS: { key: ReactionEmojiKey; emoji: string }[] = [
  { key: "laugh", emoji: "😂" },
  { key: "smile", emoji: "🙂" },
  { key: "expressionless", emoji: "😐" },
  { key: "shock", emoji: "😱" },
  { key: "mindblown", emoji: "🤯" },
  { key: "angry", emoji: "😡" },
  { key: "crickets", emoji: "🦗" },
];

type Props = {
  post: {
    id: string;
    reactions: Record<ReactionEmojiKey, number>;
    viewerReaction: ReactionEmojiKey | null;
  };
};

export const ReactionBar: React.FC<Props> = ({ post }) => {
  const [counts, setCounts] = useState(post.reactions);
  const [viewerReaction, setViewerReaction] = useState<ReactionEmojiKey | null>(
    post.viewerReaction
  );
  const [loading, setLoading] = useState(false);

  const toggleReaction = async (reaction: ReactionEmojiKey) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/core/reactions/${post.id}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: reaction }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Reaction error:", data);
        setLoading(false);
        return;
      }

      // Update UI instantly
      setCounts(data.counts);
      setViewerReaction(data.active ? reaction : null);
    } catch (err) {
      console.error("Reaction toggle failed:", err);
    }

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
      {REACTIONS.map(r => (
        <button
          key={r.key}
          onClick={() => toggleReaction(r.key)}
          disabled={loading}
          style={{
            fontSize: 22,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            opacity: viewerReaction === r.key ? 1 : 0.5,
          }}
        >
          {r.emoji} {counts[r.key] > 0 ? counts[r.key] : ""}
        </button>
      ))}
    </div>
  );
};
