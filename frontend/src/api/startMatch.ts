import { MatchState } from "../types";

const API_BASE = "http://localhost:5000/api";

export async function startMatch(player1Name: string, player2Name: string): Promise<MatchState> {
  const res = await fetch(`${API_BASE}/match/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player1Name, player2Name }),
  });
  return res.json();
}

export async function getMatchState(matchId: number): Promise<MatchState> {
  const res = await fetch(`${API_BASE}/match/${matchId}`);
  return res.json();
}

export async function playCard(matchId: number, cardId: number, side: "first" | "second"): Promise<MatchState> {
  const res = await fetch(`${API_BASE}/match/${matchId}/play-card`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId, side }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }
  return res.json();
}

export async function drawCard(matchId: number): Promise<MatchState> {
  const res = await fetch(`${API_BASE}/match/${matchId}/draw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }
  return res.json();
}
