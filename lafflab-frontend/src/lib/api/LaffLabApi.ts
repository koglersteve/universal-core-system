export const LaffLabApi = {
  async fetchFeed() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/feed`);
    return res.json();
  },

  async getFavorites(userId: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/favorites?userId=${userId}`
    );
    return res.json();
  },

  async toggleFavorite(postId: string, userId: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/favorites/${postId}/toggle`,
      {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.json();
  },

  async react(postId: string, userId: string, emoji: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/posts/${postId}/react`,
      {
        method: "POST",
        body: JSON.stringify({ userId, emoji }),
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.json();
  },
};
