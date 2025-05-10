"use client";

import React, { useState } from 'react';

interface DisclosureMeterProps {
  level: number;
  maxLevel: number;
  onLevelChange?: (newLevel: number) => void;
  isEditable?: boolean;
}

const DisclosureMeter: React.FC<DisclosureMeterProps> = ({ 
  level, 
  maxLevel, 
  onLevelChange,
  isEditable = false
}) => {
  // Define effects that happen at different disclosure levels
  const levelEffects = [
    { level: 1, effect: "All players draw an extra card during Investigation Phase" },
    { level: 5, effect: "All Evidence cards cost 1 less Credibility" },
    { level: 10, effect: "Full Disclosure - all players reveal their hands" }
  ];
  
  // Find current active effect
  const activeEffects = levelEffects.filter(effect => level >= effect.level);
  const latestEffect = activeEffects.length > 0 ? activeEffects[activeEffects.length - 1] : null;
  
  // State to toggle effect details
  const [showEffectDetails, setShowEffectDetails] = useState(false);

  return (
    <div className="px-3 py-2 border border-purple-300 bg-purple-50 rounded-xl shadow-md text-purple-900">
      {/* Header with toggle for effect details */}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <h3 className="font-bold text-sm">Disclosure</h3>
          <div className="flex items-center ml-2">
            <span className="text-lg font-bold">{level}</span>
            <span className="text-purple-700 text-xs ml-1">/{maxLevel}</span>
          </div>
        </div>
        
        <div className="flex items-center">
          {isEditable && onLevelChange && (
            <>
              <button 
                onClick={() => level > 0 && onLevelChange(level - 1)}
                className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                disabled={level <= 0}
              >
                -
              </button>
              <button 
                onClick={() => level < maxLevel && onLevelChange(level + 1)}
                className="bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center ml-1 text-xs font-bold"
                disabled={level >= maxLevel}
              >
                +
              </button>
            </>
          )}
          <button 
            onClick={() => setShowEffectDetails(!showEffectDetails)}
            className="ml-2 text-xs text-purple-700 hover:text-purple-900"
          >
            {showEffectDetails ? 'Hide' : 'Effects'}
          </button>
        </div>
      </div>
      
      {/* Progress bar with milestone markers */}
      <div className="relative w-full mt-2">
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full" 
            style={{ width: `${(level / maxLevel) * 100}%` }}
          ></div>
        </div>
        
        {/* Milestone markers */}
        <div className="flex justify-between absolute w-full top-0 -mt-1">
          {levelEffects.map((effect) => (
            <div 
              key={effect.level} 
              className="relative"
              style={{ left: `${(effect.level / maxLevel) * 100}%`, marginLeft: '-3px' }}
            >
              <div 
                className={`w-2 h-2 rounded-full ${level >= effect.level ? 'bg-purple-600' : 'bg-gray-400'}`}
              ></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Collapsible effect details */}
      {showEffectDetails && (
        <div className="mt-2 text-xs">
          {latestEffect ? (
            <div className="bg-purple-100 p-1.5 rounded border border-purple-200">
              <span className="font-semibold">Active (Lvl {latestEffect.level}):</span> {latestEffect.effect}
              {level >= 10 && (
                <div className="mt-1 text-green-700 font-semibold">
                  "Truth Victory" card can now be played!
                </div>
              )}
            </div>
          ) : (
            <div className="text-purple-700 italic">No effects active yet</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisclosureMeter;
