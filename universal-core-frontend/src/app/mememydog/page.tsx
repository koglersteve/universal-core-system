"use client";

import Link from "next/link";

export default function MemeMyDogPage() {
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
      </div>
    </main>
  );
}

