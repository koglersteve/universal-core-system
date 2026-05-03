// /src/personalization/profile-store.ts
export type UserProfile = {
  id: string;
  interests: string[];
  favoriteAuthors: string[];
  recentEmotions: string[];
};

export async function getUserProfile(
  userId: string
): Promise<UserProfile> {
  // TODO: replace with real DB
  return {
    id: userId,
    interests: ["comedy", "dark", "observational"],
    favoriteAuthors: [],
    recentEmotions: ["amused", "delighted"],
  };
}
