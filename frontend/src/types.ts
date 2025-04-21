export interface Card {
  id: number;
  type: string;
  isPlayable?: boolean; // Présente uniquement pour les cartes jouables
  effect?: string; // Présente uniquement pour SpecialCard
  class: string; // "TechnicalShot" ou "SpecialCard"
  first_position?: string; // Présente uniquement pour TechnicalShot
  second_position?: string; // Présente uniquement pour TechnicalShot
  first_target?: string; // Présente uniquement pour TechnicalShot
  second_target?: string; // Présente uniquement pour TechnicalShot
  first_shot?: string; // Présente uniquement pour TechnicalShot
  second_shot?: string; // Présente uniquement pour TechnicalShot
  current_shot?: boolean; // Présente uniquement pour TechnicalShot
  description?: string; // Présente uniquement pour SpecialCard
  target?: string; // Présente uniquement pour TechnicalShot
  
}

export interface Player {
  id: number;
  name: string;
  hand: Card[];
  score: number;
}
