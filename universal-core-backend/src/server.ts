import express from "express";
import cors from "cors";
import pluginHealthRoutes from "./routes/pluginHealth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/plugin-health", pluginHealthRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});






