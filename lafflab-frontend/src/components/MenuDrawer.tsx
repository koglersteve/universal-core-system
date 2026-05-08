"use client";

import { useState } from "react";
import Link from "next/link";

export function MenuDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-3 text-2xl text-white hover:scale-110 active:scale-95 transition"
        aria-label="Open menu"
      >
        ☰
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />

          <div
            className={`fixed top-0 left-0 h-full w-72 bg-black/90 text-white z-50 shadow-2xl border-r border-white/10 p-4 transition-transform ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-lg font-bold">LAFFLab</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-2xl hover:scale-110 active:scale-95 transition"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col mt-4 space-y-4 text-lg">
              <Link
                href="/explore"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Explore Jokes
              </Link>

              <Link
                href="/categories"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Categories
              </Link>

              <Link
                href="/ritual"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Rituals
              </Link>

              <Link
                href="/favorites"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Favorites
              </Link>

              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Search
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
