import React from 'react';
import { LETTER_POINTS } from '@/lib/glyphEngine';

function getPointColor(points) {
  if (points >= 50) return '#bf5fff';
  if (points >= 30) return '#ff2d95';
  if (points >= 15) return '#ff6b1a';
  if (points >= 8)  return '#fff01f';
  return '#39ff14';
}

export default function WordList({ foundWords, columns = 1 }) {
  if (!foundWords || foundWords.length === 0) {
    return (
      <div style={{
        color: '#ffffff33',
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '0.9rem',
        textAlign: 'center',
        padding: '2rem',
      }}>
        Waiting for words...
      </div>
    );
  }

  const cols = Array.from({ length: columns }, () => []);
  foundWords.forEach((entry, i) => cols[i % columns].push(entry));

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '8px',
      overflowY: 'auto',
      maxHeight: '100%',
    }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {col.map((entry) => {
            const color = getPointColor(entry.points);
            return (
              <div key={entry.word} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 10px',
                backgroundColor: '#141729',
                borderRadius: '6px',
                border: `1px solid ${color}22`,
              }}>
                <span style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.75rem',
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                }}>
                  {entry.word}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontFamily: 'Share Tech Mono, monospace',
                    color: '#ffffff44',
                  }}>
                    {entry.player}
                  </span>
                  <span style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '0.75rem',
                    color,
                    fontWeight: 700,
                  }}>
                    {entry.points}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}