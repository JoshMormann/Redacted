"use client";

import React from 'react';
import Card from './Card';
import { CharacterCardData, LocationCardData, PhenomenonCardData, ConspiracyCardData } from '../types/CardTypes'; // Assuming types are defined here

interface PlayAreaProps {
  characters: CharacterCardData[];
  locations: LocationCardData[];
  phenomena: PhenomenonCardData[];
  conspiracies: ConspiracyCardData[];
  onCardClick: (cardId: string, cardType: string) => void;
  isCurrentPlayer: boolean;
}

const PlayArea: React.FC<PlayAreaProps> = ({
  characters,
  locations,
  phenomena,
  conspiracies,
  onCardClick,
  isCurrentPlayer
}) => {
  // Helper function to render a section (heading + horizontal card row)
  const renderSection = (title: string, cards: any[], cardType: string) => {
    if (cards.length === 0) {
      // Optionally render a placeholder if you want sections to always show
      // return (
      //   <div className="mb-4 flex-shrink-0 w-full md:w-auto">
      //     <h4 className="text-sm font-semibold mb-1">{title}</h4>
      //     <div className="text-gray-700 text-sm italic">No {title.toLowerCase()} in play</div>
      //   </div>
      // );
      return null; // Don't render section if empty
    }

    return (
      <div className="mb-4 flex-shrink-0 w-full md:w-auto"> {/* Ensure sections can shrink/wrap */} 
        <h4 className="text-sm font-semibold mb-1">{title}</h4>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2"> 
          {cards.map(card => (
            <div 
              key={card.id} 
              className="relative flex-shrink-0" 
              onClick={() => isCurrentPlayer && onCardClick(card.id, cardType)}
            >
              <Card
                name={card.name}
                cost={card.cost}
                power={card.power}
                type={card.type}
                abilityText={card.abilityText}
                flavorText={card.flavorText}
              />
              
              {/* Attached Evidence Cards (Example for Characters) */}
              {cardType === 'character' && card.attachedCards && card.attachedCards.length > 0 && (
                <div className="absolute -bottom-2 -right-2 bg-yellow-100 border border-yellow-300 rounded-full px-2 py-0.5 text-xs font-bold text-yellow-800">
                  +{card.attachedCards.length} Evidence
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`p-4 rounded-lg border ${isCurrentPlayer ? 'border-blue-300 bg-blue-50 text-blue-900' : 'border-gray-300 bg-gray-50 text-gray-900'}`}>
      <h3 className="font-bold mb-2">{isCurrentPlayer ? 'Your' : 'Opponent\'s'} Play Area</h3>
      
      {/* Container for all sections, arranged horizontally and wrapping */}
      <div className="flex flex-row flex-wrap gap-x-6 gap-y-4"> {/* Use flex-wrap and gap */} 
        {renderSection('Characters', characters, 'character')}
        {renderSection('Locations', locations, 'location')}
        {renderSection('Phenomena', phenomena, 'phenomenon')}
        {renderSection('Conspiracies', conspiracies, 'conspiracy')}
      </div>
    </div>
  );
};

export default PlayArea;
