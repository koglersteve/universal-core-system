import moods from "../assets/moods.json";

export function generateMoodOutput(mood) {
  const moodConfig = moods[mood] || moods["default"];

  const messages = moodConfig.messages || [];
  const memes = moodConfig.memes || [];

  const message =
    messages.length > 0
      ? messages[Math.floor(Math.random() * messages.length)]
      : "Mood logged.";

  const memeReference =
    memes.length > 0
      ? memes[Math.floor(Math.random() * memes.length)]
      : null;

  return {
    output: message,
    memeReference,
  };
}
