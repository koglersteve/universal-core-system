import React from "react";
import { render } from "@testing-library/react";
import { JokeCard } from "../components/JokeCard";

describe("JokeCard", () => {
  it("renders joke text", () => {
    const { getByText } = render(
      <JokeCard
        joke={{ id: "1", text: "Test joke", category: "General" }}
      />
    );

    expect(getByText("Test joke")).toBeInTheDocument();
  });
});
