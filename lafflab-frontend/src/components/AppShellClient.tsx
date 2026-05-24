"use client";

import { useState } from "react";
import MenuDrawer from "@/components/ui/lafflab/MenuDrawer";
import TopBar from "@/components/ui/lafflab/TopBar";

export default function AppShellClient({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "12px 12px 32px",
        background:
          "linear-gradient(135deg, #0A0F1F 0%, #1A1440 35%, #4A1F6A 70%, #FF2F7A 100%)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div style={{ width: "100%", maxWidth: 600 }}>
        <TopBar
          onRefresh={() => window.location.reload()}
          onOpenMenu={() => setMenuOpen(true)}
        />

        <div style={{ marginTop: 16 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
