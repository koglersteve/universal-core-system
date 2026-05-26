// src/store/useJokesStore.ts
"use client";

import { LaffLabApi } from "@/lib/api";

export async function fetchPosts() {
  // Assuming jokes are just posts filtered server-side
  return LaffLabApi.getPosts();
}

export async function fetchPost(id: string) {
  return LaffLabApi.getPost(id);
}
