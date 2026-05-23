import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";

export function useFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LaffLabApi.fetchFeed()
      .then(setFeed)
      .finally(() => setLoading(false));
  }, []);

  return { feed, loading };
}
