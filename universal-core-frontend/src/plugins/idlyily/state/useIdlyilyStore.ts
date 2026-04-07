// src/plugins/idlyily/state/useIdlyilyStore.ts

import { create } from "zustand";
import { idlyilyPromptService } from "../services/idlyilyPromptService";
import { idlyilyTemplateService } from "../services/idlyilyTemplateService";
import { idlyilyEntryService } from "../services/idlyilyEntryService";
import { idlyilyMoodService } from "../services/idlyilyMoodService";

interface IdlyilyStore {
  // Emotional context
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;

  // Generated content
  prompt?: string;
  templates: any[];
  selectedTemplate?: string;

  // Entry text
  entryText: string;

  // Actions
  setContext: (ctx: Partial<IdlyilyStore>) => void;
  generatePrompt: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  selectTemplate: (id: string) => void;
  updateEntryText: (text: string) => void;
  saveEntry: () => Promise<any>;
  getMoodScore: () => Promise<number>;
}

export const useIdlyilyStore = create<IdlyilyStore>((set, get) => ({
  mood: undefined,
  world: undefined,
  trait: undefined,
  agent: undefined,

  prompt: undefined,
  templates: [],
  selectedTemplate: undefined,

  entryText: "",

  setContext: (ctx) => set(ctx),

  generatePrompt: async () => {
    const { mood, world, trait, agent } = get();
    const result = await idlyilyPromptService.generatePrompt({
      mood,
      world,
      trait,
      agent,
    });
    set({ prompt: result.prompt });
  },

  fetchTemplates: async () => {
    const { mood, world } = get();
    const result = await idlyilyTemplateService.suggestTemplates({
      mood,
      world,
    });
    set({ templates: result.templates });
  },

  selectTemplate: (id) => set({ selectedTemplate: id }),

  updateEntryText: (text) => set({ entryText: text }),

  saveEntry: async () => {
    const { entryText, mood, world, trait, agent } = get();
    return await idlyilyEntryService.createEntry({
      text: entryText,
      mood,
      world,
      trait,
      agent,
    });
  },

  getMoodScore: async () => {
    const { mood } = get();
    if (!mood) return 50;
    const result = await idlyilyMoodService.getMoodScore(mood);
    return result.score;
  },
}));
