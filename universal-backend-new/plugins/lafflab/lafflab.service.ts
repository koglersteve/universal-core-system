import { jokes, categories } from "./lafflab.data";
import { Joke, Category, HistoryItem } from "./lafflab.types";

let history: HistoryItem[] = [];

export function getRandomJoke(): Joke {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

export function getJokeById(id: string): Joke | undefined {
  return jokes.find((j) => j.id === id);
}

export function getJokesByCategory(categoryId: string): Joke[] {
  return jokes.filter((j) => j.category === categoryId);
}

export function getCategories(): Category[] {
  return categories;
}

export function addHistory(id: string) {
  history.unshift({ id, viewedAt: Date.now() });
}

export function getHistory(): HistoryItem[] {
  return history;
}
