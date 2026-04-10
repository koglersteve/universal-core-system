export default {
  id: "moodcheck",
  name: "MoodCheck",
  version: "0.1.0",
  enabled: true,
  routes: {
    submit: "/plugins/moodcheck/api/submit",
    history: "/plugins/moodcheck/api/history",
    result: "/plugins/moodcheck/api/result"
  }
};
