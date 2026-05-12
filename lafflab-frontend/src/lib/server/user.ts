import { db } from "@/lib/db";

export async function getUser() {
  const session = await db.session.get();
  const user = session ? await db.user.find(session.userId) : null;
  return { user, session };
}

export async function getUserIdentity() {
  const session = await db.session.get();
  if (!session) return null;
  return await db.user.find(session.userId);
}

export async function getUserById(id: string) {
  return await db.user.find(id);
}

export async function getFollowers(id: string) {
  return await db.user.followers(id);
}

export async function getFollowing(id: string) {
  return await db.user.following(id);
}

export async function updateUserProfile(values: any) {
  const session = await db.session.get();
  if (!session) return null;
  return await db.user.update(session.userId, values);
}

