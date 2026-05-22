"use client";

import Link from "next/link";

export default function SideMenuClient(props: any) {
  return (
    <nav className="space-y-2 p-4 text-white">
      <Link href="/" className="block px-3 py-2 hover:bg-white/10 rounded-md">
        Home
      </Link>

      <Link href="/explore" className="block px-3 py-2 hover:bg-white/10 rounded-md">
        Explore
      </Link>

      <Link href="/favorites" className="block px-3 py-2 hover:bg-white/10 rounded-md">
        Favorites
      </Link>

      <Link href="/profile/posts" className="block px-3 py-2 hover:bg-white/10 rounded-md">
        My Posts
      </Link>

      {/* Add any other menu items you want */}
    </nav>
  );
}
