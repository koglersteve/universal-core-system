import type { ReactionEmojiKey } from "./stream";

/**
 * Apply a reaction to a post.
 * (Currently a passthrough until backend reaction logic is added.)
 */
export function applyReactions(post: any, reaction?: ReactionEmojiKey) {
  return post;
}

/**
 * Process a reaction event.
 * (Stub for future backend integration.)
 */
export function processReaction(reaction: {
  postId: string;
  emoji: ReactionEmojiKey;
}) {
  return { reaction };
}

/**
 * Return a summary object for a post's reactions.
 * (Stub for future backend integration.)
 */
export function getReactionSummary(postId: string) {
  return { postId, summary: {} };
}
