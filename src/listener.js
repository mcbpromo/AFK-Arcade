import 'dotenv/config';
import { TikTokLiveConnection, WebcastEvent, ControlEvent } from 'tiktok-live-connector';
import arcade from './events.js';

const username = process.env.TIKTOK_USERNAME;

if (!username) {
  console.error('No TIKTOK_USERNAME in .env!');
  process.exit(1);
}

const connection = new TikTokLiveConnection(username, {
  processInitialData: false
});

connection.on(ControlEvent.CONNECTED, (state) => {
  console.log(`✅ Connected to ${username}'s live! Room ID: ${state.roomId}`);
  arcade.emit('connected', { roomId: state.roomId });
});

connection.on(ControlEvent.DISCONNECTED, () => {
  console.log('❌ Disconnected from TikTok live.');
  arcade.emit('disconnected');
});

connection.on(WebcastEvent.CHAT, (data) => {
  const username = data.user?.uniqueId;
  const comment = data.comment;
  if (!username || !comment) return;

  // Detect emotes/stickers (blank comment with emotes array)
  if (data.emoteList?.length > 0) {
    arcade.emit('emote', {
      username,
      nickname: data.user?.nickname,
      emoteId: data.emoteList[0]?.emote?.emoteId
    });
    return;
  }

  arcade.emit('chat', {
    username,
    nickname: data.user?.nickname,
    comment
  });
});

connection.on(WebcastEvent.GIFT, (data) => {
  const username = data.user?.uniqueId;
  if (!username) return;
  if (data.giftDetails?.giftType === 1 && !data.repeatEnd) return;

  arcade.emit('gift', {
    username,
    nickname: data.user?.nickname,
    giftName: data.giftDetails?.giftName || 'Unknown',
    diamonds: data.giftDetails?.diamondCount || 1
  });
});

connection.on(WebcastEvent.FOLLOW, (data) => {
  const username = data.user?.uniqueId;
  if (!username) return;

  arcade.emit('follow', {
    username,
    nickname: data.user?.nickname
  });
});

connection.on(WebcastEvent.MEMBER, (data) => {
  const username = data.user?.uniqueId;
  if (!username) return;

  arcade.emit('join', {
    username,
    nickname: data.user?.nickname
  });
});

connection.on(ControlEvent.ERROR, ({ info, exception }) => {
  console.error('TikTok error:', info, exception);
});

// Connect
console.log(`Connecting to ${username}'s TikTok live...`);
connection.connect().catch(err => {
  console.error('Failed to connect:', err.message);
});

export { arcade };