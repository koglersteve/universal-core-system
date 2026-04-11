// src/app/layout.tsx

import "./global.css";

import RoleNavBar from "@/components/navigation/RoleNavBar";
import { NavigationDrawer } from "@/components/NavigationDrawer";
import { EmotionalTransitionLayer } from "@/components/EmotionalTransitionLayer";
import { EmotionalNotificationCenter } from "@/components/EmotionalNotificationCenter";

export const metadata = {
  title: "Emotional OS",
  description: "A constellation of emotional apps stitched into one intentional system."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        {/* Top-level navigation (always visible) */}
        <RoleNavBar />

        {/* Global Emotional Layers */}
        <EmotionalTransitionLayer />
        <EmotionalNotificationCenter />

        {/* OS Shell */}
        <div className="os-shell">
          <aside className="os-nav">
            <NavigationDrawer />
          </aside>

          <main className="os-main">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
