// universal-core/src/server.ts
import express from "express";
import { postMoodState } from "./routes/moodState";

// New imports
import pluginHealthRoutes from "./routes/pluginHealth.routes";
import authRoutes from "./auth/auth.routes";
import eventTimelineRoutes from "./routes/eventTimeline.routes"; // NEW

export async function createServer() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Core Routes
  app.post("/api/mood-state", postMoodState);

  // Health check
  app.get("/health", (req, res) => {
    res.json({ ok: true, service: "universal-core" });
  });

  // Auth
  app.use("/auth", authRoutes);

  // Plugin Health API
  app.use("/api/plugin-health", pluginHealthRoutes);

  // OS‑Wide Event Timeline API
  app.use("/api/events", eventTimelineRoutes); // NEW

  return app;
}
