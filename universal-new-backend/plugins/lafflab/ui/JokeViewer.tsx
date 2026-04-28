import React, { useEffect, useState } from "react";
import { EmotionalLinkPanel } from "./EmotionalLinkPanel";
import { CrossAppLauncher } from "./CrossAppLauncher";

type Joke = {
  id: string;
  text: string;
  category_id?: string;
};

export const JokeViewer: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);

  const loadJoke = () => {
    setLoading(true);

    fetch("/lafflab/jokes/random")
      .then(r => r.json())
      .then(j => {
        setJoke(j);
        setLoading(false);

        // Log to history
        fetch("/lafflab/history/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jokeId: j.id })
        });
      });
  };

  useEffect(() => {
    loadJoke();
  }, []);

  if (loading || !joke) {
    return <div>Loading your laugh…</div>;
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          background: "#f7f7f7",
          marginBottom: 16
        }}
      >
        <p style={{ fontSize: 18, lineHeight: 1.4 }}>{joke.text}</p>
      </div>

      <EmotionalLinkPanel jokeId={joke.id} />

      <CrossAppLauncher jokeId={joke.id} />

      <button
        onClick={loadJoke}
        style={{
          marginTop: 16,
          padding: "10px 16px",
          borderRadius: 6,
          background: "#222",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Another one
      </button>
    </div>
  );
};
