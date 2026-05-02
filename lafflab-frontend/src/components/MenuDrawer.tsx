"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiSearch, FiHeart, FiBook, FiLayers, FiSmile } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function MenuDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Icon */}
      <button
        onClick={() => setOpen(true)}
        className="p-3 text-2xl text-white hover:scale-110 active:scale-95 transition"
        aria-label="Open menu"
      >
        <FiMenu />
      </button>

      {/* Drawer + Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="fixed top-0 left-0 h-full w-72 bg-brand-dark text-white z-50 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-lg font-bold">LAFFLab</h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-2xl hover:scale-110 active:scale-95 transition"
                >
                  <FiX />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col p-4 space-y-4 text-lg">
                <Link
                  href="/explore"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition"
                >
                  <FiSmile /> Explore Jokes
                </Link>

                <Link
                  href="/categories"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition"
                >
                  <FiLayers /> Categories
                </Link>

                <Link
                  href="/ritual"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition"
                >
                  <FiBook /> Rituals
                </Link>

                <Link
                  href="/favorites"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition"
                >
                  <FiHeart /> Favorites
                </Link>

                <Link
                  href="/search"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition"
                >
                  <FiSearch /> Search
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
