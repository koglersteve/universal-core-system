import { LaffLabApi } from "@/lib/LaffLabApi";
import SimpleHeader from "@/components/ui/lafflab/SimpleHeader";
import HistoryList from "@/components/history/HistoryList";

export default async function HistoryPage() {
  const history = await LaffLabApi.getHistory();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "12px 12px 32px",
        background: "#05060A",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600 }}>
        <SimpleHeader title="History" />
        <div style={{ marginTop: 20 }}>
          <HistoryList posts={history} />
        </div>
      </div>
    </div>
  );
}
