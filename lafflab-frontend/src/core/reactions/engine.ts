export function applyReactions(post: any, reaction: any) {
  return post;
}

export function processReaction(postId: string, reaction: any) {
  return { postId, reaction };
}

export function getReactionSummary(postId: string) {
  return { postId, summary: {} };
}
