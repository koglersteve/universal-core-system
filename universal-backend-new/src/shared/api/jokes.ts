import prisma from "./prisma";

export async function getAllJokes() {
  return prisma.joke.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function getRandomJoke() {
  const count = await prisma.joke.count();
  if (count === 0) return null;

  const skip = Math.floor(Math.random() * count);

  const [joke] = await prisma.joke.findMany({
    take: 1,
    skip
  });

  return joke;
}
