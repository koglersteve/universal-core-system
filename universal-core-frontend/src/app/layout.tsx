// src/app/layout.tsx

import "./global.css";
import "./emotion.css";

import RoleNavBar from "@/components/navigation/RoleNavBar";
import { NavigationDrawer } from "@/components/NavigationDrawer";
import { EmotionalTransitionLayer } from "@/components/EmotionalTransitionLayer";
import { EmotionalNotificationCenter } from "@/components/EmotionalNotificationCenter";

// Emotional OS Providers
import { AuthProvider } from "@/context/AuthContext";
import { MoodProvider } from "@/context/MoodContext";
import { MoodHistoryProvider } from "@/context/MoodHistoryContext";
import { EmotionalPhysicsProvider } from "@/context/EmotionalPhysicsContext";
import { RitualProvider } from "@/context/RitualContext";
import { EmotionalMultiverseProvider } from "@/context/EmotionalMultiverseContext";
import { EmotionalGovernanceProvider } from "@/context/EmotionalGovernanceContext";
import { EmotionalIdentityProvider } from "@/context/EmotionalIdentityContext";
import { EmotionalThemeProvider } from "@/context/EmotionalThemeContext";
import { EmotionalAgentProvider } from "@/context/EmotionalAgentContext";
import { EmotionalExportProvider } from "@/context/EmotionalExportContext";

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

        <AuthProvider>
          <MoodProvider>
            <MoodHistoryProvider>
              <EmotionalPhysicsProvider>
                <RitualProvider>
                  <EmotionalMultiverseProvider>
                    <EmotionalGovernanceProvider>
                      <EmotionalIdentityProvider>
                        <EmotionalThemeProvider>
                          <EmotionalAgentProvider>
                            <EmotionalExportProvider>

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

                            </EmotionalExportProvider>
                          </EmotionalAgentProvider>
                        </EmotionalThemeProvider>
                      </EmotionalIdentityProvider>
                    </EmotionalGovernanceProvider>
                  </EmotionalMultiverseProvider>
                </RitualProvider>
              </EmotionalPhysicsProvider>
            </MoodHistoryProvider>
          </MoodProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
