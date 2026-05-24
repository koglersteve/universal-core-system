import SimpleHeader from "@/components/ui/lafflab/SimpleHeader";

export default function SettingsPage() {
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
      <div style={{ width: "100%", maxWidth: 600, color: "#FFFFFF" }}>
        <SimpleHeader title="Settings" />
        <div style={{ marginTop: 20 }}>
          <section style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>
              Appearance
            </h2>
            <button
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.04)",
                color: "#FFFFFF",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Toggle theme (placeholder)
            </button>
          </section>

          <section style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>
              Account
            </h2>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              Account settings coming soon.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
