import { useEffect } from 'react';

export function useTikTokChat(onWord) {
  useEffect(() => {
    let ws;
    let dead = false;

    function connect() {
      if (dead) return;
      ws = new WebSocket('ws://localhost:8080');

      ws.onopen = () => console.log('🔌 Connected to TikTok listener');

      ws.onmessage = (e) => {
  try {
    const msg = JSON.parse(e.data);
    if (msg.type === 'chat' && msg.data?.comment && msg.data?.username) {
      const word = msg.data.comment.trim();
      if (/^[a-zA-Z]+$/.test(word)) {
        onWord(word, msg.data.username);
      }
    }
  } catch {}
};

      ws.onerror = () => ws.close();
    }

    connect();
    return () => { dead = true; ws?.close(); };
  }, [onWord]);
}