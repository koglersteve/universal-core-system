// src/app/(lafflab)/favorites/page.tsx

import { LaffLabApi } from "@/lib/api";
import FeedList from "@/components/ui/lafflab/FeedList";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  // Backend returns { posts: [...] }
  const data = await LaffLabApi.getFavorites();

  const posts = Array.isArray(data.posts) ? data.posts : [];

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>Your Favorites</h2>
      <FeedList initialPosts={posts} />
    </div>
  );
}

