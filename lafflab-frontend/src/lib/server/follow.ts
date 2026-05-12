type Follow = {
  followerId: string;
  followingId: string;
};

let follows: Follow[] = [];

export async function followUser(followerId: string, followingId: string) {
  if (!followerId || !followingId || followerId === followingId) return;

  const exists = follows.some(
    (f) => f.followerId === followerId && f.followingId === followingId
  );
  if (!exists) {
    follows.push({ followerId, followingId });
  }
}

export async function unfollowUser(followerId: string, followingId: string) {
  follows = follows.filter(
    (f) => !(f.followerId === followerId && f.followingId === followingId)
  );
}

export async function isFollowing(followerId: string, followingId: string) {
  return follows.some(
    (f) => f.followerId === followerId && f.followingId === followingId
  );
}

export async function getFollowers(userId: string) {
  return follows.filter((f) => f.followingId === userId).map((f) => f.followerId);
}

export async function getFollowing(userId: string) {
  return follows.filter((f) => f.followerId === userId).map((f) => f.followingId);
}

export async function getFollowerCount(userId: string) {
  const list = await getFollowers(userId);
  return list.length;
}

export async function getFollowingCount(userId: string) {
  const list = await getFollowing(userId);
  return list.length;
}
