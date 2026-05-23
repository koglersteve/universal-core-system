const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://universal-core-backend-production.up.railway.app";

async function get(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return res.json();
}

async function post(path: string, body?: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`POST ${path} failed with ${res.status}`);
  return res.json();
}

export const LaffLabApi = {
  // Core feed
  fetchFeed: (params?: { app?: string; cursor?: string | null; limit?: number }) => {
    const search = new URLSearchParams();
    if (params?.app) search.set("app", params.app);
    if (params?.cursor) search.set("cursor", params.cursor);
    if (params?.limit) search.set("limit", String(params.limit));

    const query = search.toString();
    const path = query ? `/core/feed?${query}` : "/core/feed";

    return get(path);
  },

  // Posts
  getPosts: () => get("/core/posts"),
  getPost: (id: string) => get(`/core/posts/${id}`),

  // Favorites
  getFavorites: () => get("/core/favorites"),

  // Explore
  getExplore: () => get("/core/explore"),

  // Trending
  getTrending: () => get("/core/trending"),

  // Search
  searchPosts: (q: string) => {
    const search = new URLSearchParams();
    search.set("q", q);
    return get(`/core/search?${search.toString()}`);
  },

  // Profile
  getProfile: () => get("/core/profile"),

  // Health
  getHealth: () => get("/core/health"),

  // Generic helpers if needed later
  rawGet: get,
  rawPost: post,
};
