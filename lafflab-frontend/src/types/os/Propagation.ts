// src/types/os/Propagation.ts

/**
 * A surface is any cross-app entity that can receive influence.
 * Example: "feed", "creator_profile", "notifications", etc.
 */
export type SurfaceId =
  | "feed"
  | "creator_profile"
  | "notifications"
  | "analytics"
  | "reactions";

/**
 * Reaction channels describe how influence spreads across surfaces.
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
