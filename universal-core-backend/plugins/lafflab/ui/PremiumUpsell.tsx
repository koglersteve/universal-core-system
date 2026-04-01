import React, { useEffect, useState } from "react";

export const PremiumUpsell: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [activated, setActivated] = useState(false);

  const activatePremium = () => {
    setLoading(true);

    // In production, this is where you trigger the native purchase flow.
    // After purchase succeeds, call the backend:
    fetch("/lafflab/premium/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: "lafflab.premium.monthly" })
    })
      .then(r => r.json())
      .then(() => {
        setActivated(true);
        setLoading(false);
      });
  };

  if (activated) {
    return (
      <div style={{ padding: 16 }}>
        <h2>You're Premium 🎉</h2>
        <p>Enjoy unlimited laughs, couples mode, and exclusive categories.</p>
        <button onClick={onClose} style={{ marginTop: 12 }}>
          Continue
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>LAFFlab Premium 💎</h2>

      <p style={{ marginTop: 8, marginBottom: 16 }}>
        Unlock the full emotional experience.
      </p>

      <div style={{ marginBottom: 16 }}>
        <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
          <li>Unlimited joke categories</li>
          <li>AI‑generated jokes</li>
          <li>Couples Mode ❤️</li>
          <li>Daily Ritual streak boosts</li>
          <li>No ads</li>
        </ul>
      </div>

      <button
        onClick={activatePremium}
        disabled={loading}
        style={{
          padding: "10px 16px",
          borderRadius: 6,
          background: "#222",
          color: "white",
          border: "none",
          cursor: "pointer",
          width: "100%"
        }}
      >
        {loading ? "Activating…" : "Upgrade to Premium"}
      </button>

      <button
        onClick={onClose}
        style={{
          marginTop: 12,
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
          width: "100%"
        }}
      >
        Not now
      </button>
    </div>
  );
};
