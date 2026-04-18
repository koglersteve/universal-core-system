// rebuild trigger

"use client";

import React from "react";
import { getBackendUrl } from "@/lib/backend";

console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

export default function OSPage() {
  const API = getBackendUrl();
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    if (!API) {
      setData({
        message: "OS offline (no API)",
        modules: [],
        _api: null
      });
      return;
    }

    async function load() {
      try {
        const res = await fetch(`${API}/os`, { cache: "no-store" });
        const body = await res.json();
        setData({ ...body, _api: API });
      } catch (err) {
        setData({
          message: "OS offline (fetch error)",
          modules: [],
          _api: API
        });
      }
    }

    load();
  }, [API]);

  if (!data) return <pre>Loading...</pre>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

