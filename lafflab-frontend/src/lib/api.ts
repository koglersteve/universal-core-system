import { api } from "@/lib/client";
import type { Category } from "@/types/category";
import type { Joke } from "@/types/jokes";
import type { HistoryItem } from "@/types/history";
import type { Ritual } from "@/types/ritual";

export const LaffLabApi = {
  // Categories
  getCategories(): Promise<Category[]> {
    return api("/categories");
  },

  getCategory(id: string): Promise<Category> {
    return api(`/categories/${id}`);
  },

  // Jokes
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

  // History
  getHistory(): Promise<HistoryItem[]> {
    return api("/history/list");
  },

  addHistory(id: string): Promise<void> {
    return api("/history/add", {
      method: "POST",
      body: JSON.stringify({ id })
    });
  },

  clearHistory(): Promise<void> {
    return api("/history/clear", { method: "POST" });
  },

  // Ritual
  generateRitual(): Promise<Ritual> {
    return api("/daily-ritual/generate", { method: "POST" });
  },

  // Health
  health(): Promise<{ status: string }> {
    return api("/health");
  }
};
