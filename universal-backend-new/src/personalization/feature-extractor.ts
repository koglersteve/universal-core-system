import type { PersonalizationContext } from "./engine";

export type PostFeature = {
  id: string;
  createdAt: string;
  authorId?: string;
  text?: string;
  tags?: string[];
  // extend as needed
};

export type ExtractedFeatures = {
  posts: PostFeature[];
};

export async function extractFeatures(
  ctx: PersonalizationContext
): Promise<ExtractedFeatures> {
  // TODO: load posts + basic features from DB / API
  return {
    posts: [],
  };
}
