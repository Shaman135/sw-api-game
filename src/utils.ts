import { Player } from "./models/player";

export const extractValue = (player: Player): string => {
  // check if player fields are defined
  if (player?.currentObj?.name) {
    if ("crew" in player.currentObj) {
      return player.currentObj.crew;
    } else {
      return player.currentObj.mass;
    }
  } else {
    return "unknown";
  }
}