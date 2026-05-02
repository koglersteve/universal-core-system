export type PostType = "text" | "image" | "meme" | "video" | "audio";

export interface Post {
  id: string;
  type: PostType;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
}
