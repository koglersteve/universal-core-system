export type Post = {
  id: string;
  type: "video" | "audio" | "image" | "meme" | "text";
  mediaUrl?: string;
  text?: string;
  createdAt: string;
  creator: {
    id: string;
    screenName: string;
  };
};
