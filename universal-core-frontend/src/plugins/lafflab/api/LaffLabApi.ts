import { laffLabHttpClient } from "./httpClient";

export type Joke = {
  id: string;
  text: string;
  category: string;
  createdAt?: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type DailyRitual = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export const LaffLabApi = {
  async getRandomJoke(): Promise<Joke> {
    return laffLabHttpClient.get<Joke>("/jokes/random");
  },

  async getJokesByCategory(categoryId: string): Promise<Joke[]> {
    return laffLabHttpClient.get<Joke[]>(`/categories/${categoryId}/jokes`);
  },

  async getCategories(): Promise<Category[]> {
    return laffLabHttpClient.get<Category[]>("/categories");
  },

  async getFavorites(): Promise<Joke[]> {
    return laffLabHttpClient.get<Joke[]>("/favorites");
  },

  async toggleFavorite(jokeId: string): Promise<{ isFavorite: boolean }> {
    return laffLabHttpClient.post<{ isFavorite: boolean }>("/favorites/toggle", { jokeId });
  },

  async getHistory(): Promise<Joke[]> {
    return laffLabHttpClient.get<Joke[]>("/history");
  },

  async addToHistory(jokeId: string): Promise<void> {
    await laffLabHttpClient.post("/history", { jokeId });
  },

  async getDailyRitual(): Promise<DailyRitual> {
    return laffLabHttpClient.get<DailyRitual>("/daily-ritual");
  },

  async completeDailyRitual(ritualId: string): Promise<void> {
    await laffLabHttpClient.post("/daily-ritual/complete", { ritualId });
  },
};
