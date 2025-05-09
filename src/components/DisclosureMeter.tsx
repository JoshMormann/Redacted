"use client";

import React from 'react';

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

  return (
    <div className="p-4 border border-purple-300 bg-purple-50 rounded-lg shadow-md text-purple-900">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Disclosure Meter</h3>
        <div className="flex items-center">
          {isEditable && onLevelChange && (
            <button 
              onClick={() => level > 0 && onLevelChange(level - 1)}
              className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm font-bold"
              disabled={level <= 0}
            >
              -
            </button>
          )}
          <span className="text-xl font-bold">{level}</span>
          <span className="text-purple-700 text-sm ml-1">/ {maxLevel}</span>
          {isEditable && onLevelChange && (
            <button 
              onClick={() => level < maxLevel && onLevelChange(level + 1)}
              className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center ml-2 text-sm font-bold"
              disabled={level >= maxLevel}
            >
              +
            </button>
          )}
        </div>
      </div>
      
      {/* Progress bar with segments */}
      <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
        <div 
          className="bg-purple-600 h-4 rounded-full" 
          style={{ width: `${(level / maxLevel) * 100}%` }}
        ></div>
      </div>
      
      {/* Level markers */}
      <div className="flex justify-between mb-4">
        {levelEffects.map((effect) => (
          <div 
            key={effect.level} 
            className="relative"
            style={{ left: `${(effect.level / maxLevel) * 100}%`, marginLeft: '-10px' }}
          >
            <div 
              className={`w-5 h-5 rounded-full ${level >= effect.level ? 'bg-purple-600' : 'bg-gray-300'}`}
            ></div>
            <span className="text-xs text-purple-900">{effect.level}</span>
          </div>
        ))}
      </div>
      
      {/* Current effect display */}
      {latestEffect && (
        <div className="mt-2 text-sm bg-purple-100 p-2 rounded border border-purple-200 text-purple-900">
          <span className="font-semibold">Current Effect (Level {latestEffect.level}):</span> {latestEffect.effect}
        </div>
      )}
      
      {/* Win condition indicator */}
      {level >= 10 && (
        <div className="mt-2 text-xs text-green-700 font-semibold">
          "The Truth Is Out There" card can now be played for Truth Victory!
        </div>
      )}
    </div>
  );
};

export default DisclosureMeter;
