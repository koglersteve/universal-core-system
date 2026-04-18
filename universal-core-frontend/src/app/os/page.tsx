"use client";

import { getBackendUrl } from "@/lib/backend";

export default function OSPage() {
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

  async function load() {
    const res = await fetch(`${API}/os`, { cache: "no-store" });
    return res.json();
  }

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    load().then(setData);
  }, []);

  if (!data) return <pre>Loading...</pre>;

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

