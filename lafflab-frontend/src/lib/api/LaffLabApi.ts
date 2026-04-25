export const LaffLabApi = {
  async getRandomJoke() {
    const res = await fetch("/api/jokes/random");
    if (!res.ok) throw new Error("Failed to fetch random joke");
    return res.json();
  },

  async getJokeById(id: string) {
    const res = await fetch(`/api/jokes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch joke");
    return res.json();
  },

  async getCategories() {
    const res = await fetch("/api/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  async getJokesByCategory(id: string) {
    const res = await fetch(`/api/jokes/by-category?id=${id}`);
    if (!res.ok) throw new Error("Failed to fetch jokes");
    return res.json();
  },

  async generateRitual() {
    const res = await fetch("/api/ritual/generate");
    if (!res.ok) throw new Error("Failed to generate ritual");
    return res.json();
  },
};
