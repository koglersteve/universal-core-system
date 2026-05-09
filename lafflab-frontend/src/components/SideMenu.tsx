"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

export default function SideMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`
        fixed inset-0 z-50 transition-all duration-300
        ${open ? "bg-black/60 pointer-events-auto" : "bg-transparent pointer-events-none"}
      `}
      onClick={onClose}
    >
      <div
        className={`
          absolute right-0 top-0 h-full w-72 bg-neutral-900 text-white
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Menu</h2>

          <nav className="space-y-4">
            <Link href="/creator" className="block text-lg">Creator Dashboard</Link>
            <Link href="/upload" className="block text-lg">Upload</Link>
            <Link href="/favorites" className="block text-lg">Favorites</Link>
            <Link href="/history" className="block text-lg">History</Link>

            {/* ⭐ Settings Icon Link */}
            <Link href="/settings" className="flex items-center gap-3 text-lg">
              <Settings size={22} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
