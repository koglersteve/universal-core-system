import { useState } from "react";
import type { ReactionEmojiKey } from "@/types/os/ReactionEmojiKey";

export function useReactions(initialCounts: Record<ReactionEmojiKey, number>) {
  const [counts, setCounts] = useState<Record<ReactionEmojiKey, number>>(initialCounts);
  const [sending, setSending] = useState(false);

  async function sendReaction(emoji: ReactionEmojiKey) {
    if (sending) return;
    setSending(true);

    // strict-safe: prev is fully typed
    setCounts((prev: Record<ReactionEmojiKey, number>) => ({
      ...prev,
      [emoji]: (prev[emoji] ?? 0) + 1,
    }));

    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        body: JSON.stringify({ emoji }),
      });

      if (!res.ok) {
        throw new Error("Failed to send reaction");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return { counts, sendReaction, sending };
}
