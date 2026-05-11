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
  // Categories
  getCategories: () => get("/categories"),
  getCategory: (id: string) => get(`/categories/${id}`),

  // Posts
  getPosts: () => get("/posts"),

  // History
  getHistory: () => get("/history"),
  addHistory: (postId: string) => post("/history/add", { postId }),
  clearHistory: () => post("/history/clear"),

  // Ritual
  getRitual: () => get("/ritual"),

  // Notifications
  getNotifications: () => get("/notifications"),
  getNotificationInbox: () => get("/notifications/inbox"),
  getNotificationPreferences: () => get("/notifications/preferences"),

  // Settings
  getSettings: () => get("/settings"),

  // Feed
  fetchFeed: (params: { app: string; cursor?: string | null; limit?: number }) => {
    const url = new URL("/feed", API_BASE);
    url.searchParams.set("app", params.app);
    if (params.cursor) url.searchParams.set("cursor", params.cursor);
    if (params.limit) url.searchParams.set("limit", String(params.limit));
    return get(url.pathname + url.search);
  },
};
