"use client";

import React from 'react';

interface CardProps {
  name: string;
  cost: number;
  power?: number; // Optional for non-character/phenomenon cards
  type: 'Character' | 'Location' | 'Event' | 'Evidence' | 'Phenomenon' | 'Conspiracy';
  abilityText?: string;
  flavorText?: string;
}

const Card: React.FC<CardProps> = ({ name, cost, power, type, abilityText, flavorText }) => {
  // Basic card styling using Tailwind CSS
  return (
    <div className="border border-gray-400 rounded-xl p-2 m-1 bg-white shadow-md w-40 h-60 flex flex-col justify-between text-xs">
      {/* Top Section: Name and Cost */}
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold truncate" title={name}>{name}</span>
        <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold">{cost}</span>
      </div>

      {/* Middle Section: Type and Power (if applicable) */}
      <div className="flex justify-between items-center text-gray-600 mb-1">
        <span>{type}</span>
        {power !== undefined && (
          <span className="font-semibold">P: {power}</span>
        )}
      </div>

      {/* Ability Text */}
      {abilityText && (
        <p className="text-gray-800 text-xs border-t border-b border-gray-200 py-1 my-1 overflow-y-auto flex-grow">
          {abilityText}
        </p>
      )}

      {/* Flavor Text */}
      {flavorText && (
        <p className="text-gray-500 italic text-xs mt-auto">
          {flavorText}
        </p>
      )}
    </div>
  );
};

export default Card;
