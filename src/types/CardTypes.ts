// src/types/CardTypes.ts
export interface CardData {
  id: string;
  name: string;
  cost: number;
  power?: number;
  type: CardType;
  abilityText?: string;
  flavorText?: string;
  faction?: Faction;
}

export type CardType = 
  | "Character"
  | "Location"
  | "Event"
  | "Evidence"
  | "Phenomenon"
  | "Conspiracy";

export type Faction = 
  | "UFO Researchers"
  | "Government Officials"
  | "Whistleblowers"
  | "Cryptid Hunters";

export interface CharacterCardData extends CardData {
  type: "Character";
  power: number;
  attachedCards: EvidenceCardData[];
}

export interface EvidenceCardData extends CardData {
  type: "Evidence";
}

export interface LocationCardData extends CardData {
  type: "Location";
}

export interface EventCardData extends CardData {
  type: "Event";
}

export interface PhenomenonCardData extends CardData {
  type: "Phenomenon";
  power: number;
}

export interface ConspiracyCardData extends CardData {
  type: "Conspiracy";
}

export interface PlayerState {
  hand: CardData[];
  playArea: {
    characters: CharacterCardData[];
    locations: LocationCardData[];
    phenomena: PhenomenonCardData[];
    conspiracies: ConspiracyCardData[];
  };
  credibility: number;
  deck: CardData[]; // Changed from number to CardData[]
  discard: CardData[]; // Changed from number to CardData[]
}

