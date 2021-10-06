import { Person } from "./person";
import { Starship } from "./starship";

export interface Player {
  name: string;
  currentObj: Starship | Person;
  score: number;
  winner: boolean;
}
