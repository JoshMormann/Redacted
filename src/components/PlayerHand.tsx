"use client";

import React from 'react';
import Card from './Card'; // Assuming Card component is in the same directory
import Image from 'next/image'; // Import next/image

interface CardData {
  id: string;
  name: string;
  cost: number;
  power?: number;
  type: 'Character' | 'Location' | 'Event' | 'Evidence' | 'Phenomenon' | 'Conspiracy';
  abilityText?: string;
  flavorText?: string;
}

interface PlayerHandProps {
  cards: Array<CardData>;
  isOwnHand: boolean; // To determine if cards should be visible or hidden
  onCardClick: (cardId: string) => void; // Function to handle card selection/play
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isOwnHand, onCardClick }) => {
  return (
    // Reduced min-height and padding for mobile
    // Added relative positioning for potential absolute positioned children (like card count)
    <div className="relative flex justify-center items-end p-1 md:p-2 bg-gray-200 border border-gray-300 rounded min-h-[120px] md:min-h-[160px] text-gray-900 overflow-x-auto">
      {cards.map((card, index) => (
        <div
          key={card.id}
          // Increased negative margin (more overlap) on mobile, reduced on md+
          // Added hover:scale-110 for better visibility on hover
          className={`transform transition-transform duration-150 ease-in-out hover:-translate-y-2 md:hover:-translate-y-4 ${index > 0 ? '-ml-24 md:-ml-16' : ''} cursor-pointer relative hover:z-[100] hover:scale-110 flex-shrink-0`}
          onClick={() => isOwnHand && onCardClick(card.id)}
        >
          {isOwnHand ? (
            // Reduced card size on mobile
            <div className="w-28 h-44 md:w-40 md:h-60">
              <Card
                name={card.name}
                cost={card.cost}
                power={card.power}
                type={card.type}
                abilityText={card.abilityText}
                flavorText={card.flavorText}
              />
            </div>
          ) : (
            // Use the new card back image for opponent's hidden card
            <div className="border border-gray-400 rounded-xl shadow-md w-28 h-44 md:w-40 md:h-60 overflow-hidden">
              <Image
                src="/images/card_back.png" // Path relative to public directory
                alt="Card Back"
                width={160} // Provide base width (will be scaled by container)
                height={240} // Provide base height (will be scaled by container)
                className="object-cover w-full h-full" // Ensure image covers the div
              />
            </div>
          )}
        </div>
      ))}
      {cards.length === 0 && (
        <div className="text-gray-700 italic text-sm md:text-base">No cards in hand</div>
      )}
      {/* Optional: Display card count for opponent's hand */}
      {!isOwnHand && cards.length > 0 && (
         <div className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded">
           {cards.length} Cards
         </div>
      )}
    </div>
  );
};

export default PlayerHand;
