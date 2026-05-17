import { FastifyInstance } from "fastify";

export default async function lafflabRoutes(app: FastifyInstance) {
  // Base route
  app.get("/lafflab", async () => ({
    service: "LAFFlab",
    status: "online",
    endpoints: ["/lafflab/memes", "/lafflab/jokes", "/lafflab/random"]
  }));

  // Mock memes
  app.get("/lafflab/memes", async () => {
    return [
      {
        id: "meme-1",
        type: "meme",
        mediaUrl: "https://i.imgflip.com/30b1gx.jpg",
        caption: "Classic meme",
        score: 100
      },
      {
        id: "meme-2",
        type: "meme",
        mediaUrl: "https://i.imgflip.com/1bij.jpg",
        caption: "Distracted Boyfriend",
        score: 88
      }
    ];
  });

  // Mock jokes
  app.get("/lafflab/jokes", async () => {
    return [
      {
        id: "joke-1",
        type: "joke",
        text: "Why don’t skeletons fight each other? They don’t have the guts.",
        score: 55
      },
      {
        id: "joke-2",
        type: "joke",
        text: "I told my computer I needed a break… and it said 'No problem, I’ll go to sleep.'",
        score: 42
      }
    ];
  });

  // Random item
  app.get("/lafflab/random", async () => {
    const items = [
      {
        id: "meme-1",
        type: "meme",
        mediaUrl: "https://i.imgflip.com/30b1gx.jpg",
        caption: "Classic meme",
        score: 100
      },
      {
        id: "joke-1",
        type: "joke",
        text: "Why don’t skeletons fight each other? They don’t have the guts.",
        score: 55
      }
    ];

    return items[Math.floor(Math.random() * items.length)];
  });
}
