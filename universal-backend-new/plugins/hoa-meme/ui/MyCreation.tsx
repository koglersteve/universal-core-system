import React, { useEffect, useState } from 'react';

interface Meme {
  id: number;
  imageUrl: string;
  title?: string;
  createdAt: string;
}

export default function MyCreations() {
  const [creations, setCreations] = useState<Meme[]>([]);

  useEffect(() => {
    fetch('/hoa-meme/creations')
      .then(res => res.json())
      .then(setCreations);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Creations</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {creations.map(m => (
          <div key={m.id} style={{ width: 200 }}>
            <img src={m.imageUrl} width={200} style={{ borderRadius: 8 }} />
            {m.title && <p style={{ marginTop: 8 }}>{m.title}</p>}
            <small>{new Date(m.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
