import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { username: "demo" },
    update: {},
    create: {
      username: "demo",
      name: "Demo User",
      avatarUrl: null,
      bio: "Demo account",
    },
  });

  await prisma.post.createMany({
    data: [
      {
        title: "Welcome to LAFFlab",
        content: "This is your first post!",
        tags: ["welcome", "lafflab"],
        authorId: user.id,
      },
      {
        title: "Second Post",
        content: "More content coming soon.",
        tags: ["update"],
        authorId: user.id,
      },
      {
        title: "Third Post",
        content: "Production backend is live.",
        tags: ["production"],
        authorId: user.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
