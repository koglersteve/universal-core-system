"use client";

import Link from "next/link";

export function MemeMyDogHome({
  mood,
  world,
  trait,
  agent,
  emotionalState,
}: {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
  emotionalState?: any;
}) {
  return (
    <main className="mememydog-landing">
      <div className="mememydog-card">
        <h1 className="mememydog-title">Meme My Dog</h1>

        <p className="mememydog-subtitle">
          Turn your dog&apos;s photos into emotionally aware memes powered by Emotional‑OS.
        </p>

        <Link href="/mememydog/editor" className="mememydog-start-btn">
          Open Meme Editor
        </Link>

        {(mood || world || trait || agent || emotionalState) && (
          <div className="mememydog-debug">
            <h3>Emotional Context</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(
                { mood, world, trait, agent, emotionalState },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
