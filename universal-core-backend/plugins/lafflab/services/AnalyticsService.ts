export const AnalyticsService = {
  async getSummary() {
    return {
      totalJokesServed: 12345,
      totalLaughs: 8900,
      crossAppLaunches: {
        moodcheck: 320,
        mememydog: 210,
        idlyily: 95,
        dramanextdoor: 40
      }
    };
  }
};
