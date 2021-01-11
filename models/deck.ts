import { RANKS, SUITS } from './constants.js';
import Card from './card.js';

export default class Deck {
    private cards: Array<Card>

    constructor() {
        this.cards = [];

        RANKS.forEach(rank =>
            SUITS.forEach(suit =>
                this.cards.push(new Card(rank, suit))));

        this.shuffle();
    }

    // The modern version of the Fisher–Yates shuffle
    private shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            // Random integer such that 0 ≤ j ≤ i
            let j = Math.floor(Math.random() * (i + 1));

            // Exchange a[j] and a[i]
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    draw(): Card {
        let card = this.cards.pop();
        if (card !== undefined) {
            return card;
        }
        throw new Error('A card could not be drawn. The deck is empty.');
    }

    count(): number {
        return this.cards.length;
    }
}