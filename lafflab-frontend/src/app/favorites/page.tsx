"use client";

import { useEffect, useState } from "react";

interface FavoriteJoke {
  id: string;
  text: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteJoke[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>

      {favorites.length === 0 && (
        <p className="text-gray-600">You haven’t saved any jokes yet.</p>
      )}

      <ul className="space-y-4">
        {favorites.map((joke) => (
          <li
            key={joke.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            {joke.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
