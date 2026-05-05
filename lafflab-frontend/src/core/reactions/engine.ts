// src/core/reactions/engine.ts

import type { ReactionEvent, ReactionEmojiKey } from "@/types/os";
import { addReaction } from "./reactionStore";
import { recordUserReaction } from "./userProfile";
import { emitReactionStreamEvent } from "./stream";
import { getPropagationActionsForEmoji } from "./propagationConfig";

export function processReaction(
  postId: string,
  emoji: ReactionEmojiKey,
  userId: string | null
) {
  // 1. Update global reaction counts
  addReaction(postId, emoji);

  // 2. Update user profile counts (only if user is logged in)
  if (userId) {
    recordUserReaction(userId, emoji);
  }

  // 3. Compute propagation actions (requires emoji + postId)
  const actions = getPropagationActionsForEmoji(emoji, postId);

  // 4. Emit stream event
  const event: ReactionEvent = {
    id: crypto.randomUUID(),
    postId,
    emoji,
    userId,
    timestamp: Date.now(),
  };

  emitReactionStreamEvent({
    ...event,
    propagation: actions.length ? actions[0] : undefined,
  });
}
