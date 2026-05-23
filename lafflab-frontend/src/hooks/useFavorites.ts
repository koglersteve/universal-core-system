import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LaffLabApi.getFavorites()
      .then(setFavorites)
      .finally(() => setLoading(false));
  }, []);

  return { favorites, loading };
}
