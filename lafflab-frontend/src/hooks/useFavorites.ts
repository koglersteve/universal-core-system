import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await LaffLabApi.getFavorites();
        setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    }

    load();
  }, []);

  return favorites;
}
