import type { Joke, Category } from "./models";

export const CATEGORIES: Category[] = [
  { id: "general", name: "General" },
  { id: "math", name: "Math" },
  { id: "tech", name: "Tech" },
  { id: "animals", name: "Animals" },
];

export const JOKES: Joke[] = [
  ...
];

export const CATEGORY_JOKES: Record<string, Joke[]> = {
  general: [JOKES[0]!, JOKES[1]!],
  math: [JOKES[2]!],
  tech: [JOKES[3]!],
  animals: [JOKES[4]!],
};
