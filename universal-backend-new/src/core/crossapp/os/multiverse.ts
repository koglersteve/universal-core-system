import type { EmotionalOSSnapshot } from "./os-engine.js";

export type AppMood = {
  appId: string;
  mood: "warm" | "cool" | "intense" | "muted";
};

export type MultiverseSnapshot = {
  apps: AppMood[];
};

export class Multiverse {
  static derive(os: EmotionalOSSnapshot): MultiverseSnapshot {
    const { harmony, tempo } = os;

    const base: AppMood[] = [
      { appId: "lafflab", mood: "warm" },
      { appId: "buildlab", mood: "cool" },
      { appId: "hoa", mood: "intense" },
      { appId: "universal", mood: "muted" },
    ];

    return {
      apps: base.map((app) => {
        let mood = app.mood;

        if (harmony.score > 0.3 && tempo.band === "fast") {
          if (app.appId === "lafflab") mood = "warm";
          if (app.appId === "buildlab") mood = "intense";
        }

        if (harmony.score < -0.2) {
          if (app.appId === "hoa") mood = "intense";
          if (app.appId === "universal") mood = "muted";
        }

        return { ...app, mood };
      }),
    };
  }
}

