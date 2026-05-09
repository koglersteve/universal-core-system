// src/server.ts
import fastify from "fastify";
import feedRoutes from "./routes/feed";

async function start() {
  const app = fastify({ logger: true });

  app.register(feedRoutes);

  app.get("/health", async () => ({ status: "ok" }));

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
