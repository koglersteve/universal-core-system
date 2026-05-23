import { env } from "@/config/env";

const API = env.apiUrl;

// --- Core GET wrapper ---
async function get(path: string) {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

// --- Core POST wrapper ---
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
  // FEED — return array only
  fetchFeed: async () => {
    const data = await get(`/core/feed`);
    return data.posts; // <-- FIXED
  },

  // POSTS
  getPosts: async () => {
    const data = await get("/core/posts");
    return data.posts; // <-- FIXED
  },

  getPost: async (id: string) => {
    const data = await get(`/core/posts/${id}`);
    return data.post; // backend returns { post }
  },

  createPost: (body: any) => post("/core/posts", body),

  // FAVORITES
  getFavorites: async () => {
    const data = await get("/core/favorites");
    return data.favorites; // <-- FIXED
  },

  toggleFavorite: (id: string) => post(`/core/favorites/${id}/toggle`),

  // EXPLORE
  getExplore: async () => {
    const data = await get("/core/explore");
    return data.posts; // <-- FIXED
  },

  // TRENDING
  getTrending: async () => {
    const data = await get("/core/trending");
    return data.posts; // <-- FIXED
  },

  // SEARCH
  search: async (q: string) => {
    const data = await get(`/core/search?q=${encodeURIComponent(q)}`);
    return data.results; // <-- FIXED
  },

  // PROFILE
  getProfile: async (username: string) => {
    return get(`/core/profile/${username}`); // backend returns profile object directly
  },

  getProfilePosts: async (username: string) => {
    const data = await get(`/core/profile/${username}/posts`);
    return data.posts; // <-- FIXED
  },
};
