import React from 'react';
import { LETTER_POINTS } from '@/lib/glyphEngine';

function getTileColor(letter) {
  const l = letter.toUpperCase();
  const pts = LETTER_POINTS[l] || 1;
  if (pts === 1)  return { text: '#00fff7', border: '#00fff7', glow: '#00fff7' }; // cyan
  if (pts === 2)  return { text: '#39ff14', border: '#39ff14', glow: '#39ff14' }; // green
  if (pts === 3)  return { text: '#fff01f', border: '#fff01f', glow: '#fff01f' }; // yellow
  if (pts === 4)  return { text: '#ff6b1a', border: '#ff6b1a', glow: '#ff6b1a' }; // orange
  if (pts === 5)  return { text: '#ff2d95', border: '#ff2d95', glow: '#ff2d95' }; // pink
  if (pts >= 8)   return { text: '#bf5fff', border: '#bf5fff', glow: '#bf5fff' }; // purple
  return { text: '#ffffff', border: '#ffffff', glow: '#ffffff' };
}

export default function LetterTile({ letter, size = 'normal' }) {
  if (!letter) return null;
  const color = getTileColor(letter === 'Qu' ? 'Q' : letter);
  const pts = LETTER_POINTS[letter.toUpperCase()] || LETTER_POINTS['Q'];

  const dim = size === 'mobile' ? '220px' : '90px';
  const fontSize = size === 'mobile' ? '4rem' : '2rem';
  const ptSize = size === 'mobile' ? '1.2rem' : '0.65rem';
  
  return (
    <div style={{
      width: dim,
      height: dim,
      backgroundColor: '#141729',
      border: `2px solid ${color.border}`,
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 0 12px ${color.glow}44`,
      position: 'relative',
      cursor: 'default',
    }}>
      <span style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize,
        fontWeight: 700,
        color: color.text,
        textShadow: `0 0 10px ${color.glow}`,
        lineHeight: 1,
      }}>
        {letter}
      </span>
      <span style={{
        position: 'absolute',
        bottom: '5px',
        right: '7px',
        fontSize: ptSize,
        fontFamily: 'Share Tech Mono, monospace',
        color: color.text,
        opacity: 0.7,
      }}>
        {pts}
      </span>
    </div>
  );
}