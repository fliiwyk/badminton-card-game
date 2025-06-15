// gameEngine.ts
import { allCards } from "../data/datas";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { Hand } from "../models/hand";

// 1. Créer les joueurs et le match
const Alice = new Player(1, "Alice", 0, new Hand(), true, 1);
const Bob = new Player(2, "Bob", 0, new Hand(), false, 2);
const match = new Match(1, "single", [Alice, Bob], 0, false);

// 2. Démarrer une partie
function startMatch() {
  match.setupMatch(allCards);
  match.playServeCard();
}

// 3. Renvoyer l'état actuel du jeu
function getGameState() {
  const middleCard = match.middleDeck?.cards[0];

  return {
    middleDeck: middleCard?.toJSON(),
    currentPlayer: {
      name: match.currentPlayer.getName(),
      hand: match.currentPlayer
        .getHand()
        .getCards()
        .map((c) => {
          c.isPlayableCard(middleCard);
          return {
            ...c.toJSON(),
          };
        }),
    },
    score: match.players.map((p) => ({
      name: p.getName(),
      points: p.getPoints(),
    })),
    end: match.end,
  };
}

// (plus tard on ajoutera playCard etc.)

// 4. Exporter
export { match, startMatch, getGameState };
