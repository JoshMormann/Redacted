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

// Helper function to get card type-specific styling
const getCardTypeStyles = (type: string) => {
  switch (type) {
    case 'Character':
      return {
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
        border: 'border-blue-300',
        header: 'bg-blue-600',
        accent: 'bg-blue-500'
      };
    case 'Location':
      return {
        bg: 'bg-gradient-to-br from-green-50 to-green-100',
        border: 'border-green-300',
        header: 'bg-green-600',
        accent: 'bg-green-500'
      };
    case 'Event':
      return {
        bg: 'bg-gradient-to-br from-red-50 to-red-100',
        border: 'border-red-300',
        header: 'bg-red-600',
        accent: 'bg-red-500'
      };
    case 'Evidence':
      return {
        bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
        border: 'border-yellow-300',
        header: 'bg-yellow-600',
        accent: 'bg-yellow-500'
      };
    case 'Phenomenon':
      return {
        bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
        border: 'border-purple-300',
        header: 'bg-purple-600',
        accent: 'bg-purple-500'
      };
    case 'Conspiracy':
      return {
        bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
        border: 'border-gray-300',
        header: 'bg-gray-600',
        accent: 'bg-gray-500'
      };
    default:
      return {
        bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
        border: 'border-gray-300',
        header: 'bg-gray-600',
        accent: 'bg-gray-500'
      };
  }
};

const Card: React.FC<CardProps> = ({ name, cost, power, type, abilityText, flavorText }) => {
  const styles = getCardTypeStyles(type);
  
  return (
    <div className={`border ${styles.border} rounded-xl overflow-hidden card-shadow w-40 h-60 flex flex-col text-xs ${styles.bg}`}>
      {/* Card Header: Type */}
      <div className={`${styles.header} text-white px-2 py-1 text-xs font-semibold`}>
        {type}
      </div>
      
      {/* Card Content */}
      <div className="p-2 flex flex-col flex-grow">
        {/* Name and Cost */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-sm truncate bg-white bg-opacity-80 px-1 rounded text-gray-900" title={name}>{name}</h3>
          <span className={`${styles.accent} text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold`}>
            {cost}
          </span>
        </div>
        
        {/* Power (if applicable) */}
        {power !== undefined && (
          <div className="mb-2">
            <span className="font-semibold text-xs bg-gray-200 px-1.5 py-0.5 rounded">Power: {power}</span>
          </div>
        )}
        
        {/* Ability Text */}
        {abilityText && (
          <div className="border-t border-gray-200 pt-1 mt-1 mb-1 flex-grow overflow-y-auto">
            <p className="text-gray-800 text-xs">
              {abilityText}
            </p>
          </div>
        )}
      </div>
      
      {/* Flavor Text */}
      {flavorText && (
        <div className="bg-gray-100 px-2 py-1 mt-auto border-t border-gray-200">
          <p className="text-gray-600 italic text-xs">
            {flavorText}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
