// ─── Emotional OS · Reaction Types ──────────────────────────────

/** 7 base emotional signals */
export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "shock"
  | "expressionless"
  | "angry"
  | "mindblown"
  | "crickets";

/** A "surface" is any app/module/feed/widget */
export type SurfaceId = string;

/** A "channel" is how the reaction manifests */
export type ReactionChannel =
  | "feed"
  | "notification"
  | "badge"
  | "highlight"
  | "recommendation"
  | "analytics"
  | "crosslink";

export type ReactionEvent = {
  id: string;
  userId: string | null;
  postId: string;
  emoji: ReactionEmojiKey;
  surface: SurfaceId;
  createdAt: string;
};

export type ReactionPropagation = {
  fromEmoji: ReactionEmojiKey;
  toEmoji: ReactionEmojiKey;
  weight: number; // 0–1 influence
  channel: ReactionChannel;
};

/** Aggregated emoji counts for a single post */
export type ReactionCounts = Record<ReactionEmojiKey, number>;

/** A concrete propagation action targeting a specific surface and channel */
export type PropagationAction = {
  targetSurface: SurfaceId;
  channel: ReactionChannel;
  weight: number;
};

