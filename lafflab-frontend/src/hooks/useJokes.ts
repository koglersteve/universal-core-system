"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api/LaffLabApi";

export function useJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await LaffLabApi.getJokes(); // <-- correct call
        setJokes(data);
      } catch (err) {
        console.error("Failed to load jokes", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { jokes, loading };
}

