"use client";

import React, { useState } from 'react';
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
  // State to track which card type tab is active
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Count total cards
  const totalCards = characters.length + locations.length + phenomena.length + conspiracies.length;
  
  // Helper function to render a section (heading + horizontal card row)
  const renderSection = (title: string, cards: any[], cardType: string) => {
    if (cards.length === 0) {
      return null; // Don't render section if empty
    }

    return (
      <div className="mb-2 w-full"> 
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-semibold">{title} ({cards.length})</h4>
        </div>
        <div className="flex flex-row gap-1 overflow-x-auto py-1"> 
          {cards.map(card => (
            <div 
              key={card.id} 
              className="relative flex-shrink-0 transform transition-transform hover:scale-105" 
              onClick={() => isCurrentPlayer && onCardClick(card.id, cardType)}
            >
              {/* Smaller card size for play area */}
              <div className="w-24 h-36 md:w-28 md:h-44 scale-90 origin-top-left">
                <Card
                  name={card.name}
                  cost={card.cost}
                  power={card.power}
                  type={card.type}
                  abilityText={card.abilityText}
                  flavorText={card.flavorText}
                />
              </div>
              
              {/* Attached Evidence Cards (Example for Characters) */}
              {cardType === 'character' && card.attachedCards && card.attachedCards.length > 0 && (
                <div className="absolute -bottom-1 -right-1 bg-yellow-100 border border-yellow-300 rounded-full px-1 py-0 text-xs font-bold text-yellow-800">
                  +{card.attachedCards.length}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Filter sections based on active tab
  const shouldShowSection = (type: string): boolean => {
    return activeTab === 'all' || activeTab === type;
  };

  return (
    <div className={`p-2 ${isCurrentPlayer ? 'text-foreground' : 'text-foreground'}`}>
      {/* Tab navigation for card types */}
      {totalCards > 0 && (
        <div className="flex mb-2 border-b border-border text-xs">
          <button 
            className={`px-2 py-1 ${activeTab === 'all' ? 'bg-secondary font-bold' : 'bg-background'}`}
            onClick={() => setActiveTab('all')}
          >
            All ({totalCards})
          </button>
          {characters.length > 0 && (
            <button 
              className={`px-2 py-1 ${activeTab === 'character' ? 'bg-secondary font-bold' : 'bg-background'}`}
              onClick={() => setActiveTab('character')}
            >
              Char ({characters.length})
            </button>
          )}
          {locations.length > 0 && (
            <button 
              className={`px-2 py-1 ${activeTab === 'location' ? 'bg-secondary font-bold' : 'bg-background'}`}
              onClick={() => setActiveTab('location')}
            >
              Loc ({locations.length})
            </button>
          )}
          {phenomena.length > 0 && (
            <button 
              className={`px-2 py-1 ${activeTab === 'phenomenon' ? 'bg-secondary font-bold' : 'bg-background'}`}
              onClick={() => setActiveTab('phenomenon')}
            >
              Phen ({phenomena.length})
            </button>
          )}
          {conspiracies.length > 0 && (
            <button 
              className={`px-2 py-1 ${activeTab === 'conspiracy' ? 'bg-secondary font-bold' : 'bg-background'}`}
              onClick={() => setActiveTab('conspiracy')}
            >
              Consp ({conspiracies.length})
            </button>
          )}
        </div>
      )}
      
      {/* Empty state message */}
      {totalCards === 0 && (
        <div className="flex justify-center items-center h-full py-4">
          <p className="text-gray-500 text-sm italic">No cards in play</p>
        </div>
      )}
      
      {/* Card sections */}
      <div className="space-y-1"> 
        {shouldShowSection('character') && renderSection('Characters', characters, 'character')}
        {shouldShowSection('location') && renderSection('Locations', locations, 'location')}
        {shouldShowSection('phenomenon') && renderSection('Phenomena', phenomena, 'phenomenon')}
        {shouldShowSection('conspiracy') && renderSection('Conspiracies', conspiracies, 'conspiracy')}
      </div>
    </div>
  );
};

export default PlayArea;
