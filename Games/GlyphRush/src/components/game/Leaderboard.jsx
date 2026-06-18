import React from 'react';

const RANK_COLORS = ['#fff01f', '#00fff7', '#ff6b1a', '#ffffff99', '#ffffff66'];
const MEDALS = ['🥇', '🥈', '🥉', '4', '5'];

export default function Leaderboard({ playerScores, sessionScores, phase, leaderboardTimer }) {
  if (phase !== 'leaderboard') return null;

  const roundTop = Object.entries(playerScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const sessionTop = Object.entries(sessionScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: '#0d0f1acc',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      borderRadius: '16px',
    }}>
      <div style={{
        display: 'flex',
        gap: '32px',
        padding: '40px',
        backgroundColor: '#141729',
        borderRadius: '20px',
        border: '1px solid #ff2d9544',
        boxShadow: '0 0 40px #ff2d9522',
        minWidth: '600px',
      }}>
        {/* Round scores */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#ff2d95',
            textShadow: '0 0 10px #ff2d95',
            fontSize: '1rem',
            letterSpacing: '0.2em',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            ROUND RESULTS
          </h2>
          {roundTop.length === 0 && (
            <div style={{ color: '#ffffff33', textAlign: 'center', fontFamily: 'Share Tech Mono, monospace' }}>
              No scores this round
            </div>
          )}
          {roundTop.map(([player, pts], i) => (
            <div key={player} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              marginBottom: '6px',
              backgroundColor: '#0d0f1a',
              borderRadius: '8px',
              border: `1px solid ${RANK_COLORS[i]}33`,
            }}>
              <span style={{ fontSize: '1.2rem' }}>{MEDALS[i]}</span>
              <span style={{
                flex: 1,
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 600,
                color: '#ffffff',
                fontSize: '0.95rem',
              }}>
                {player}
              </span>
              <span style={{
                fontFamily: 'Share Tech Mono, monospace',
                color: RANK_COLORS[i],
                fontWeight: 700,
              }}>
                {pts}
              </span>
            </div>
          ))}
        </div>

        <div style={{ width: '1px', backgroundColor: '#ffffff11' }} />

        {/* Session scores */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#00fff7',
            textShadow: '0 0 10px #00fff7',
            fontSize: '1rem',
            letterSpacing: '0.2em',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            SESSION LEADERS
          </h2>
          {sessionTop.map(([player, pts], i) => (
            <div key={player} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              marginBottom: '6px',
              backgroundColor: '#0d0f1a',
              borderRadius: '8px',
              border: `1px solid ${RANK_COLORS[i]}33`,
            }}>
              <span style={{ fontSize: '1.2rem' }}>{MEDALS[i]}</span>
              <span style={{
                flex: 1,
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 600,
                color: '#ffffff',
                fontSize: '0.95rem',
              }}>
                {player}
              </span>
              <span style={{
                fontFamily: 'Share Tech Mono, monospace',
                color: RANK_COLORS[i],
                fontWeight: 700,
              }}>
                {pts}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        fontFamily: 'Share Tech Mono, monospace',
        color: '#ffffff44',
        fontSize: '0.8rem',
      }}>
        Next round in {leaderboardTimer}s...
      </div>
    </div>
  );
}