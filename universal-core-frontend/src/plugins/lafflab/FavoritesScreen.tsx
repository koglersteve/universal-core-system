"use client";

import { useEffect, useState } from "react";
import { CrossAppLauncher } from "@/components/crossapp/CrossAppLauncher";

type FavoriteItem = {
  id: string;
  text: string;
  category?: string;
  mood?: string;
};

export function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const res = await fetch("/api/lafflab/favorites");
        const data = await res.json();
        setFavorites(data.favorites || []);
      } catch {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  async function removeFavorite(id: string) {
    await fetch(`/api/lafflab/favorites/${id}`, {
      method: "DELETE"
    });

    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }

  if (loading) {
    return (
      <div className="favorites-container">
        <p className="favorites-loading">Loading your favorites…</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h2 className="favorites-title">Your Favorites</h2>
        <p className="favorites-empty">
          You haven’t saved anything yet.  
          Find something funny and tap the ⭐ to save it.
        </p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Your Favorites</h2>

      <div className="favorites-list">
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-card">
            <p className="favorite-text">{fav.text}</p>

            {fav.category && (
              <p className="favorite-meta">
                Category: {fav.category}
              </p>
            )}

            <div className="favorite-actions">
              <button
                className="favorite-remove"
                onClick={() => removeFavorite(fav.id)}
              >
                Remove
              </button>

              <CrossAppLauncher
                sourceApp="lafflab"
                payload={{
                  mood: fav.mood,
                  text: fav.text,
                  category: fav.category
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
