import { LaffLabApi } from "@/lib/LaffLabApi";
import FavoritesList from "@/components/ui/lafflab/FavoritesList";
import SimpleHeader from "@/components/ui/lafflab/SimpleHeader";

export default async function FavoritesPage() {
  const favorites = await LaffLabApi.getFavorites();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "12px 12px 32px",
        background: "#05060A",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600 }}>
        <SimpleHeader title="Favorites" />
        <div style={{ marginTop: 20 }}>
          <FavoritesList posts={favorites} />
        </div>
      </div>
    </div>
  );
}
