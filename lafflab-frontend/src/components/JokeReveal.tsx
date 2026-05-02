"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function JokeReveal({ text }: { text: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="p-4 rounded-2xl bg-white shadow-md border border-brand-yellow/40 text-black"
    >
      <p className="text-lg font-medium">
        {revealed ? text : text.split(".")[0] + "..."}
      </p>

      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="mt-3 px-4 py-2 rounded-full bg-brand-pink text-white font-semibold shadow-md
                     hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                     transition-transform transition-colors"
        >
          Reveal Punchline
        </button>
      )}
    </motion.div>
  );
}
