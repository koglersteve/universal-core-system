export async function loadProfile(userId: string) {
  return { id: userId, preferences: {} };
}

export async function getProfile(userId: string) {
  return { id: userId, preferences: {} };
}
