"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";
import { motion } from "framer-motion";

export default function ExplorePage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadRandom() {
    setLoading(true);
    try {
      const data = await LaffLabApi.getRandomJoke();
      setJoke(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRandom();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Explore Jokes</h1>

      {loading && <p>Loading…</p>}

      {joke && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="p-4 rounded-2xl bg-white shadow-md border border-brand-yellow/40"
        >
          <p className="text-lg text-black">{joke.text}</p>
        </motion.div>
      )}

      <button
        onClick={loadRandom}
        className="px-4 py-2 rounded-full bg-brand-pink text-white font-semibold shadow-md
                   hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                   transition-transform transition-colors"
      >
        Another One
      </button>
    </div>
  );
}
