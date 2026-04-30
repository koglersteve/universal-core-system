"use client";

import { useEffect, useState } from "react";

export default function MultiversePage() {
  const [universes, setUniverses] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    fetch("/api/multiverse/list")
      .then((r) => r.json())
      .then((data) => setUniverses(data.universes));

    const cookie = document.cookie.match(/universeId=([^;]+)/);
    setActive(cookie ? cookie[1] : "prime");
  }, []);

  const switchUniverse = async (id: string) => {
    await fetch(`/api/multiverse/switch/${id}`, { method: "POST" });
    document.cookie = `universeId=${id}; Path=/; SameSite=Lax`;
    setActive(id);
    window.location.reload();
  };

  return (
    <div>
      <h1>Multiverse</h1>

      <h2>Active Universe: {active}</h2>

      <ul>
        {universes.map((u: any) => (
          <li key={u.id}>
            {u.id}
            {active !== u.id && (
              <button onClick={() => switchUniverse(u.id)}>Switch</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
