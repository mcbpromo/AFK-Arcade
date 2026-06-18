import React from 'react';

export default function Timer({ timeRemaining, totalTime = 180 }) {
  const pct = timeRemaining / totalTime;
  const color = pct > 0.5 ? '#39ff14' : pct > 0.2 ? '#fff01f' : '#ff2d95';
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '2.5rem',
        fontWeight: 700,
        color,
        textShadow: `0 0 20px ${color}`,
        letterSpacing: '0.1em',
      }}>
        {mins}:{secs.toString().padStart(2, '0')}
      </div>
      <div style={{
        height: '4px',
        backgroundColor: '#ffffff11',
        borderRadius: '2px',
        marginTop: '8px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct * 100}%`,
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
          transition: 'width 1s linear, background-color 0.5s',
        }} />
      </div>
    </div>
  );
}