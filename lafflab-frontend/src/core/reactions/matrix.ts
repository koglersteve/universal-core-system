// src/core/reactions/engine.ts

import { randomUUID } from "crypto";
import { REACTION_IDENTITY_MATRIX } from "./matrix";

import type {
  ReactionEmojiKey,
  ReactionEvent,
  PropagationAction,
} from "@/types/os";

import { addReaction, getAggregatedCounts } from "./reactionStore";
import { updateUserProfile } from "./userProfile";
import { streamReaction } from "./stream";
import { getPropagationActionsForEmoji } from "./propagationConfig";

/**
 * Core reaction engine entry point.
 */
export function handleReaction(params: {
  postId: string;
  emoji: ReactionEmojiKey;
  userId?: string;
}): ReactionEvent {
  const event: ReactionEvent = {
    id: randomUUID(),
    postId: params.postId,
    emoji: params.emoji,
    userId: params.userId ?? null,
    timestamp: Date.now(),
  };

  // Update aggregated counts
  addReaction(params.postId, params.emoji);

  // Update user emotional profile
  if (params.userId) {
    updateUserProfile(params.userId, params.emoji);
  }

  // Propagation actions
  const actions: PropagationAction[] = getPropagationActionsForEmoji(
    params.emoji,
    params.postId
  );

  actions.forEach((a) => {
    // Log propagation using identity matrix or other transforms
    // (placeholder for future analytics)
    REACTION_IDENTITY_MATRIX[params.emoji][params.emoji];
    // Stream propagation event
    // (you can expand this later)
  });

  // Stream reaction event
  streamReaction(event);

  return event;
}
