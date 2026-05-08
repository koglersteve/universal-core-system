export async function getVerificationContext(userId: string | null = null) {
  return { userId, status: "pending" };
}

export async function getVerificationUploadContext(userId: string | null = null) {
  return { userId, upload: true };
}

export async function getVerificationReviewDetails(userId: string | null = null) {
  return { userId, review: {} };
}

export async function getVerificationRetryReviewDetails(userId: string | null = null) {
  return { userId, retry: {} };
}
