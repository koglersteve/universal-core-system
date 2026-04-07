// src/plugins/idlyily/services/idlyilyPromptService.ts

import { idlyilyApi } from "../api/client";

export const idlyilyPromptService = {
  async generatePrompt(params: {
    mood?: string;
    world?: string;
    trait?: string;
    agent?: string;
  }) {
    try {
      const response = await idlyilyApi.generatePrompt(params);

      return {
        prompt: response.prompt,
        context: {
          mood: params.mood,
          world: params.world,
          trait: params.trait,
          agent: params.agent,
        },
      };
    } catch (err) {
      console.error("IDLYILY: Prompt generation failed", err);
      throw new Error("Could not generate emotional prompt.");
    }
  },
};
