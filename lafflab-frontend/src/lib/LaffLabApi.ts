import { env } from "@/config/env";

const API = env.apiUrl;

async function get(path: string) {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

async function post(path: string, body?: any) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}

export const LaffLabApi = {
  fetchFeed: (params?: { app?: string; cursor?: string; limit?: number }) =>
    get(`/core/feed${params ? "?" + new URLSearchParams(params as any) : ""}`),

  getPosts: () => get("/core/posts"),
  getPost: (id: string) => get(`/core/posts/${id}`),
  createPost: (body: any) => post("/core/posts", body),

  getFavorites: () => get("/core/favorites"),
  toggleFavorite: (id: string) => post(`/core/favorites/${id}/toggle`),

  getExplore: () => get("/core/explore"),
  getTrending: () => get("/core/trending`"),

  search: (q: string) => get(`/core/search?q=${encodeURIComponent(q)}`),

  getProfile: (username: string) => get(`/core/profile/${username}`),
  getProfilePosts: (username: string) =>
    get(`/core/profile/${username}/posts`),
};
