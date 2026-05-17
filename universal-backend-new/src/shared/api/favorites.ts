import { apiPost } from "./client";

export function toggleFavorite(id) {
  return apiPost("/favorites/toggle", { id });
}
