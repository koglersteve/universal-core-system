"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import { motion } from "framer-motion";
import JokeCard from "@/components/JokeCard";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="space-y-6">
      {favorites.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur"
        >
          <p className="text-lg font-semibold mb-2">No favorites yet!</p>
          <p className="text-sm opacity-80">
            Go explore and tap the heart to save jokes you love.
          </p>

          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-4xl mt-4"
          >
            💖
          </motion.div>
        </motion.div>
      )}

      <div className="space-y-4">
        {favorites.map((joke) => (
          <JokeCard key={joke.id} joke={joke} />
        ))}
      </div>
    </div>
  );
}
