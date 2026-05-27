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
// Unified LAFFlab API (app‑aware)
// ---------------------------------------------
export const LaffLabApi = {
  // -----------------------------
  // FEED (normalized to { posts, nextCursor })
  // -----------------------------
  fetchFeed: async (params?: {
    app?: string;
    cursor?: string | null;
    limit?: number;
  }) => {
    const search = new URLSearchParams();

    search.set("app", params?.app ?? "lafflab");
    if (params?.cursor) search.set("cursor", params.cursor);
    if (params?.limit) search.set("limit", String(params.limit));

    const data = await get(`/core/feed?${search.toString()}`);

    return {
      posts: Array.isArray(data.posts) ? data.posts : [],
      nextCursor: data.nextCursor ?? null,
    };
  },

  // -----------------------------
  // REACTIONS
  // -----------------------------
  react: (postId: string, reaction: string) =>
    post("/core/reactions/toggle", { postId, reaction }),

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
  // TRENDING (app‑specific)
  // -----------------------------
  getTrending: (app: string = "lafflab") => {
    const search = new URLSearchParams();
    search.set("app", app);
    return get(`/core/trending?${search.toString()}`);
  },

  // -----------------------------
  // SEARCH
  // -----------------------------
  searchPosts: (q: string) => {
    const search = new URLSearchParams();
    search.set("q", q);
    return get(`/core/search?${search.toString()}`);
  },

  // -----------------------------
  // PROFILE (logged‑in user)
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
