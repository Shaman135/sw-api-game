import { render, screen } from "@testing-library/react";
import Game from "../Game";

describe("Game component tests", () => {
  beforeAll(() => {
    render(<Game />);
  })
  it("check if roll button is enabled", () => {
    const btn = screen.getByTestId("roll-btn");
    expect(btn).toBeEnabled();
  })
})