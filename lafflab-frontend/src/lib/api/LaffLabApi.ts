import { ENDPOINTS } from "./endpoints";

export const LaffLabApi = {
  async getRandomJoke() {
    const res = await fetch(ENDPOINTS.RANDOM_JOKE);
    if (!res.ok) throw new Error("Failed to fetch random joke");
    return res.json();
  },

  async getJokeById(id: string) {
    const res = await fetch(ENDPOINTS.JOKE_BY_ID(id));
    if (!res.ok) throw new Error("Failed to fetch joke");
    return res.json();
  },

  async getCategories() {
    const res = await fetch(ENDPOINTS.CATEGORIES);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  async getJokesByCategory(id: string) {
    const res = await fetch(ENDPOINTS.JOKES_BY_CATEGORY(id));
    if (!res.ok) throw new Error("Failed to fetch jokes");
    return res.json();
  },

  async generateRitual() {
    const res = await fetch(ENDPOINTS.DAILY_RITUAL);
    if (!res.ok) throw new Error("Failed to generate ritual");
    return res.json();
  },
};
