export async function recordImpression(postId: string, userId: string | null = null) {
  return { postId, userId, recorded: true };
}
