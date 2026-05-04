// src/types/os/PropagationAction.ts

import type { ReactionEmojiKey } from "./ReactionEmojiKey";
import type { SurfaceId } from "./SurfaceId";

/**
 * A "channel" is how the reaction manifests across the system.
 */
export type ReactionChannel =
  | "feed"
  | "notification"
  | "badge"
  | "highlight"
  | "recommendation"
  | "analytics"
  | "crosslink";

/**
 * A propagation rule between emojis (model-level).
 */
export type ReactionPropagation = {
  fromEmoji: ReactionEmojiKey;
  toEmoji: ReactionEmojiKey;
  weight: number; // 0–1 influence
  channel: ReactionChannel;
};

/**
 * A concrete propagation action targeting a specific surface and channel.
 */
export type PropagationAction = {
  targetSurface: SurfaceId;
  channel: ReactionChannel;
  weight: number;
};

