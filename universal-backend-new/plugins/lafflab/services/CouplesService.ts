export const CouplesService = {
  async startSession(userId: string, partnerId: string) {
    // create shared session
    return {
      sessionId: "session_123",
      users: [userId, partnerId]
    };
  },

  async getSharedFeed(sessionId: string) {
    // return shared jokes feed
    return [
      { id: "j1", text: "Shared joke 1" },
      { id: "j2", text: "Shared joke 2" }
    ];
  }
};
