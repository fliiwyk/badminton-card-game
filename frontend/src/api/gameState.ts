export async function getGameState() {
  const res = await fetch("http://localhost:3000/api/game/state");
  return res.json();
}
