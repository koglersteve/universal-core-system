import { db } from "@/lib/db";

export async function getPostsByUser(userId: string) {
  if (!db.post || !db.post.findMany) return [];
  return await db.post.findMany({ where: { authorId: userId } });
}
