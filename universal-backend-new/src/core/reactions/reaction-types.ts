// src/core/reactions/reaction-types.ts

export type LocalReactionEvent = {
  id: string;
  userId: string;
  appId: string;
  postId: string;
  emoji: string;
  timestamp: number; // always backend-generated
};
