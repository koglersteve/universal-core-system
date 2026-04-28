import React, { useEffect, useState } from "react";

export const CoupleModeScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [session, setSession] = useState<any>(null);

  const startSession = () => {
    fetch("/lafflab/couples/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partnerId: "partner_123" })
    })
      .then(r => r.json())
      .then(setSession);
  };

  useEffect(() => {
    startSession();
  }, []);

  if (!session) return <div>Starting couples mode…</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Couples Mode</h2>
      <p>Session ID: {session.sessionId}</p>

      <button onClick={onClose}>Close</button>
    </div>
  );
};
