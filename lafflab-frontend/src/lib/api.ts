// src/lib/api.ts

// ---------------------------------------------
// Backend base URL resolution
// ---------------------------------------------
const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://universal-core-backend-production.up.railway.app";

// ---------------------------------------------
// Core GET wrapper
// ---------------------------------------------
async function get(path: string) {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`GET ${url} failed with ${res.status}`);
  }

  return res.json();
}

// ---------------------------------------------
// Core POST wrapper
// ---------------------------------------------
async function post(path: string, body?: any) {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`POST ${url} failed with ${res.status}`);
  }

  return res.json();
}

// ---------------------------------------------
// Unified LAFFlab API
// ---------------------------------------------
export const LaffLabApi = {
  // -----------------------------
  // FEED (cursor‑based pagination)
  // -----------------------------
  fetchFeed: (params?: { app?: string; cursor?: string | null; limit?: number }) => {
    const search = new URLSearchParams();

    // Default app = lafflab
    search.set("app", params?.app ?? "lafflab");

    if (params?.cursor) search.set("cursor", params.cursor);
    if (params?.limit) search.set("limit", String(params.limit));

    const query = search.toString();
    const path = query ? `/core/feed?${query}` : "/core/feed";

    return get(path);
  },

  // -----------------------------
  // POSTS
  // -----------------------------
  getPosts: () => get("/core/posts"),
  getPost: (id: string) => get(`/core/posts/${id}`),

  // -----------------------------
  // FAVORITES
  // -----------------------------
  getFavorites: () => get("/core/favorites"),

  // -----------------------------
  // EXPLORE
  // -----------------------------
  getExplore: () => get("/core/explore"),

  // -----------------------------
  // TRENDING
  // -----------------------------
  getTrending: () => get("/core/trending"),

  // -----------------------------
  // SEARCH
  // -----------------------------
  searchPosts: (q: string) => {
    const search = new URLSearchParams();
    search.set("q", q);
    return get(`/core/search?${search.toString()}`);
  },

  // -----------------------------
  // PROFILE
  // -----------------------------
  getProfile: () => get("/core/profile"),

  // -----------------------------
  // HEALTH
  // -----------------------------
  getHealth: () => get("/core/health"),

  // -----------------------------
  // Raw helpers
  // -----------------------------
  rawGet: get,
  rawPost: post,
};
