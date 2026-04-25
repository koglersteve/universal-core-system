const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const ENDPOINTS = {
  RANDOM_JOKE: `${API_BASE_URL}/jokes/random`,
  JOKE_BY_ID: (id: string) => `${API_BASE_URL}/jokes/${id}`,
  JOKES_BY_CATEGORY: (id: string) => `${API_BASE_URL}/jokes/by-category?id=${id}`,
  CATEGORIES: `${API_BASE_URL}/categories`,
  CATEGORY_BY_ID: (id: string) => `${API_BASE_URL}/categories/${id}`,
  DAILY_RITUAL: `${API_BASE_URL}/daily-ritual/generate`,
  FAVORITES_LIST: `${API_BASE_URL}/favorites/list`,
  FAVORITES_ADD: `${API_BASE_URL}/favorites/add`,
  FAVORITES_REMOVE: `${API_BASE_URL}/favorites/remove`,
  HISTORY_LIST: `${API_BASE_URL}/history/list`,
};
