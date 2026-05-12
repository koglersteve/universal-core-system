export async function getUser() {
  return { user: null, session: null };
}

export async function getUserIdentity() {
  return null;
}

export async function getUserById(id: string) {
  return null;
}

export async function getFollowers(id: string) {
  return [];
}

export async function getFollowing(id: string) {
  return [];
}

export async function updateUserProfile(values: any) {
  return null;
}

export async function getFollowerCount(id: string) {
  const list = await getFollowers(id);
  return list.length;
}

export async function getFollowingCount(id: string) {
  const list = await getFollowing(id);
  return list.length;
}

export async function getPostCount(id: string) {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?userId=${id}`,
    { cache: "no-store" }
  ).then((r) => r.json());
  return posts.length;
}

