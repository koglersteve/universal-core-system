// src/lib/api/endpoints.ts

export const API = {
  jokes: {
    random: "/api/jokes/random",
    byCategory: "/api/jokes/by-category",
    byId: (id: string) => `/api/jokes/${id}`,
  },
  categories: "/api/categories",
  favorites: {
    add: "/api/favorites/add",
    remove: "/api/favorites/remove",
    list: "/api/favorites/list",
  },
  history: {
    list: "/api/history/list",
  },
  ritual: {
    generate: "/api/ritual/generate",
  },
};
