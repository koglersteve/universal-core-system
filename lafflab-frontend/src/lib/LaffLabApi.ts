// src/lib/LaffLabApi.ts

import type { Post } from "@/types/jokes";

export class LaffLabApi {
  private static BASE =
    process.env.NEXT_PUBLIC_API_URL || "https://api.lafflab.app";

  // --- Core fetch wrapper with retries, timeouts, and unified errors ---
  private static async request<T>(
    path: string,
    options: RequestInit = {},
    retries = 2
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(`${this.BASE}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status}: ${text || res.statusText}`);
      }

      return (await res.json()) as T;
    } catch (err: any) {
      clearTimeout(timeout);

      if (
        retries > 0 &&
        (err.name === "AbortError" || err.message.includes("Failed"))
      ) {
        return this.request<T>(path, options, retries - 1);
      }

      console.error("LaffLabApi request failed:", err);
      throw err;
    }
  }

  // --- Posts ---
  static async getPost(id: string): Promise<Post> {
    return this.request<Post>(`/posts/${id}`);
  }

  static async getPosts(): Promise<Post[]> {
    return this.request<Post[]>(`/posts`);
  }

  static async createPost(form: FormData): Promise<Post> {
    const res = await fetch(`${this.BASE}/posts`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Upload failed: ${text || res.statusText}`);
    }

    return res.json();
  }

  // --- History ---
  static async getHistory(): Promise<Post[]> {
    return this.request<Post[]>(`/history`);
  }

  // --- Favorites ---
  static async getFavorites(): Promise<{ favorites: string[] }> {
    return this.request<{ favorites: string[] }>(`/favorites`);
  }

  static async addFavorite(postId: string) {
    return this.request(`/favorites/${postId}`, { method: "POST" });
  }

  static async removeFavorite(postId: string) {
    return this.request(`/favorites/${postId}`, { method: "DELETE" });
  }

  // --- Semantic search (embeddings) ---
  static async searchSemantic(query: string): Promise<Post[]> {
    return this.request<Post[]>(`/search/semantic`, {
      method: "POST",
      body: JSON.stringify({ query }),
    });
  }
}

