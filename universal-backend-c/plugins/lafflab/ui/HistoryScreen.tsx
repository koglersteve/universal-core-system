import React, { useEffect, useState } from "react";

export const HistoryScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("/lafflab/history")
      .then(r => r.json())
      .then(setHistory);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>History</h2>

      {history.map(h => (
        <div key={h.id} style={{ marginBottom: 12 }}>
          <p>{h.joke.text}</p>
          <small>{new Date(h.seen_at).toLocaleString()}</small>
        </div>
      ))}

      <button onClick={onClose}>Close</button>
    </div>
  );
};
