export const MemeMyDogService = {
  async getTemplates() {
    return [
      {
        id: "mememydog-default",
        name: "Default Dog Template",
        category: "static",
        preview: "/templates/mememydog/default.png"
      }
    ];
  },

  async generateMeme(input: any) {
    return {
      url: "/generated/mememydog/placeholder.png",
      input
    };
  },

  async getCreations() {
    return [];
  }
};
