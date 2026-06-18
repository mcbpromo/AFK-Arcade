import React, { useState } from 'react';
import { useGame } from '@/lib/gameState';
import { Play, Square, RefreshCw, RotateCcw, Link2, Copy, Check, Pause } from 'lucide-react';

export default function StreamerBanner() {
  const { state, startRound, startContinuous, stopContinuous, endRound, resetSession } = useGame();
  const [copied, setCopied] = useState(false);

  const obsUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(obsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btn = (onClick, color, label, Icon) => (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '6px 14px',
      backgroundColor: `${color}22`,
      border: `1px solid ${color}66`,
      borderRadius: '8px',
      color,
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      cursor: 'pointer',
    }}>
      <Icon size={14} />{label}
    </button>
  );

  return (
    <div style={{
      backgroundColor: '#0d0f1a',
      borderBottom: '1px solid #ffffff11',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.2rem',
        fontWeight: 900,
        color: '#ff2d95',
        textShadow: '0 0 15px #ff2d95',
        letterSpacing: '0.15em',
      }}>
        GLYPH<span style={{ color: '#00fff7', textShadow: '0 0 15px #00fff7' }}>RUSH</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {state.phase === 'idle' && (<>
          {btn(startRound, '#39ff14', 'START ROUND', Play)}
          {btn(startContinuous, '#ff2d95', 'START CONTINUOUS', RefreshCw)}
        </>)}
        {state.phase === 'playing' && (<>
          {btn(endRound, '#fff01f', 'END ROUND', Square)}
          {state.continuous && btn(stopContinuous, '#ff6b1a', 'STOP AUTO', Pause)}
        </>)}
        {state.phase === 'leaderboard' && !state.continuous &&
          btn(startRound, '#39ff14', 'NEXT ROUND', Play)}
        {state.phase === 'leaderboard' && state.continuous &&
          btn(stopContinuous, '#ff6b1a', 'STOP AUTO', Pause)}

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ffffff11' }} />
        {btn(resetSession, '#ffffff44', 'RESET', RotateCcw)}
        <div style={{ width: '1px', height: '24px', backgroundColor: '#ffffff11' }} />

        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 12px',
          backgroundColor: '#ffffff08',
          border: '1px solid #ffffff11',
          borderRadius: '8px',
        }}>
          <Link2 size={14} color='#00fff7' />
          <span style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.7rem',
            color: '#ffffff44',
            maxWidth: '180px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>{obsUrl}</span>
          <button onClick={handleCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#39ff14' : '#ffffff44' }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.75rem',
          color: '#ffffff33',
        }}>
          R{state.roundNumber} · {state.foundWords.length}w · {Object.keys(state.playerScores).length}p
        </span>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          backgroundColor: state.phase === 'playing' ? '#39ff14' : state.phase === 'leaderboard' ? '#fff01f' : '#ffffff22',
          boxShadow: state.phase === 'playing' ? '0 0 8px #39ff14' : state.phase === 'leaderboard' ? '0 0 8px #fff01f' : 'none',
        }} />
      </div>
    </div>
  );
}