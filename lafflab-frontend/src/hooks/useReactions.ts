"use client";

import { useState } from "react";
import type { ReactionEmojiKey } from "@/types/os/ReactionEmojiKey";

export function useReactions(initialCounts: Record<ReactionEmojiKey, number>) {
  const [counts, setCounts] = useState(initialCounts);
  const [sending, setSending] = useState(false);

  async function sendReaction(emoji: ReactionEmojiKey) {
    if (sending) return;
    setSending(true);

    setCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] ?? 0) + 1,
    }));

    try {
      await fetch("/api/reactions", {
        method: "POST",
        body: JSON.stringify({ emoji }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return { counts, sendReaction, sending };
}

