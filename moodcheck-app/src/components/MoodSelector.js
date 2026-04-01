import React from "react";
import { MOODS } from "../utils/constants";

function MoodSelector({ onSelect, selectedMood }) {
  return (
    <div className="card">
      <h2>Select your mood</h2>
      <div className="mood-grid">
        {MOODS.map((mood) => (
          <button
            key={mood}
            className={`mood-button ${
              selectedMood === mood ? "mood-button-selected" : ""
            }`}
            onClick={() => onSelect(mood)}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;
