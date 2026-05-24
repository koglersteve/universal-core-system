import { LaffLabApi } from "@/lib/LaffLabApi";
import FeedShell from "./FeedShell";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  // IMPORTANT: fetchFeed() takes ZERO arguments
  const initialFeed = await LaffLabApi.fetchFeed();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "12px 12px 32px",
        background:
          "linear-gradient(135deg, #0A0F1F 0%, #1A1440 35%, #4A1F6A 70%, #FF2F7A 100%)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FeedShell initialFeed={initialFeed} />
    </div>
  );
}
