import React, { useEffect, useState } from 'react';

interface Meme {
  id: number;
  imageUrl: string;
  title?: string;
  couples: boolean;
  createdAt: string;
}

export default function MyCreations() {
  const [creations, setCreations] = useState<Meme[]>([]);

  useEffect(() => {
    fetch('/idlyily/creations')
      .then(res => res.json())
      .then(setCreations);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My IDLYILY Creations</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {creations.map(m => (
          <div key={m.id} style={{ width: 220 }}>
            <img src={m.imageUrl} width={220} style={{ borderRadius: 12 }} />
            {m.title && <p style={{ marginTop: 8 }}>{m.title}</p>}
            {m.couples && <small>Couples Mode ❤️</small>}
            <br />
            <small>{new Date(m.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

