import { apiPost } from "./client";

export function toggleFavorite(id: string) {
  return apiPost(`/favorites/toggle`, { id });
}
