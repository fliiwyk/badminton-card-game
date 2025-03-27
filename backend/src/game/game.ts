import { allCards } from "../data/datas";
import {Match} from "../models/match";
import { Player } from "../models/player";
import { Hand } from "../models/hand";

console.log("=== DÉMARRAGE D’UN MATCH TEST ===");

const Alice = new Player(1, "Alice", 0, new Hand(), true);
const Bob = new Player(2, "Bob", 0, new Hand(), false);

const match = new Match(1, "single",  [Alice, Bob], 0, false);
match.setupMatch(allCards);

//afficher les cartes de chaque joueur
console.log("=== CARTES DES JOUEURS ===");
for (const player of match.players) {
    console.log(`Joueur ${player.getName()}:`);
    // Afficher les cartes de la main du joueur
    const hand = player.getHand();  
    const cards = hand.getCards();
    for (const card of cards) {
        console.log(`- ${card.getId()} (${card.getType()})`);
    }
}

