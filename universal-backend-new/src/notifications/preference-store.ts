export type NotificationPreferences = {
  trending: boolean;
  newPosts: boolean;
  creatorUpdates: boolean;
  system: boolean;
};

export async function getUserPreferences(
  userId: string
): Promise<NotificationPreferences> {
  // TODO: load from DB / KV
  return {
    trending: true,
    newPosts: true,
    creatorUpdates: true,
    system: true,
  };
}
