"use client";

import { useIdlyilySession } from "./state/useIdlyilySession";
import MoodBadge from "./components/MoodBadge";

export default function IdlyilyHistory() {
  const { history, emotionalStreak, lastMoodScore } = useIdlyilySession();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your IDLYILY History</h1>

      <div className="text-gray-600">
        <p>Emotional streak: <strong>{emotionalStreak}</strong></p>
        {lastMoodScore !== undefined && (
          <p>Last mood score: <strong>{lastMoodScore}</strong></p>
        )}
      </div>

      {history.length === 0 && (
        <p className="text-gray-500">No entries yet. Your journey starts with your first reflection.</p>
      )}

      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <MoodBadge mood={entry.mood} />
              <span className="text-xs text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
            </div>

            <p className="text-gray-800 whitespace-pre-line">
              {entry.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
