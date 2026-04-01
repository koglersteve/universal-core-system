"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmotionalWorld {
  id: string;
  name: string;
  theme?: string;
}

export function EmotionalWorldSwitcher({
  worlds,
  onSelect
}: {
  worlds: EmotionalWorld[];
  onSelect?: (world: EmotionalWorld) => void;
}) {
  const [active, setActive] = useState<string | null>(null);

  function select(world: EmotionalWorld) {
    setActive(world.id);
    onSelect?.(world);
  }

  return (
    <div className="world-switcher">
      {worlds.map(world => (
        <motion.div
          key={world.id}
          onClick={() => select(world)}
          className={`world-card ${active === world.id ? "active" : ""}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <h4 className="world-card-title">{world.name}</h4>

          <AnimatePresence>
            {active === world.id && (
              <motion.div
                className="world-highlight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
