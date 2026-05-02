import { api } from "@/lib/client";
import type { Category } from "@/types/category";
import type { HistoryItem } from "@/types/history";
import type { Ritual } from "@/types/ritual";
import type { Post } from "@/types/jokes";

export const LaffLabApi = {
  async getCategories(): Promise<Category[]> {
    return api.get("/categories");
  },

  async getCategory(id: string): Promise<Category> {
    return api.get(`/categories/${id}`);
  },

  async getPosts(): Promise<Post[]> {
    return api.get("/posts");
  },

  async getPost(id: string): Promise<Post> {
    return api.get(`/posts/${id}`);
  },

  async getHistory(): Promise<HistoryItem[]> {
    return api.get("/history");
  },

  async addHistory(postId: string): Promise<void> {
    await api.post("/history", { postId });
  },

  async clearHistory(): Promise<void> {
    await api.delete("/history");
  },

  async generateRitual(): Promise<Ritual> {
    return api.get("/daily-ritual/generate");
  },
};
