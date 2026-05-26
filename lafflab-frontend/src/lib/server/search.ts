import { LaffLabApi } from "@/lib/api";

export async function search(query: string) {
  return LaffLabApi.searchPosts(query);
}
