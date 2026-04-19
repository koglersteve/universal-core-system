"use client";

import { useState } from "react";
import { generateCatMeme } from "@/plugins/mememycat/MemeMyCatApi";

export default function MemeMyCatEditor() {
  const [text, setText] = useState("");
  const [template, setTemplate] = useState("default");
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    const data = await generateCatMeme({ template, text });
    setResult(data.url);
  };

  return (
    <div className="mememycat-container">
      <h1>Meme My Cat</h1>

      <input
        type="text"
        placeholder="Enter meme text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate</button>

      {result && (
        <div className="meme-result">
          <img src={result} alt="Generated Cat Meme" />
        </div>
      )}
    </div>
  );
}

