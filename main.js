import Deck from './deck.js';

let deck = new Deck();
console.log(`Count: ${deck.count()}`)
let card_drawn = deck.draw();
console.log(`Drew: ${card_drawn.toString()}`)
console.log(`Count: ${deck.count()}`)