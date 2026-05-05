// src/types/os.ts

// Canonical emoji keys for Emotional OS
export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

// Aggregated counts for each emoji
export type ReactionCounts = {
  laugh: number;
  smile: number;
  expressionless: number;
  shock: number;
  mindblown: number;
  angry: number;
  crickets: number;
};

// Emotional OS feed surfaces
export type SurfaceId =
  | "forYou"
  | "trending"
  | "following"
  | "creatorHub"
  | "global";

// Emotional OS propagation channels
export type ReactionChannel =
  | "engagement"
  | "light-engagement"
  | "high-energy"
  | "viral"
  | "neutral"
  | "negative"
  | "silence";

// Base reaction event emitted by the engine
export type ReactionEvent = {
  id: string;
  postId: string;
  emoji: ReactionEmojiKey;
  userId: string | null;
  timestamp: number;
};

// Propagation action used by the Emotional OS feed engine
export type PropagationAction = {
  type: string;
  weight: number;
  targetSurface: SurfaceId;
  channel: ReactionChannel;
};

// Event used by the real‑time reaction stream
export type ReactionStreamEvent = ReactionEvent & {
  propagation?: PropagationAction;
};

// Emotional OS identity model for authenticated users
export type UserIdentity = {
  id: string;
  email: string | null;
  avatarUrl: string | null;
  displayName: string | null;
  createdAt: string | null;
};
