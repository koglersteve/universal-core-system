import { ENDPOINTS } from "@/lib/api/endpoints";

async function getHistory() {
  const res = await fetch(ENDPOINTS.HISTORY_LIST, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

async function getJoke(id: string) {
  const res = await fetch(`${ENDPOINTS.JOKE_BY_ID}/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function Page() {
  const history = await getHistory();

  const jokes = await Promise.all(
    history.map((item: any) => getJoke(item.id))
  );

  const valid = jokes.filter(Boolean);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "16px" }}>History</h1>

      {valid.length === 0 && (
        <p style={{ opacity: 0.7 }}>No viewed jokes yet.</p>
      )}

      {valid.map((joke: any) => (
        <div
          key={joke.id}
          style={{
            background: "var(--bg-card)",
            padding: "16px",
            borderRadius: "12px",
            marginBottom: "16px",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <p style={{ margin: 0 }}>{joke.text}</p>
        </div>
      ))}
    </div>
  );
}
