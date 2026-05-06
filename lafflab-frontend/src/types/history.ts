export interface HistoryItem {
  id: string;

  postId?: string;
  jokeId?: string;
  contentId?: string;

  viewedAt: string | number;

  snapshot?: string;
  type?: string;
}
