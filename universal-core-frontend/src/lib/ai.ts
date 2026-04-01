// src/lib/ai.ts
// Thin wrapper so you can swap providers later

type AIResponse = {
  text: string;
  provider: string;
  latencyMs: number;
  raw?: any;
};

async function callProvider(endpoint: string, body: any): Promise<AIResponse> {
  const start = performance.now();

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    return {
      text: data.text ?? "",
      provider: data.provider ?? "unknown",
      latencyMs: performance.now() - start,
      raw: data
    };
  } catch (err) {
    return {
      text: "[fallback] AI unavailable",
      provider: "fallback",
      latencyMs: performance.now() - start
    };
  }
}

export async function generateCaption(prompt: string): Promise<string> {
  if (process.env.NEXT_PUBLIC_AI_ENDPOINT) {
    const res = await callProvider(process.env.NEXT_PUBLIC_AI_ENDPOINT, {
      type: "caption",
      prompt
    });
    return res.text;
  }

  // Dev fallback
  return `AI Caption: ${prompt}`;
}

export async function generateStickerLabel(prompt: string): Promise<string> {
  if (process.env.NEXT_PUBLIC_AI_ENDPOINT) {
    const res = await callProvider(process.env.NEXT_PUBLIC_AI_ENDPOINT, {
      type: "sticker",
      prompt
    });
    return res.text;
  }

  // Dev fallback
  return "🔥";
}
