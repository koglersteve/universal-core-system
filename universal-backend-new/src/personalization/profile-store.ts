export type UserProfile = {
  id: string;
  interests?: string[];
  favoriteAuthors?: string[];
  recentEmotions?: string[];
  // extend as needed
};

export async function getUserProfile(
  userId: string
): Promise<UserProfile> {
  // TODO: load from DB / KV store
  return {
    id: userId,
    interests: [],
    favoriteAuthors: [],
    recentEmotions: [],
  };
}
