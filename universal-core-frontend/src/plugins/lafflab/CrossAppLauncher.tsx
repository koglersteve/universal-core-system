"use client";

import React, { useState } from "react";

type CrossAppLauncherProps = {
  sourceApp: string; // e.g. "lafflab", "idlyily", "hoa-meme"
  payload?: Record<string, any>; // mood, world, trait, agent, jokeId, etc.
};

export function CrossAppLauncher({ sourceApp, payload = {} }: CrossAppLauncherProps) {
  const [loading, setLoading] = useState<string | null>(null);

  async function launch(targetApp: string) {
    setLoading(targetApp);

    try {
      const res = await fetch("/api/cross-app/launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceApp,
          targetApp,
          payload
        })
      });

      const data = await res.json();

      if (data?.deepLinkUrl) {
        window.location.href = data.deepLinkUrl;
      } else {
        setLoading(null);
      }
    } catch (e) {
      setLoading(null);
    }
  }

  return (
    <div className="crossapp-launcher">
      <h3 className="crossapp-title">Do something with this:</h3>

      <div className="crossapp-buttons">
        <button onClick={() => launch("mememydog")}>🐶 Meme My Dog</button>
        <button onClick={() => launch("mememycat")}>🐱 Meme My Cat</button>
        <button onClick={() => launch("idlyily")}>💞 Send to Partner</button>
        <button onClick={() => launch("dramanextdoor")}>🎭 Dramatize It</button>
        <button onClick={() => launch("hoa-meme")}>🏘️ HOA Meme It</button>
      </div>

      {loading && (
        <p className="crossapp-loading">
          Opening {loading}…
        </p>
      )}
    </div>
  );
}
