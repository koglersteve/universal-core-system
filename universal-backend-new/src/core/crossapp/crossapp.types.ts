export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

export type ReactionPayload = {
  userId: string;
  postId: string;
  emoji: ReactionEmojiKey;
  sourceApp?: string;
};

export type ImpressionPayload = {
  userId: string;
  postId: string;
  sourceApp?: string;
};

export type ResonanceContext = {
  userId: string;
  postId: string;
  sourceApp?: string;
  signalType: "reaction" | "impression";
  emoji?: ReactionEmojiKey;
};

export type ResonanceResult = {
  score: number;
  magnitude: "low" | "medium" | "high";
  polarity: "positive" | "neutral" | "negative";
  tags: string[];
  createdAt: string;
};
