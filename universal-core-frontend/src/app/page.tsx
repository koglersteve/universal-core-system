"use client";

import Link from "next/link";
import { plugins } from "@/lib/plugins";

import { MoodGreeting } from "@/components/home/MoodGreeting";
import { WorldBackdrop } from "@/components/home/WorldBackdrop";
import { IdentityMicroMotion } from "@/components/home/IdentityMicroMotion";
import { PhysicsPulse } from "@/components/home/PhysicsPulse";
import { TodayRitualCard } from "@/components/home/TodayRitualCard";
import { EmotionalEventsFeed } from "@/components/home/EmotionalEventsFeed";
import { MultiverseSnapshot } from "@/components/home/MultiverseSnapshot";
import { EmotionalExportPanel } from "@/components/home/EmotionalExportPanel";

import { PersonaAvatar } from "@/components/PersonaAvatar";
import { HarmonyPulse } from "@/components/HarmonyPulse";

function AppIcon({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="app-icon">
      <div className="app-emoji">{emoji}</div>
      <div className="app-label">{label}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="os-home">
      <WorldBackdrop>
        <IdentityMicroMotion>
          <PhysicsPulse>

            {/* Kernel UI Layer */}
            <div className="flex items-center space-x-4 mb-6 px-4 pt-4">
              <PersonaAvatar />
              <HarmonyPulse />
              <h1 className="text-3xl font-bold">Aurelia‑Q OS</h1>
            </div>

            {/* Mood-aware greeting */}
            <MoodGreeting />

            {/* App Launcher Grid */}
            <div className="app-grid">
              {plugins.map(app => (
                <Link key={app.id} href={app.path}>
                  <AppIcon emoji={app.icon} label={app.name} />
                </Link>
              ))}
            </div>

            {/* Ritual + Emotional Context */}
            <TodayRitualCard />
            <EmotionalEventsFeed />
            <MultiverseSnapshot />

            {/* Export Panel */}
            <div className="home-export">
              <EmotionalExportPanel />
            </div>

          </PhysicsPulse>
        </IdentityMicroMotion>
      </WorldBackdrop>
    </main>
  );
}
