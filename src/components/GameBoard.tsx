"use client";

import React, { useState, useCallback, useEffect } from 'react';
import PlayerHand from './PlayerHand';
import PlayArea from './PlayArea';
import CredibilityTracker from './CredibilityTracker';
import DisclosureMeter from './DisclosureMeter';
import GameActionPanel from './GameActionPanel';
import ToastNotification from './ToastNotification';
import { CardData, CharacterCardData, EvidenceCardData, LocationCardData, PhenomenonCardData, ConspiracyCardData, PlayerState, EventCardData } from '../types/CardTypes'; // Assuming types are defined here
import { initialCardSet } from '../data/cardData'; // Corrected import

// --- Utility Functions ---

// Fisher-Yates (Knuth) Shuffle algorithm
function shuffleDeck(array: CardData[]): CardData[] {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array]; // Create a copy to avoid mutating the original

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}

// Function to create initial state (without shuffling initially)
function createInitialEmptyState(): { playerState: PlayerState, opponentState: PlayerState } {
  const emptyPlayerState: PlayerState = {
    hand: [],
    playArea: { characters: [], locations: [], phenomena: [], conspiracies: [] },
    credibility: 8,
    deck: [],
    discard: [],
  };

  const emptyOpponentState: PlayerState = {
    hand: [],
    playArea: {
      characters: [],
      locations: [],
      phenomena: [],
      conspiracies: [],
    },
    credibility: 8,
    deck: [],
    discard: [],
  };

  return { playerState: emptyPlayerState, opponentState: emptyOpponentState };
}

// Function to deal cards (to be called client-side)
function dealInitialHands(): { playerState: PlayerState, opponentState: PlayerState } {
  const shuffledPlayerDeck = shuffleDeck(initialCardSet);
  const shuffledOpponentDeck = shuffleDeck(initialCardSet);

  const playerHand = shuffledPlayerDeck.slice(0, 6);
  const playerDeck = shuffledPlayerDeck.slice(6);

  const opponentHand = shuffledOpponentDeck.slice(0, 6);
  const opponentDeck = shuffledOpponentDeck.slice(6);

  const initialPlayerState: PlayerState = {
    hand: playerHand,
    playArea: { characters: [], locations: [], phenomena: [], conspiracies: [] },
    credibility: 8,
    deck: playerDeck,
    discard: [],
  };

  const initialOpponentState: PlayerState = {
    hand: opponentHand.map(card => ({ ...card, id: `opp-${card.id}`, name: '?', cost: 0, type: 'Character' })), // Simplified hidden representation
    playArea: {
      characters: [],
      locations: [],
      phenomena: [],
      conspiracies: [],
    },
    credibility: 8,
    deck: opponentDeck,
    discard: [],
  };

  return { playerState: initialPlayerState, opponentState: initialOpponentState };
}

// --- GameBoard Component ---

type GamePhase = 'Disclosure' | 'Investigation' | 'Action' | 'Debunking' | 'End';

interface ToastState {
  id: number;
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
}

const GameBoard: React.FC = () => {
  // Initialize with empty state to avoid hydration issues
  const [gameState, setGameState] = useState<{ playerState: PlayerState, opponentState: PlayerState }>(createInitialEmptyState);
  const [disclosureLevel, setDisclosureLevel] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('Disclosure');
  const [actionsRemaining, setActionsRemaining] = useState(2);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization
  let toastIdCounter = 0;

  // Initialize game state on client-side after mount
  useEffect(() => {
    if (!isInitialized) {
      setGameState(dealInitialHands());
      setIsInitialized(true);
      console.log("Game state initialized on client.");
    }
  }, [isInitialized]); // Run only once after mount

  const { playerState, opponentState } = gameState;

  const addToast = useCallback((message: string, type: 'error' | 'success' | 'info' | 'warning') => {
    const newToast = { id: toastIdCounter++, message, type };
    setToasts(prevToasts => [...prevToasts, newToast]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const handleCardClickInHand = (cardId: string) => {
    if (!isInitialized) return; // Don't allow actions before initialization
    console.log(`Clicked card in hand: ${cardId}`);
    const cardToPlay = playerState.hand.find(card => card.id === cardId);

    if (cardToPlay && isPlayerTurn && currentPhase === 'Action' && actionsRemaining > 0) {
      if (playerState.credibility >= cardToPlay.cost) {
        setGameState(prevState => {
          const newPlayerState = { ...prevState.playerState };
          newPlayerState.hand = newPlayerState.hand.filter(card => card.id !== cardId);
          newPlayerState.credibility -= cardToPlay.cost;

          // Move card to play area or discard (Events go to discard)
          if (cardToPlay.type === 'Event') {
            newPlayerState.discard = [...newPlayerState.discard, cardToPlay];
            // TODO: Trigger event effect
            addToast(`Played Event: ${cardToPlay.name} (Effect not implemented)`, 'success');
          } else {
             // Add card to appropriate playArea section based on type
            const playArea = { ...newPlayerState.playArea };
            switch (cardToPlay.type) {
              case 'Character':
                playArea.characters = [...playArea.characters, { ...cardToPlay, power: cardToPlay.power || 0, attachedCards: [] } as CharacterCardData];
                break;
              case 'Location':
                playArea.locations = [...playArea.locations, cardToPlay as LocationCardData];
                break;
              case 'Phenomenon':
                playArea.phenomena = [...playArea.phenomena, { ...cardToPlay, power: cardToPlay.power || 0 } as PhenomenonCardData];
                break;
              case 'Conspiracy':
                playArea.conspiracies = [...playArea.conspiracies, cardToPlay as ConspiracyCardData];
                break;
              // Evidence needs special handling (attaching)
              case 'Evidence':
                 addToast(`Evidence card ${cardToPlay.name} played (Attach logic not implemented)`, 'info');
                 // For now, just discard it - needs target selection later
                 newPlayerState.discard = [...newPlayerState.discard, cardToPlay];
                 break;
            }
            newPlayerState.playArea = playArea;
             addToast(`Played ${cardToPlay.name}`, 'success');
          }

          return { ...prevState, playerState: newPlayerState };
        });
        setActionsRemaining(actionsRemaining - 1);
      } else {
        addToast(`Not enough Credibility to play ${cardToPlay.name} (Cost: ${cardToPlay.cost}, Have: ${playerState.credibility})`, 'error');
      }
    } else if (!isPlayerTurn) {
      addToast('Cannot play cards during opponent\'s turn', 'error');
    } else if (currentPhase !== 'Action') {
      addToast(`Cannot play cards during ${currentPhase} phase`, 'error');
    } else if (actionsRemaining <= 0) {
      addToast('No actions remaining this turn', 'error');
    }
  };

  const handleCardClickInPlay = (cardId: string, cardType: string) => {
    if (!isInitialized) return;
    console.log(`Clicked card in play area: ${cardId} (${cardType})`);
    addToast(`Clicked on ${cardType} card ${cardId}`, 'info');
    // Add logic for activating abilities or targeting later
  };

  const advancePhase = () => {
    if (!isInitialized) return;
    switch (currentPhase) {
      case 'Disclosure':
        // Apply phase effect (e.g., gain credibility - TODO)
        setCurrentPhase('Investigation');
        // Draw card logic
        setGameState(prevState => {
          const newPlayerState = { ...prevState.playerState };
          if (newPlayerState.deck.length > 0) {
            const drawnCard = newPlayerState.deck[0];
            newPlayerState.deck = newPlayerState.deck.slice(1);
            newPlayerState.hand = [...newPlayerState.hand, drawnCard];
            addToast(`Investigation Phase: Drew ${drawnCard.name}`, 'info');
          } else {
            addToast('Investigation Phase: Deck empty, cannot draw!', 'warning');
            // TODO: Implement fatigue or loss condition?
          }
          return { ...prevState, playerState: newPlayerState };
        });
        break;
      case 'Investigation':
        setCurrentPhase('Action');
        setActionsRemaining(2); // Reset actions
        break;
      case 'Action':
        setCurrentPhase('Debunking');
        break;
      case 'Debunking':
        setCurrentPhase('End');
        break;
      case 'End':
        // This case should be handled by handleEndTurn
        break;
    }
  };

  const handleEndTurn = () => {
    if (!isInitialized) return;
    setCurrentPhase('Disclosure');
    setIsPlayerTurn(false);
    addToast('Turn Ended - Opponent\'s turn (Not implemented)', 'info');
    // TODO: Implement opponent turn logic
  };

  // Render loading state or placeholder until initialized
  if (!isInitialized) {
    return <div className="flex justify-center items-center h-screen bg-gray-800 text-white">Loading Game...</div>;
  }

  return (
    // Redesigned layout with sidebar on desktop and more compact mobile view
    <div className="flex h-screen max-h-screen bg-background text-foreground overflow-hidden dark">
      {/* Main game area - takes most of the screen */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Game areas container - takes all available height */}
        <div className="flex flex-col h-full">
          {/* Opponent area */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Opponent hand - more compact */}
            <div className="flex-shrink-0 z-10">
              <PlayerHand
                cards={opponentState.hand}
                isOwnHand={false}
                onCardClick={() => {}}
              />
            </div>
            
            {/* Opponent play area - maximized space */}
            <div className="flex-grow overflow-y-auto border-b border-gray-600 min-h-0">
              <PlayArea
                characters={opponentState.playArea.characters}
                locations={opponentState.playArea.locations}
                phenomena={opponentState.playArea.phenomena}
                conspiracies={opponentState.playArea.conspiracies}
                onCardClick={handleCardClickInPlay}
                isCurrentPlayer={!isPlayerTurn}
              />
            </div>
          </div>
          
          {/* Player area */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Player play area - maximized space */}
            <div className="flex-grow overflow-y-auto border-t border-gray-600 min-h-0">
              <PlayArea
                characters={playerState.playArea.characters}
                locations={playerState.playArea.locations}
                phenomena={playerState.playArea.phenomena}
                conspiracies={playerState.playArea.conspiracies}
                onCardClick={handleCardClickInPlay}
                isCurrentPlayer={isPlayerTurn}
              />
            </div>
            
            {/* Player hand - more compact */}
            <div className="flex-shrink-0 z-10">
              <PlayerHand
                cards={playerState.hand}
                isOwnHand={true}
                onCardClick={handleCardClickInHand}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar for controls - on desktop only */}
      <div className="hidden md:flex md:flex-col md:w-64 border-l border-border bg-card p-2 overflow-y-auto">
        {/* Opponent stats - compact */}
        <div className="flex items-center justify-between mb-2 p-2 bg-secondary rounded-xl card-shadow">
          <div>
            <div className="text-xs font-bold">Opponent</div>
            <div className="flex items-center">
              <span className="text-primary font-bold">{opponentState.credibility}</span>
              <span className="text-xs text-muted-foreground ml-1">/ 20 Cred</span>
            </div>
          </div>
          <div className="text-right text-xs">
            <div>Deck: {opponentState.deck.length}</div>
            <div>Discard: {opponentState.discard.length}</div>
          </div>
        </div>
        
        {/* Game controls */}
        <div className="mb-4">
          <GameActionPanel
            currentPhase={currentPhase}
            actionsRemaining={actionsRemaining}
            onEndPhase={advancePhase}
            onEndTurn={handleEndTurn}
            isPlayerTurn={isPlayerTurn}
          />
        </div>
        
        {/* Disclosure meter */}
        <div className="mb-4">
          <DisclosureMeter level={disclosureLevel} maxLevel={10} />
        </div>
        
        {/* Player stats - compact */}
        <div className="flex items-center justify-between p-2 bg-secondary rounded-xl card-shadow mt-auto">
          <div>
            <div className="text-xs font-bold">You</div>
            <div className="flex items-center">
              <span className="text-primary font-bold">{playerState.credibility}</span>
              <span className="text-xs text-muted-foreground ml-1">/ 20 Cred</span>
            </div>
          </div>
          <div className="text-right text-xs">
            <div>Deck: {playerState.deck.length}</div>
            <div>Discard: {playerState.discard.length}</div>
          </div>
        </div>
      </div>
      
      {/* Mobile-only bottom controls bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2 z-20">
        <div className="flex justify-between items-center">
          {/* Player stats */}
          <div className="flex items-center space-x-2">
            <div className="text-xs">
              <div className="font-bold">You: {playerState.credibility}/20</div>
              <div>D:{playerState.deck.length} | Dis:{playerState.discard.length}</div>
            </div>
          </div>
          
          {/* Phase controls - compact */}
          <div className="flex-1 mx-2">
            <button 
              onClick={isPlayerTurn ? (currentPhase === 'End' ? handleEndTurn : advancePhase) : undefined}
              className={`w-full py-1 px-2 text-xs rounded-xl ${isPlayerTurn ? 'bg-primary hover:bg-primary/90' : 'bg-secondary'}`}
              disabled={!isPlayerTurn}
            >
              {isPlayerTurn 
                ? (currentPhase === 'End' ? 'End Turn' : `End ${currentPhase} (${currentPhase === 'Action' ? actionsRemaining : ''})`) 
                : "Opponent's Turn"}
            </button>
          </div>
          
          {/* Opponent stats */}
          <div className="text-xs text-right">
            <div className="font-bold">Opp: {opponentState.credibility}/20</div>
            <div>D:{opponentState.deck.length} | Dis:{opponentState.discard.length}</div>
          </div>
        </div>
        
        {/* Disclosure level indicator - very compact */}
        <div className="mt-1">
          <div className="text-xs flex justify-between">
            <span>Disclosure: {disclosureLevel}/10</span>
            <span>{currentPhase} Phase</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1 mt-1">
            <div 
              className="bg-accent h-1 rounded-full" 
              style={{ width: `${(disclosureLevel / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Toast Notifications Container */}
      <div className="absolute top-4 right-4 space-y-2 z-[200]">
        {toasts.map(toast => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
