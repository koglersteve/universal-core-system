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

export default function SideMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-black/90 border-l border-white/10 backdrop-blur z-50 p-[var(--space-4)] space-y-[var(--space-3)] transition-soft ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-[var(--text-lg)] font-semibold mb-[var(--space-2)]">
          Menu
        </h2>

        <nav className="space-y-[var(--space-2)]">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-[var(--space-2)] py-[var(--space-2)] rounded-[var(--radius-md)] bg-white/5 border border-white/10 hover:bg-white/10 transition-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
