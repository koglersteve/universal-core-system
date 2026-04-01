import React, { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import MoodOutput from "./components/MoodOutput";
import DemoBanner from "./components/DemoBanner";
import { generateMoodOutput } from "./services/moodGenerator";
import { writeMoodState } from "./services/stateWriter";
import { DEMO_MODE } from "./utils/constants";
import "./assets/styles.css";

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [output, setOutput] = useState(null);
  const [osPacket, setOsPacket] = useState(null);

  const handleMoodSelect = (mood) => {
    const result = generateMoodOutput(mood);
    setSelectedMood(mood);
    setOutput(result.output);

    const packet = writeMoodState({
      mood,
      memeReference: result.memeReference,
    });

    setOsPacket(packet);
  };

  return (
    <div className="app-container">
      <h1>MoodCheck</h1>
      <p className="subtitle">Tap your mood. Let the OS do the rest.</p>

      {DEMO_MODE && osPacket && <DemoBanner osPacket={osPacket} />}

      <MoodSelector onSelect={handleMoodSelect} selectedMood={selectedMood} />
      <MoodOutput mood={selectedMood} output={output} />
    </div>
  );
}

export default App;
