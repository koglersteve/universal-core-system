export function evaluateSafety(prev, next) {
  const triggers = [];

  const MAX_VOLATILITY = 80;
  const MAX_TENSION = 80;
  const MAX_MOOD_SLOPE = 15;

  const moodSlope = next.mood - prev.mood;

  let adjustedMood = next.mood;
  let adjustedTension = Math.min(next.tension, MAX_TENSION);
  let adjustedVolatility = Math.min(next.volatility, MAX_VOLATILITY);

  // prevent emotional whiplash
  if (Math.abs(moodSlope) > MAX_MOOD_SLOPE) {
    adjustedMood = prev.mood + Math.sign(moodSlope) * MAX_MOOD_SLOPE;
    triggers.push("soften:mood-slope");
  }

  // volatility too high → stabilize
  if (adjustedVolatility !== next.volatility) {
    triggers.push("ritual:stabilize");
    triggers.push("notify:high-volatility");
  }

  return {
    adjustedMood,
    adjustedTension,
    adjustedVolatility,
    triggers,
  };
}
