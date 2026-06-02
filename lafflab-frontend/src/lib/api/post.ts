import { get, post } from "./httpclient";

// GET /core/post/{id}
export async function getPost(id: string) {
  return get(`/core/post/${id}`);
}

// POST /core/posts
export async function createPost(content: string) {
  return post("/core/posts", { content });
}
