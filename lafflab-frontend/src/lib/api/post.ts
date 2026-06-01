import { post } from "./httpclient";

export async function createPost(content: string) {
  return post("/core/posts", { content });
}
