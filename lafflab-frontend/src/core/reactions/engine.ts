// src/core/reactions/engine.ts

import type { ReactionEvent, ReactionEmojiKey } from "@/types/os";

export function createReactionEvent(
  postId: string,
  emoji: ReactionEmojiKey,
  userId: string | null
): ReactionEvent {
  return {
    postId,
    emoji,
    userId: userId ?? "", // enforce string
    timestamp: Date.now(),
  };
}
