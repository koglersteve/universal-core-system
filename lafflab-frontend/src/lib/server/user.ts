import {
  getFollowers as _getFollowers,
  getFollowing as _getFollowing,
  getFollowerCount as _getFollowerCount,
  getFollowingCount as _getFollowingCount,
} from "@/lib/server/follow";

export async function getUser() {
  return { user: null, session: null };
}

export async function getUserIdentity() {
  return null;
}

export async function getUserById(id: string) {
  return null;
}

export async function updateUserProfile(values: any) {
  return null;
}

export async function getPostCount(id: string) {
  const posts = await fetch(`/api/posts?userId=${id}`, {
    cache: "no-store",
  }).then((r) => r.json());

  return posts.length;
}

export const getFollowers = _getFollowers;
export const getFollowing = _getFollowing;
export const getFollowerCount = _getFollowerCount;
export const getFollowingCount = _getFollowingCount;

