// Inside src/types/os.ts

export type ReactionStreamEvent = {
  id: string;
  postId: string;
  emoji: ReactionEmojiKey;
  userId: string | null;
  timestamp: number;
  propagation?: {
    type: string;
    weight: number;
    targetSurface: string;
    channel: string;
  };
};
