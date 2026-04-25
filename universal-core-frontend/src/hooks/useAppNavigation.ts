"use client";

import { useRouter } from "next/navigation";
import { useCrossApp } from "@/hooks/useCrossApp";

export function useAppNavigation() {
  const router = useRouter();
  const { openApp } = useCrossApp();

  return {
    // Standard navigation
    goTo: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    back: () => router.back(),

    // App-level navigation
    openApp: (appId: string, params?: Record<string, any>) =>
      openApp(appId, params),

    // Common shortcuts
    goHome: () => router.push("/"),
    goDashboard: () => router.push("/founder/console/overview"),
    goProfile: () => router.push("/profile"),

    // App-specific helpers (optional)
    openMoodCheck: () => openApp("moodcheck"),
    openDramaNextDoor: () => openApp("dramanextdoor"),
    openHoaMeme: () => openApp("hoa-meme"),
  };
}
