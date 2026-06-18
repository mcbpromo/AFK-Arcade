import React from 'react';
import LetterTile from './LetterTile';

export default function GameBoard({ board, tileSize = 'normal' }) {
  if (!board || board.length === 0) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        padding: '16px',
      }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{
            width: tileSize === 'mobile' ? '72px' : '90px',
            height: tileSize === 'mobile' ? '72px' : '90px',
            backgroundColor: '#141729',
            border: '2px solid #ffffff11',
            borderRadius: '10px',
          }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      padding: '16px',
      backgroundColor: '#0d0f1a',
      borderRadius: '16px',
      border: '1px solid #3b3b55',
    }}>
      {board.map((letter, i) => (
        <LetterTile key={i} letter={letter} size={tileSize} />
      ))}
    </div>
  );
}