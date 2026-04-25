import { LaffLabApi } from "../api/LaffLabApi";

describe("LaffLabApi", () => {
  it("exposes expected methods", () => {
    expect(typeof LaffLabApi.getRandomJoke).toBe("function");
    expect(typeof LaffLabApi.getCategories).toBe("function");
    expect(typeof LaffLabApi.getFavorites).toBe("function");
  });
});
