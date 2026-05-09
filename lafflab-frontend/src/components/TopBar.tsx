"use client";

import { useState } from "react";
import MenuDrawer from "./MenuDrawer";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full flex items-center justify-end p-4 bg-black border-b border-white/10 text-white">
        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
