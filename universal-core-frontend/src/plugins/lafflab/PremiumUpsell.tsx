"use client";

import React from "react";

type PremiumUpsellProps = {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
};

export function PremiumUpsell({ mood, world, trait, agent }: PremiumUpsellProps) {
  return (
    <div className="premiumupsell-container">
      <div className="premiumupsell-card">
        <h2 className="premiumupsell-title">Unlock LAFFlab Premium</h2>

        <p className="premiumupsell-subtitle">
          More laughs. More chaos. More you.
        </p>

        <ul className="premiumupsell-features">
          <li>✨ Unlimited joke generations</li>
          <li>🎭 Mood‑aware comedy packs</li>
          <li>📚 Premium categories & dark‑mode humor</li>
          <li>🧠 Emotional‑continuity insights</li>
          <li>⭐ Save unlimited favorites</li>
          <li>🔗 Cross‑app emotional routing</li>
        </ul>

        <button
          className="premiumupsell-button"
          onClick={() => {
            // Canonical subscription route
            window.location.href = "/subscribe?app=lafflab";
          }}
        >
          Upgrade to Premium
        </button>

        {(mood || world || trait || agent) && (
          <div className="premiumupsell-context">
            <p className="premiumupsell-context-title">Your Current Vibe</p>

            {mood && <p><strong>Mood:</strong> {mood}</p>}
            {world && <p><strong>World:</strong> {world}</p>}
            {trait && <p><strong>Trait:</strong> {trait}</p>}
            {agent && <p><strong>Agent:</strong> {agent}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default PremiumUpsell;
