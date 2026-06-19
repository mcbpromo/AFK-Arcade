import 'dotenv/config';
import { WebSocketServer } from 'ws';
import { TikTokLiveConnection, WebcastEvent, ControlEvent } from 'tiktok-live-connector';

const username = process.env.TIKTOK_USERNAME;

if (!username) {
  console.error('No TIKTOK_USERNAME in .env!');
  process.exit(1);
}

const wss = new WebSocketServer({ port: 8080 });
console.log('🔌 WebSocket server on ws://localhost:8080');

function broadcast(type, data) {
  const msg = JSON.stringify({ type, ...data });
  for (const client of wss.clients) {
    if (client.readyState === 1) client.send(msg);
  }
}

const connection = new TikTokLiveConnection(username, {
  processInitialData: false
});

connection.on(ControlEvent.CONNECTED, (state) => {
  console.log(`✅ Connected! Room ID: ${state.roomId}`);
});

connection.on(ControlEvent.DISCONNECTED, () => {
  console.log('❌ Disconnected.');
});

connection.on(WebcastEvent.CHAT, (data) => {
  const user = data.user?.uniqueId;
  const comment = data.comment;
  if (!user || !comment) return;

  console.log(`💬 ${user}: ${comment}`);

  broadcast('chat', {
    username: user,
    nickname: data.user?.nickname,
    comment
  });
});

connection.on(ControlEvent.ERROR, ({ info, exception }) => {
  console.error('TikTok error:', info, exception);
});

console.log(`Connecting to ${username}'s live...`);
connection.connect().catch(err => {
  console.error('Failed to connect:', err.message);
});