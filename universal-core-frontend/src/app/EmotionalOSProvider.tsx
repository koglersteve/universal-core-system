const update = (patch: Partial<EmotionalState>) =>
  setState(prev => {
    const proposed = { ...prev, ...patch };
    const safe = evaluateSafety(prev, proposed);

    return {
      ...proposed,
      mood: safe.adjustedMood,
      tension: safe.adjustedTension,
      volatility: safe.adjustedVolatility,
      safetyTriggers: safe.triggers, // ⭐ expose triggers to the router
    };
  });
