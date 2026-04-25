import { Joke, Category } from "./models";

export const CATEGORIES: Category[] = [
  { id: "general", name: "General" },
  { id: "math", name: "Math" },
  { id: "tech", name: "Tech" },
  { id: "animals", name: "Animals" },
];

export const JOKES: Joke[] = [
  {
    id: "1",
    text: "Why don’t skeletons fight each other? They don’t have the guts.",
  },
  {
    id: "2",
    text: "I told my computer I needed a break, and it said 'No problem — I’ll go to sleep.'",
  },
  {
    id: "3",
    text: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  },
  {
    id: "4",
    text: "Why do programmers prefer dark mode? Because light attracts bugs.",
  },
  {
    id: "5",
    text: "Why do cows have hooves instead of feet? Because they lactose.",
  },
];

export const CATEGORY_JOKES: Record<string, Joke[]> = {
  general: [JOKES[0], JOKES[1]],
  math: [JOKES[2]],
  tech: [JOKES[3]],
  animals: [JOKES[4]],
};

export function getRandomJoke(): Joke {
  const idx = Math.floor(Math.random() * JOKES.length);
  return JOKES[idx];
}

export function getJokeById(id: string): Joke | undefined {
  return JOKES.find((j) => j.id === id);
}

export function getJokesByCategory(id: string): Joke[] | undefined {
  return CATEGORY_JOKES[id];
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
