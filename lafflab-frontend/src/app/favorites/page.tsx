import { LaffLabApi } from "@/lib/LaffLabApi";
import FavoritesList from "@/components/favorites/FavoritesList";

export default async function FavoritesPage() {
  const favorites = await LaffLabApi.getFavorites();

  return (
    <div className="max-w-xl mx-auto">
      <FavoritesList posts={favorites} />
    </div>
  );
}
