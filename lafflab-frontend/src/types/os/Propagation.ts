// src/types/os/Propagation.ts

/**
 * Canonical Emotional OS surface taxonomy.
 * These surfaces represent the real cross-app influence targets
 * used by the feed, creator hub, analytics, and influence map.
 */
export type SurfaceId =
  | "forYou"
  | "trending"
  | "following"
  | "creatorHub"
  | "global"
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
  targetSurface: SurfaceId;
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
