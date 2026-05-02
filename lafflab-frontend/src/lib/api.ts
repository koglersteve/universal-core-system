import { api } from "@/lib/client";
import type { Category } from "@/types/category";
import type { HistoryItem } from "@/types/history";
import type { Ritual } from "@/types/ritual";
import type { Post } from "@/types/jokes";

export const LaffLabApi = {
  async getCategories(): Promise<Category[]> {
    return api("/categories");
  },

  async getCategory(id: string): Promise<Category> {
    return api(`/categories/${id}`);
  },

  async getPosts(): Promise<Post[]> {
    return api("/posts");
  },

  async getPost(id: string): Promise<Post> {
    return api(`/posts/${id}`);
  },

  async getHistory(): Promise<HistoryItem[]> {
    return api("/history");
  },

  async addHistory(postId: string): Promise<void> {
    await api("/history", {
      method: "POST",
      body: JSON.stringify({ postId }),
    });
  },

  async clearHistory(): Promise<void> {
    await api("/history", {
      method: "DELETE",
    });
  },

  async generateRitual(): Promise<Ritual> {
    return api("/daily-ritual/generate");
  },
};
import type { Post } from "@/types/jokes";
// ...existing imports and LaffLabApi methods...

export const LaffLabApi = {
  // ...existing methods...

  async getFavorites(): Promise<Post[]> {
    return api("/favorites");
  },

  async addFavorite(postId: string): Promise<void> {
    await api("/favorites", {
      method: "POST",
      body: JSON.stringify({ postId }),
      headers: { "Content-Type": "application/json" },
    });
  },

  async removeFavorite(postId: string): Promise<void> {
    await api(`/favorites/${postId}`, {
      method: "DELETE",
    });
  },
};
