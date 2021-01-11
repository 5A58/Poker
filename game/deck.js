import {RANKS, SUITS} from './constants.js';
import Card from './card.js';

export default class Deck {
    constructor() {
        this.cards = [];

        RANKS.forEach(rank => 
            SUITS.forEach(suit => 
                this.cards.push(new Card(rank, suit))));

        this.shuffle();
    }

    // The modern version of the Fisher–Yates shuffle
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            // Random integer such that 0 ≤ j ≤ i
            let j = Math.floor(Math.random() * (i + 1));
            
            // Exchange a[j] and a[i]
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
    
    draw() {
        return this.cards.pop();
    }

    count() {
        return this.cards.length;
    }
}