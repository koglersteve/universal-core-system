import { get, post, del } from "./httpclient";

export async function getFavorites() {
  return get<{ items: any[] }>("/core/favorites");
}

export async function addFavorite(postId: string) {
  return post("/core/favorites/add", { postId });
}

export async function removeFavorite(postId: string) {
  return del(`/core/favorites/remove/${postId}`);
}