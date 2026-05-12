"use client";

import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="text-white p-2"
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 z-40" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-xl font-semibold">Menu</div>

        <nav className="space-y-1 px-4">
          <Link href="/" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            Home
          </Link>

          <Link href="/feed" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            Feed
          </Link>

          <Link href="/foryou" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            For You
          </Link>

          <Link href="/explore" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            Explore
          </Link>

          <Link href="/favorites" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            Favorites
          </Link>

          <Link href="/history" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            History
          </Link>

          <Link href="/profile" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            Profile
          </Link>

          <Link href="/settings" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            Settings
          </Link>

          <Link href="/logout" className="block px-3 py-2 hover:bg-white/10 rounded-md">
            Logout
          </Link>
        </nav>
      </div>
    </div>
  );
}
