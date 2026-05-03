"use client";

import { useState } from "react";
import type { ReactionEmojiKey } from "@/core/reactions/types";

export function useReactions(postId: string, surface: string) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [sending, setSending] = useState(false);

  async function react(emoji: ReactionEmojiKey, userId?: string) {
    if (sending) return;
    setSending(true);

    // optimistic update
    setCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));

    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, emoji, surface, userId: userId || null }),
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

  return { counts, react, sending };
}
