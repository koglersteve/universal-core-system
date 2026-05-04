// src/core/reactions/engine.ts

import { randomUUID } from "crypto";
import { REACTION_MATRIX } from "./matrix";

import type {
  ReactionEmojiKey,
  ReactionEvent,
  ReactionPropagation,
  ReactionCounts,
  SurfaceId,
  PropagationAction,
} from "@/types/os";

import { getPropagationActionsForEmoji } from "./propagationConfig";
import { updateUserProfile } from "./userProfile";
import { logPropagation } from "./propagationLog";
import { addReaction, getAggregatedCounts as getCountsFromStore } from "./reactionStore";

type ReactionStore = {
  events: ReactionEvent[];
};

const store: ReactionStore = {
  events: [],
};

/**
 * Record a reaction event and trigger:
 * - user profile update
 * - propagation actions
 * - propagation logging
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

  // Update aggregated counts store
  addReaction(params.postId, params.emoji);

  // Update user emotional profile
  if (params.userId) {
    updateUserProfile(params.userId, params.emoji);
  }

  // Propagation actions
  const actions = getPropagationActionsForEmoji(params.emoji, params.postId);
  actions.forEach((a) => logPropagation(event, a));

  return event;
}

/**
 * Return all reaction events for a post
 */
export function getReactionsForPost(postId: string): ReactionEvent[] {
  return store.events.filter((e) => e.postId === postId);
}

/**
 * Return aggregated emoji counts for a post
 */
export function getAggregatedCounts(postId: string): ReactionCounts {
  return getCountsFromStore(postId);
}

/**
 * 7×7 propagation matrix (raw emotional propagation)
 */
export function propagateReactions(
  event: ReactionEvent
): ReactionPropagation[] {
  return REACTION_MATRIX.filter((p) => p.fromEmoji === event.emoji);
}

/**
 * High‑level propagation outputs:
 * “this reaction should trigger X in app Y”
 */
export function getPropagationOutputs(
  event: ReactionEvent
): PropagationAction[] {
  return getPropagationActionsForEmoji(event.emoji, event.postId);
}

/**
 * Return all reaction events (used for analytics)
 */
export function getAllEvents(): ReactionEvent[] {
  return [...store.events];
}
