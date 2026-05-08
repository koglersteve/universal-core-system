export async function getUploadSession(userId: string | null = null) {
  return { userId, sessionId: "mock-session" };
}
