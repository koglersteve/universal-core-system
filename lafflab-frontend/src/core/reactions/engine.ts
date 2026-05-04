import { randomUUID } from "crypto";
import { REACTION_MATRIX } from "./matrix";
import type {
  ReactionEmojiKey,
  ReactionEvent,
  ReactionPropagation,
  SurfaceId,
} from "./types";
import { getPropagationActionsForEmoji } from "./propagationConfig";
import type { PropagationAction } from "./propagationConfig";
import { updateUserProfile } from "./userProfile";
import { logPropagation } from "./propagationLog";

type ReactionStore = {
  events: ReactionEvent[];
};

const store: ReactionStore = {
  events: [],
};

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

  store.events.push(event);

  if (params.userId) {
    updateUserProfile(params.userId, params.emoji);
  }

  const actions = getPropagationActionsForEmoji(params.emoji);
  actions.forEach((a) => logPropagation(event, a));

  return event;
}

export function getReactionsForPost(postId: string): ReactionEvent[] {
  return store.events.filter((e) => e.postId === postId);
}

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

export function propagateReactions(
  event: ReactionEvent
): ReactionPropagation[] {
  return REACTION_MATRIX.filter((p) => p.fromEmoji === event.emoji);
}

export function getPropagationOutputs(
  event: ReactionEvent
): PropagationAction[] {
  return getPropagationActionsForEmoji(event.emoji);
}

export function getAllEvents(): ReactionEvent[] {
  return store.events;
}
