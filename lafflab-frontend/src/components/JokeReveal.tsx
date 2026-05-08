"use client";

import { useState } from "react";

export default function JokeReveal({ text }: { text: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className="p-4 rounded-2xl bg-white shadow-md border border-brand-yellow/40 text-black
                 opacity-0 translate-y-3 animate-[fadeInUp_0.25s_ease-out_forwards]"
    >
      <p className="text-lg font-medium">
        {revealed ? text : text.split(".")[0] + "..."}
      </p>

      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="mt-3 px-4 py-2 rounded-full bg-brand-pink text-white font-semibold shadow-md
                     hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                     transition-transform transition-colors"
        >
          Reveal Punchline
        </button>
      )}
    </div>
  );
}

