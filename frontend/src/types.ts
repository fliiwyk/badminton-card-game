export interface CardData {
  id: number;
  type: string;
  isPlayable: boolean;
  class: string;
  // TechnicalShot fields
  first_position?: string;
  second_position?: string;
  first_target?: string;
  second_target?: string;
  first_shot?: string;
  second_shot?: string;
  current_shot?: string;
  target?: string;
  // SpecialCard fields
  description?: string;
}

export interface PlayerData {
  id: number;
  name: string;
  score: number;
  handCount: number;
  hand: CardData[];
}

export interface ScoreData {
  id: number;
  name: string;
  score: number;
}

export interface MatchState {
  matchId: number;
  currentPlayerId: number;
  players: PlayerData[];
  middleDeckTopCard: CardData | null;
  phase: string;
  drawsRemaining: number;
  message: string;
  scores: ScoreData[];
  winner: string | null;
  canDraw: boolean;
  mainDeckCount: number;
  serveDeckCount: number;
}
