"use client";

import React from 'react';

interface GameActionPanelProps {
  currentPhase: 'Disclosure' | 'Investigation' | 'Action' | 'Debunking' | 'End';
  actionsRemaining: number;
  onEndPhase: () => void;
  onEndTurn: () => void;
  isPlayerTurn: boolean;
}

const GameActionPanel: React.FC<GameActionPanelProps> = ({
  currentPhase,
  actionsRemaining,
  onEndPhase,
  onEndTurn,
  isPlayerTurn
}) => {
  // Helper function to get phase description
  const getPhaseDescription = (phase: string): string => {
    switch (phase) {
      case 'Disclosure':
        return 'Gain 2 Credibility';
      case 'Investigation':
        return 'Draw 1 card';
      case 'Action':
        return `Play cards and activate abilities (${actionsRemaining} actions remaining)`;
      case 'Debunking':
        return 'Challenge opponent\'s Evidence cards';
      case 'End':
        return 'Discard down to maximum hand size';
      default:
        return '';
    }
  };

  if (!isPlayerTurn) {
    return (
      <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-center">Opponent's Turn</h3>
        <p className="text-center text-sm">Current Phase: {currentPhase}</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-800 text-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-center">Your Turn</h3>
      
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="font-semibold">Current Phase:</p>
          <p className="text-lg">{currentPhase}</p>
          <p className="text-sm italic">{getPhaseDescription(currentPhase)}</p>
        </div>
        
        <div className="flex flex-col space-y-2">
          {currentPhase !== 'End' ? (
            <button 
              onClick={onEndPhase}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              End {currentPhase} Phase
            </button>
          ) : (
            <button 
              onClick={onEndTurn}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              End Turn
            </button>
          )}
        </div>
      </div>
      
      {/* Phase progress indicator */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Disclosure</span>
          <span>Investigation</span>
          <span>Action</span>
          <span>Debunking</span>
          <span>End</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
          {/* Highlight current phase */}
          <div 
            className="bg-blue-400 h-2.5 rounded-full" 
            style={{ 
              width: 
                currentPhase === 'Disclosure' ? '10%' : 
                currentPhase === 'Investigation' ? '30%' : 
                currentPhase === 'Action' ? '50%' : 
                currentPhase === 'Debunking' ? '70%' : 
                '90%' 
            }}
          ></div>
        </div>
      </div>
      
      {/* Toast notification area - placeholder for rule enforcement messages */}
      <div className="mt-2 text-sm text-center text-blue-100">
        {currentPhase === 'Action' && actionsRemaining === 0 && (
          <span>No actions remaining. End Action Phase to continue.</span>
        )}
      </div>
    </div>
  );
};

export default GameActionPanel;
