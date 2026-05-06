// /src/personalization/feature-extractor.ts

import type { PersonalizationContext } from "./types";
import { LaffLabApi } from "@/lib/LaffLabApi";

export type PostFeature = {
  id: string;
  createdAt: string;
  text?: string;
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
    createdAt: String(p.createdAt),
    text: p.text,
  }));

  return { posts: features };
}
