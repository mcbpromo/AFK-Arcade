# AFK-Arcade

A lightweight TikTok Live chat listener that lets you build 
interactive games powered by your stream chat.

Built for streamers who want their audience engaged even 
when they step away — or just want fun chat-driven games 
during their stream.

## How it works

AFK-Arcade connects to your TikTok Live and emits events 
your game can listen to. Chat types a command, your game 
reacts. That's it.

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Create a `.env` file: `TIKTOK_USERNAME=yourusername`
4. Run: `npm run dev`

## Building a game

Import the arcade event emitter and listen for events:

\`\`\`javascript
import arcade from './src/listener.js';

arcade.on('chat', (data) => {
  console.log(`${data.username}: ${data.comment}`);
});

arcade.on('follow', (data) => {
  console.log(`${data.username} followed!`);
});
\`\`\`

## Events

| Event | When it fires | Data |
|-------|--------------|------|
| `connected` | Stream found and connected | `{ roomId }` |
| `disconnected` | Stream ended or dropped | — |
| `chat` | Someone sends a chat message | `{ username, nickname, comment }` |
| `emote` | Someone sends a community sticker | `{ username, nickname, emoteId }` |
| `gift` | Someone sends a gift | `{ username, nickname, giftName, diamonds }` |
| `follow` | Someone follows | `{ username, nickname }` |
| `join` | Someone joins the live | `{ username, nickname }` |

## Contributing

Open source and community driven! If you want to build 
a game, open a PR or start a discussion. All skill levels 
welcome.

## Credits

Built on top of [TikTok-Live-Connector](https://github.com/zerodytrash/TikTok-Live-Connector) by Zerody.

## License

MIT