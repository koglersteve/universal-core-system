// src/plugins/idlyily/services/idlyilyEntryService.ts

import { idlyilyApi } from "../api/client";

export const idlyilyEntryService = {
  async createEntry(payload: {
    text: string;
    mood?: string;
    world?: string;
    trait?: string;
    agent?: string;
  }) {
    try {
      const data = await idlyilyApi.createEntry(payload);

      return {
        success: data.success,
        entry: data.entry,
      };
    } catch (err) {
      console.error("IDLYILY: Failed to create entry", err);
      throw new Error("Could not save emotional entry.");
    }
  },
};
