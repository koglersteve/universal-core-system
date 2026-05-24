import SimpleHeader from "@/components/ui/lafflab/SimpleHeader";
import DailyRitualScreen from "@/components/ritual/DailyRitualScreen";

export default function RitualPage() {
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
        <SimpleHeader title="Daily Ritual" />
        <div style={{ marginTop: 20 }}>
          <DailyRitualScreen />
        </div>
      </div>
    </div>
  );
}
