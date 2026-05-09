export const LaffLabApi = {
  async listHistory() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/history/list`,
      { cache: "no-store" }
    );
    return res.json();
  },

  async addHistory(item: any) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/history/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      }
    );
  },

  async clearHistory() {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/history/clear`,
      { method: "POST" }
    );
  }
};
