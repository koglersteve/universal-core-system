export function extractSignals(post: any, user: any = null) {
  return { postId: post?.id ?? null, signals: {} };
}

