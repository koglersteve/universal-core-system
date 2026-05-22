export type Post = {
  id: string;
  type: string;
  text?: string | null;
  mediaUrl?: string | null;
  score: number;
  createdAt: string;
  creatorId: string;
  app?: string | null;
};

