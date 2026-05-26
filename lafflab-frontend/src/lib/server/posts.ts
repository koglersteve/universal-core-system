import { LaffLabApi } from "@/lib/api";

export async function getPosts() {
  return LaffLabApi.getPosts();
}

export async function getPostsByUser(userId: string) {
  return LaffLabApi.rawGet(`/core/posts?userId=${userId}`);
}

export async function createPost(data: { title: string; content: string; authorId: string }) {
  return LaffLabApi.rawPost("/core/posts", data);
}
