export type ReactionEvent = {
  postId: string;
  reactionKey: string;
  timestamp: number;
};

const reactionEvents: ReactionEvent[] = [];

export function recordReaction(postId: string, reactionKey: string) {
  reactionEvents.push({ postId, reactionKey, timestamp: Date.now() });
}

export function getTopReacted(limit = 10) {
  const counts: Record<string, number> = {};
  for (const ev of reactionEvents) {
    counts[ev.postId] = (counts[ev.postId] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([postId, count]) => ({ postId, count }));
}
