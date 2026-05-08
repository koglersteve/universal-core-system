// src/components/SideMenu.tsx
"use client";

import Link from "next/link";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Favorites", href: "/favorites" },
  { label: "History", href: "/history" },
  { label: "Upload", href: "/upload" },
  { label: "Creator Dashboard", href: "/creator" },
  { label: "Settings", href: "/settings" },
];

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-black/90 border-l border-white/10 backdrop-blur z-50 p-4 space-y-3 transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-lg font-semibold mb-2 text-white">Menu</h2>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
