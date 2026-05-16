import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";

// ROUTES
import feedRoutes from "./routes/feed";
import lafflabRoutes from "./routes/lafflab.routes";
import postRoutes from "./routes/post.routes";
import profileRoutes from "./routes/profile.routes"; // ← ADD THIS

async function start() {
  const app = fastify({ logger: true });

  // Root route
  app.get("/", async () => ({
    message: "Universal Backend Online",
    health: "/health",
    feed: "/feed",
    lafflab: "/lafflab",
    post: "/post",
    profile: "/profile/:id" // optional but helpful
  }));

  // Health check
  app.get("/health", async () => ({ status: "ok" }));

  // Register routes
  app.register(feedRoutes);
  app.register(lafflabRoutes);
  app.register(postRoutes);
  app.register(profileRoutes); // ← ADD THIS

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
