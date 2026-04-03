// src/app/deeplink/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { AppId } from "@/lib/types";
import { APP_IDS } from "@/lib/plugins";
import { useEmotionalExport } from "@/hooks/useEmotionalExport";
import { encodeEmotionalState } from "@/lib/emotionalExportToken";
import { trackDeeplink } from "@/lib/deeplinkAnalytics";

export default function DeeplinkPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { exportOS } = useEmotionalExport();

  const search = params.toString();

  useEffect(() => {
    const app = params.get("app") as AppId | null;
    const mood = params.get("mood");
    const jokeId = params.get("jokeId");
    const moodId = params.get("moodId");
    const source = params.get("source");

    if (!app || !APP_IDS.includes(app)) {
      router.replace("/");
      return;
    }

    // Build emotional state token
    const emotionalState = exportOS();
    const token = encodeEmotionalState(emotionalState);

    // Fire-and-forget analytics
    trackDeeplink({
      app,
      mood,
      worldId: emotionalState.multiverse?.activeWorldId,
      source
    });

    const withToken = (path: string) =>
      `${path}${path.includes("?") ? "&" : "?"}et=${encodeURIComponent(token)}`;

    // LAFFlab → jokeId
    if (app === "lafflab" && jokeId) {
      router.replace(withToken(`/lafflab?jokeId=${jokeId}`));
      return;
    }

    // MoodCheck → moodId
    if (app === "moodcheck" && moodId) {
      router.replace(withToken(`/moodcheck?moodId=${moodId}`));
      return;
    }

    // MemeMyCat → mood
    if (app === "mememycat" && mood) {
      router.replace(withToken(`/mememycat?mood=${mood}`));
      return;
    }

    // MemeMyDog → mood
    if (app === "mememydog" && mood) {
      router.replace(withToken(`/mememydog?mood=${mood}`));
      return;
    }

    // IDLYILY → mood
    if (app === "idlyily" && mood) {
      router.replace(withToken(`/idlyily?mood=${mood}`));
      return;
    }

    // HOA Meme → mood
    if (app === "hoa-meme" && mood) {
      router.replace(withToken(`/hoa-meme?mood=${mood}`));
      return;
    }

    // DramaNextDoor → mood
    if (app === "dramanextdoor" && mood) {
      router.replace(withToken(`/dramanextdoor?mood=${mood}`));
      return;
    }

    // Default: route directly to the app with emotional token
    router.replace(withToken(`/${app}`));
  }, [search, router, exportOS]);

  return null;
}
if (app === "dramanextdoor" && mood) {
  const world = emotionalState.multiverse?.activeWorldId;
  const trait = emotionalState.identity?.dominantTrait;
  const agent = emotionalState.agents?.[0]?.role; // or whichever agent is dominant

  router.replace(
    withToken(
      `/dramanextdoor?mood=${mood}&world=${world}&trait=${trait}&agent=${agent}`
    )
  );
}
