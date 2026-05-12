import { db } from "@/lib/db";

export async function getPosts() {
  if (!db.post || !db.post.findMany) return [];
  return await db.post.findMany();
}

export async function getPostsByUser(userId: string) {
  if (!db.post || !db.post.findMany) return [];
  const all = await db.post.findMany();
  return all.filter((p) => p.authorId === userId);
}
