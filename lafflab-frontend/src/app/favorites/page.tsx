// FILE: src/app/favorites/page.tsx

import FavoritesList from "@/components/FavoritesList";
import { getFavorites } from "@/lib/server/favorites";

export default async function FavoritesPage() {
  const items = await getFavorites();

  return (
    <div className="p-4">
      <FavoritesList items={items} />
    </div>
  );
}
