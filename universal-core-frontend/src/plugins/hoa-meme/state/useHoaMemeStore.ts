// src/plugins/hoa-meme/state/useHoaMemeStore.ts

import { create } from "zustand";
import { MemeTemplate, MemeEditState } from "../types";

interface HoaMemeStore {
  templates: MemeTemplate[];
  selectedTemplate: MemeTemplate | null;
  editState: MemeEditState;
  selectTemplate: (tpl: MemeTemplate) => void;
  updateEditState: (partial: Partial<MemeEditState>) => void;
  resetEditor: () => void;
}

export const useHoaMemeStore = create<HoaMemeStore>((set) => ({
  // Starter templates (minimal plugin)
  templates: [
    {
      id: "hoa-default",
      name: "Default HOA Template",
      imageUrl: "/images/hoa/default-template.jpg",
    },
    {
      id: "hoa-angry-lady",
      name: "Angry HOA Lady",
      imageUrl: "/images/hoa/angry-lady.jpg",
    },
    {
      id: "hoa-violation",
      name: "Violation Notice",
      imageUrl: "/images/hoa/violation.jpg",
    },
    {
      id: "hoa-fence",
      name: "Fence Height Drama",
      imageUrl: "/images/hoa/fence-drama.jpg",
    },
    {
      id: "hoa-mailbox",
      name: "Mailbox Inspection",
      imageUrl: "/images/hoa/mailbox.jpg",
    },
    {
      id: "hoa-lawn",
      name: "Grass Too Long",
      imageUrl: "/images/hoa/lawn.jpg",
    },
  ],

  selectedTemplate: null,

  editState: {
    topText: "",
    bottomText: "",
  },

  selectTemplate: (tpl) =>
    set({
      selectedTemplate: tpl,
      editState: { topText: "", bottomText: "" },
    }),

  updateEditState: (partial) =>
    set((state) => ({
      editState: { ...state.editState, ...partial },
    })),

  resetEditor: () =>
    set({
      selectedTemplate: null,
      editState: { topText: "", bottomText: "" },
    }),
}));
