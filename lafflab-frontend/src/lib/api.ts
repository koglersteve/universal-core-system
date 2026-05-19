const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://universal-core-backend-production.up.railway.app";

async function get(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

async function post(path: string, body?: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}

export const LaffLabApi = {
  // -------------------------
  // Categories
  // -------------------------
  getCategories: () => get("/modules/categories"),
  getCategory: (id: string) => get(`/modules/categories/${id}`),

  // -------------------------
  // Posts
  // -------------------------
  getPosts: () => get("/modules/posts"),
  getPost: (id: string) => get(`/modules/posts/${id}`),

  // -------------------------
  // History
  // -------------------------
  getHistory: () => get("/modules/history"),
  addHistory: (postId: string) => post("/modules/history/add", { postId }),
  clearHistory: () => post("/modules/history/clear"),

  // -------------------------
  // Ritual
  // -------------------------
  getRitual: () => get("/modules/ritual"),

  // -------------------------
  // Notifications
  // -------------------------
  getNotifications: () => get("/modules/notifications"),
  getNotificationInbox: () => get("/modules/notifications/inbox"),
  getNotificationPreferences: () => get("/modules/notifications/preferences"),

  // -------------------------
  // Settings
  // -------------------------
  getSettings: () => get("/modules/settings"),
  updateSettings: (patch: any) => post("/modules/settings/update", patch),

  // -------------------------
  // Personalization
  // -------------------------
  getPersonalizationProfile: () => get("/core/profile"),

  // -------------------------
  // Reactions
  // -------------------------
  sendReaction: (emoji: string) => post("/modules/reactions", { emoji }),
  getReactionSummary: () => get("/modules/reactions/summary"),

  // -------------------------
  // Feed (new backend)
  // -------------------------
  fetchFeed: (params: { app: string; cursor?: string | null; limit?: number }) => {
    const search = new URLSearchParams();
    search.set("app", params.app);
    if (params.cursor) search.set("cursor", params.cursor);
    if (params.limit) search.set("limit", String(params.limit));

    const query = search.toString();
    const path = query ? `/core/feed?${query}` : "/core/feed";

    return get(path);
  },
};
