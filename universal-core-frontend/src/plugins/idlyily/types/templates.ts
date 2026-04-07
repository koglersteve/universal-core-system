// src/plugins/idlyily/types/templates.ts

export interface IdlyilyTemplate {
  id: string;
  label: string;
  match?: string[];
}

export interface TemplateSuggestionResponse {
  mood: string;
  world: string;
  templates: IdlyilyTemplate[];
}
