import React, { useEffect, useState } from 'react';

export default function MyCreations() {
  const [creations, setCreations] = useState<any[]>([]);

  useEffect(() => {
    fetch('/mememydog/creations')
      .then(res => res.json())
      .then(setCreations);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Dog Memes</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {creations.map(m => (
          <div key={m.id} style={{ width: 220 }}>
            <img src={m.imageUrl} width={220} style={{ borderRadius: 12 }} />
            {m.title && <p>{m.title}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
