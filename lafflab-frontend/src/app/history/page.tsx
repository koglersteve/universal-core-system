import { ENDPOINTS } from "@/lib/api/endpoints";

async function getHistory() {
  const res = await fetch(ENDPOINTS.HISTORY_LIST, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Page() {
  const history = await getHistory();

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "16px" }}>History</h1>

      {history.length === 0 && (
        <p style={{ opacity: 0.7 }}>No viewed jokes yet.</p>
      )}

      {history.map((item: any) => (
        <div
          key={item.id}
          style={{
            background: "var(--bg-card)",
            padding: "16px",
            borderRadius: "12px",
            marginBottom: "16px",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <p style={{ margin: 0 }}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
