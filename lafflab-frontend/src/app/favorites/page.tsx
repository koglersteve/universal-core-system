import FavoritesList from "@/components/favorites/FavoritesList";

export default function FavoritesPage() {
  const items: any[] = [];

  return (
    <div className="p-4">
      <FavoritesList items={items} />
    </div>
  );
}
