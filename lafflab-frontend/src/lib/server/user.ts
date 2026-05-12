import { db } from "@/lib/db";

export async function getUser() {
  const session = await db.session.get();
  const user = session ? await db.user.find(session.userId) : null;
  return { user, session };
}

export async function updateUserProfile(values: any) {
  const session = await db.session.get();
  if (!session) return null;

  const updated = await db.user.update(session.userId, values);
  return updated;
}
