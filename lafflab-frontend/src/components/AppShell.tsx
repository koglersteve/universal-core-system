"use client";

import { useState } from "react";
import TopNav from "./TopNav";
import SideMenu from "./SideMenu";

export default function AppShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white page-shell">
      <TopNav title={title} onMenuToggle={() => setMenuOpen((v) => !v)} />

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="flex-1 p-[var(--space-4)] animate-fadeIn">
        {children}
      </main>
    </div>
  );
}
