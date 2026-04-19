"use client";

import { useState } from "react";
import { generateDogMeme } from "@/plugins/mememydog/MemeMyDogApi";

export default function MemeMyDogEditor() {
  const [text, setText] = useState("");
  const [template, setTemplate] = useState("default");
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    const data = await generateDogMeme({ template, text });
    setResult(data.url);
  };

  return (
    <div className="mememydog-container">
      <h1>Meme My Dog</h1>

      <input
        type="text"
        placeholder="Enter meme text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate</button>

      {result && (
        <div className="meme-result">
          <img src={result} alt="Generated Dog Meme" />
        </div>
      )}
    </div>
  );
}
