import { render, screen } from "@testing-library/react";
import { Starship } from "../../models/starship";
import PlayerCard from "../PlayerCard";

describe("PlayerCard tests", () => {
  const mockPlayer = {
    name: "John",
    currentObj: { name: "X-Wing", crew: "1" } as Starship,
    score: 0,
    winner: false
  };

  it("check if type props is rendered", () => {
    render(
      <PlayerCard player={mockPlayer} type="starship" loading={true} />
    );
    expect(screen.getByText("starship")).toBeInTheDocument();
  });

  it("check if object name is displayed", () => {
    render(
      <PlayerCard player={mockPlayer} type="starship" loading={true} />
    );
    expect(screen.getByText("X-Wing")).toBeInTheDocument();
  });

  it("check if score is updated", () => {
    mockPlayer.score += 2;
    render(
      <PlayerCard player={mockPlayer} type="starship" loading={true} />
    );
    expect(screen.getByText("score: 2")).toBeInTheDocument();
  });

  it("check for winner bg", () => {
    mockPlayer.winner = true;
    render(
      <PlayerCard player={mockPlayer} type="starship" loading={true} />
    );
    const card = screen.getByTestId("player-card");
    expect(card).toHaveStyle("background-color: #4caf50;");
  })
});
