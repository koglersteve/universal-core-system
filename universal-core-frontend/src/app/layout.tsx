"use client";

import RoleNavBar from "@/components/navigation/RoleNavBar";
import { NavigationDrawer } from "@/components/NavigationDrawer";
import { EmotionalTransitionLayer } from "@/components/EmotionalTransitionLayer";
import { EmotionalNotificationCenter } from "@/components/EmotionalNotificationCenter";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RoleNavBar />
      <EmotionalTransitionLayer />
      <EmotionalNotificationCenter />

      <div className="os-shell">
        <aside className="os-nav">
          <NavigationDrawer />
        </aside>

        <main className="os-main">
          {children}
        </main>
      </div>
    </>
  );
}

