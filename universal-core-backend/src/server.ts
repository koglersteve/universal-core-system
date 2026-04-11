iimport express from "express";
import cors from "cors";

// Plugin Health Routes
import pluginHealthRoutes from "./routes/pluginHealth.routes";

// Meme API Handlers
import { getMemeById } from "./api/meme/getById";
import { getMemeAnalytics } from "./api/meme/analytics";
import { saveMeme } from "./api/meme/save";

// (Optional) — Add more backend API imports here
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

// (Optional) — Add more backend API routes here
// app.post("/api/dramanextdoor/scene", generateScene);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;






