import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // -----------------------------------------------------
  // 1. Create a default user for feed + LAFFlab content
  // -----------------------------------------------------
  const user = await prisma.user.upsert({
    where: { email: "mockuser@example.com" },
    update: {},
    create: {
      email: "mockuser@example.com",
      screenName: "MockUser",
      avatarUrl: null
    }
  });

  // -----------------------------------------------------
  // 2. Seed FEED posts (existing behavior)
  // -----------------------------------------------------
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

  // -----------------------------------------------------
  // 3. Seed LAFFlab content
  // -----------------------------------------------------
  await prisma.lAFFItem.createMany({
    data: [
      // Memes
      {
        type: "meme",
        mediaUrl: "https://i.imgflip.com/30b1gx.jpg",
        caption: "Classic meme",
        score: 100,
        creatorId: user.id
      },
      {
        type: "meme",
        mediaUrl: "https://i.imgflip.com/1bij.jpg",
        caption: "Distracted Boyfriend",
        score: 88,
        creatorId: user.id
      },

      // Jokes
      {
        type: "joke",
        text: "Why don’t skeletons fight each other? They don’t have the guts.",
        score: 55,
        creatorId: user.id
      },
      {
        type: "joke",
        text: "I told my computer I needed a break… and it said 'No problem, I’ll go to sleep.'",
        score: 42,
        creatorId: user.id
      },

      // Quotes
      {
        type: "quote",
        text: "Comedy is simply a funny way of being serious.",
        score: 70,
        creatorId: user.id
      },

      // GIFs
      {
        type: "gif",
        mediaUrl: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
        caption: "Laughing GIF",
        score: 60,
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
