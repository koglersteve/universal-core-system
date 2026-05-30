// ---------------------------------------------
// Backend base URL
// ---------------------------------------------
let API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://universal-core-backend-production.up.railway.app";

API_BASE = API_BASE.replace(/\/+$/, "");

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
// Unified LAFFlab API (matches backend exactly)
// ---------------------------------------------
export const LaffLabApi = {
  // FEED — backend returns { items, nextCursor }
  fetchFeed: async (params?: { cursor?: string | null; limit?: number }) => {
    const search = new URLSearchParams();

    if (params?.cursor) search.set("cursor", params.cursor);
    if (params?.limit) search.set("limit", String(params.limit));

    return get(`/core/feed?${search.toString()}`);
  },

  // REACTIONS — backend route exists and must be supported
  react: (postId: string, reaction: string) =>
    post("/core/reactions/toggle", { postId, reaction }),

  // POSTS
  getPosts: () => get("/core/posts"),
  getPost: (id: string) => get(`/core/posts/${id}`),

  // FAVORITES
  getFavorites: () => get("/core/favorites"),

  // EXPLORE
  getExplore: () => get("/core/explore"),

  // TRENDING
  getTrending: () => get(`/core/trending?app=lafflab`),

  // SEARCH
  searchPosts: (q: string) => get(`/core/search?q=${encodeURIComponent(q)}`),

  // PROFILE
  getProfile: () => get("/core/profile"),

  // HEALTH
  getHealth: () => get("/core/health"),

  // Raw helpers
  rawGet: get,
  rawPost: post,
};
