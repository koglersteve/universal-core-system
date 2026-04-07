// src/plugins/idlyily/services/idlyilyTemplateService.ts

import { idlyilyApi } from "../api/client";

export const idlyilyTemplateService = {
  async suggestTemplates(params: { mood?: string; world?: string }) {
    try {
      const data = await idlyilyApi.suggestTemplates(params);

      return {
        mood: data.mood,
        world: data.world,
        templates: data.templates,
      };
    } catch (err) {
      console.error("IDLYILY: Template suggestion failed", err);
      throw new Error("Could not load template suggestions.");
    }
  },
};
