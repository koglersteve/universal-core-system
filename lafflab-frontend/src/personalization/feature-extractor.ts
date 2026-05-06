// /src/personalization/feature-extractor.ts

import type { PersonalizationContext } from "./types";
import { LaffLabApi } from "@/lib/LaffLabApi";

export type PostFeature = {
  id: string;
  createdAt: string;
  authorId?: string;
  text?: string;
  tags?: string[];
  favorites?: number;
  shares?: number;
  views?: number;
};

export type ExtractedFeatures = {
  posts: PostFeature[];
};

export async function extractFeatures(
  ctx: PersonalizationContext
): Promise<ExtractedFeatures> {
  const posts = await LaffLabApi.getPosts();

  const features: PostFeature[] = posts.map((p) => ({
    id: p.id,
    createdAt: String(p.createdAt), // 🔥 normalize
    authorId: p.authorId,
    text: p.text,
    tags: p.tags ?? [],
    favorites: p.favorites ?? 0,
    shares: p.shares ?? 0,
    views: p.views ?? 0,
  }));

  return { posts: features };
}
