"use client";

import React, { useState } from 'react';

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
  // State to toggle expanded view
  const [expanded, setExpanded] = useState(false);
  
  // Helper function to get phase description
  const getPhaseDescription = (phase: string): string => {
    switch (phase) {
      case 'Disclosure':
        return 'Gain 2 Credibility';
      case 'Investigation':
        return 'Draw 1 card';
      case 'Action':
        return `Play cards (${actionsRemaining} actions left)`;
      case 'Debunking':
        return 'Challenge Evidence cards';
      case 'End':
        return 'Discard to max hand size';
      default:
        return '';
    }
  };

  // Get phase index for progress indicator
  const getPhaseIndex = (): number => {
    switch (currentPhase) {
      case 'Disclosure': return 0;
      case 'Investigation': return 1;
      case 'Action': return 2;
      case 'Debunking': return 3;
      case 'End': return 4;
      default: return 0;
    }
  };

  if (!isPlayerTurn) {
    return (
      <div className="bg-gray-700 text-white p-2 rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm">Opponent's Turn</h3>
          <span className="text-xs bg-gray-600 px-1.5 py-0.5 rounded">{currentPhase}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-800 text-white p-2 rounded-xl shadow-md">
      {/* Header with toggle */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-sm">Your Turn</h3>
        <div className="flex items-center">
          <span className="text-xs bg-blue-700 px-1.5 py-0.5 rounded mr-2">{currentPhase}</span>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-300 hover:text-white"
          >
            {expanded ? 'Less' : 'More'}
          </button>
        </div>
      </div>
      
      {/* Compact phase progress indicator */}
      <div className="mt-2 mb-2">
        <div className="flex justify-between">
          <div className="flex space-x-1">
            {['D', 'I', 'A', 'DB', 'E'].map((phase, index) => (
              <div 
                key={phase}
                className={`w-5 h-5 flex items-center justify-center rounded-full text-xs
                  ${index === getPhaseIndex() 
                    ? 'bg-blue-500 text-white font-bold' 
                    : index < getPhaseIndex() 
                      ? 'bg-blue-300 text-blue-900' 
                      : 'bg-blue-900 text-blue-300'}`}
              >
                {phase}
              </div>
            ))}
          </div>
          
          {currentPhase === 'Action' && (
            <div className="text-xs bg-blue-600 px-1.5 rounded">
              {actionsRemaining} actions
            </div>
          )}
        </div>
      </div>
      
      {/* Expanded content */}
      {expanded && (
        <div className="mt-2 text-xs border-t border-blue-700 pt-2">
          <p className="mb-1">{getPhaseDescription(currentPhase)}</p>
          
          <div className="flex justify-between text-xs mb-1">
            <span>Disclosure</span>
            <span>Investigation</span>
            <span>Action</span>
            <span>Debunking</span>
            <span>End</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-1.5 mb-2">
            <div 
              className="bg-blue-400 h-1.5 rounded-full" 
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
      )}
      
      {/* Action button */}
      <div className="mt-2">
        {currentPhase !== 'End' ? (
          <button 
            onClick={onEndPhase}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm"
          >
            End {currentPhase} Phase
          </button>
        ) : (
          <button 
            onClick={onEndTurn}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm"
          >
            End Turn
          </button>
        )}
      </div>
      
      {/* Warning message */}
      {currentPhase === 'Action' && actionsRemaining === 0 && (
        <div className="mt-1 text-xs text-center text-blue-100">
          No actions remaining
        </div>
      )}
    </div>
  );
};

export default GameActionPanel;
