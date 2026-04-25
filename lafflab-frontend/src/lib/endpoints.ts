export const ENDPOINTS = {
  RANDOM_JOKE: "/api/jokes/random",
  JOKE_BY_ID: (id: string) => `/api/jokes/${id}`,
  JOKES_BY_CATEGORY: (id: string) => `/api/jokes/by-category/${id}`,

  CATEGORIES: "/api/categories",
  CATEGORY_BY_ID: (id: string) => `/api/categories/${id}`,
  CATEGORIES_LIST: "/api/categories",   // ← REQUIRED FIX

  DAILY_RITUAL: "/api/daily-ritual",

  FAVORITES_LIST: "/api/favorites",
  FAVORITES_ADD: "/api/favorites/add",
  FAVORITES_REMOVE: "/api/favorites/remove",

  HISTORY_LIST: "/api/history",
};
