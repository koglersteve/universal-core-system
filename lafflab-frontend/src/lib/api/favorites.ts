import { get, post, del } from "./httpclient";

// GET /core/favorites → { items: [...] }
export async function getFavorites() {
  return get<{ items: any[] }>("/core/favorites");
}

// POST /core/favorites/add
export async function addFavorite(postId: string) {
  return post("/core/favorites/add", { postId });
}

// DELETE /core/favorites/remove/{postId}
export async function removeFavorite(postId: string) {
  return del(`/core/favorites/remove/${postId}`);
}
