import { Card } from "../models/card";  
import { TechnicalShot } from "../models/technical_shot";
import { SpecialCard } from "../models/special_card";

export const allCards : Card[] = [

    //serves
    new TechnicalShot(1, "serve", "midLeft", "midRight", "midLeft", "midRight", "short_serv", "short_serv", false),
    new TechnicalShot(2, "serve", "midLeft", "midRight", "longLeft", "longRight", "long_serv", "long_serv", false),
    new TechnicalShot(3, "serve", "midLeft", "midRight", "midLeft", "longRight", "short_serv", "long_serv", false),
    new TechnicalShot(4, "serve", "midLeft", "midRight", "longLeft", "midRight", "long_serv", "short_serv", false), 
    new TechnicalShot(5, "technical", "longLeft", "longRight", "shortLeft", "shortRight", "slice", "slice", false),
    new TechnicalShot(6, "technical", "longLeft", "longRight", "longLeft", "shortLeft", "clear", "drop", false),
    new TechnicalShot(7, "technical", "shortLeft", "midRight", "shortRight", "midLeft", "drop", "attack", false),
    new TechnicalShot(8, "technical", "shortRight", "midRight", "shortRight", "midLeft", "drop", "drop", false),
    new TechnicalShot(9, "technical", "longLeft", "longRight", "longLeft", "longRight", "clear", "clear", false),
    new TechnicalShot(10, "technical", "shortLeft", "shortRight", "longLeft", "longRight", "lift", "lift", false),
    new TechnicalShot(11, "technical", "midLeft", "midRight", "midRight", "longLeft", "smash", "smash", false),
    new TechnicalShot(12, "technical", "longLeft", "midRight", "midLeft", "longRight", "smash", "smash", false),
    new TechnicalShot(13, "technical", "shortLeft", "longRight", "shortLeft", "longRight", "drop", "clear", false),
    new TechnicalShot(14, "technical", "midLeft", "midRight", "shortLeft", "midRight", "bloc", "drive", false),
    new TechnicalShot(15, "technical", "longLeft", "longRight", "midLeft", "longRight", "defense", "defense", false),
    new TechnicalShot(16, "technical", "midLeft", "longRight", "longLeft", "shortLeft", "clear", "drop", false),
    new TechnicalShot(17, "technical", "shortLeft", "midRight", "midRight", "midLeft", "rush", "attack", false),
    new TechnicalShot(18, "technical", "midLeft", "midRight", "longRight", "longLeft", "clear", "defence", false),
    new TechnicalShot(19, "technical", "shortLeft", "shortRight", "shortLeft", "midRight", "drop", "drive", false),
    new TechnicalShot(20, "technical", "longLeft", "longRight", "shortLeft", "midRight", "drop", "drive", false),
    new TechnicalShot(21, "technical", "longLeft", "midRight", "midLeft", "shortRight", "slice", "bloc", false),
    new TechnicalShot(22, "technical", "midLeft", "shortRight", "midRight", "shortLeft", "attack", "drop", false),
    new TechnicalShot(23, "technical", "midLeft", "shortRight", "shortLeft", "midLeft", "bloc", "drive", false),
    new TechnicalShot(24, "technical", "longLeft", "longRight", "longRight", "shortLeft", "clear", "drop", false),
    new TechnicalShot(25, "technical", "longLeft", "shortRight", "midRight", "shortRight", "drop", "drop", false),
    new TechnicalShot(26, "technical", "longLeft", "midRight", "midLeft", "shortRight", "slice", "bloc", false),
    new TechnicalShot(27, "technical", "shortLeft", "longRight", "midRight", "midLeft", "drive", "drop", false),
    new TechnicalShot(28, "technical", "longLeft", "longRight", "longRight", "midLeft", "defense", "defense", false),
    new TechnicalShot(29, "technical", "longLeft", "longRight", "shortRight", "longLeft", "drop", "clear", false),
    new TechnicalShot(30, "technical", "midLeft", "midRight", "shortRight", "shortLeft", "drop", "drop", false),
    new TechnicalShot(31, "technical", "midLeft", "shortRight", "midLeft", "longLeft", "drive", "lift", false),
    new TechnicalShot(32, "technical", "shortLeft", "shortRight", "midLeft", "shortLeft", "rush", "drop", false),
    new TechnicalShot(33, "technical", "shortLeft", "shortRight", "longRight", "midLeft", "lift", "drive", false),
    new TechnicalShot(34, "technical", "midLeft", "midRight", "longLeft", "longRight", "clear", "clear", false),
    new TechnicalShot(35, "technical", "shortLeft", "shortRight", "midLeft", "longRight", "rush", "lift", false),
    new TechnicalShot(36, "technical", "midLeft", "midRight", "midLeft", "shortLeft", "defense", "bloc", false),
    new TechnicalShot(37, "technical", "longRight", "shortRight", "midRight", "longLeft", "slice", "rush", false),
    new TechnicalShot(38, "technical", "longLeft", "midRight", "shortRight", "midRight", "drop", "smash", false),
    new TechnicalShot(39, "technical", "longLeft", "shortRight", "shortRight", "longRight", "drop", "lift", false),
    new TechnicalShot(40, "technical", "longLeft", "shortRight", "longRight", "midRight", "clear", "drive", false),
    new TechnicalShot(41, "technical", "shortLeft", "shortRight", "longRight", "longLeft", "rush", "lift", false),
    new TechnicalShot(42, "technical", "midLeft", "midRight", "midRight", "shortLeft", "defense", "bloc", false),
    new TechnicalShot(43, "technical", "shortLeft", "longLeft", "shortLeft", "midLeft", "drop", "slice", false),
    new TechnicalShot(44, "technical", "longRight", "midRight", "longRight", "midLeft", "clear", "drive", false),
    new TechnicalShot(45, "technical", "shortLeft", "midLeft", "shortRight", "shortLeft", "drop", "bloc", false),
    
    //special cards
    new SpecialCard(46,  "special", "winPoint"),
    new SpecialCard(47, "special", "winPoint"), 
    new SpecialCard(48, "special", "winPoint"),
    new SpecialCard(49, "special", "calledOut"),
    new SpecialCard(50, "special", "calledOut"),
    new SpecialCard(51, "special", "joker"),
    new SpecialCard(52, "special", "serveOut"),
    new SpecialCard(53, "special", "winningSmash")
];

   


   












    
   