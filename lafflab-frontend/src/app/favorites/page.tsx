import FavoritesList from "@components/FavoritesList";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getFavorites } from "@lib/server/favorites";

export default async function FavoritesPage() {
  try {
    const items = await getFavorites();

    if (!items || items.length === 0) {
      return <EmptyState title="No Favorites Yet" message="Save jokes you love." />;
    }

    return (
      <div className="p-4">
        <FavoritesList items={items} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load favorites." />;
  }
}
