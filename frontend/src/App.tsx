import { useEffect, useState } from "react";
import { startMatch } from "./api/startMatch.ts";
import { Card, Player } from "./types";

function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [middleDeckTopCard, setMiddleDeckTopCard] = useState<Card | null>(null);

    useEffect(() => {
        startMatch().then((data) => {
            console.log("--- Joueurs ---");
            console.log(data.players);
            console.log("--- Carte du milieu ---");
            console.log(data.middleDeckTopCard);

            setPlayers(data.players);
            setMiddleDeckTopCard(data.middleDeckTopCard);
        });
    }, []);

    return (
        <div className="App" style={{ padding: "2rem" }}>
            {players.length > 0 && (
                <>
                    <div style={{ marginBottom: "2rem" }}>
                        <h2>{players[0].name}</h2>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {players[0].hand.map((card) => {
                                console.log("Carte de", players[0].name, ":", card);
                                return (
                                    <div
                                        key={card.id}
                                        style={{
                                            border: "1px solid black",
                                            borderRadius: "8px",
                                            padding: "0.5rem",
                                            width: "120px",
                                            backgroundColor: card.isPlayable ? "#a0ffa0" : "#f8f8f8",
                                            boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <strong>{card.class}</strong>
                                        <p>Type: {card.type}</p>
                                        {card.class === "TechnicalShot" && (
                                            <div>
                                                <p>Position 1: {card.first_position}</p>
                                                <p>Position 2: {card.second_position}</p>
                                                <p>Target 1: {card.first_target}</p>
                                                <p>Target 2: {card.second_target}</p>
                                                <p>Shot 1: {card.first_shot}</p>
                                                <p>Shot 2: {card.second_shot}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ margin: "2rem 0", textAlign: "center" }}>
                        <h2>Middle Deck</h2>
                        {middleDeckTopCard ? (
                            <div
                                style={{
                                    border: "2px solid #333",
                                    borderRadius: "8px",
                                    padding: "0.75rem",
                                    width: "140px",
                                    margin: "0 auto",
                                    backgroundColor: "#fff",
                                    boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                                }}
                            >
                                <strong>{middleDeckTopCard.class}</strong>
                                <div>
                                                <p>Position 1: {middleDeckTopCard.first_position}</p>
                                                <p>Position 2: {middleDeckTopCard.second_position}</p>
                                                <p>Target 1: {middleDeckTopCard.first_target}</p>
                                                <p>Target 2: {middleDeckTopCard.second_target}</p>
                                                <p>Shot 1: {middleDeckTopCard.first_shot}</p>
                                                <p>Shot 2: {middleDeckTopCard.second_shot}</p>
                                                <p>Current_Shot: {middleDeckTopCard.current_shot}</p>
                                                <p>Current_Target: {middleDeckTopCard.target}</p>
                                            </div>
                                
                            </div>
                        ) : (
                            <span>Pas de carte au milieu</span>
                        )}
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <h2>{players[1].name}</h2>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {players[1].hand.map((card) => {
                                console.log("Carte de", players[1].name, ":", card);
                                return (
                                    <div
                                        key={card.id}
                                        style={{
                                            border: "1px solid black",
                                            borderRadius: "8px",
                                            padding: "0.5rem",
                                            width: "120px",
                                            backgroundColor: card.isPlayable ? "#a0ffa0" : "#f8f8f8",
                                            boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <strong>{card.class}</strong>
                                <div>
                                                <p>Position 1: {card.first_position}</p>
                                                <p>Position 2: {card.second_position}</p>
                                                <p>Target 1: {card.first_target}</p>
                                                <p>Target 2: {card.second_target}</p>
                                                <p>Shot 1: {card.first_shot}</p>
                                                <p>Shot 2: {card.second_shot}</p>
                                            </div>
                                
                            </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
