import React, { useEffect, useState } from "react";

export const FavoritesScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    fetch("/lafflab/favorites")
      .then(r => r.json())
      .then(setFavorites);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Favorites</h2>

      {favorites.map(f => (
        <div key={f.id} style={{ marginBottom: 12 }}>
          <p>{f.joke.text}</p>
        </div>
      ))}

      <button onClick={onClose}>Close</button>
    </div>
  );
};
