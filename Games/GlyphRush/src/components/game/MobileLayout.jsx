import React from 'react';
import { useGame } from '@/lib/gameState';
import GameBoard from './GameBoard';
import WordList from './WordList';
import Timer from './Timer';
import Leaderboard from './Leaderboard';

export default function MobileLayout() {
  const { state } = useGame();

  return (
    <div style={{
      width: '1080px',
      height: '1920px',
      backgroundColor: '#0d0f1a',
      border: '1px solid #3b3b55',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{ padding: '40px 40px 20px', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '3rem',
          fontWeight: 900,
          color: '#ff2d95',
          textShadow: '0 0 20px #ff2d95',
          letterSpacing: '0.2em',
        }}>
          GLYPH<span style={{ color: '#00fff7', textShadow: '0 0 20px #00fff7' }}>RUSH</span>
        </div>
        <div style={{ marginTop: '20px', padding: '0 40px' }}>
          <Timer timeRemaining={state.timeRemaining} />
        </div>
      </div>

      {/* Board */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        <GameBoard board={state.board} tileSize="mobile" />
      </div>

      <div style={{ height: '1px', backgroundColor: '#ff2d9522', margin: '0 40px' }} />

      {/* Word list */}
      <div style={{ flex: 1, padding: '16px 24px', minHeight: 0, overflow: 'hidden' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '16px',
        }}>
          <span style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem',
            color: '#ffffff44', letterSpacing: '0.2em',
          }}>FOUND WORDS</span>
          <span style={{
            fontFamily: 'Share Tech Mono, monospace', fontSize: '0.8rem', color: '#39ff14',
          }}>{state.foundWords.length} words</span>
        </div>
        <WordList foundWords={state.foundWords} columns={2} />
      </div>

      <Leaderboard
        playerScores={state.playerScores}
        sessionScores={state.sessionScores}
        phase={state.phase}
        leaderboardTimer={state.leaderboardTimer}
      />
    </div>
  );
}