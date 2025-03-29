import { useEffect, useState } from "react";
import { startMatch } from "./api/startMatch.ts";
import { Card, Player } from "./types";


function App() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        startMatch().then(setPlayers);
    }, []);

    return (
        <div className="App" style={{ padding: "2rem" }}>
            <h1>Badminton Card Game 🎴</h1>
            {players.map(player => (
                <div key={player.id} style={{ marginBottom: "2rem" }}>
                    <h2>{player.name}</h2>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        {player.hand.map(card => (
                            <div
                                key={card.id}
                                style={{
                                    border: "1px solid black",
                                    borderRadius: "8px",
                                    padding: "1rem",
                                    width: "150px",
                                    backgroundColor: "#f8f8f8",
                                    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
                                }}
                            >
                                <strong>{card.class}</strong>
                                <p>Type: {card.type}</p>
                                {card.description && <p>Catégorie: {card.description}</p>}
                                {card.first_position && <p>1ère position: {card.first_position}</p>}
                                {card.second_position && <p>2ème position: {card.second_position}</p>}
                                {card.first_target && <p>1ère cible: {card.first_target}</p>}
                                {card.second_target && <p>2ème cible: {card.second_target}</p>}
                                {card.first_shot && <p>1er tir: {card.first_shot}</p>}
                                {card.second_shot && <p>2ème tir: {card.second_shot}</p>}
                               
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
