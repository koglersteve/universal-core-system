export const ENDPOINTS = {
  // Jokes
  RANDOM_JOKE: "/api/jokes/random",
  JOKE_BY_ID: (id: string) => `/api/jokes/${id}`,
  JOKES_BY_CATEGORY: (id: string) => `/api/jokes/by-category/${id}`,

  // Categories
  CATEGORIES: "/api/categories",
  CATEGORY_BY_ID: (id: string) => `/api/categories/${id}`,
  CATEGORIES_LIST: "/api/categories", // ← REQUIRED

  // Ritual
  DAILY_RITUAL: "/api/daily-ritual",

  // Favorites
  FAVORITES_LIST: "/api/favorites",
  FAVORITES_ADD: "/api/favorites/add",
  FAVORITES_REMOVE: "/api/favorites/remove",

  // History
  HISTORY_LIST: "/api/history",
};
