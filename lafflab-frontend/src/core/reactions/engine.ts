export function applyReactions(post: any, reaction?: any) {
  return post;
}

export function processReaction(reaction: any) {
  return { reaction };
}

export function getReactionSummary(postId: string) {
  return { postId, summary: {} };
}
