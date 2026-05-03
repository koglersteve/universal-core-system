import { randomUUID } from "crypto";
import { REACTION_MATRIX } from "./matrix";
import { getPropagationActionsForEmoji } from "./propagationConfig";
import { logPropagation } from "./propagationLog";
import { updateUserProfile } from "./userProfile";
import { emitReactionStreamEvent } from "./stream";

import type {
  ReactionEmojiKey,
  ReactionEvent,
  ReactionPropagation,
  SurfaceId,
} from "./types";
import type { PropagationAction } from "./propagationConfig";

type ReactionStore = {
  events: ReactionEvent[];
};

const store: ReactionStore = {
  events: [],
};

/**
 * Record a reaction event and trigger:
 * - store event
 * - update user emotional profile
 * - compute intelligent propagation actions
 * - log propagation actions
 * - emit real-time reaction stream event
 */
export function recordReaction(params: {
  userId: string | null;
  postId: string;
  emoji: ReactionEmojiKey;
  surface: SurfaceId;
}): ReactionEvent {
  const event: ReactionEvent = {
    id: randomUUID(),
    userId: params.userId,
    postId: params.postId,
    emoji: params.emoji,
    surface: params.surface,
    createdAt: new Date().toISOString(),
  };

  // Store event
  store.events.push(event);

  // Update user emotional profile
  if (params.userId) {
    updateUserProfile(params.userId, params.emoji);
  }

  // Intelligent propagation actions (emoji + post + user context)
  const actions = getPropagationActionsForEmoji(
    params.emoji,
    params.postId,
    params.userId || undefined
  );

  // Log propagation actions
  actions.forEach((a) => logPropagation(event, a));

  // Emit real-time reaction stream event
  emitReactionStreamEvent(event, actions);

  return event;
}

/**
 * Return all reaction events for a post.
 */
export function getReactionsForPost(postId: string): ReactionEvent[] {
  return store.events.filter((e) => e.postId === postId);
}

/**
 * Return aggregated emoji counts for a post.
 */
export function getAggregatedCounts(
  postId: string
): Record<ReactionEmojiKey, number> {
  const counts: Record<ReactionEmojiKey, number> = {
    laugh: 0,
    smile: 0,
    shock: 0,
    expressionless: 0,
    angry: 0,
    mindblown: 0,
    crickets: 0,
  };

  for (const e of store.events) {
    if (e.postId === postId) {
      counts[e.emoji] += 1;
    }
  }

  return counts;
}

/**
 * Raw 7×7 propagation matrix (emotional propagation).
 */
export function propagateReactions(
  event: ReactionEvent
): ReactionPropagation[] {
  return REACTION_MATRIX.filter((p) => p.fromEmoji === event.emoji);
}

/**
 * High-level propagation outputs:
 * “this reaction should trigger X in app Y”.
 */
export function getPropagationOutputs(
  event: ReactionEvent
): PropagationAction[] {
  return getPropagationActionsForEmoji(
    event.emoji,
    event.postId,
    event.userId || undefined
  );
}

/**
 * Return all reaction events (used for analytics).
 */
export function getAllEvents(): ReactionEvent[] {
  return [...store.events];
}
