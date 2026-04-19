"use client";

import { useState } from "react";
import { generateHoaMeme } from "@/plugins/hoameme/HOAMemeApi";

export default function HOAMemeEditor() {
  const [text, setText] = useState("");
  const [template, setTemplate] = useState("default");
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    const data = await generateHoaMeme({ template, text });
    setResult(data.url);
  };

  return (
    <div className="hoameme-container">
      <h1>HOA Meme</h1>

      <input
        type="text"
        placeholder="Enter meme text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate</button>

      {result && (
        <div className="meme-result">
          <img src={result} alt="Generated HOA Meme" />
        </div>
      )}
    </div>
  );
}
