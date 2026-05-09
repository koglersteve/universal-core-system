export type NotificationPreferences = {
  trending: boolean;
  system: boolean;
  newPost: boolean;
  creatorUpdate: boolean;
};

export async function getUserPreferences(userId: string): Promise<NotificationPreferences> {
  return {
    trending: true,
    system: true,
    newPost: true,
    creatorUpdate: true,
  };
}
