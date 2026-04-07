// src/plugins/hoa-meme/services/hoaMemeService.ts

import { hoaMemeApi } from "../api/client";

export const hoaMemeService = {
  async fetchTemplate(params: {
    mood?: string;
    world?: string;
    trait?: string;
    agent?: string;
  }) {
    try {
      return await hoaMemeApi.fetchTemplate(params);
    } catch (err) {
      console.error("HOA Meme: Failed to fetch template", err);
      throw new Error("Could not load HOA meme template.");
    }
  },

  async generateMeme(payload: any) {
    try {
      return await hoaMemeApi.generateMeme(payload);
    } catch (err) {
      console.error("HOA Meme: Meme generation failed", err);
      throw new Error("Could not generate meme.");
    }
  },
};
