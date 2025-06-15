import express from "express";
import { startMatch, getGameState } from "../engine/gameEngine";

const router = express.Router();

// Route POST /api/game/start pour démarrer la partie
router.post("/start", (req, res) => {
  startMatch();
  res.json({ ok: true, message: "Partie démarrée" });
});

// Route GET /api/game/state pour récupérer l'état du jeu
router.get("/state", (req, res) => {
  const state = getGameState();
  res.json(state);
});

export default router;
