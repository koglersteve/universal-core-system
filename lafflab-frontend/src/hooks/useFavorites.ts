import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/api/favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getFavorites();
        setFavorites(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    }

    load();
  }, []);

  return favorites;
}
