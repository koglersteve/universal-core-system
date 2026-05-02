"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const [joke, setJoke] = useState<Joke | null>(null);

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getRandomJoke();
      setJoke(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight">LAFFLab</h1>

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

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/explore"
          className="p-4 rounded-full bg-brand-pink text-white font-semibold shadow-md
                     hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                     transition-transform transition-colors text-center"
        >
          Explore
        </Link>

        <Link
          href="/categories"
          className="p-4 rounded-full bg-brand-pink text-white font-semibold shadow-md
                     hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                     transition-transform transition-colors text-center"
        >
          Categories
        </Link>

        <Link
          href="/ritual"
          className="p-4 rounded-full bg-brand-pink text-white font-semibold shadow-md
                     hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                     transition-transform transition-colors text-center"
        >
          Ritual
        </Link>

        <Link
          href="/favorites"
          className="p-4 rounded-full bg-brand-pink text-white font-semibold shadow-md
                     hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                     transition-transform transition-colors text-center"
        >
          Favorites
        </Link>
      </div>
    </div>
  );
}
