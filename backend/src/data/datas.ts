import { Card } from "../models/card";
import { TechnicalShot } from "../models/technical_shot";
import { SpecialCard } from "../models/special_card";

export const allCards: Card[] = [
  //serves
  
    new TechnicalShot(1, "serve", false, "midLeft", "midRight", "midLeft", "midRight", "short_serv", "short_serv"),
    new TechnicalShot(2, "serve", false, "midLeft", "midRight", "longLeft", "longRight", "long_serv", "long_serv"),
    new TechnicalShot(3, "serve", false, "midLeft", "midRight", "midLeft", "longRight", "short_serv", "long_serv"),
    new TechnicalShot(4, "serve", false, "midLeft", "midRight", "longLeft", "midRight", "long_serv", "short_serv"),
    new TechnicalShot(5, "technical", false, "longLeft", "longRight", "shortLeft", "shortRight", "slice", "slice"),
    new TechnicalShot(6, "technical", false, "longLeft", "longRight", "longLeft", "shortLeft", "clear", "drop"),
    new TechnicalShot(7, "technical", false, "shortLeft", "midRight", "shortRight", "midLeft", "drop", "attack"),
    new TechnicalShot(8, "technical", false, "shortRight", "midRight", "shortRight", "midLeft", "drop", "drop"),
    new TechnicalShot(9, "technical", false, "longLeft", "longRight", "longLeft", "longRight", "clear", "clear"),
    new TechnicalShot(10, "technical", false, "shortLeft", "shortRight", "longLeft", "longRight", "lift", "lift"),
    new TechnicalShot(11, "technical", false, "midLeft", "midRight", "midRight", "longLeft", "smash", "smash"),
    new TechnicalShot(12, "technical", false, "longLeft", "midRight", "midLeft", "longRight", "smash", "smash"),
    new TechnicalShot(13, "technical", false, "shortLeft", "longRight", "shortLeft", "longRight", "drop", "clear"),
    new TechnicalShot(14, "technical", false, "midLeft", "midRight", "shortLeft", "midRight", "block", "drive"),
    new TechnicalShot(15, "technical", false, "longLeft", "longRight", "midLeft", "longRight", "defense", "defense"),
    new TechnicalShot(16, "technical", false, "midLeft", "longRight", "longLeft", "shortLeft", "clear", "drop"),
    new TechnicalShot(17, "technical", false, "shortLeft", "midRight", "midRight", "midLeft", "rush", "attack"),
    new TechnicalShot(18, "technical", false, "midLeft", "midRight", "longRight", "longLeft", "clear", "defence"),
    new TechnicalShot(19, "technical", false, "shortLeft", "shortRight", "shortLeft", "midRight", "drop", "drive"),
    new TechnicalShot(20, "technical", false, "longLeft", "longRight", "shortLeft", "midRight", "drop", "drive"),
    new TechnicalShot(21, "technical", false, "longLeft", "midRight", "midLeft", "shortRight", "slice", "block"),
    new TechnicalShot(22, "technical", false, "midLeft", "shortRight", "midRight", "shortLeft", "attack", "drop"),
    new TechnicalShot(23, "technical", false, "midLeft", "shortRight", "shortLeft", "midLeft", "block", "drive"),
    new TechnicalShot(24, "technical", false, "longLeft", "longRight", "longRight", "shortLeft", "clear", "drop"),
    new TechnicalShot(25, "technical", false, "longLeft", "shortRight", "midRight", "shortRight", "drop", "drop"),
    new TechnicalShot(26, "technical", false, "longLeft", "midRight", "midLeft", "shortRight", "slice", "block"),
    new TechnicalShot(27, "technical", false, "shortLeft", "longRight", "midRight", "midLeft", "drive", "drop"),
    new TechnicalShot(28, "technical", false, "longLeft", "longRight", "longRight", "midLeft", "defense", "defense"),
    new TechnicalShot(29, "technical", false, "longLeft", "longRight", "shortRight", "longLeft", "drop", "clear"),
    new TechnicalShot(30, "technical", false, "midLeft", "midRight", "shortRight", "shortLeft", "drop", "drop"),
    new TechnicalShot(31, "technical", false, "midLeft", "shortRight", "midLeft", "longLeft", "drive", "lift"),
    new TechnicalShot(32, "technical", false, "shortLeft", "shortRight", "midLeft", "shortLeft", "rush", "drop"),
    new TechnicalShot(33, "technical", false, "shortLeft", "shortRight", "longRight", "midLeft", "lift", "drive"),
    new TechnicalShot(34, "technical", false, "midLeft", "midRight", "longLeft", "longRight", "clear", "clear"),
    new TechnicalShot(35, "technical", false, "shortLeft", "shortRight", "midLeft", "longRight", "rush", "lift"),
    new TechnicalShot(36, "technical", false, "midLeft", "midRight", "midLeft", "shortLeft", "defense", "block"),
    new TechnicalShot(37, "technical", false, "longRight", "shortRight", "midRight", "longLeft", "slice", "rush"),
    new TechnicalShot(38, "technical", false, "longLeft", "midRight", "shortRight", "midRight", "drop", "smash"),
    new TechnicalShot(39, "technical", false, "longLeft", "shortRight", "shortRight", "longRight", "drop", "lift"),
    new TechnicalShot(40, "technical", false, "longLeft", "shortRight", "longRight", "midRight", "clear", "drive"),
    new TechnicalShot(41, "technical", false, "shortLeft", "shortRight", "longRight", "longLeft", "rush", "lift"),
    new TechnicalShot(42, "technical", false, "midLeft", "midRight", "midRight", "shortLeft", "defense", "block"),
    new TechnicalShot(43, "technical", false, "shortLeft", "longLeft", "shortLeft", "midLeft", "drop", "slice"),
    new TechnicalShot(44, "technical", false, "longRight", "midRight", "longRight", "midLeft", "clear", "drive"),
    new TechnicalShot(45, "technical", false, "shortLeft", "midLeft", "shortRight", "shortLeft", "drop", "block"),
  
  

 // special cards

  new SpecialCard(46, "special", false, "winPoint"),
  new SpecialCard(47, "special", false, "winPoint"),
  new SpecialCard(48, "special", false, "winPoint"),
  new SpecialCard(49, "special", false, "calledOut"),
  new SpecialCard(50, "special", false, "calledOut"),
  new SpecialCard(51, "special", false, "joker"),
  new SpecialCard(52, "special", false, "serveOut"),
  new SpecialCard(53, "special", false, "winningSmash"),


];
