import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: [
      {
        type: "text",
        text: "Why don’t skeletons fight each other? They don’t have the guts.",
      },
      {
        type: "image",
        text: "Relatable meme of the day.",
        imageUrl: "https://example.com/memes/relatable.png",
      },
      {
        type: "meme",
        text: "When the deploy works on the first try.",
        imageUrl: "https://example.com/memes/deploy.png",
      },
      {
        type: "video",
        text: "Stand‑up clip: 15 seconds of chaos.",
        videoUrl: "https://example.com/videos/standup.mp4",
        thumbnailUrl: "https://example.com/videos/standup-thumb.jpg",
      },
      {
        type: "audio",
        text: "Audio joke: classic one‑liner.",
        audioUrl: "https://example.com/audio/joke1.mp3",
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
