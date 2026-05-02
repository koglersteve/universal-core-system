export const LaffLabApi = {
  async getCategories() {
    return api.get("/categories");
  },

  async getCategory(id: string) {
    return api.get(`/categories/${id}`);
  },

  async getPosts() {
    return api.get("/posts");
  },

  async getPost(id: string) {
    return api.get(`/posts/${id}`);
  },

  async getHistory() {
    return api.get("/history");
  },

  async addHistory(postId: string) {
    await api.post("/history", { postId });
  },

  async clearHistory() {
    await api.delete("/history");
  },

  async generateRitual() {
    return api.get("/daily-ritual/generate");
  },
};
