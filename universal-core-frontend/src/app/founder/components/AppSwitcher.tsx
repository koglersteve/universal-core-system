"use client";

import { useRouter } from "next/navigation";
import { plugins } from "@/lib/plugins";

export default function AppSwitcher() {
  const router = useRouter();

  const openApp = (app: { id: string; route: string }) => {
    router.push(app.route);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>App Switcher</h2>
      <p>Jump between apps instantly during demos.</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {plugins.map(app => (
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

