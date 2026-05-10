import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import feedRoutes from "./routes/feed";

async function start() {
  const app = fastify({ logger: true });

  // Root route
  app.get("/", async () => ({
    message: "Universal Backend Online",
    health: "/health",
    feed: "/feed"
  }));

  // Health check
  app.get("/health", async () => ({ status: "ok" }));

  // Feed routes
  app.register(feedRoutes);

  try {
    await app.listen({
      port: Number(process.env.PORT) || 8080,
      host: "0.0.0.0"
    });

    console.log("🚀 Universal Backend running on port", process.env.PORT || 8080);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
