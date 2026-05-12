"use client";

import { useState } from "react";
import SideMenu from "@/components/SideMenu";
import TopBar from "@/components/TopBar";

export default function Component({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <TopBar onMenuToggle={() => setMenuOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
