// src/lib/api/types.ts

export interface Joke {
  id: string;
  text: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Ritual {
  id: string;
  message: string;
}
