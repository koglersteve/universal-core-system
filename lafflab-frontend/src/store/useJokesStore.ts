import { LaffLabApi } from "@/lib/api";

export async function fetchPosts() {
  return LaffLabApi.getPosts();
}

export async function fetchPost(id: string) {
  return LaffLabApi.getPost(id);
}
