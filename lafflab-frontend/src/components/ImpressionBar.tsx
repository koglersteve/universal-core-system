"use client";

import { useState } from "react";

const EMOJIS = [
  { key: "laugh", icon: "😂" },
  { key: "smile", icon: "🙂" },
  { key: "shock", icon: "😮" },
  { key: "expressionless", icon: "😐" }, // changed from sad
  { key: "angry", icon: "😡" },
  { key: "mindblown", icon: "🤯" },
  { key: "crickets", icon: "🦗" }, // changed from love
];

export default function ImpressionBar({
  postId,
  initialCounts = {},
}: {
  postId: string;
  initialCounts?: Record<string, number>;
}) {
  const [counts, setCounts] = useState(initialCounts);
  const [sending, setSending] = useState(false);

  async function react(emoji: string) {
    if (sending) return;

    // optimistic update
    setCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));

    setSending(true);

    try {
      const res = await fetch("/api/impressions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, emoji }),
      });

      const data = await res.json();
      if (data.counts) {
        setCounts(data.counts);
      }
    } catch (err) {
      console.error(err);
    }

    setSending(false);
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      {EMOJIS.map((e) => (
        <button
          key={e.key}
          onClick={() => react(e.key)}
          className="flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm"
        >
          <span>{e.icon}</span>
          <span className="text-white/70 text-xs">
            {counts[e.key] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}
