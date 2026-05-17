// src/modules/services/useJokes.ts
import prisma from "../../shared/api/prisma";

export async function getAllJokes() {
  return prisma.joke.findMany();
}

export async function getJokeById(id: string) {
  return prisma.joke.findUnique({
    where: { id },
  });
}

export async function getRandomJoke() {
  const jokes = await prisma.joke.findMany();
  if (!jokes.length) return null;
  return jokes[Math.floor(Math.random() * jokes.length)];
}

export async function getJokesByCategory(categoryId: string) {
  return prisma.joke.findMany({
    where: { categoryId },
  });
}
