import express from "express";
import cors from "cors";

// Existing plugin health routes
import pluginHealthRoutes from "./routes/pluginHealth.routes";

// Meme API handlers
import { getMemeById } from "./api/meme/getById";
import { getMemeAnalytics } from "./api/meme/analytics";
import { saveMeme } from "./api/meme/save";

const app = express();

app.use(cors());
app.use(express.json());

// Existing plugin health route
app.use("/api/plugin-health", pluginHealthRoutes);

// Meme routes
app.get("/api/meme/:id", getMemeById);
app.get("/api/meme/analytics", getMemeAnalytics);
app.post("/api/meme/save", saveMeme);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;






