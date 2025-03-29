export interface Card {
  id: number;
  type: string;
  effect?: string; // Présente uniquement pour SpecialCard
  class: string; // "TechnicalShot" ou "SpecialCard"
  first_position?: string; // Présente uniquement pour TechnicalShot
  second_position?: string; // Présente uniquement pour TechnicalShot
  first_target?: string; // Présente uniquement pour TechnicalShot
  second_target?: string; // Présente uniquement pour TechnicalShot
  first_shot?: string; // Présente uniquement pour TechnicalShot
  second_shot?: string; // Présente uniquement pour TechnicalShot
  winning_shot?: boolean; // Présente uniquement pour TechnicalShot
  description?: string; // Présente uniquement pour SpecialCard
}

export interface Player {
  id: number;
  name: string;
  hand: Card[];
  score: number;
}
