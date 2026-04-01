import React from "react";

function MoodOutput({ mood, output }) {
  if (!mood) {
    return (
      <div className="card">
        <h2>Your vibe</h2>
        <p className="placeholder">Pick a mood to see what the OS does.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Your vibe</h2>
      <p className="mood-label">
        Mood: <strong>{mood}</strong>
      </p>
      <p className="mood-output">{output}</p>
    </div>
  );
}

export default MoodOutput;
