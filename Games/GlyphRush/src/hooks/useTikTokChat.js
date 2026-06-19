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
          const data = JSON.parse(e.data);
          if (data.type === 'chat' && data.comment && data.username) {
            const word = data.comment.trim();
            // Only pass through single-word messages, letters only
            if (/^[a-zA-Z]+$/.test(word)) {
              onWord(word, data.username);
            }
          }
        } catch {}
      };

      ws.onclose = () => {
        if (!dead) {
          console.log('WebSocket closed, retrying in 3s...');
          setTimeout(connect, 3000);
        }
      };

      ws.onerror = () => ws.close();
    }

    connect();
    return () => { dead = true; ws?.close(); };
  }, [onWord]);
}