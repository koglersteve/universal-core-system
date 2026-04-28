import React, { useState } from "react";

export const CrossAppLauncher: React.FC<{ jokeId: string }> = ({ jokeId }) => {
  const [loading, setLoading] = useState(false);

  const launch = (targetApp: string) => {
    setLoading(true);

    fetch("/lafflab/cross-app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jokeId, targetApp })
    })
      .then(r => r.json())
      .then(res => {
        setLoading(false);

        // Open deep link
        window.location.href = res.deepLinkUrl;
      });
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 6, fontWeight: 600 }}>Do something with this:</div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          onClick={() => launch("mememydog")}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          🐶 Meme it
        </button>

        <button
          onClick={() => launch("moodcheck")}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          🌡️ Check my mood
        </button>

        <button
          onClick={() => launch("idlyily")}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          ❤️ Send to partner
        </button>

        <button
          onClick={() => launch("dramanextdoor")}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          🎭 Dramatize it
        </button>
      </div>

      {loading && (
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.7 }}>
          Opening…
        </div>
      )}
    </div>
  );
};

