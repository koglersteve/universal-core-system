import { getBackendUrl } from "@/lib/backend";

export default async function OSPage() {
  const API = getBackendUrl();

  if (!API) {
    return (
      <pre>
        {JSON.stringify(
          {
            message: "OS offline (no API)",
            modules: [],
            _api: null
          },
          null,
          2
        )}
      </pre>
    );
  }

  const res = await fetch(`${API}/os`, { cache: "no-store" });
  const data = await res.json();

  return (
    <pre>
      {JSON.stringify(
        {
          ...data,
          _api: API
        },
        null,
        2
      )}
    </pre>
  );
}

