export const MoodCheckService = {
  async submitMood(mood: string) {
    return {
      ok: true,
      mood,
      resultId: "placeholder-result-id"
    };
  },

  async getHistory() {
    return [];
  },

  async getResult(id: string) {
    return {
      mood: "neutral",
      timestamp: new Date().toISOString()
    };
  }
};
