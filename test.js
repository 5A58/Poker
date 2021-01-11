import Deck from './deck.js';

let deck = new Deck();
console.log(`Count: ${deck.count()}`)
for (let i = 0; i < 100; i++) {
    let card_drawn = deck.draw();
    console.log(card_drawn.toString())
}