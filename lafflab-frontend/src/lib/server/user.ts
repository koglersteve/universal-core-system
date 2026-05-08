// lafflab-frontend/src/lib/server/user.ts

export type UserIdentity = {
  id: string;
  status: string;
};

export async function getUserIdentity(): Promise<UserIdentity> {
  return {
    id: "demo-user",
    status: "unverified",
  };
}

// ---------------------------------------------------------
// Followers
// ---------------------------------------------------------

export async function getFollowers(userId: string) {
  // Placeholder until backend is wired
  return [
    { id: "follower-1", name: "Follower One" },
    { id: "follower-2", name: "Follower Two" },
  ];
}

// ---------------------------------------------------------
// Following
// ---------------------------------------------------------

export async function getFollowing(userId: string) {
  return [
    { id: "following-1", name: "Following One" },
    { id: "following-2", name: "Following Two" },
  ];
}

// ---------------------------------------------------------
// User by ID
// ---------------------------------------------------------

export async function getUserById(userId: string) {
  return {
    id: userId,
    name: "Demo User",
    bio: "This is a placeholder user profile.",
  };
}
