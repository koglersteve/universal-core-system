"use client";

import { useState } from "react";
import SideMenu from "./SideMenu";
import TopNav from "./TopNav";
import MenuDrawer from "./MenuDrawer";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      <TopNav onMenu={() => setMenuOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <SideMenu />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
