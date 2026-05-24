"use client";

import { useState } from "react";
import MenuDrawer from "@/components/ui/lafflab/MenuDrawer";
import TopBar from "@/components/ui/lafflab/TopBar";

export default function AppShellClient({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TopBar
        onRefresh={() => {
          // simple refresh behavior
          window.location.reload();
        }}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div style={{ marginTop: 56 }}>{children}</div>
    </>
  );
}
