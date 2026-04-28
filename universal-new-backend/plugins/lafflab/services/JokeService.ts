export const JokeService = {
  async getRandomJoke(userId: string) {
    // pull from db, maybe bias by past reactions
    // placeholder:
    return {
      id: "j1",
      text: "Why did the OS cross the road? To avoid legacy dependencies.",
      categoryId: "tech"
    };
  },

  async getRandomByCategory(userId: string, categoryId: string) {
    // ...
  },

  async search(query: string) {
    // ...
  }
};
