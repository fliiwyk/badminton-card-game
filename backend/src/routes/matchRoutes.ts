import express from "express";
import { allCards } from "../data/datas";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { Hand } from "../models/hand";

const router = express.Router();

router.get("/start-match", (req, res) => {
  const Alice = new Player(1, "Alice", 0, new Hand(), true, 1);
  const Bob = new Player(2, "Bob", 0, new Hand(), false, 2);
  const match = new Match(1, "single", [Alice, Bob], 0, false);
  match.setupMatch(allCards);

  const playersData = match.players.map((player) => ({
    id: player.getId(),
    name: player.getName(),
    hand: player
      .getHand()
      .getCards()
      .map((card) => card.toJSON()), // Convertir les cartes en JSON
  }));

  res.json(playersData);
});

export default router;
