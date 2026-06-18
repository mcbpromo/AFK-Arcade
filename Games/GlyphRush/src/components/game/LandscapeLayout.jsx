import React from 'react';
import { useGame } from '@/lib/gameState';
import GameBoard from './GameBoard';
import WordList from './WordList';
import Timer from './Timer';
import Leaderboard from './Leaderboard';

const RANK_COLORS = ['#fff01f', '#00fff7', '#ff6b1a', '#ffffff99', '#ffffff66'];
const MEDALS = ['🥇', '🥈', '🥉', '4', '5'];

export default function LandscapeLayout() {
  const { state } = useGame();

  const sessionTop = Object.entries(state.sessionScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div style={{
      width: '1920px',
      height: '1080px',
      backgroundColor: '#0d0f1a',
      border: '1px solid #3b3b55',
      borderRadius: '16px',
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Left — board + timer */}
      <div style={{
        width: '520px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        borderRight: '1px solid #ffffff08',
        gap: '24px',
      }}>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1.8rem',
          fontWeight: 900,
          color: '#ff2d95',
          textShadow: '0 0 20px #ff2d95',
          letterSpacing: '0.2em',
        }}>
          GLYPH<span style={{ color: '#00fff7', textShadow: '0 0 20px #00fff7' }}>RUSH</span>
        </div>
        <GameBoard board={state.board} tileSize="normal" />
        <div style={{ width: '100%' }}>
          <Timer timeRemaining={state.timeRemaining} />
        </div>
      </div>

      {/* Middle — session leaderboard */}
      <div style={{
        width: '320px',
        borderRight: '1px solid #ffffff08',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.7rem',
          color: '#00fff7',
          textShadow: '0 0 8px #00fff7',
          letterSpacing: '0.2em',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          SESSION LEADERS
        </div>
        {sessionTop.length === 0 && (
          <div style={{ color: '#ffffff22', textAlign: 'center', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.8rem', marginTop: '40px' }}>
            No scores yet
          </div>
        )}
        {sessionTop.map(([player, pts], i) => (
          <div key={player} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 12px', marginBottom: '6px',
            backgroundColor: '#141729',
            borderRadius: '8px',
            border: `1px solid ${RANK_COLORS[i]}33`,
          }}>
            <span style={{ fontSize: '1rem' }}>{MEDALS[i]}</span>
            <span style={{ flex: 1, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, color: '#ffffff', fontSize: '0.9rem' }}>
              {player}
            </span>
            <span style={{ fontFamily: 'Share Tech Mono, monospace', color: RANK_COLORS[i], fontWeight: 700, fontSize: '0.85rem' }}>
              {pts}
            </span>
          </div>
        ))}
      </div>

      {/* Right — word list */}
      <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '16px',
        }}>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', color: '#ffffff44', letterSpacing: '0.2em' }}>
            FOUND WORDS
          </span>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.8rem', color: '#39ff14' }}>
            {state.foundWords.length} words
          </span>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <WordList foundWords={state.foundWords} columns={3} />
        </div>
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