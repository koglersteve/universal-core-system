// lafflab-frontend/src/lib/server/user.ts

export type UserIdentity = {
  id: string;
  status: string;
};

export async function getUserIdentity(): Promise<UserIdentity> {
  // Placeholder implementation until backend is wired
  return {
    id: "demo-user",
    status: "unverified",
  };
}
