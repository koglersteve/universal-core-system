import React from "react";

function DemoBanner({ osPacket }) {
  if (!osPacket) return null;

  return (
    <div className="demo-banner">
      <p>
        <strong>Demo Mode:</strong> Mood state sent to Universal Core at{" "}
        <code>{osPacket.timestamp}</code> with mood{" "}
        <code>{osPacket.mood}</code>.
      </p>
    </div>
  );
}

export default DemoBanner;
