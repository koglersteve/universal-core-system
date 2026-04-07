// src/plugins/idlyily/types/entries.ts

export interface IdlyilyEntryPayload {
  text: string;
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
}

export interface IdlyilyEntry {
  id: string;
  timestamp: string;
  text: string;
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
}

export interface EntryCreationResponse {
  success: boolean;
  entry: IdlyilyEntry;
}
