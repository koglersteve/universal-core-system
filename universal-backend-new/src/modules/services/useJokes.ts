import { prisma } from "@/lib/prisma";

export async function getAllJokes() {
  return prisma.joke.findMany();
}

export async function getJokeById(id: string) {
  return prisma.joke.findUnique({
    where: { id }
  });
}

export async function getRandomJoke() {
  const jokes = await prisma.joke.findMany();
  return jokes[Math.floor(Math.random() * jokes.length)];
}

export async function getJokesByCategory(categoryId: string) {
  return prisma.joke.findMany({
    where: { categoryId }
  });
}
