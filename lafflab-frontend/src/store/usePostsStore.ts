"use client";

import { getFeed } from "@/lib/api/feed";

export async function fetchPosts() {
  const data = await getFeed(null);
  return data.items;
}

export async function fetchPost(id: string) {
  // When backend adds /core/post/:id, update this.
  // For now, fetch feed and find the post.
  const data = await getFeed(null);
  return data.items.find((p) => p.id === id) || null;
}
