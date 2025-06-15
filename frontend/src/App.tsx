import { useEffect, useState } from "react";
import { startMatch } from "./api/startMatch";
import { getGameState } from "./api/gameState";
import PlayerHand from "./components/PlayerHand";
import CardImage from "./components/CardImage";


function App() {
  const [gameState, setGameState] = useState<any | null>(null);

  useEffect(() => {
    const initGame = async () => {
      await startMatch();
      const state = await getGameState();
      console.log("État du jeu récupéré :", state);
      setGameState(state);
    };
    initGame();
  }, []);


  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Carte du milieu</h1>
      {gameState ? (
       <div style={{ transform: "rotate(180deg)" }}>
            <CardImage card={gameState.middleDeck} />
        </div>

      ) : (
        <p>Aucune carte disponible</p>
      )}
    {gameState?.currentPlayer && <PlayerHand player={gameState.currentPlayer} />}


    </div>

  );
}

export default App;
