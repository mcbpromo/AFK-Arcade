import EventEmitter from 'events';

// AFK-Arcade Event Bus
// Games import this and listen for events like:
// arcade.on('chat', (data) => { ... })
// arcade.on('follow', (data) => { ... })
// arcade.on('gift', (data) => { ... })

const arcade = new EventEmitter();

export default arcade;