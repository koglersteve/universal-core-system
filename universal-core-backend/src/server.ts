import express from "express";
import cors from "cors";

// Plugin Health Routes
import pluginHealthRoutes from "./routes/pluginHealth.routes";

// Meme API Handlers
import { getMemeById } from "./api/meme/getById";
import { getMemeAnalytics } from "./api/meme/analytics";
import { saveMeme } from "./api/meme/save";

// Analytics API Handlers
import { getNarrativeAnalytics } from "./api/analytics/narrative";
import { getPhysicsAnalytics } from "./api/analytics/physics";
import { getStreamAnalytics } from "./api/analytics/stream";
import { trackEvent } from "./api/analytics/track";

// (Optional) — Additional backend API imports
// import { generateScene } from "./api/dramanextdoor/scene";

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Plugin Health
app.use("/api/plugin-health", pluginHealthRoutes);

// Meme Routes
app.get("/api/meme/:id", getMemeById);
app.get("/api/meme/analytics", getMemeAnalytics);
app.post("/api/meme/save", saveMeme);

// Analytics Routes
app.get("/api/analytics/narrative", getNarrativeAnalytics);
app.get("/api/analytics/physics", getPhysicsAnalytics);
app.get("/api/analytics/stream", getStreamAnalytics);
app.post("/api/analytics/track", trackEvent);

// (Optional) — Additional backend API routes
// app.post("/api/dramanextdoor/scene", generateScene);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;






