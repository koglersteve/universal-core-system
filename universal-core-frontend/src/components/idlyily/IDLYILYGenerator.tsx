"use client";

import { useState } from "react";
import { generateIDLYILYMessage } from "@/plugins/idlyily/IDLYILYApi";

export default function IDLYILYGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    const data = await generateIDLYILYMessage({ prompt });
    setResult(data.message);
  };

  return (
    <div className="idlyily-container">
      <h1>IDLYILY</h1>

      <input
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate</button>

      {result && (
        <div className="idlyily-result">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
