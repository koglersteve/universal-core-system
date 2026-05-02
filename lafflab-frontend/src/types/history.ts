export interface HistoryItem {
  id: string;

  // The backend may return ANY of these depending on version.
  // We support all without breaking TS.
  postId?: string;
  jokeId?: string;
  contentId?: string;

  viewedAt: string;

  // Optional future fields
  snapshot?: string;
  type?: string;
}
