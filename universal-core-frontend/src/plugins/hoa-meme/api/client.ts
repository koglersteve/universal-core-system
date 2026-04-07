// src/plugins/hoa-meme/api/client.ts

export const hoaMemeApi = {
  async fetchTemplate(params: {
    mood?: string;
    world?: string;
    trait?: string;
    agent?: string;
  }) {
    const query = new URLSearchParams(params as any).toString();

    const res = await fetch(`/api/hoa-meme/template?${query}`);

    if (!res.ok) {
      throw new Error("Failed to fetch template");
    }

    return res.json();
  },

  async generateMeme(payload: any) {
    const res = await fetch("/api/hoa-meme/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to generate meme");
    }

    return res.json();
  },
};
