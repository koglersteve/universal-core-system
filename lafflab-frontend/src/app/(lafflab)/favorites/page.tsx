import { getFavorites } from "@/lib/api/favorites";
import FeedList from "@/components/ui/lafflab/FeedList";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const data = await getFavorites();
  const posts = Array.isArray(data.items) ? data.items : [];

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>Your Favorites</h2>
      <FeedList />
    </div>
  );
}

