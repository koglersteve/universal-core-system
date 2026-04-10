export const MemeMyCatService = {
  async getTemplates() {
    return [
      {
        id: "mememycat-default",
        name: "Default Cat Template",
        category: "static",
        preview: "/templates/mememycat/default.png"
      }
    ];
  },

  async generateMeme(input: any) {
    return {
      url: "/generated/mememycat/placeholder.png",
      input
    };
  },

  async getCreations() {
    return [];
  }
};
