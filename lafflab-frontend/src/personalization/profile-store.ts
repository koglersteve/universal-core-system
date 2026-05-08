export async function loadProfile(userId: string | null = null) {
  return { id: userId, preferences: {} };
}

export async function getProfile(userId: string | null = null) {
  return { id: userId, preferences: {} };
}
