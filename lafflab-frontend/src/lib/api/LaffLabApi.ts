export const LaffLabApi = {
  async getRandomJoke() { /* existing */ },
  async getJokeById(id: string) { /* existing */ },
  async getCategories() { /* existing */ },
  async getJokesByCategory(id: string) { /* existing */ },
  async getJokes() { /* existing */ },
  async generateRitual() { /* existing */ },

  history: {
    async list() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/history/list`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) return [];
      return res.json();
    },

    async add(id: string) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/history/add`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
    },

    async clear() {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/history/clear`, {
        method: "POST",
      });
    },
  },
};
