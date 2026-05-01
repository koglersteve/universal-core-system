export interface Category {
  id: string;
  name: string;
}

export interface Joke {
  id: string;
  text: string;
  categoryId: string;
}

export interface HistoryItem {
  id: string;
  userId: string;
  viewedAt: number;
}

export interface Ritual {
  id: string;
  title: string;
  steps: string[];
  createdAt: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://universal-core-backend-production.up.railway.app");

export const LaffLabApi = {
  // Categories
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  async getCategory(id: string): Promise<Category> {
    const res = await fetch(`${API_URL}/categories/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch category");
    return res.json();
  },

  // Jokes
  async getJokes(): Promise<Joke[]> {
    const res = await fetch(`${API_URL}/jokes`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch jokes");
    return res.json();
  },

  async getJoke(id: string): Promise<Joke> {
    const res = await fetch(`${API_URL}/jokes/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch joke");
    return res.json();
  },

  async getRandomJoke(): Promise<Joke> {
    const res = await fetch(`${API_URL}/jokes/random`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch random joke");
    return res.json();
  },

  async getJokesByCategory(categoryId: string): Promise<Joke[]> {
    const res = await fetch(
      `${API_URL}/jokes/by-category?categoryId=${categoryId}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch jokes by category");
    return res.json();
  },

  // History
  async getHistory(): Promise<HistoryItem[]> {
    const res = await fetch(`${API_URL}/history/list`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch history");
    return res.json();
  },

  async addHistory(id: string): Promise<void> {
    await fetch(`${API_URL}/history/add`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
  },

  async clearHistory(): Promise<void> {
    await fetch(`${API_URL}/history/clear`, { method: "POST" });
  },

  // Ritual
  async generateRitual(): Promise<Ritual> {
    const res = await fetch(`${API_URL}/daily-ritual/generate`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to generate ritual");
    return res.json();
  },

  // Health
  async health(): Promise<{ status: string }> {
    const res = await fetch(`${API_URL}/health`, { cache: "no-store" });
    if (!res.ok) throw new Error("Health check failed");
    return res.json();
  },
};
