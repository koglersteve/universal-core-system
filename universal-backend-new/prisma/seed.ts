import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "mockuser@example.com",
      screenName: "MockUser",
      avatarUrl: null
    }
  });

  // Create posts
  await prisma.post.createMany({
    data: [
      {
        type: "meme",
        text: null,
        mediaUrl: "https://i.imgflip.com/30b1gx.jpg",
        score: 42,
        creatorId: user.id
      },
      {
        type: "text",
        text: "Hello from Prisma seed!",
        mediaUrl: null,
        score: 10,
        creatorId: user.id
      }
    ]
  });

  console.log("🌱 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
