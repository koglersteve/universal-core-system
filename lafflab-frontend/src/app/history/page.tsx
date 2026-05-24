import { LaffLabApi } from "@/lib/LaffLabApi";
import HistoryList from "@/components/ui/lafflab/HistoryList";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  // Fetch the authenticated user's posts (timeline)
  const username = "steve"; // You can replace this with real auth later
  const history = await LaffLabApi.getProfilePosts(username);

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
      <div style={{ width: "100%", maxWidth: 600 }}>
        <h2
          style={{
            color: "#FFFFFF",
            fontSize: 22,
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          Your History
        </h2>

        <HistoryList posts={history} />
      </div>
    </div>
  );
}
