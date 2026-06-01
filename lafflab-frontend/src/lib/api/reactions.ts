import { get, post } from "./httpclient";

export type ReactionPayload = {
  postId: string;
  emoji: string; // ReactionEmojiKey
  surface: string; // e.g. "lafflab-feed"
};

export type ReactionSummary = {
  postId: string;
  counts: Record<string, number>;
};

export async function sendReaction(payload: ReactionPayload) {
  return post("/core/reactions/add", payload);
}

export async function getReactionSummary(postId: string) {
  return get<ReactionSummary>(`/core/reactions/summary/${postId}`);
}

export async function getAllReactionsForPost(postId: string) {
  return get<{ events: any[] }>(`/core/reactions/events/${postId}`);
}
