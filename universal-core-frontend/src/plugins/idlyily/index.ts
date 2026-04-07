// src/plugins/idlyily/index.ts

export { default as IdlyilyHome } from "./IdlyilyHome";
export { default as IdlyilyEditor } from "./IdlyilyEditor";
export { default as IdlyilyTemplates } from "./IdlyilyTemplates";
export { default as IdlyilyHistory } from "./IdlyilyHistory";

// Optional plugin metadata (for registry, routing, analytics)
export const IdlyilyPlugin = {
  id: "idlyily",
  name: "IDLYILY",
  icon: "💞",
  path: "/idlyily",
  screens: {
    home: "/idlyily",
    editor: "/idlyily/editor",
    templates: "/idlyily/templates",
    history: "/idlyily/history",
  },
};
