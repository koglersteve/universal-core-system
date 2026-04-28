import React, { useEffect, useState } from "react";

export const DailyRitualScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/lafflab/ritual")
      .then(r => r.json())
      .then(setData);
  }, []);

  const complete = () => {
    fetch("/lafflab/ritual/complete", { method: "POST" }).then(() => onClose());
  };

  if (!data) return <div>Loading ritual…</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Daily Laugh Ritual</h2>
      <p>Streak: {data.streak} days</p>
      <p>{data.joke.text}</p>
      <button onClick={complete}>Mark as done</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
