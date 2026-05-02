import { api } from "@/lib/client";
import type { Category } from "@/types/category";
import type { Joke } from "@/types/jokes";
import type { HistoryItem } from "@/types/history";
import type { Ritual } from "@/types/ritual";
import type { Post } from "@/types/jokes";

export const LaffLabApi = {
  // -------------------------
  // Categories
  // -------------------------
  getCategories(): Promise<Category[]> {
    return api("/categories");
  },

  getCategory(id: string): Promise<Category> {
    return api(`/categories/${id}`);
  },

  // -------------------------
  // Jokes (legacy)
  // -------------------------
  getJokes(): Promise<Joke[]> {
    return api("/jokes");
  },

  getJoke(id: string): Promise<Joke> {
    return api(`/jokes/${id}`);
  },

  getRandomJoke(): Promise<Joke> {
    return api("/jokes/random");
  },

  getJokesByCategory(categoryId: string): Promise<Joke[]> {
    return api(`/jokes/by-category?categoryId=${categoryId}`);
  },

  // -------------------------
  // History
  // -------------------------
  getHistory(): Promise<HistoryItem[]> {
    return api("/history/list");
  },

  addHistory(jokeId: string): Promise<void> {
    return api("/history/add", {
      method: "POST",
      body: JSON.stringify({ jokeId }),
    });
  },

  clearHistory(): Promise<void> {
    return api("/history/clear", { method: "POST" });
  },

  // -------------------------
  // Ritual
  // -------------------------
  generateRitual(): Promise<Ritual> {
    return api("/daily-ritual/generate", { method: "POST" });
  },

  // -------------------------
  // Health
  // -------------------------
  health(): Promise<{ status: string }> {
    return api("/health");
  },

  // -------------------------
  // POSTS (NEW — Full Media Feed)
  // -------------------------
  async getPosts(): Promise<Post[]> {
    const res = await fetch("http://localhost:8080/api/lafflab/posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch posts");
      return [];
    }

    const data = await res.json();

    // Normalize to Post[]
    return data.map((p: any) => ({
      id: String(p.id),
      type: p.type ?? "text",
      text: p.text ?? "",
      imageUrl: p.imageUrl ?? null,
      videoUrl: p.videoUrl ?? null,
      audioUrl: p.audioUrl ?? null,
      thumbnailUrl: p.thumbnailUrl ?? null,
      createdAt: p.createdAt ?? new Date().toISOString(),
    })) as Post[];
  },
};
