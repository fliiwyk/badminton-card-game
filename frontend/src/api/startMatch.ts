export async function startMatch() {
  const res = await fetch("http://localhost:5000/api/start-match");
  return res.json();
}
