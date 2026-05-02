"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import { motion } from "framer-motion";

export default function FeedPage() {
  const [items, setItems] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  async function loadMore() {
    setLoading(true);

    const all = await LaffLabApi.getJokes();

    // simulate pagination by chunking
    const chunk = all.slice((page - 1) * 10, page * 10);

    setItems((prev) => [...prev, ...chunk]);
    setPage((p) => p + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadMore();
  }, []);

  // infinite scroll trigger
  useEffect(() => {
    function onScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  return (
    <div className="space-y-6">
      {items.map((joke) => (
        <motion.div
          key={joke.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <JokeCard joke={joke} />
        </motion.div>
      ))}

      {loading && <p className="text-center opacity-70">Loading…</p>}
    </div>
  );
}
