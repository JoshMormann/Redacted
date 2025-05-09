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
    // Use flex-col for mobile, md:flex-row might be too complex for this layout
    // Added max-h-screen to prevent excessive height issues
    <div className="flex flex-col h-screen max-h-screen bg-gray-800 text-white p-1 md:p-4 space-y-1 md:space-y-2 overflow-hidden">

      {/* Opponent's Area - Use flex-grow/shrink, remove min-h on mobile */}
      <div className="flex flex-col space-y-1 flex-grow flex-shrink md:flex-1 overflow-hidden">
        {/* Top bar: Credibility and Deck/Discard */}
        <div className="flex justify-between items-start space-x-2 flex-shrink-0">
          <CredibilityTracker
            playerName="Opponent"
            credibility={opponentState.credibility}
            maxCredibility={20}
            isCurrentPlayer={!isPlayerTurn}
          />
          <div className="text-right p-1 md:p-2 bg-gray-700 rounded text-xs md:text-sm">
            <div>Deck: {opponentState.deck.length}</div>
            <div>Discard: {opponentState.discard.length}</div>
          </div>
        </div>
        {/* Opponent Hand - Removed fixed height, let PlayerHand control its size */}
        <div className="flex-shrink-0">
          <PlayerHand
            cards={opponentState.hand} // Still shows hidden cards
            isOwnHand={false}
            onCardClick={() => {}}
          />
        </div>
        {/* Opponent Play Area - Allow scrolling, ensure it takes remaining space */}
        <div className="flex-grow overflow-y-auto border border-gray-600 rounded p-1 min-h-0">
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

      {/* Shared Area & Action Panel - Stack vertically on mobile, more compact */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0 md:space-x-4 py-1 flex-shrink-0">
        <div className="w-full md:flex-1 order-2 md:order-1">
          <GameActionPanel
            currentPhase={currentPhase}
            actionsRemaining={actionsRemaining}
            onEndPhase={advancePhase}
            onEndTurn={handleEndTurn}
            isPlayerTurn={isPlayerTurn}
          />
        </div>
        <div className="order-1 md:order-2">
           <DisclosureMeter level={disclosureLevel} maxLevel={10} />
        </div>
      </div>

      {/* Player's Area - Use flex-grow/shrink, remove min-h on mobile */}
      <div className="flex flex-col-reverse space-y-1 space-y-reverse flex-grow flex-shrink md:flex-1 overflow-hidden">
        {/* Bottom bar: Credibility and Deck/Discard */}
         <div className="flex justify-between items-start space-x-2 flex-shrink-0">
          <CredibilityTracker
            playerName="You"
            credibility={playerState.credibility}
            maxCredibility={20}
            isCurrentPlayer={isPlayerTurn}
          />
          <div className="text-right p-1 md:p-2 bg-gray-700 rounded text-xs md:text-sm">
            <div>Deck: {playerState.deck.length}</div>
            <div>Discard: {playerState.discard.length}</div>
          </div>
        </div>
         {/* Player Hand - Removed fixed height, let PlayerHand control its size */}
        <div className="flex-shrink-0">
          <PlayerHand
            cards={playerState.hand}
            isOwnHand={true}
            onCardClick={handleCardClickInHand}
          />
        </div>
        {/* Player Play Area - Allow scrolling, ensure it takes remaining space */}
        <div className="flex-grow overflow-y-auto border border-gray-600 rounded p-1 min-h-0">
          <PlayArea
            characters={playerState.playArea.characters}
            locations={playerState.playArea.locations}
            phenomena={playerState.playArea.phenomena}
            conspiracies={playerState.playArea.conspiracies}
            onCardClick={handleCardClickInPlay}
            isCurrentPlayer={isPlayerTurn}
          />
        </div>
      </div>

      {/* Toast Notifications Container - Moved to top-right on mobile */}
      <div className="absolute top-4 right-1 md:bottom-4 md:right-4 space-y-2 z-[200]">
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

