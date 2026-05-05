import { ReactionEmojiKey, ReactionEvent } from "@/types/os";
import { addReaction } from "./reactionStore";
import { updateUserProfile } from "./userProfile";
import { streamReaction } from "./stream";

/**
 * Core reaction engine entry point.
 * Handles:
 *  - updating aggregated reaction counts
 *  - updating user emotional profile
 *  - streaming reaction events to listeners
 */
export function handleReaction(params: {
  postId: string;
  emoji: ReactionEmojiKey;
  userId?: string;
}) {
  // Update aggregated counts store
  addReaction(params.postId, params.emoji);

  // Update user emotional profile
  if (params.userId) {
    updateUserProfile(params.userId, params.emoji);
  }

  // Stream reaction event
  const event: ReactionEvent = {
    postId: params.postId,
    emoji: params.emoji,
    userId: params.userId ?? null,
    timestamp: Date.now(),
  };

  streamReaction(event);
}
