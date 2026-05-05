// src/types/os/Propagation.ts

/**
 * Canonical Emotional OS surface taxonomy.
 * These are the real cross-app surfaces used by the feed,
 * analytics, creator hub, notifications, and influence map.
 */
export type SurfaceId =
  | "forYou"
  | "trending"
  | "following"
  | "creatorHub"
  | "notifications";

/**
 * Reaction channels describe how influence propagates between surfaces.
 */
export type ReactionChannel =
  | "direct"
  | "indirect"
  | "algorithmic";

/**
 * A propagation action describes how a reaction event influences another surface.
 */
export type PropagationAction = {
  from: SurfaceId;
  to: SurfaceId;
  channel: ReactionChannel;
  weight: number;
};

/**
 * ReactionEvent used by the propagation engine.
 */
export type ReactionEvent = {
  postId: string;
  userId: string;
  emoji: string;
  timestamp: number;
};
