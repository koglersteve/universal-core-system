import type { ReactionEmojiKey } from "./ReactionEmojiKey";
import type { SurfaceId } from "./SurfaceId";

export type ReactionEvent = {
  id: string;
  userId: string | null;
  postId: string;
  emoji: ReactionEmojiKey;
  surface: SurfaceId;
  createdAt: string;
};
