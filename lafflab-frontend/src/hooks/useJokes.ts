"use client";

import { useState, useEffect } from "react";
import { fetchJokes, fetchJoke } from "@/store/useJokesStore";

export function useJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchJokes();
      setJokes(data);
      setLoading(false);
    }
    load();
  }, []);

  return { jokes, loading, get: fetchJoke };
}

