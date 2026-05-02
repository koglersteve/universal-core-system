// src/lib/LaffLabApi.ts

export class LaffLabApi {
  private static BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.lafflab.app";

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

      if (retries > 0 && (err.name === "AbortError" || err.message.includes("Failed"))) {
        return this.request<T>(path, options, retries - 1);
      }

      console.error("LaffLabApi request failed:", err);
      throw err;
    }
  }

  // --- Posts ---
  static async getPost(id: string) {
    return this.request(`/posts/${id}`);
  }

  static async getPosts() {
    return this.request(`/posts`);
  }

  static async createPost(form: FormData) {
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
  static async getHistory() {
    return this.request(`/history`);
  }

  // --- Favorites ---
  static async getFavorites() {
    return this.request<{ favorites: string[] }>(`/favorites`);
  }

  static async addFavorite(postId: string) {
    return this.request(`/favorites/${postId}`, { method: "POST" });
  }

  static async removeFavorite(postId: string) {
    return this.request(`/favorites/${postId}`, { method: "DELETE" });
  }
}

