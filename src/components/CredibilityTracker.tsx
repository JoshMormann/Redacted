"use client";

import React from 'react';

interface CredibilityTrackerProps {
  playerName: string;
  credibility: number;
  maxCredibility: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  isCurrentPlayer: boolean;
}

const CredibilityTracker: React.FC<CredibilityTrackerProps> = ({ 
  playerName, 
  credibility, 
  maxCredibility,
  onIncrement,
  onDecrement,
  isCurrentPlayer
}) => {
  return (
    <div className={`p-3 rounded-lg shadow-md ${isCurrentPlayer ? 'bg-blue-100 border-blue-300 text-blue-900' : 'bg-gray-100 border-gray-300 text-gray-900'} border`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">{playerName}'s Credibility</h3>
        <div className="flex items-center">
          {onDecrement && (
            <button 
              onClick={onDecrement}
              className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm font-bold"
              disabled={credibility <= 0}
            >
              -
            </button>
          )}
          <span className="text-xl font-bold">{credibility}</span>
          <span className="text-gray-600 text-sm ml-1">/ {maxCredibility}</span> {/* Adjusted gray color */} 
          {onIncrement && (
            <button 
              onClick={onIncrement}
              className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center ml-2 text-sm font-bold"
            >
              +
            </button>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${(credibility / maxCredibility) * 100}%` }}
        ></div>
      </div>
      
      {/* Win condition indicator */}
      {credibility >= 20 && (
        <div className="mt-2 text-xs text-green-700 font-semibold"> {/* Darker green */} 
          Disclosure Victory threshold reached!
        </div>
      )}
    </div>
  );
};

export default CredibilityTracker;
