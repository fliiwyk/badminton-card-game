import { allCards } from "../data/datas";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { Hand } from "../models/hand";

console.log("=== DÉMARRAGE D’UN MATCH TEST ===");

// Fonction simple pour tester ta logique directement :
function runTest() {
    const Alice = new Player(1, "Alice", 0, new Hand(), true, 1);
    const Bob = new Player(2, "Bob", 0, new Hand(), false, 2);
    const match = new Match(1, "single", [Alice, Bob], 0, false);
  
    match.setupMatch(allCards);
    match.playServeCard();
  
    match.players.forEach((player) => {
      console.log(`--- Player: ${player.getName()} ---`);
      player.getHand().getCards().forEach((card) => {
        match.isPlayableCard(card);
        console.log({ card: card.toJSON(),});
      });
    });
  
    const middleDeckTopCard = match.middleDeck?.cards[0]?.toJSON();
    console.log("Middle deck top card:", middleDeckTopCard);
  }
  
  // Lancer directement le test
  runTest();