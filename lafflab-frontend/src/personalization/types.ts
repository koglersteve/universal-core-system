import type { Post } from "@/types/jokes";

export type PersonalizationContext = {
  userId: string;
  posts: Post[];
};
