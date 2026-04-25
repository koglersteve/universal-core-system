import { cache } from "react";
import { getJokeById, getJokesByCategory, getRandomJoke } from "@/lib/data";
import { Joke } from "@/lib/models";

export const getRandomJokeServer = cache(async (): Promise<Joke> => {
  return getRandomJoke();
});

export const getJokeByIdServer = cache(
  async (id: string): Promise<Joke | undefined> => {
    return getJokeById(id);
  }
);

export const getJokesByCategoryServer = cache(
  async (categoryId: string): Promise<Joke[] | undefined> => {
    return getJokesByCategory(categoryId);
  }
);
