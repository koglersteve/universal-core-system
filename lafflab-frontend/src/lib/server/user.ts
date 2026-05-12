// Temporary server-side user module
// Matches minimal DB shape so the build passes

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

