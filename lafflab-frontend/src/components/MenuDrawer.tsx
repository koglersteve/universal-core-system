"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiSearch, FiHeart, FiBook, FiLayers, FiSmile } from "react-icons/fi";

export function MenuDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Icon */}
      <button
        onClick={() => setOpen(true)}
        className="p-3 text-xl"
        aria-label="Open menu"
      >
        <FiMenu />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">LAFFLab</h2>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <FiX className="text-xl" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4 text-lg">
          <Link href="/explore" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <FiSmile /> Explore Jokes
          </Link>

          <Link href="/categories" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <FiLayers /> Categories
          </Link>

          <Link href="/ritual" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <FiBook /> Rituals
          </Link>

          <Link href="/favorites" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <FiHeart /> Favorites
          </Link>

          <Link href="/search" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <FiSearch /> Search
          </Link>
        </nav>
      </div>
    </>
  );
}
