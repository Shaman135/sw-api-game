import {
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getResource } from "../api/resources";
import { Person } from "../models/person";
import { Player } from "../models/player";
import { Starship } from "../models/starship";
import { extractValue } from "../utils";
import PlayerCard from "./PlayerCard";

export enum ResourceTypes {
  Starships = "starships",
  People = "people",
}

const Game = () => {
  const [items, setItems] = useState<Array<Starship | Person>>([]);
  const [duel, setDuel] = useState<Player[]>([
    {
      name: "Left Player",
      currentObj: {} as Starship,
      score: 0,
      winner: false,
    },
    {
      name: "Right Player",
      currentObj: {} as Starship,
      score: 0,
      winner: false,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [playAgainst, setPlayAgainst] = useState<string>(
    ResourceTypes.Starships
  );
  const options = Object.values(ResourceTypes);

  const nextDuel = useCallback(() => {
    setDuel((duel) => {
      let players = [
        {
          ...duel[0],
          winner: false,
          currentObj: items[Math.floor(Math.random() * items.length)],
        },
        {
          ...duel[1],
          winner: false,
          currentObj: items[Math.floor(Math.random() * items.length)],
        },
      ];
      const idx = chooseWinnerIdx(players);
      if (idx !== -1) {
        const updatedPlayer = {
          ...players[idx],
          score: players[idx].score + 1,
          winner: true,
        };
        if (idx === 1) {
          players = [players[0], updatedPlayer];
        } else {
          players = [updatedPlayer, players[1]];
        }
      }
      return players;
    });
  }, [items]);

  useEffect(() => {
    nextDuel();
  }, [items, nextDuel]);

  useEffect(() => {
    setLoading(true);
    getResource(playAgainst).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [playAgainst]);

  const handleChange = (event: SelectChangeEvent) => {
    setPlayAgainst(event.target.value as string);
  };

  const chooseWinnerIdx = (players: Player[]): -1 | 0 | 1 => {
    const valA = extractValue(players[0]);
    const valB = extractValue(players[1]);
    // assume "," is thousands separator - thanks Jabba
    if (valA === "unknown" || valB === "unknown" || valA === valB) {
      return -1;
    } else if (
      Number.parseInt(valA.replace(",", "")) >
      Number.parseInt(valB.replace(",", ""))
    ) {
      return 0;
    } else {
      return 1;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel id="select-label">Play Against</InputLabel>
          <Select
            label="Play Against"
            labelId="select-label"
            value={playAgainst}
            onChange={handleChange}
          >
            {options.map((item, idx) => (
              <MenuItem value={item} key={idx}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {duel.map((p: Player, idx: number) => (
        <Grid item xs={6} key={idx}>
          <PlayerCard player={duel[idx]} type={playAgainst} loading={loading} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button data-testid="roll-btn" variant="outlined" onClick={nextDuel}>Roll Again</Button>
      </Grid>
    </Grid>
  );
};

export default Game;
