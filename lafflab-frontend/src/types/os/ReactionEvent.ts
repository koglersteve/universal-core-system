// src/types/os/ReactionEvent.ts

import type { ReactionEmojiKey } from "./ReactionEmojiKey";
import type { SurfaceId } from "./SurfaceId";

/**
 * A single user → post reaction event on a given surface.
 */
export type ReactionEvent = {
  id: string;
  userId: string | null;
  postId: string;
  emoji: ReactionEmojiKey;
  surface: SurfaceId;
  createdAt: string;
};
