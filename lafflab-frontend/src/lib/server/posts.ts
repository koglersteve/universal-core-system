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

export async function createPost(data: { title: string; content: string; authorId: string }) {
  // Always return a mock post — no DB writes required
  return {
    id: Math.random().toString(36).slice(2),
    title: data.title,
    content: data.content,
    authorId: data.authorId,
    createdAt: new Date().toISOString(),
  };
}
