// frontend/src/api/startmatch.ts
export async function startMatch() {
  const res = await fetch("http://localhost:3000/api/game/start", {
    method: "POST",
  });
  return res.json(); // { ok: true, message: "Partie démarrée" }
}
