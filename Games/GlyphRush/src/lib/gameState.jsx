import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { generateBoard, validateWord, calculateWordPoints } from './glyphEngine';
import { loadDictionary, isValidWord } from './dictionary';

const ROUND_DURATION = 180;
const LEADERBOARD_DISPLAY = 15;

const initialState = {
  board: [],
  phase: 'idle',
  timeRemaining: ROUND_DURATION,
  foundWords: [],
  playerScores: {},
  sessionScores: {},
  roundNumber: 0,
  continuous: false,
  leaderboardTimer: LEADERBOARD_DISPLAY,
  dictionaryLoaded: false,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'DICTIONARY_LOADED':
      return { ...state, dictionaryLoaded: true };

    case 'START_ROUND': {
      const board = action.board || generateBoard();
      return {
        ...state,
        board,
        phase: 'playing',
        timeRemaining: ROUND_DURATION,
        foundWords: [],
        playerScores: {},
        roundNumber: state.roundNumber + 1,
        leaderboardTimer: LEADERBOARD_DISPLAY,
      };
    }

    case 'TICK':
      if (state.phase === 'playing') {
        const newTime = state.timeRemaining - 1;
        if (newTime <= 0) {
          return { ...state, timeRemaining: 0, phase: 'leaderboard', leaderboardTimer: LEADERBOARD_DISPLAY };
        }
        return { ...state, timeRemaining: newTime };
      }
      if (state.phase === 'leaderboard') {
        const newTimer = state.leaderboardTimer - 1;
        if (newTimer <= 0 && state.continuous) {
          const board = generateBoard();
          return {
            ...state,
            board,
            phase: 'playing',
            timeRemaining: ROUND_DURATION,
            foundWords: [],
            playerScores: {},
            roundNumber: state.roundNumber + 1,
            leaderboardTimer: LEADERBOARD_DISPLAY,
          };
        }
        return { ...state, leaderboardTimer: newTimer };
      }
      return state;

    case 'SUBMIT_WORD': {
      if (state.phase !== 'playing') return state;
      const { word, player } = action.payload;
      const clean = word.trim().toUpperCase();

      const alreadyFound = state.foundWords.some(fw => fw.word === clean);
      if (alreadyFound) return state;

      const foundSet = new Set(state.foundWords.map(fw => fw.word));
      const validation = validateWord(state.board, clean, foundSet);
      if (!validation.valid) return state;
      if (!isValidWord(clean)) return state;

      const points = calculateWordPoints(clean);
      const newFound = [...state.foundWords, { word: clean, player, points, timestamp: Date.now() }];
      newFound.sort((a, b) => b.points - a.points);

      const newPlayerScores = { ...state.playerScores };
      newPlayerScores[player] = (newPlayerScores[player] || 0) + points;

      const newSessionScores = { ...state.sessionScores };
      newSessionScores[player] = (newSessionScores[player] || 0) + points;

      return {
        ...state,
        foundWords: newFound,
        playerScores: newPlayerScores,
        sessionScores: newSessionScores,
      };
    }

    case 'SET_CONTINUOUS':
      return { ...state, continuous: action.payload };

    case 'END_ROUND':
      return { ...state, phase: 'leaderboard', timeRemaining: 0, leaderboardTimer: LEADERBOARD_DISPLAY };

    case 'RESET_TO_IDLE':
      return { ...state, phase: 'idle', continuous: false };

    case 'RESET_SESSION':
      return { ...initialState, dictionaryLoaded: state.dictionaryLoaded };

    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const timerRef = useRef(null);

  useEffect(() => {
    loadDictionary().then(() => dispatch({ type: 'DICTIONARY_LOADED' }));
  }, []);

  useEffect(() => {
    if (state.phase === 'playing' || state.phase === 'leaderboard') {
      timerRef.current = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [state.phase]);

  const startRound = useCallback(() => {
    const board = generateBoard();
    dispatch({ type: 'START_ROUND', board });
  }, []);

  const startContinuous = useCallback(() => {
    dispatch({ type: 'SET_CONTINUOUS', payload: true });
    const board = generateBoard();
    dispatch({ type: 'START_ROUND', board });
  }, []);

  const stopContinuous = useCallback(() => dispatch({ type: 'SET_CONTINUOUS', payload: false }), []);

  const submitWord = useCallback((word, player) => {
    dispatch({ type: 'SUBMIT_WORD', payload: { word, player } });
  }, []);

  const endRound = useCallback(() => dispatch({ type: 'END_ROUND' }), []);
  const resetSession = useCallback(() => dispatch({ type: 'RESET_SESSION' }), []);

  return (
    <GameContext.Provider value={{
      state,
      startRound,
      startContinuous,
      stopContinuous,
      submitWord,
      endRound,
      resetSession,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}