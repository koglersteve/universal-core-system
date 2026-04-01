"use client";

import { useRouter } from "next/navigation";
import { makeAppTracker } from "@/lib/analytics/client";

const trackFounder = makeAppTracker("founder");

const apps = [
  { name: "HOA Meme", route: "/hoa-meme", id: "hoa-meme" },
  { name: "IDLYILY", route: "/idlyily", id: "idlyily" },
  { name: "DramaNextDoor", route: "/dramanextdoor", id: "dramanextdoor" },
  { name: "MemeMyDog", route: "/mememydog", id: "mememydog" },
  { name: "MemeMyCat", route: "/mememycat", id: "mememycat" },
  { name: "LaffLab", route: "/lafflab", id: "lafflab" },
  { name: "MoodCheck", route: "/moodcheck", id: "moodcheck" }
];

export default function AppSwitcher() {
  const router = useRouter();

  const openApp = (app: { id: string; route: string }) => {
    trackFounder("app.switch", {
      payload: {
        targetApp: app.id
      }
    });

    router.push(app.route);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>App Switcher</h2>
      <p>Jump between apps instantly during demos.</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {apps.map(app => (
          <button
            key={app.route}
            onClick={() => openApp(app)}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              cursor: "pointer"
            }}
          >
            {app.name}
          </button>
        ))}
      </div>
    </div>
  );
}

