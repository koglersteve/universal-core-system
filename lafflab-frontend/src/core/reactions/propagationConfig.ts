// src/core/reactions/propagationConfig.ts

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

export type SurfaceId = string;

export type ReactionChannel = "local" | "global";

export type PropagationAction = {
  from: ReactionEmojiKey;
  to: ReactionEmojiKey;
  weight: number;
  channel: ReactionChannel;
};

export const PROPAGATION_CONFIG: PropagationAction[] = [
  { from: "laugh",        to: "smile",         weight: 0.6, channel: "local" },
  { from: "laugh",        to: "expressionless", weight: 0.2, channel: "local" },

  { from: "smile",        to: "laugh",         weight: 0.4, channel: "local" },
  { from: "smile",        to: "expressionless", weight: 0.3, channel: "local" },

  { from: "expressionless", to: "smile",       weight: 0.2, channel: "local" },

  { from: "shock",        to: "mindblown",     weight: 0.7, channel: "global" },
  { from: "shock",        to: "laugh",         weight: 0.3, channel: "local" },

  { from: "mindblown",    to: "shock",         weight: 0.5, channel: "global" },

  { from: "angry",        to: "expressionless", weight: 0.4, channel: "local" },

  { from: "crickets",     to: "expressionless", weight: 0.5, channel: "local" },
];
