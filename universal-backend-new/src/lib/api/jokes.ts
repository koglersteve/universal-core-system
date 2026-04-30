import { apiGet, apiPost } from "./client";

export function getCategories() {
  return apiGet("/categories");
}

export function getJokeById(id: string) {
  return apiGet(`/jokes/${id}`);
}

export function generateJoke(category?: string, mood?: string) {
  return apiPost("/jokes/generate", { category, mood });
}

export function recordView(id: string) {
  return apiPost(`/jokes/${id}/view`, {});
}
