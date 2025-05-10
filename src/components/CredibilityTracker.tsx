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
  // More compact version that takes less vertical space
  return (
    <div className={`px-3 py-2 rounded-xl shadow-md ${isCurrentPlayer ? 'bg-blue-100 border-blue-300 text-blue-900' : 'bg-gray-100 border-gray-300 text-gray-900'} border flex items-center`}>
      <div className="flex-1">
        <div className="flex items-baseline">
          <h3 className="font-bold text-xs mr-1">{playerName}</h3>
          <div className="flex items-center">
            <span className="text-lg font-bold">{credibility}</span>
            <span className="text-gray-600 text-xs ml-1">/{maxCredibility}</span>
          </div>
        </div>
        
        {/* Smaller progress bar */}
        <div className="w-full bg-gray-300 rounded-full h-1.5 mt-1">
          <div 
            className="bg-blue-600 h-1.5 rounded-full" 
            style={{ width: `${(credibility / maxCredibility) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Controls in a more compact layout */}
      {(onIncrement || onDecrement) && (
        <div className="flex ml-2">
          {onDecrement && (
            <button 
              onClick={onDecrement}
              className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              disabled={credibility <= 0}
            >
              -
            </button>
          )}
          {onIncrement && (
            <button 
              onClick={onIncrement}
              className="bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center ml-1 text-xs font-bold"
            >
              +
            </button>
          )}
        </div>
      )}
      
      {/* Victory indicator as a small badge */}
      {credibility >= 20 && (
        <div className="ml-2 px-1 py-0.5 bg-green-100 border border-green-300 rounded text-xs text-green-700 font-semibold whitespace-nowrap">
          Victory!
        </div>
      )}
    </div>
  );
};

export default CredibilityTracker;
