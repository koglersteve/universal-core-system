import React from "react";
import { render } from "@testing-library/react";
import { EmptyState } from "../components/EmptyState";

describe("FavoritesScreen (EmptyState)", () => {
  it("renders empty state message", () => {
    const { getByText } = render(
      <EmptyState title="No favorites yet" description="Save jokes you love to see them here." />
    );

    expect(getByText("No favorites yet")).toBeInTheDocument();
  });
});
