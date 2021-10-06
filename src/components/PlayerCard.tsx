import React from "react";
import {
  Backdrop,
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { ResourceTypes } from "./Game";
import { extractValue } from "../utils";
import { Player } from "../models/player";

type PlayerCardProps = {
  player: Player;
  type: string;
  loading: boolean;
};

const PlayerCard = ({ player, type, loading }: PlayerCardProps) => {
  return (
    <Card
      sx={{ bgcolor: player.winner ? "success.light" : "background.paper" }}
    >
      <CardContent sx={{ position: "relative" }}>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: "absolute",
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography sx={{ fontSize: 14 }}>{player?.name}</Typography>
        <Typography sx={{ fontSize: 14 }} color="secondary.main" gutterBottom>
          {`score: ${player?.score}`}
        </Typography>
        <Typography variant="h5" component="div">
          {player?.currentObj?.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {type}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`${type === ResourceTypes.Starships ? "Crew" : "Mass"}: ${
            loading ? 0 : extractValue(player)
          }`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
