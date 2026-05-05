// src/core/reactions/engine.ts

import { randomUUID } from "crypto";
import { REACTION_IDENTITY_MATRIX } from "./matrix";

import type {
  ReactionEmojiKey,
  ReactionEvent,
  PropagationAction,
} from "@/types/os";

import { addReaction } from "./reactionStore";
import { updateUserProfile } from "./userProfile";
import { emitReactionStreamEvent } from "./stream";
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
    // Identity matrix placeholder (future analytics)
    REACTION_IDENTITY_MATRIX[params.emoji][params.emoji];

    // Stream propagation event
    emitReactionStreamEvent({
      ...event,
      propagation: a,
    });
  });

  // Stream reaction event
  emitReactionStreamEvent(event);

  return event;
}
