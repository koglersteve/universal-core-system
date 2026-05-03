// 7 base emotional signals
export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "shock"
  | "expressionless"
  | "angry"
  | "mindblown"
  | "crickets";

// A "surface" is any app/module/feed/widget
export type SurfaceId = string;

// A "channel" is how the reaction manifests
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
