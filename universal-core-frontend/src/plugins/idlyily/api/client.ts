// src/plugins/idlyily/api/client.ts

export const idlyilyApi = {
  async generatePrompt(payload: any) {
    const res = await fetch("/api/idlyily/generate-prompt", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to generate prompt");
    return res.json();
  },

  async suggestTemplates(params: { mood?: string; world?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`/api/idlyily/suggest-templates?${query}`);
    if (!res.ok) throw new Error("Failed to fetch template suggestions");
    return res.json();
  },

  async createEntry(payload: any) {
    const res = await fetch("/api/idlyily/create-entry", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create entry");
    return res.json();
  },

  async moodScore(mood: string) {
    const res = await fetch(`/api/idlyily/mood-score?mood=${mood}`);
    if (!res.ok) throw new Error("Failed to fetch mood score");
    return res.json();
  },
};
